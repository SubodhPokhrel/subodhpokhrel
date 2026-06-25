import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GradientText } from "@/components/primitives/GradientText";
import { ArrowDownIcon, ArrowRightIcon } from "@/components/primitives/Icon";
import { Aurora } from "@/components/visual";
import { profile } from "@/content/profile";

/**
 * Full-viewport hero with the aurora backdrop. Above-the-fold copy renders
 * immediately (no entrance animation), so the headline is the LCP element and
 * is never hidden behind client JS.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden">
      <div className="mask-fade-y absolute inset-0 -z-10">
        <Aurora />
      </div>
      <Container className="flex flex-col gap-8 py-24">
        <Eyebrow>
          {profile.roleline} · {profile.location}
        </Eyebrow>
        <h1 className="max-w-4xl text-display-xl">
          Designing &amp; building <GradientText>refined</GradientText> digital products.
        </h1>
        <p className="max-w-2xl text-body-lg text-muted-foreground">{profile.shortBio}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/work" size="lg">
            View work
            <ArrowRightIcon size={18} />
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Get in touch
          </Button>
        </div>
      </Container>
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
        aria-hidden="true"
      >
        <ArrowDownIcon />
      </div>
    </section>
  );
}
