import Image from "next/image";
import { HorizontalPan } from "@/components/ui/HorizontalPan";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { albums } from "@/lib/data";

export function DiscographyGrid() {
  return (
    <section id="discography" className="py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          headline="Discography"
          body="Five releases, one direction. Scroll to flip through the crate."
        />
      </div>

      <div className="mt-10">
        <HorizontalPan>
          {albums.map((album) => (
            <a
              key={album.slug}
              href={album.streamUrl}
              className="group relative h-[62dvh] w-[46vw] flex-shrink-0 overflow-hidden rounded-[24px] sm:w-[34vw] md:w-[26vw] lg:w-[20vw]"
            >
              <Image
                src={album.cover}
                alt={`${album.title} cover art`}
                fill
                sizes="30vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/0 to-surface/0" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-2xl uppercase leading-none text-ink">{album.title}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {album.type} · {album.year}
                </p>
              </div>
            </a>
          ))}
          <div className="flex h-[62dvh] w-[70vw] flex-shrink-0 items-center pr-10 sm:w-[40vw] md:w-[26vw]">
            <p className="max-w-xs text-lg leading-relaxed text-ink-muted">
              That&apos;s the whole crate, for now. Next one drops when it&apos;s ready.
            </p>
          </div>
        </HorizontalPan>
      </div>
    </section>
  );
}
