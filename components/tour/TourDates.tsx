"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { tourDates, type TourDate } from "@/lib/data";

const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short" });

function formatDay(iso: string) {
  const date = new Date(iso);
  return {
    month: MONTH_FORMAT.format(date).toUpperCase(),
    day: date.getUTCDate(),
  };
}

export function TourDates() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tour-heading",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
      gsap.fromTo(
        ".tour-row",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.2, ease: "power3.out" },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} id="tour" className="flex h-full w-full items-center bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <div className="tour-heading mb-8 max-w-2xl md:mb-10" style={reduced ? undefined : { opacity: 0 }}>
          <h2 className="font-display text-display uppercase leading-[0.95] tracking-tight text-ink">
            On the road, 2026
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            Six cities this fall. New dates get added the first Monday of every month.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {tourDates.map((show) => (
            <TourRow key={`${show.date}-${show.venue}`} show={show} reduced={reduced} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TourRow({ show, reduced }: { show: TourDate; reduced: boolean }) {
  const { month, day } = formatDay(show.date);
  const isSoldOut = show.status === "Sold Out";

  return (
    <div
      className="tour-row flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-raised px-5 py-4 sm:px-6 sm:py-5"
      style={reduced ? undefined : { opacity: 0 }}
    >
      <div className="flex items-center gap-4">
        <div className="flex w-12 flex-col items-center leading-none text-ink">
          <span className="font-mono text-[11px] tracking-wide text-ink-faint">{month}</span>
          <span className="font-display text-2xl">{day}</span>
        </div>
        <div>
          <p className="font-semibold text-ink">{show.city}</p>
          <p className="text-sm text-ink-muted">{show.venue}</p>
        </div>
      </div>

      {isSoldOut ? (
        <span className="rounded-full border border-border-subtle px-4 py-2 text-sm font-medium text-ink-faint">
          Sold Out
        </span>
      ) : (
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform duration-150 active:scale-[0.98] sm:px-5"
        >
          Get Tickets
        </a>
      )}
    </div>
  );
}
