/** Übersicht der Design-Varianten für /labs/mobile-massage. */
export const VARIANTS = [
  {
    slug: "a",
    name: "Quiet Luxury",
    blurb:
      "Warmer Off-White-Grund, Display-Serife, Gold-Hairlines, viel Weißraum. Premium durch Ruhe.",
  },
  {
    slug: "b",
    name: "Dark Cinematic",
    blurb:
      "Durchgehend tiefes Teal, große Fotografie, Gold-Akzente, Serife. Hotel bei Nacht.",
  },
  {
    slug: "c",
    name: "Editorial Magazine",
    blurb:
      "Weiß, große Typografie, asymmetrisches Raster, nummerierte Kapitel, Coral als einziger Akzent.",
  },
  {
    slug: "d",
    name: "Minimal One-Column",
    blurb:
      "Eine schmale Spalte, fast nur Text, der Preis als Hero. Maximal ruhig.",
  },
  {
    slug: "e",
    name: "Split-Screen",
    blurb:
      "Links fixes Panel mit Portrait, Preis und CTA; rechts scrollt der Inhalt.",
  },
  {
    slug: "f",
    name: "Hotel Concierge",
    blurb:
      "Wie eine Service-Karte im Hotelzimmer: Creme, Kapitälchen, feine Rahmen, Menü-Logik.",
  },
  {
    slug: "g",
    name: "Bold Poster",
    blurb:
      "Übergroße Typografie, Coral- und Gold-Flächen, B-Boy-Energie trifft Therapie.",
  },
  {
    slug: "h",
    name: "Soft Wellness",
    blurb:
      "Helle Salbei-Verläufe, weiche Radien, fotografiegeführt, luftig und sanft.",
  },
  {
    slug: "i",
    name: "Swiss Grid",
    blurb:
      "Strenges Raster, Mono-Labels, Hairlines, Tabellen. Premium durch Präzision.",
  },
  {
    slug: "j",
    name: "Story Scroll",
    blurb:
      "Erzählerisch in der Ich-Form, große Zitate, Bildbänder, ein langer ruhiger Bogen.",
  },
] as const;

export type VariantSlug = (typeof VARIANTS)[number]["slug"];
