"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { artist } from "@/lib/data";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-headline", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          ".hero-subtext",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.35",
        );

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.08,
          duration: 22,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div id="top" ref={rootRef} className="relative h-full w-full">
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/marlowe-portrait-main/1600/2000"
          alt={`${artist.name} performing on a dark stage, backlit`}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/55 to-surface/10" />

      <div className="relative flex h-full flex-col justify-end gap-5 px-5 pb-14 pt-24 md:gap-6 md:px-10 md:pb-20 lg:px-16">
        <h1
          className="hero-headline max-w-4xl font-display text-hero uppercase leading-[0.9] tracking-tight text-ink"
          style={reduced ? undefined : { opacity: 0 }}
        >
          Songs for the long drive home
        </h1>

        <p
          className="hero-subtext max-w-[46ch] text-lg leading-relaxed text-ink-muted"
          style={reduced ? undefined : { opacity: 0 }}
        >
          {artist.name}&apos;s new album Static Bloom is out now. Reverb-soaked songs from the
          Nashville underground.
        </p>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <a
            href="#discography"
            className="hero-cta inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform duration-150 active:scale-[0.98]"
            style={reduced ? undefined : { opacity: 0 }}
          >
            <Play size={18} weight="fill" />
            Listen Now
          </a>
          <a
            href="#tour"
            className="hero-cta inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            style={reduced ? undefined : { opacity: 0 }}
          >
            Tour Dates
          </a>
        </div>
      </div>
    </div>
  );
}
