import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface SectionIntroProps {
  headline: string;
  body?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export function SectionIntro({ headline, body, align = "left", action }: SectionIntroProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      <h2 className="font-display text-section uppercase tracking-tight text-ink">
        {headline}
      </h2>
      {body ? <p className="text-base leading-relaxed text-ink-muted max-w-[60ch]">{body}</p> : null}
      {action}
    </Reveal>
  );
}
