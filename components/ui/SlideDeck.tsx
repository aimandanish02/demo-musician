"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SlideDeckProps {
  children: ReactNode;
}

export function SlideDeck({ children }: SlideDeckProps) {
  const panels = Children.toArray(children);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const panelEls = gsap.utils.toArray<HTMLElement>(".slide-panel");

      panelEls.forEach((panel, i) => {
        if (i === panelEls.length - 1) return;

        gsap.to(panel, {
          scale: 0.94,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: panelEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative">
      {panels.map((panel, i) => (
        <div
          key={i}
          className="slide-panel sticky top-0 h-[100dvh] w-full overflow-hidden"
          style={{ zIndex: i + 1 }}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
