import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { GradientText } from "@/components/primitives/GradientText";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60svh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-display">
        <GradientText>404</GradientText>
      </p>
      <p className="text-body-lg text-muted-foreground">This page wandered off.</p>
      <Button href="/">Back home</Button>
    </Container>
  );
}
