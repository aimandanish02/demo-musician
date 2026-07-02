"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HorizontalPanProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalPan({ children, className }: HorizontalPanProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !wrapRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const distance = trackRef.current!.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(trackRef.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <div className={`flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-8 ${className ?? ""}`}>
        {children}
      </div>
    );
  }

  return (
    <section ref={wrapRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <div ref={trackRef} className="flex h-[100dvh] items-center gap-6 pl-5 md:pl-8">
        {children}
      </div>
    </section>
  );
}
