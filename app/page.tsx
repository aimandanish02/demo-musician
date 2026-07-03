import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { LogoWall } from "@/components/social-proof/LogoWall";
import { LatestRelease } from "@/components/release/LatestRelease";
import { DiscographyGrid } from "@/components/discography/DiscographyGrid";
import { TourDates } from "@/components/tour/TourDates";
import { PhotoMarquee } from "@/components/gallery/PhotoMarquee";
import { PressQuotes } from "@/components/press/PressQuotes";
import { ContactForm } from "@/components/contact/ContactForm";
import { Footer } from "@/components/footer/Footer";
import { SlideDeck } from "@/components/ui/SlideDeck";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <SlideDeck>
          <Hero />
          <LatestRelease />
          <TourDates />
        </SlideDeck>
        <DiscographyGrid />
        <LogoWall />
        <PhotoMarquee />
        <PressQuotes />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
