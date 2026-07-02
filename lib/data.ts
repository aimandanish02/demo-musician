export interface Artist {
  name: string;
  tagline: string;
  location: string;
  bio: string;
}

export const artist: Artist = {
  name: "Marlowe Vance",
  tagline: "Songs for the long drive home.",
  location: "Nashville, TN",
  bio: "Marlowe Vance writes reverb-soaked, string-laced songs about leaving small towns and coming back changed. Three albums in, still touring in a van that smells like coffee and old cables.",
};

export interface Album {
  slug: string;
  title: string;
  year: string;
  type: "Album" | "EP" | "Single";
  cover: string;
  streamUrl: string;
}

export const albums: Album[] = [
  {
    slug: "static-bloom",
    title: "Static Bloom",
    year: "2026",
    type: "Album",
    cover: "https://picsum.photos/seed/marlowe-static-bloom/900/900",
    streamUrl: "#",
  },
  {
    slug: "night-shift-hymns",
    title: "Night Shift Hymns",
    year: "2024",
    type: "Album",
    cover: "https://picsum.photos/seed/marlowe-night-shift/900/900",
    streamUrl: "#",
  },
  {
    slug: "back-porch-tapes",
    title: "Back Porch Tapes",
    year: "2023",
    type: "EP",
    cover: "https://picsum.photos/seed/marlowe-back-porch/900/900",
    streamUrl: "#",
  },
  {
    slug: "low-beams",
    title: "Low Beams",
    year: "2022",
    type: "Single",
    cover: "https://picsum.photos/seed/marlowe-low-beams/900/900",
    streamUrl: "#",
  },
  {
    slug: "coldwater",
    title: "Coldwater",
    year: "2021",
    type: "Album",
    cover: "https://picsum.photos/seed/marlowe-coldwater/900/900",
    streamUrl: "#",
  },
];

export interface TourDate {
  date: string;
  city: string;
  venue: string;
  status: "Available" | "Few Left" | "Sold Out";
}

export const tourDates: TourDate[] = [
  { date: "2026-08-14", city: "Nashville, TN", venue: "The Basement East", status: "Few Left" },
  { date: "2026-08-19", city: "Asheville, NC", venue: "The Grey Eagle", status: "Available" },
  { date: "2026-08-23", city: "Richmond, VA", venue: "The Broadberry", status: "Available" },
  { date: "2026-08-29", city: "Philadelphia, PA", venue: "Johnny Brenda's", status: "Sold Out" },
  { date: "2026-09-03", city: "Brooklyn, NY", venue: "Elsewhere", status: "Available" },
  { date: "2026-09-09", city: "Boston, MA", venue: "Brighton Music Hall", status: "Few Left" },
];

export interface PressQuote {
  quote: string;
  source: string;
  author: string;
}

export const pressQuotes: PressQuote[] = [
  {
    quote: "Vance writes the kind of choruses that arrive already sounding like memories.",
    source: "No Depression",
    author: "Talia Rourke",
  },
  {
    quote: "Static Bloom is the rare third album that sounds like a debut, restless and unfinished in the best way.",
    source: "Paste Magazine",
    author: "Devon Okafor",
  },
  {
    quote: "Part hymn, part highway noise. One of the most honest voices coming out of the Nashville underground.",
    source: "The Bluegrass Situation",
    author: "Priya Nakamura",
  },
];

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: "https://picsum.photos/seed/marlowe-live-01/1200/800", alt: "Marlowe Vance performing under red stage light" },
  { src: "https://picsum.photos/seed/marlowe-live-02/1200/800", alt: "Crowd singing along at a sold-out club show" },
  { src: "https://picsum.photos/seed/marlowe-live-03/1200/800", alt: "Backstage before a show, guitar case open" },
  { src: "https://picsum.photos/seed/marlowe-live-04/1200/800", alt: "Wide shot of the band on an outdoor festival stage" },
  { src: "https://picsum.photos/seed/marlowe-live-05/1200/800", alt: "Close-up of hands on a well-worn acoustic guitar" },
  { src: "https://picsum.photos/seed/marlowe-live-06/1200/800", alt: "Tour van parked outside a venue at dusk" },
];

export interface SocialLink {
  platform: string;
  url: string;
}

export const socials: SocialLink[] = [
  { platform: "Instagram", url: "#" },
  { platform: "YouTube", url: "#" },
  { platform: "TikTok", url: "#" },
  { platform: "X", url: "#" },
];

export interface StreamingPlatform {
  name: string;
  slug: string;
  url: string;
}

export const streamingPlatforms: StreamingPlatform[] = [
  { name: "Spotify", slug: "spotify", url: "#" },
  { name: "Apple Music", slug: "applemusic", url: "#" },
  { name: "YouTube Music", slug: "youtubemusic", url: "#" },
  { name: "SoundCloud", slug: "soundcloud", url: "#" },
  { name: "Bandcamp", slug: "bandcamp", url: "#" },
];

export const stats = [
  { value: 2.4, suffix: "M", label: "Monthly listeners" },
  { value: 180, suffix: "+", label: "Shows played" },
  { value: 11, suffix: "", label: "Countries toured" },
];
