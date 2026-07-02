"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { albums } from "@/lib/data";

const latest = albums[0];

export function LatestRelease() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".release-art", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.8 })
        .fromTo(
          ".release-copy > *",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.5",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="flex h-full w-full items-center bg-surface">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div
          className="release-art aspect-square w-full overflow-hidden rounded-[28px]"
          style={reduced ? undefined : { opacity: 0 }}
        >
          <Image
            src={latest.cover}
            alt={`${latest.title} album cover`}
            width={900}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="release-copy flex flex-col gap-5">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent"
            style={reduced ? undefined : { opacity: 0 }}
          >
            New Album
          </span>
          <h2
            className="font-display text-display uppercase leading-[0.95] tracking-tight text-ink"
            style={reduced ? undefined : { opacity: 0 }}
          >
            {latest.title}
          </h2>
          <p
            className="max-w-[52ch] text-base leading-relaxed text-ink-muted"
            style={reduced ? undefined : { opacity: 0 }}
          >
            Fourteen tracks recorded live to tape over one week in a converted barn outside
            Nashville. Static Bloom trades the studio polish of Night Shift Hymns for
            something rawer, closer to how these songs actually sound in a room.
          </p>
          <div className="pt-2" style={reduced ? undefined : { opacity: 0 }}>
            <a
              href={latest.streamUrl}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform duration-150 active:scale-[0.98]"
            >
              Listen Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
