import { Input } from "@/components/primitives/Input";
import { Textarea } from "@/components/primitives/Textarea";

/** Form controls in their default, error, and disabled states. */
export function FormSpecimen() {
  return (
    <div className="flex max-w-md flex-col gap-6">
      <Input label="Name" placeholder="Jane Doe" />
      <Input
        label="Email"
        type="email"
        defaultValue="not-an-email"
        error="Enter a valid email address."
      />
      <Input label="Disabled" placeholder="Unavailable" disabled />
      <Textarea label="Message" placeholder="Tell me about your project…" />
    </div>
  );
}
