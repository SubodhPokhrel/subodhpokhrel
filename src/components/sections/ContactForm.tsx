"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/primitives/Button";
import { CheckIcon, SendIcon } from "@/components/primitives/Icon";
import { Input } from "@/components/primitives/Input";
import { Textarea } from "@/components/primitives/Textarea";
import { profile } from "@/content/profile";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY = { name: "", email: "", message: "" };

/** Contact form: posts to /api/contact, with a mailto fallback when send isn't possible. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState(EMPTY);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update =
    (key: keyof typeof EMPTY) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  function mailtoFallback() {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus("success");
        setForm(EMPTY);
        return;
      }
      // Unconfigured (503) or a failed send (500): hand off to mailto so the
      // visitor always has a working way to reach out.
      if (response.status === 503 || response.status === 500) {
        mailtoFallback();
        setStatus("idle");
        return;
      }
      throw new Error("request failed");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8 outline-none"
      >
        <span className="text-foreground" aria-hidden="true">
          <CheckIcon />
        </span>
        <p className="text-title">Message sent.</p>
        <p className="text-body text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={update("name")}
          placeholder="Your name"
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="you@email.com"
          required
        />
      </div>
      <Textarea
        label="Message"
        name="message"
        value={form.message}
        onChange={update("message")}
        placeholder="Tell me about your project…"
        rows={5}
        required
      />
      {status === "error" ? (
        <p role="alert" className="text-caption text-danger">
          Something went wrong. Please try again, or{" "}
          <a href={`mailto:${profile.email}`} className="underline hover:text-foreground">
            email me directly
          </a>
          .
        </p>
      ) : null}
      <div>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
          <SendIcon size={16} />
        </Button>
      </div>
    </form>
  );
}
