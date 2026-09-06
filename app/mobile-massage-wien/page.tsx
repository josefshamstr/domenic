import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ConciergeBell,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { JsonLdService } from "@/components/JsonLdService";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { fetchReviewSummary } from "@/components/GoogleReviewsBadge";
import { getMobileMassagePage, getSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const CANONICAL = "https://heilmasseur-domenic.at/mobile-massage-wien";
const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Heilmasseur+Domenic+Hacker+Wien";

export const metadata: Metadata = {
  title:
    "Mobile Massage Wien · Massage zu Hause & Hausbesuch | Heilmasseur Domenic Hacker",
  description:
    "Mobile Massage in Wien: Hausbesuch mit eigener Massageliege, Ölen und Handtüchern. 120 € Fixpreis für 60 oder 90 Minuten. Hotel & VIP-Service auf Anfrage.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Mobile Massage Wien · Massage zu Hause bei Ihnen",
    description:
      "Hausbesuch in ganz Wien – Massageliege, Öle und Handtücher bringe ich mit. 120 € Fixpreis für 60 oder 90 Minuten.",
    url: CANONICAL,
    locale: "de_AT",
    type: "website",
    images: [
      {
        url: "https://heilmasseur-domenic.at/images/behandlungsraum-liege.webp",
        width: 2000,
        height: 2134,
        alt: "Massageliege von Heilmasseur Domenic Hacker",
      },
    ],
  },
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] focus-visible:ring-offset-2";

const PRIMARY_BTN = `inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03] ${FOCUS_RING}`;
const GHOST_BTN_DARK = `inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 ${FOCUS_RING} focus-visible:ring-offset-[#0d4f4f]`;

const defaultIncluded = [
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
  "Vor wichtigen Terminen",
  "Als fixer Termin im Kalender",
  "Als Geschenk",
];

