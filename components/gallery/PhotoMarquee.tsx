"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { galleryPhotos } from "@/lib/data";

export function PhotoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 36,
        ease: "none",
        repeat: -1,
      });

      const node = trackRef.current;
      const pause = () => tween.pause();
      const resume = () => tween.play();
      node?.addEventListener("mouseenter", pause);
      node?.addEventListener("mouseleave", resume);

      return () => {
        node?.removeEventListener("mouseenter", pause);
        node?.removeEventListener("mouseleave", resume);
      };
    }, trackRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section id="gallery" className="mx-auto max-w-7xl px-5 py-[var(--space-section)] md:px-8">
        <SectionIntro headline="On tour" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {galleryPhotos.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={photo.src} alt={photo.alt} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const loopPhotos = [...galleryPhotos, ...galleryPhotos];

  return (
    <section id="gallery" className="py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro headline="On tour" />
      </div>

      <div className="mt-10 overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-4 px-5 md:px-8">
          {loopPhotos.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              className="relative h-[260px] w-[360px] flex-shrink-0 overflow-hidden rounded-2xl md:h-[320px] md:w-[440px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="440px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
