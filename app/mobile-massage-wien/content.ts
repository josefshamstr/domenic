import { fetchReviewSummary } from "@/components/GoogleReviewsBadge";
import { getMobileMassagePage, getSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

/**
 * Inhaltsbasis für /mobile-massage-wien: Sanity-Dokument (mobileMassagePage)
 * mit Defaults, dazu Settings, Google-Bewertungen und Bildpfade.
 */

export type Step = { title: string; description: string };
export type Included = { title: string; description: string };
export type Faq = { _key: string; question: string; answer: string };

export const IMAGES = {
  /** Portrait, Hochformat 1400×3035, Gesicht oben (object-position ≈ 50% 22%) */
  portrait: "/images/domenic-portrait.webp",
  /** Behandlungsraum mit Liege, 2000×2134, Liege unten (object-bottom) */
  room: "/images/behandlungsraum-liege.webp",
  /** Breakdance-Bühnenfoto 3000×2000, Tänzer mittig (object-position ≈ 50% 55%) */
  stage: "/images/breakdance.jpg",
  /** Behandlung, warmes Licht, 1600×1066 */
  treatment: "/images/behandlungsraum.webp",
  /** Praxis-Behandlung mit Pflanze, 2000×1333 */
  treatmentWide: "/images/domenic-1080.webp",
} as const;

export const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Heilmasseur+Domenic+Hacker+Wien";

const defaultIncluded: Included[] = [
  {
    title: "Professionelle Massageliege",
    description:
      "Stabil, gepolstert, mit Nackenstütze – klappbar, aber auf Praxisniveau.",
  },
  {
    title: "Hochwertige Öle",
    description:
      "Hautverträglich und dezent im Duft. Auf Wunsch neutral und unparfümiert.",
  },
  {
    title: "Frische Handtücher & Auflagen",
    description:
      "Für jeden Termin frisch gewaschen. Ihre eigenen Textilien bleiben im Schrank.",
  },
  {
    title: "Ruhe nach Ihrem Maß",
    description:
      "Leise Musik oder Stille, viel Gespräch oder gar keines – Sie geben den Ton vor.",
  },
];

const defaultOccasions = [
  "Nach langen Arbeitstagen",
  "Hotelaufenthalt in Wien",
  "Nach Fernflügen",
  "Eingeschränkte Mobilität",
  "Junge Eltern",
  "Als Geschenk",
];

const defaultProcessSteps: Step[] = [
  {
    title: "Anfrage & Termin",
    description:
      "Sie nennen mir Adresse, Wunschtermin und ob 60 oder 90 Minuten. Ich bestätige Termin und Preis verbindlich.",
  },
  {
    title: "Ankunft & Aufbau",
    description:
      "Ich komme pünktlich, Sie zeigen mir den Platz. Die Liege steht in wenigen Minuten – leise und ohne Umräumen.",
  },
  {
    title: "Die Behandlung",
    description:
      "Ein kurzes Gespräch über Beschwerden und Druck, danach 60 oder 90 Minuten konzentrierte Arbeit dort, wo Sie sie brauchen.",
  },
  {
    title: "Nachklingen lassen",
    description:
      "Nach der Behandlung baue ich die Liege ab und verabschiede mich. Sie müssen nirgendwohin – Sie bleiben, wo Sie sind, und lassen die Wirkung nachklingen.",
  },
];

const defaultVipPoints = [
  "Behandlung im Hotelzimmer, in der Suite oder backstage",
  "Absolute Diskretion",
  "Termine auch spätabends und am Wochenende",
  "Auf Wunsch Abrechnung über Rezeption oder Management",
];

const defaultFaqs: Faq[] = [
  {
    _key: "faq-1",
    question: "Was kostet eine mobile Massage in Wien?",
    answer:
      "Ein Hausbesuch startet bei 120 € für 60 Minuten. Für 90 Minuten kommt ein Aufpreis dazu – den nenne ich Ihnen bei der Anfrage. Die Anfahrt innerhalb Wiens ist enthalten; bei Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen, den ich Ihnen vor der Terminbestätigung nenne.",
  },
  {
    _key: "faq-7",
    question: "Zahlt die Krankenkasse eine mobile Massage?",
    answer:
      "Ein Hausbesuch wird als private Leistung abgerechnet und von den gesetzlichen Kassen nicht erstattet. Wenn Ihnen eine Rückerstattung wichtig ist, ist die Heilmassage mit ärztlicher Verordnung in der Praxis der passendere Weg – Details dazu auf der Preise-Seite.",
  },
  {
    _key: "faq-2",
    question: "Was muss ich für den Termin zuhause vorbereiten?",
    answer:
      "Nichts. Ich bringe Massageliege, Öle und frische Handtücher mit. Sie brauchen nur einen freien Platz von etwa zwei mal zwei Metern – Wohnzimmer, Schlafzimmer oder Büro funktionieren alle gleich gut.",
  },
  {
    _key: "faq-3",
    question: "Wie viel Platz braucht die Massageliege?",
    answer:
      "Die Liege ist rund 190 cm lang und 70 cm breit. Damit ich rundherum arbeiten kann, sind etwa zwei mal zwei Meter ideal. Wenn Sie unsicher sind, schicken Sie mir vorab ein Foto des Raums – dann klären wir das in einer Minute.",
  },
  {
    _key: "faq-4",
    question: "Kommen Sie auch ins Hotel?",
    answer:
      "Ja. Hotelzimmer und Suiten sind auf Anfrage möglich, ebenso Termine außerhalb der üblichen Zeiten. Bitte geben Sie bei der Anfrage Hotel, Zimmernummer und Ihren Wunschtermin an, damit ich mich an der Rezeption anmelden kann.",
  },
  {
    _key: "faq-5",
    question: "Welche Massage bekomme ich beim Hausbesuch?",
    answer:
      "Dieselbe Arbeit wie in der Praxis: klassische Massage, Heilmassage-Techniken und gezielte Behandlung von Verspannungen – abgestimmt auf das, was Ihr Körper an diesem Tag braucht. Nur Anwendungen mit Geräten sind zuhause nicht möglich.",
  },
  {
    _key: "faq-6",
    question: "Wie kurzfristig kann ich einen Hausbesuch buchen?",
    answer:
      "In den Innenbezirken geht oft noch etwas am selben oder am nächsten Tag. Für Wunschtermine am Abend oder am Wochenende melden Sie sich am besten ein paar Tage vorher.",
  },
];

export type PriceTier = { duration: string; amount?: number };

/**
 * Preise pflegt Domenic in Sanity (Feld „Preis — Dauer & Betrag“). Solange dort
 * nichts steht, gelten diese Werte. Betrag weglassen = „auf Anfrage“.
 */
const defaultPriceTiers: PriceTier[] = [
  { duration: "60 Minuten", amount: 120 },
  { duration: "90 Minuten" },
];

/** "60 Minuten", "90 Minuten" → "60 oder 90 Minuten" */
export function summarizeDurations(durations: string[]): string {
  if (durations.length === 0) return "";
  if (durations.length === 1) return durations[0];
  const stripped = durations.map((d, i) =>
    i === durations.length - 1 ? d : d.replace(/\s*Minuten$/, ""),
  );
  return `${stripped.slice(0, -1).join(", ")} oder ${stripped[stripped.length - 1]}`;
}

/** "Mobile Massage – nachhaltige …" → ["Mobile Massage –", "nachhaltige …"] */
export function splitHeading(heading: string): [string, string | null] {
  const idx = heading.indexOf(" – ");
  if (idx === -1) return [heading, null];
  return [heading.slice(0, idx + 2), heading.slice(idx + 3)];
}

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("de-AT", { maximumFractionDigits: 2 }).format(amount);

export async function getMobileMassageContent() {
  const [page, settings, reviews] = await Promise.all([
    getMobileMassagePage(),
    getSettings(),
    fetchReviewSummary(),
  ]);

  const phone = settings?.phone ?? "+43 670 189 52 56";
  const email = settings?.email ?? "praxis@heilmasseur-domenic.at";
  const priceTiers: PriceTier[] =
    page?.priceTiers && page.priceTiers.length > 0
      ? page.priceTiers
      : defaultPriceTiers;
  // Der „ab“-Preis ist der günstigste hinterlegte Betrag. Zeilen ohne Betrag
  // sind noch offen und erscheinen als „auf Anfrage“.
  const knownAmounts = priceTiers
    .map((t) => t.amount)
    .filter((a): a is number => typeof a === "number");
  const priceFrom = knownAmounts.length > 0 ? Math.min(...knownAmounts) : null;

  return {
    // Kontakt & Buchung
    phone,
    telHref: `tel:${phone.replace(/\s/g, "")}`,
    email,
    mailHref: `mailto:${email}?subject=${encodeURIComponent("Anfrage Hausbesuch")}`,
    practiceAddress: settings?.address ?? "Feldgasse 3/20, 1080 Wien",
    settings,
    reviews, // { rating, count, avatars[] }

    // Bilder
    heroImageSrc: page?.heroImage
      ? urlFor(page.heroImage).width(900).height(1125).url()
      : IMAGES.portrait,
    stageImageSrc: page?.socialProofImage
      ? urlFor(page.socialProofImage).width(900).height(1100).url()
      : IMAGES.stage,
    roomImageSrc: IMAGES.room,
    treatmentImageSrc: IMAGES.treatment,
    treatmentWideImageSrc: IMAGES.treatmentWide,

    // Hero
    heroBadge: page?.heroBadge ?? "Hausbesuch in ganz Wien",
    heroHeading:
      page?.heroHeading ??
      "Mobile Massage – nachhaltige Entspannung bei Ihnen zuhause",
    heroSubtitle:
      page?.heroSubtitle ??
      "Ich komme zu Ihnen – mit Liege, Ölen und Handtüchern. Sie kümmern sich um nichts außer Ihrer Entspannung. Therapeutische Massage auf Praxisniveau, in Ihren eigenen vier Wänden oder im Hotel.",
    heroServiceLine: page?.heroServiceLine ?? "Hotel & VIP-Service auf Anfrage",
    identityLine: "Diplomierter Heilmasseur · B-Boy · Wien",
    name: "Domenic Hacker",

    // Preis
    priceHeading: page?.priceHeading ?? "Klarer Preis. Sie wählen die Dauer.",
    priceDescription:
      page?.priceDescription ??
      "Ein Hausbesuch beginnt beim Preis für die kürzere Behandlung; für die längere kommt ein Aufpreis dazu. Was für Sie anfällt, steht hier – und ich bestätige es in meiner Antwort, bevor der Termin fix ist.",
    priceTiers,
    priceFrom,
    durationSummary: summarizeDurations(priceTiers.map((t) => t.duration)),
    priceNote:
      page?.priceNote ??
      "Für Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen. Den nenne ich Ihnen immer vorab, bevor der Termin fix ist.",
    included:
      page?.included && page.included.length > 0 ? page.included : defaultIncluded,
    includedExtra: {
      title: "Anfahrt, Auf- und Abbau",
      description: "Innerhalb Wiens im Preis enthalten.",
    },
    pullQuote: { lead: "Ihre einzige Aufgabe:", accent: "liegen bleiben." },
    roomCaption:
      "Mein Behandlungsraum in der Josefstadt. Zum Hausbesuch kommt eine mobile Liege mit – in wenigen Minuten aufgebaut.",

    // Für wen / wo
    forWhomHeading: page?.forWhomHeading ?? "Wann zuhause die bessere Wahl ist",
    forWhomDescription:
      page?.forWhomDescription ??
      "Oft ist der Weg zur Praxis der Grund, warum ein Termin nicht zustande kommt. Wer danach nicht mehr in die U-Bahn steigen muss, entspannt tiefer – und bleibt länger entspannt.",
    occasions:
      page?.occasions && page.occasions.length > 0
        ? page.occasions
        : defaultOccasions,
    areaHeading: page?.areaHeading ?? "In ganz Wien",
    areaDescription:
      page?.areaDescription ??
      "Ausgangspunkt ist meine Praxis in der Josefstadt. In den Innenbezirken bin ich oft noch am selben oder nächsten Tag bei Ihnen; alle übrigen Bezirke – von Floridsdorf über Donaustadt bis Liesing – nach Vereinbarung.",
    // Standardmäßig leer: „In ganz Wien“ sagt bereits alles, eine vollständige
    // Bezirksliste trägt keine Information. Trägt Domenic in Sanity Bezirke
    // ein, erscheinen sie als Chips – dann ist die Liste eine echte Eingrenzung.
    areaDistricts: page?.areaDistricts ?? [],

    // Ablauf
    processHeading: page?.processHeading ?? "So läuft ein Hausbesuch ab",
    processDescription:
      page?.processDescription ??
      "Diskret, pünktlich und ohne Aufwand für Sie – vom Klingeln bis zum Abbau.",
    processSteps:
      page?.processSteps && page.processSteps.length > 0
        ? page.processSteps
        : defaultProcessSteps,

    // Bühne / B-Boy
    stageHeading:
      page?.socialProofHeading ??
      "Therapeutisch fundiert, geprägt von der Bühne",
    stageText:
      page?.socialProofText ??
      "Seit meiner Jugend stehe ich als B-Boy auf der Bühne. Wer so trainiert, lernt früh, wie ein Körper unter Belastung funktioniert – und was er braucht, um sich wieder zu lösen. Diese Erfahrung fließt in jeden Handgriff: präzise, rhythmisch und mit Gefühl für den richtigen Druck zur richtigen Zeit.",
    stageCaption:
      page?.socialProofCaption ?? "Domenic Hacker als B-Boy auf der Bühne.",

    // Hotel & VIP
    vipHeading: page?.vipHeading ?? "Hotel, Suite, Backstage",
    vipText:
      page?.vipText ??
      "Für Gäste in Wiener Hotels, für Künstlerinnen und Künstler auf Tour und für alle, die einen diskreten Termin brauchen: Auf Anfrage behandle ich auch im Hotelzimmer, in der Suite oder backstage – auch spät nach der Show.",
    vipPoints:
      page?.vipPoints && page.vipPoints.length > 0
        ? page.vipPoints
        : defaultVipPoints,

    // FAQ & CTA
    faqs: page?.faqs && page.faqs.length > 0 ? page.faqs : defaultFaqs,
    faqHeading: "Häufige Fragen zur mobilen Massage",
    faqIntro:
      "Antworten auf die Fragen, die mir vor einem Hausbesuch am häufigsten gestellt werden.",
    ctaHeading: page?.ctaHeading ?? "Entspannung kommt zu Ihnen",
    ctaText:
      page?.ctaText ??
      "Nennen Sie mir Adresse und Wunschzeit – den Rest übernehme ich. Schreiben Sie mir oder rufen Sie an.",
    ctaPrimaryLabel: "Hausbesuch anfragen",
  };
}

export type MobileMassageContent = Awaited<
  ReturnType<typeof getMobileMassageContent>
>;