const defaultProcessSteps = [
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

const defaultAreaDistricts = [
  "1010 Innere Stadt",
  "1030 Landstraße",
  "1040 Wieden",
  "1060 Mariahilf",
  "1070 Neubau",
  "1080 Josefstadt",
  "1090 Alsergrund",
  "1130 Hietzing",
  "1180 Währing",
  "1190 Döbling",
];

const defaultFaqs = [
  {
    _key: "default-mobile-faq-1",
    question: "Was kostet eine mobile Massage in Wien?",
    answer:
      "Ein Hausbesuch kostet 120 € als Fixpreis – für 60 genauso wie für 90 Minuten. Die Anfahrt innerhalb Wiens ist enthalten. Bei Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen, den ich Ihnen vor der Terminbestätigung nenne.",
  },
  {
    _key: "default-mobile-faq-7",
    question: "Zahlt die Krankenkasse eine mobile Massage?",
    answer:
      "Ein Hausbesuch wird als private Leistung abgerechnet und von den gesetzlichen Kassen nicht erstattet. Wenn Ihnen eine Rückerstattung wichtig ist, ist die Heilmassage mit ärztlicher Verordnung in der Praxis der passendere Weg – Details dazu auf der Preise-Seite.",
  },
  {
    _key: "default-mobile-faq-2",
    question: "Was muss ich für den Termin zuhause vorbereiten?",
    answer:
      "Nichts. Ich bringe Massageliege, Öle und frische Handtücher mit. Sie brauchen nur einen freien Platz von etwa zwei mal zwei Metern – Wohnzimmer, Schlafzimmer oder Büro funktionieren alle gleich gut.",
  },
  {
    _key: "default-mobile-faq-3",
    question: "Wie viel Platz braucht die Massageliege?",
    answer:
      "Die Liege ist rund 190 cm lang und 70 cm breit. Damit ich rundherum arbeiten kann, sind etwa zwei mal zwei Meter ideal. Wenn Sie unsicher sind, schicken Sie mir vorab ein Foto des Raums – dann klären wir das in einer Minute.",
  },
  {
    _key: "default-mobile-faq-4",
    question: "Kommen Sie auch ins Hotel?",
    answer:
      "Ja. Hotelzimmer und Suiten sind auf Anfrage möglich, ebenso Termine außerhalb der üblichen Zeiten. Bitte geben Sie bei der Anfrage Hotel, Zimmernummer und Ihren Wunschtermin an, damit ich mich an der Rezeption anmelden kann.",
  },
  {
    _key: "default-mobile-faq-5",
    question: "Welche Massage bekomme ich beim Hausbesuch?",
    answer:
      "Dieselbe Arbeit wie in der Praxis: klassische Massage, Heilmassage-Techniken und gezielte Behandlung von Verspannungen – abgestimmt auf das, was Ihr Körper an diesem Tag braucht. Nur Anwendungen mit Geräten sind zuhause nicht möglich.",
  },
  {
    _key: "default-mobile-faq-6",
    question: "Wie kurzfristig kann ich einen Hausbesuch buchen?",
    answer:
      "In den Innenbezirken geht oft noch etwas am selben oder am nächsten Tag. Für Wunschtermine am Abend oder am Wochenende melden Sie sich am besten ein paar Tage vorher.",
  },
];

/** "60 Minuten", "90 Minuten" → "60 oder 90 Minuten"; drei Werte → "60, 90 oder 120 Minuten". */
function summarizeDurations(durations: string[]): string {
  if (durations.length === 0) return "";
  if (durations.length === 1) return durations[0];
  const stripped = durations.map((d, i) =>
    i === durations.length - 1 ? d : d.replace(/\s*Minuten$/, ""),
  );
  const head = stripped.slice(0, -1).join(", ");
  return `${head} oder ${stripped[stripped.length - 1]}`;
}

/** Splits "Mobile Massage – nachhaltige …" into a controlled two-part heading. */
function splitHeading(heading: string): [string, string | null] {
  const idx = heading.indexOf(" – ");
  if (idx === -1) return [heading, null];
  return [heading.slice(0, idx + 2), heading.slice(idx + 3)];
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("de-AT", { maximumFractionDigits: 2 }).format(amount);

export default async function MobileMassageWien() {
  const [page, settings, reviewSummary] = await Promise.all([
    getMobileMassagePage(),
    getSettings(),
    fetchReviewSummary(),
  ]);

  // Hero-Portrait aus dem Bildpool (Sanity-Asset "domenic portrait.jpg", lokal
  // optimiert). Über Sanity (heroImage) jederzeit austauschbar.
  const heroImageSrc = page?.heroImage
    ? urlFor(page.heroImage).width(900).height(1125).url()
    : "/images/domenic-portrait.webp";

  // Slot für das KC-Rebell-Foto (Sanity: socialProofImage + socialProofCaption).
  // Bis dahin das Bühnenfoto, eng beschnitten.
  const stageImageSrc = page?.socialProofImage
    ? urlFor(page.socialProofImage).width(900).height(1100).url()
    : "/images/breakdance.jpg";

  const heroBadge = page?.heroBadge ?? "Hausbesuch in ganz Wien";
  const [headingLead, headingRest] = splitHeading(
    page?.heroHeading ??
      "Mobile Massage – nachhaltige Entspannung bei Ihnen zuhause",
  );
  const heroSubtitle =
    page?.heroSubtitle ??
    "Ich komme zu Ihnen – mit Liege, Ölen und Handtüchern. Sie kümmern sich um nichts außer Ihrer Entspannung. Therapeutische Massage auf Praxisniveau, in Ihren eigenen vier Wänden oder im Hotel.";
  // Auf schmalen Screens nur die ersten zwei Sätze, damit Preis und CTA
  // im ersten Viewport bleiben; ab sm der ganze Text.
  const subtitleSentences = heroSubtitle.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [
    heroSubtitle,
  ];
  const subtitleLead = subtitleSentences.slice(0, 2).join("").trim();
  const subtitleRest = subtitleSentences.slice(2).join("").trim() || null;

  const heroServiceLine =
    page?.heroServiceLine ?? "Hotel & VIP-Service auf Anfrage";

  const bookingHref = page?.bookingUrl ?? "/buchen";

  const priceHeading =
    page?.priceHeading ?? "Ein Fixpreis. Sie wählen die Zeit.";
  const priceDescription =
    page?.priceDescription ??
    "Keine Staffelung, keine Zuschläge für die längere Behandlung: Ein Hausbesuch kostet 120 € – ob Sie 60 oder 90 Minuten möchten, entscheiden Sie.";
  const priceAmount = page?.priceAmount ?? 120;
  const priceDurations =
    page?.priceDurations && page.priceDurations.length > 0
      ? page.priceDurations
      : ["60 Minuten", "90 Minuten"];
  const priceNote =
    page?.priceNote ??
    "Für Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen. Den nenne ich Ihnen immer vorab, bevor der Termin fix ist.";
  const durationSummary = summarizeDurations(priceDurations);

  const includedHeading = page?.includedHeading ?? "Ich bringe alles mit";
  const includedDescription =
    page?.includedDescription ??
    "Nichts besorgen, nichts umräumen, nichts vorbereiten. Ein freier Platz von etwa zwei mal zwei Metern genügt – der Rest kommt mit mir.";
  const included =
    page?.included && page.included.length > 0
      ? page.included
      : defaultIncluded;

  const forWhomHeading =
    page?.forWhomHeading ?? "Wann zuhause die bessere Wahl ist";
  const forWhomDescription =
    page?.forWhomDescription ??
    "Oft ist der Weg zur Praxis der Grund, warum ein Termin nicht zustande kommt. Wer danach nicht mehr in die U-Bahn steigen muss, entspannt tiefer – und bleibt länger entspannt.";
  const occasions =
    page?.occasions && page.occasions.length > 0
      ? page.occasions
      : defaultOccasions;

  const processHeading = page?.processHeading ?? "So läuft ein Hausbesuch ab";
  const processDescription =
    page?.processDescription ??
    "Diskret, pünktlich und ohne Aufwand für Sie – vom Klingeln bis zum Abbau.";
  const processSteps =
    page?.processSteps && page.processSteps.length > 0
      ? page.processSteps
      : defaultProcessSteps;

  const vipHeading = page?.vipHeading ?? "Hotel, Suite, Backstage";
  const vipText =
    page?.vipText ??
    "Für Gäste in Wiener Hotels, für Künstlerinnen und Künstler auf Tour und für alle, die einen diskreten Termin brauchen: Auf Anfrage behandle ich auch im Hotelzimmer, in der Suite oder backstage – auch spät nach der Show.";
  const vipPoints =
    page?.vipPoints && page.vipPoints.length > 0
      ? page.vipPoints
      : defaultVipPoints;

  const stageHeading =
    page?.socialProofHeading ?? "Therapeutisch fundiert, geprägt von der Bühne";
  const stageText =
    page?.socialProofText ??
    "Seit meiner Jugend stehe ich als B-Boy auf der Bühne. Wer so trainiert, lernt früh, wie ein Körper unter Belastung funktioniert – und was er braucht, um sich wieder zu lösen. Diese Erfahrung fließt in jeden Handgriff: präzise, rhythmisch und mit Gefühl für den richtigen Druck zur richtigen Zeit.";
  const stageCaption =
    page?.socialProofCaption ?? "Domenic Hacker als B-Boy auf der Bühne.";

  const areaHeading = page?.areaHeading ?? "In ganz Wien";
  const areaDescription =
    page?.areaDescription ??
    "Ausgangspunkt ist meine Praxis in der Josefstadt. In den Innenbezirken bin ich oft noch am selben oder nächsten Tag bei Ihnen, alle weiteren Bezirke nach Vereinbarung.";
  const areaDistricts =
    page?.areaDistricts && page.areaDistricts.length > 0
      ? page.areaDistricts
      : defaultAreaDistricts;

  const faqs = page?.faqs && page.faqs.length > 0 ? page.faqs : defaultFaqs;

  const ctaHeading = page?.ctaHeading ?? "Entspannung kommt zu Ihnen";
  const ctaText =
    page?.ctaText ??
    "Nennen Sie mir Adresse und Wunschzeit – den Rest übernehme ich. Online anfragen, anrufen oder schreiben.";

  const phone = settings?.phone ?? "+43 670 189 52 56";
  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  const email = settings?.email ?? "praxis@heilmasseur-domenic.at";
  const mailHref = `mailto:${email}?subject=${encodeURIComponent("Anfrage Hausbesuch")}`;
  const practiceAddress = settings?.address ?? "Feldgasse 3/20, 1080 Wien";

  const rise = (delay: string) =>
    `motion-safe:animate-[mm-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both] ${delay}`;

  return (
    <>
      <JsonLdService variant="mobilemassage" />
      <FaqJsonLd faqs={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      <main className="selection:bg-[#f2a93b]/40 selection:text-[#111]">
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0d4f4f]">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#e8654a] via-[#f2a93b] to-[#0d4f4f]" />
          <div className="pointer-events-none absolute -top-56 -right-56 h-[640px] w-[640px] rounded-full bg-[#f2a93b]/8" />

          <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24">
            <div className="grid items-center lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div>
                <div
                  className={`mb-7 flex items-center gap-4 lg:hidden ${rise("[animation-delay:0ms]")}`}
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-[#f2a93b]/60">
                    <Image
                      src={heroImageSrc}
                      alt="Domenic Hacker, diplomierter Heilmasseur in Wien"
                      fill
                      className="object-cover object-[50%_22%]"
                      priority
                      quality={85}
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <span className="block text-base font-bold text-white">
                      Domenic Hacker
                    </span>
                    <span className="block text-sm text-white/75">
                      Diplomierter Heilmasseur · B-Boy · Wien
                    </span>
                  </div>
                </div>

                <p
                  className={`flex flex-col gap-y-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/70 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 lg:flex-col lg:items-start xl:flex-row xl:items-center ${rise("[animation-delay:0ms]")}`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} strokeWidth={2.5} aria-hidden={true} />
                    {heroBadge}
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-1 w-1 rounded-full bg-[#f2a93b] sm:block lg:hidden xl:block"
                  />
                  <span className="inline-flex items-center gap-1.5 text-[#f2a93b]">
                    <ConciergeBell
                      size={13}
                      strokeWidth={2.5}
                      aria-hidden={true}
                    />
                    {heroServiceLine}
                  </span>
                </p>

                <h1
                  className={`mt-6 text-[clamp(2.4rem,5vw,3.9rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white ${rise("[animation-delay:80ms]")}`}
                >
                  {headingRest ? (
                    <>
                      <span className="block">{headingLead}</span>
                      <span className="block text-balance">{headingRest}</span>
                    </>
                  ) : (
                    <span className="text-balance">{headingLead}</span>
                  )}
                </h1>
                <p
                  className={`mt-6 max-w-xl text-lg leading-relaxed text-white/75 ${rise("[animation-delay:160ms]")}`}
                >
                  {subtitleLead}
                  {subtitleRest && (
                    <span className="hidden sm:inline"> {subtitleRest}</span>
                  )}
                </p>

                <div
                  className={`mt-9 flex flex-wrap items-end gap-x-5 gap-y-3 border-l-2 border-[#f2a93b] pl-5 ${rise("[animation-delay:240ms]")}`}
                >
                  <span className="text-5xl font-extrabold leading-none tracking-tight text-white">
                    {formatPrice(priceAmount)}
                    <span className="ml-1 text-2xl font-bold text-[#f2a93b]">
                      €
                    </span>
                  </span>
                  <span className="pb-0.5 text-sm leading-snug text-white/75">
                    <span className="block font-semibold text-white">
                      Fixpreis für {durationSummary}
                    </span>
                    Anfahrt innerhalb Wiens inklusive
                  </span>
                </div>

                <div
                  id="hero-cta"
                  className={`mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4 ${rise("[animation-delay:320ms]")}`}
                >
                  <Link
                    href={bookingHref}
                    className={`${PRIMARY_BTN} lg:px-6 xl:px-8 focus-visible:ring-offset-[#0d4f4f]`}
                  >
                    <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                    Hausbesuch anfragen
                  </Link>
                  <a
                    href={telHref}
                    className={`${GHOST_BTN_DARK} lg:px-6 xl:px-8`}
                  >
                    <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                    {phone}
                  </a>
                </div>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 flex w-fit flex-nowrap items-center gap-x-2.5 rounded-lg transition-opacity duration-300 hover:opacity-80 sm:gap-x-3 ${FOCUS_RING} focus-visible:ring-offset-[#0d4f4f] ${rise("[animation-delay:400ms]")}`}
                >
                  <span className="flex -space-x-2">
                    {reviewSummary.avatars.slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-[#0d4f4f] bg-white/20 text-xs font-bold text-white"
                      >
                        {a.name.charAt(0).toUpperCase()}
                        {a.photoUri && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.photoUri}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </span>
                    ))}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-[#f2a93b] text-[#f2a93b]"
                          aria-hidden={true}
                        />
                      ))}
                    </span>
                    <span className="text-sm font-bold leading-none text-white">
                      {reviewSummary.rating.toFixed(1)}
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-xs text-white/75 sm:text-sm">
                    {reviewSummary.count}{" "}
                    <span className="sm:hidden">Bewertungen</span>
                    <span className="hidden sm:inline">Google-Bewertungen</span>
                  </span>
                </a>
              </div>

              <div
                className={`relative hidden lg:block ${rise("[animation-delay:200ms]")}`}
              >
                <figure className="relative ml-auto max-w-md">
                  <div className="pointer-events-none absolute -top-4 -right-4 h-full w-full rotate-1 rounded-3xl bg-[#f2a93b]/15 lg:-right-3 xl:-right-4" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:aspect-[3/4]">
                    <Image
                      src={heroImageSrc}
                      alt="Domenic Hacker, diplomierter Heilmasseur in Wien"
                      fill
                      className="object-cover object-[50%_22%]"
                      priority
                      fetchPriority="high"
                      quality={85}
                      sizes="(max-width: 1024px) 1px, 448px"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0d4f4f]/70 to-transparent"
                    />
                  </div>
                  <figcaption className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="block text-base font-bold">
                      Domenic Hacker
                    </span>
                    <span className="block text-sm text-white/80">
                      Diplomierter Heilmasseur · B-Boy · Wien
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ── PREIS & AUSSTATTUNG ──────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
                {priceHeading}
              </h2>
              <p className="mt-5 leading-relaxed text-[#555]">
                {priceDescription}
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <figure className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/behandlungsraum-liege.webp"
                    alt="Die Massageliege von Domenic Hacker im Behandlungsraum"
                    fill
                    className="scale-110 object-cover object-bottom [transform-origin:50%_100%]"
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                </div>
                <figcaption className="mt-4 text-sm leading-relaxed text-[#555]">
                  Mein Behandlungsraum in der Josefstadt. Zum Hausbesuch kommt
                  eine mobile Liege mit – in wenigen Minuten aufgebaut.
                </figcaption>
              </figure>

              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-[#0d4f4f]">
                  {includedHeading}
                </h3>
                <p className="mt-3 max-w-lg leading-relaxed text-[#555]">
                  {includedDescription}
                </p>

                <ul className="mt-8 divide-y divide-[#0d4f4f]/10 border-y border-[#0d4f4f]/10">
                  {included.map((item) => (
                    <li key={item.title} className="flex gap-4 py-5">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b]">
                        <Check
                          size={11}
                          strokeWidth={3}
                          className="text-white"
                          aria-hidden={true}
                        />
                      </span>
                      <div>
                        <p className="font-bold text-[#111]">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#555]">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                  <li className="flex gap-4 py-5">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b]">
                      <Check
                        size={11}
                        strokeWidth={3}
                        className="text-white"
                        aria-hidden={true}
                      />
                    </span>
                    <div>
                      <p className="font-bold text-[#111]">
                        Anfahrt, Auf- und Abbau
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#555]">
                        Innerhalb Wiens im Preis enthalten. {priceNote}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── PULL-QUOTE ───────────────────────────────────────────── */}
        <section className="border-y border-[#0d4f4f]/10 bg-white py-14 sm:py-20">
          <p className="mx-auto max-w-6xl px-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0d4f4f] sm:px-8 sm:text-5xl lg:text-6xl">
            Ihre einzige Aufgabe:{" "}
            <span className="text-[#e8654a]">liegen bleiben.</span>
          </p>
        </section>

        {/* ── ABLAUF ───────────────────────────────────────────────── */}
        <section id="ablauf" className="bg-[#f0f7f7] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
                  {processHeading}
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-[#555]">
                  {processDescription}
                </p>
              </div>
              <ProcessTimeline steps={processSteps} />
            </div>
          </div>
        </section>

        {/* ── HOTEL, SUITE, BACKSTAGE ──────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0d4f4f] py-20 sm:py-28">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#e8654a] via-[#f2a93b] to-[#0d4f4f]" />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                  {stageHeading}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
                  {stageText}
                </p>

                <h3 className="mt-12 text-2xl font-extrabold tracking-tight text-[#f2a93b]">
                  {vipHeading}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-white/75">
                  {vipText}
                </p>

                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {vipPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3.5 py-3.5">
                      <Check
                        size={16}
                        strokeWidth={3}
                        className="mt-1 shrink-0 text-[#f2a93b]"
                        aria-hidden={true}
                      />
                      <span className="font-semibold leading-snug text-white/90">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a
                    href={telHref}
                    className={`${PRIMARY_BTN} focus-visible:ring-offset-[#0d4f4f]`}
                  >
                    <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                    Diskret anrufen
                  </a>
                  <a href={mailHref} className={GHOST_BTN_DARK}>
                    <Mail size={16} strokeWidth={2.5} aria-hidden={true} />
                    Per E-Mail anfragen
                  </a>
                </div>
              </div>

              <figure className="order-first mx-auto w-full max-w-md lg:order-none lg:mx-0 lg:ml-auto">
                <div className="relative">
                  <div className="pointer-events-none absolute -top-4 -right-4 h-full w-full rotate-2 rounded-3xl bg-[#f2a93b]/15" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                    <Image
                      src={stageImageSrc}
                      alt="Domenic Hacker als B-Boy auf der Bühne"
                      fill
                      className="object-cover object-[50%_55%]"
                      quality={75}
                      sizes="(max-width: 1024px) 100vw, 448px"
                    />
                  </div>
                </div>
                <figcaption className="mt-4 text-sm leading-relaxed text-white/70">
                  {stageCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── FÜR WEN & WO ─────────────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl lg:min-h-[2lh]">
                  {forWhomHeading}
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-[#555]">
                  {forWhomDescription}
                </p>
                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] font-medium text-[#111] sm:text-base">
                  {occasions.map((label) => (
                    <li key={label} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8654a]"
                      />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl lg:min-h-[2lh]">
                  {areaHeading}
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-[#555]">
                  {areaDescription}
                </p>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#555]">
                  <span className="font-semibold text-[#0d4f4f]">
                    Zum Beispiel:{" "}
                  </span>
                  {areaDistricts.join(" · ")}
                </p>
                <p className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-[#555]">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#0d4f4f]"
                    aria-hidden={true}
                  />
                  <span>
                    Lieber in die Praxis? Die Behandlungsräume liegen in der{" "}
                    {practiceAddress} (Josefstadt) – dort gibt es zusätzlich
                    Anwendungen, die zuhause nicht möglich sind.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="bg-[#f0f7f7] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
                  Häufige Fragen zur mobilen Massage
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-[#555]">
                  Antworten auf die Fragen, die mir vor einem Hausbesuch am
                  häufigsten gestellt werden.
                </p>
              </div>
              <div className="divide-y divide-[#0d4f4f]/10 border-y border-[#0d4f4f]/10">
                {faqs.map((faq) => (
                  <details key={faq._key} className="group">
                    <summary
                      className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 text-base font-semibold text-[#111] transition-colors hover:text-[#0d4f4f] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}
                    >
                      {faq.question}
                      <ChevronDown
                        size={20}
                        className="shrink-0 text-[#0d4f4f] transition-transform duration-200 group-open:rotate-180"
                        aria-hidden={true}
                      />
                    </summary>
                    <p className="pb-6 text-base leading-relaxed text-[#555]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section
          id="final-cta"
          className="relative overflow-hidden bg-[#0d4f4f] py-20 sm:py-28"
        >
          <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {ctaHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-white/75">
              {ctaText}
            </p>
            <p className="mt-6 text-sm font-semibold tracking-wide text-[#f2a93b]">
              {formatPrice(priceAmount)} € · {durationSummary} · ganz Wien
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={bookingHref}
                className={`${PRIMARY_BTN} focus-visible:ring-offset-[#0d4f4f]`}
              >
                <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                Hausbesuch anfragen
              </Link>
              <a href={telHref} className={GHOST_BTN_DARK}>
                <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                {phone}
              </a>
            </div>
            <a
              href={mailHref}
              className={`mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline ${FOCUS_RING} focus-visible:ring-offset-[#0d4f4f]`}
            >
              <Mail size={14} strokeWidth={2.5} aria-hidden={true} />
              {email}
            </a>
          </div>
        </section>

        {/* ── QUERVERWEISE ─────────────────────────────────────────── */}
        <section className="bg-[#f0f7f7] py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              <li>
                <Link
                  href="/heilmassage-wien-1080"
                  className={`group flex items-center justify-between gap-6 rounded-3xl border border-[#0d4f4f]/10 bg-white px-6 py-5 transition-colors duration-200 hover:border-[#0d4f4f]/30 ${FOCUS_RING}`}
                >
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/75">
                      In der Praxis
                    </span>
                    <span className="mt-1 block font-extrabold text-[#111]">
                      Heilmassage in Wien 1080
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className="shrink-0 text-[#0d4f4f] transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden={true}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/preise"
                  className={`group flex items-center justify-between gap-6 rounded-3xl border border-[#0d4f4f]/10 bg-white px-6 py-5 transition-colors duration-200 hover:border-[#0d4f4f]/30 ${FOCUS_RING}`}
                >
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/75">
                      Alle Behandlungen
                    </span>
                    <span className="mt-1 block font-extrabold text-[#111]">
                      Preise & Block-Karten
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className="shrink-0 text-[#0d4f4f] transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden={true}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <MobileStickyCta
        href={bookingHref}
        telHref={telHref}
        label="Hausbesuch anfragen"
        watchIds={["hero-cta", "final-cta", "site-footer"]}
      />
      <div id="site-footer">
        <Footer sanitySettings={settings} />
      </div>
    </>
  );
}
