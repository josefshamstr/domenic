import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Calendar,
  Check,
  ChevronDown,
  Droplets,
  MapPin,
  Phone,
  Sparkles,
  Waves,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { JsonLdService } from "@/components/JsonLdService";
import { getMobileMassagePage, getSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const CANONICAL = "https://heilmasseur-domenic.at/mobile-massage-wien";

export const metadata: Metadata = {
  title:
    "Mobile Massage Wien · Massage zu Hause & Hausbesuch | Heilmasseur Domenic Hacker",
  description:
    "Mobile Massage in Wien: Hausbesuch mit eigener Massageliege, Ölen und Handtüchern. 120 € Fixpreis für 60 oder 90 Minuten. Hotel & VIP Service auf Anfrage.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Mobile Massage Wien · Massage zu Hause bei Ihnen",
    description:
      "Hausbesuch in ganz Wien – Massageliege, Öle und Handtücher bringe ich mit. 120 € Fixpreis für 60 oder 90 Minuten.",
    url: CANONICAL,
    locale: "de_AT",
    type: "website",
  },
};

const INCLUDED_ICONS = [BedDouble, Droplets, Waves, Sparkles];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] focus-visible:ring-offset-2";

const defaultIncluded = [
  {
    title: "Professionelle Massageliege",
    description:
      "Stabil, gepolstert, mit Nackenstütze – dieselbe Liege wie in der Praxis, in wenigen Minuten aufgebaut.",
  },
  {
    title: "Hochwertige Öle",
    description:
      "Hautverträglich und dezent im Duft. Auf Wunsch neutral und unparfümiert, wenn Sie empfindlich reagieren.",
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

const defaultPriceIncludes = [
  "Anfahrt innerhalb Wiens",
  "Massageliege, Öle und Handtücher",
  "Kurzes Vorgespräch zu Beschwerden und Intensität",
  "Auf- und Abbau in Ihren Räumen",
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
      "Ein kurzes Gespräch über Beschwerden und Druck, danach 60 oder 90 Minuten konzentrierte Arbeit an Ihrem Körper.",
  },
  {
    title: "Nachklingen lassen",
    description:
      "Ich packe zusammen und verabschiede mich leise. Sie bleiben liegen, trinken einen Tee oder schlafen einfach weiter.",
  },
];

const defaultVipPoints = [
  "Behandlung im Hotelzimmer oder in der Suite",
  "Absolute Diskretion",
  "Termine auch abends und am Wochenende",
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
  "Alle weiteren Bezirke auf Anfrage",
];

const defaultFaqs = [
  {
    _key: "default-mobile-faq-1",
    question: "Was kostet eine mobile Massage in Wien?",
    answer:
      "Ein Hausbesuch kostet 120 € als Fixpreis – für 60 genauso wie für 90 Minuten. Die Anfahrt innerhalb Wiens ist enthalten. Bei Adressen weiter außerhalb kann ein Anfahrtsaufschlag dazukommen, den ich Ihnen vor der Terminbestätigung nenne.",
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
  {
    _key: "default-mobile-faq-7",
    question: "Zahlt die Krankenkasse eine mobile Massage?",
    answer:
      "Ein Hausbesuch wird als private Leistung abgerechnet und von den gesetzlichen Kassen nicht erstattet. Wenn Ihnen eine Rückerstattung wichtig ist, ist die Heilmassage mit ärztlicher Verordnung in der Praxis der passendere Weg – Details dazu auf der Preise-Seite.",
  },
];

export default async function MobileMassageWien() {
  const [page, settings] = await Promise.all([
    getMobileMassagePage(),
    getSettings(),
  ]);

  // Platzhalter aus dem bestehenden Bildpool. TODO(assets): sobald das
  // KC-Rebell-/Hyatt-Shooting da ist, kommt das Hero-Motiv über Sanity rein.
  const heroImageSrc = page?.heroImage
    ? urlFor(page.heroImage).width(900).height(1125).url()
    : "/images/behandlungsraum.webp";

  // Platzhalter für den Social-Proof-Slot: aktuell das Breakdance-Bühnenfoto von
  // /ueber-mich. TODO(assets): wird durch das KC-Rebell-Foto ersetzt,
  // Bildunterschrift dann über Sanity (socialProofCaption) nachziehen.
  const socialProofImageSrc = page?.socialProofImage
    ? urlFor(page.socialProofImage).width(900).height(1100).url()
    : "/images/breakdance.jpg";

  const heroBadge = page?.heroBadge ?? "Hausbesuch in ganz Wien";
  // Geschütztes Leerzeichen vor dem Gedankenstrich, damit der Strich nie
  // allein an den Zeilenanfang rutscht ("Mobile Massage / – nachhaltige …").
  const heroHeading = (
    page?.heroHeading ??
    "Mobile Massage – nachhaltige Entspannung bei Ihnen zuhause"
  ).replace(/\s–\s/g, " – ");
  const heroSubtitle =
    page?.heroSubtitle ??
    "Ich komme zu Ihnen – mit Liege, Ölen und Handtüchern. Sie kümmern sich um nichts außer Ihrer Entspannung. Therapeutische Massage auf Praxisniveau, in Ihren eigenen vier Wänden oder im Hotel.";
  const heroServiceLine =
    page?.heroServiceLine ?? "Hotel & VIP Service auf Anfrage";

  const priceHeading = page?.priceHeading ?? "Ein Fixpreis. Sie wählen die Zeit.";
  const priceDescription =
    page?.priceDescription ??
    "Keine Staffelung, keine Zuschläge für die längere Behandlung: Ein Hausbesuch kostet 120 € – ob Sie 60 oder 90 Minuten möchten, entscheiden Sie. Die Anfahrt innerhalb Wiens ist enthalten.";
  const priceAmount = page?.priceAmount ?? 120;
  const priceDurations =
    page?.priceDurations && page.priceDurations.length > 0
      ? page.priceDurations
      : ["60 Minuten", "90 Minuten"];
  const priceNote =
    page?.priceNote ??
    "Für Adressen außerhalb Wiens oder am Stadtrand kann ein Anfahrtsaufschlag dazukommen. Den nenne ich Ihnen immer vorab, bevor der Termin fix ist.";
  // "60 Minuten" + "90 Minuten" soll als "60 oder 90 Minuten" laufen, nicht als
  // "60 Minuten oder 90 Minuten". Bei abweichenden Sanity-Werten bleibt der
  // vollständige Text erhalten.
  const durationSummary = priceDurations
    .map((duration, i) =>
      i === priceDurations.length - 1
        ? duration
        : duration.replace(/\s*Minuten$/, ""),
    )
    .join(" oder ");

  const includedHeading = page?.includedHeading ?? "Ich bringe alles mit";
  const includedDescription =
    page?.includedDescription ??
    "Nichts besorgen, nichts umräumen, nichts vorbereiten. Ein freier Platz von etwa zwei mal zwei Metern genügt – der Rest kommt mit mir.";
  const included =
    page?.included && page.included.length > 0 ? page.included : defaultIncluded;

  const forWhomHeading =
    page?.forWhomHeading ?? "Wann eine Massage zuhause die bessere Wahl ist";
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

  const vipHeading = page?.vipHeading ?? "Hotel & VIP Service auf Anfrage";
  const vipText =
    page?.vipText ??
    "Für Gäste in Wiener Hotels, für Künstlerinnen und Künstler auf Tour und für alle, die einen diskreten Termin brauchen: Auf Anfrage behandle ich auch im Hotelzimmer, in der Suite oder backstage. Terminfenster außerhalb der üblichen Zeiten sind möglich.";
  const vipPoints =
    page?.vipPoints && page.vipPoints.length > 0
      ? page.vipPoints
      : defaultVipPoints;

  const socialProofEyebrow = page?.socialProofEyebrow ?? "Auf Tour & backstage";
  const socialProofHeading =
    page?.socialProofHeading ??
    "Therapeutisch fundiert, geprägt von der Bühne";
  const socialProofText =
    page?.socialProofText ??
    "Seit meiner Jugend stehe ich als B-Boy auf der Bühne. Wer so trainiert, lernt früh, wie ein Körper unter Belastung funktioniert – und was er braucht, um sich wieder zu lösen. Diese Erfahrung fließt in jeden Handgriff: präzise, rhythmisch und mit Gefühl für den richtigen Druck zur richtigen Zeit. Das schätzen Menschen, die beruflich auf ihren Körper angewiesen sind – auf Tour, im Studio und im Hotel.";
  const socialProofCaption = page?.socialProofCaption;

  const areaHeading = page?.areaHeading ?? "Mobile Massage in ganz Wien";
  const areaDescription =
    page?.areaDescription ??
    "Ausgangspunkt ist meine Praxis in der Josefstadt. Innerhalb Wiens komme ich in jeden Bezirk – in den Innenbezirken meist besonders kurzfristig.";
  const areaDistricts =
    page?.areaDistricts && page.areaDistricts.length > 0
      ? page.areaDistricts
      : defaultAreaDistricts;

  const faqs = page?.faqs && page.faqs.length > 0 ? page.faqs : defaultFaqs;

  const ctaHeading = page?.ctaHeading ?? "Entspannung kommt zu Ihnen";
  const ctaText =
    page?.ctaText ??
    "Nennen Sie mir Adresse und Wunschzeit – den Rest übernehme ich. Online anfragen oder direkt anrufen.";

  const phone = settings?.phone ?? "+43 670 189 52 56";
  const telHref = `tel:${phone.replace(/\s/g, "")}`;
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
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="pointer-events-none absolute -top-48 -right-48 h-[560px] w-[560px] rounded-full bg-[#f2a93b]/8" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#083737]/60 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <div>
                <p
                  className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/60 ${rise("[animation-delay:0ms]")}`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} strokeWidth={2.5} aria-hidden={true} />
                    {heroBadge}
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-1 w-1 rounded-full bg-[#f2a93b] sm:block"
                  />
                  <span className="inline-flex items-center gap-1.5 text-[#f2a93b]">
                    <Sparkles size={13} strokeWidth={2.5} aria-hidden={true} />
                    {heroServiceLine}
                  </span>
                </p>

                <h1
                  className={`mt-6 text-balance text-[clamp(2.4rem,5.2vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white ${rise("[animation-delay:80ms]")}`}
                >
                  {heroHeading}
                </h1>
                <p
                  className={`mt-6 max-w-xl text-lg leading-relaxed text-white/72 ${rise("[animation-delay:160ms]")}`}
                >
                  {heroSubtitle}
                </p>

                {/* Preis-Lockup: der wichtigste Fakt gleich im Sichtfeld */}
                <div
                  className={`mt-9 flex flex-wrap items-end gap-x-5 gap-y-3 border-l-2 border-[#f2a93b] pl-5 ${rise("[animation-delay:240ms]")}`}
                >
                  <span className="text-5xl font-extrabold leading-none tracking-tight text-white">
                    {priceAmount}
                    <span className="ml-1 text-2xl font-bold text-[#f2a93b]">
                      €
                    </span>
                  </span>
                  <span className="pb-0.5 text-sm leading-snug text-white/72">
                    <span className="block font-semibold text-white">
                      Fixpreis für {durationSummary}
                    </span>
                    Anfahrt in Wien inklusive
                  </span>
                </div>

                <div
                  className={`mt-10 flex flex-col items-start gap-4 sm:flex-row ${rise("[animation-delay:320ms]")}`}
                >
                  <Link
                    href="/buchen"
                    className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03] ${FOCUS_RING} focus-visible:ring-offset-[#0d4f4f]`}
                  >
                    <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                    Hausbesuch anfragen
                  </Link>
                  <a
                    href={telHref}
                    className={`inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-white ${FOCUS_RING} focus-visible:ring-offset-[#0d4f4f]`}
                  >
                    <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                    {phone}
                  </a>
                </div>
              </div>

              <div className={`relative ${rise("[animation-delay:200ms]")}`}>
                <div className="pointer-events-none absolute -top-4 -right-4 h-full w-full rotate-1 rounded-3xl bg-[#f2a93b]/15" />
                <figure className="relative mx-auto max-w-md lg:mx-0 lg:ml-auto">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
                    <Image
                      src={heroImageSrc}
                      alt="Domenic Hacker bei einer Massagebehandlung in ruhiger Atmosphäre"
                      fill
                      className="object-cover object-[50%_25%]"
                      priority
                      quality={75}
                      sizes="(max-width: 1024px) 100vw, 448px"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#0d4f4f]/45 via-transparent to-transparent"
                    />
                  </div>
                  <figcaption className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="block text-sm font-bold">Domenic Hacker</span>
                    <span className="block text-xs text-white/75">
                      Diplomierter Heilmasseur · Wien
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ── PREIS ────────────────────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
                  {priceHeading}
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-[#555]">
                  {priceDescription}
                </p>

                <div className="mt-10 flex items-end gap-4">
                  <span className="text-[clamp(4rem,9vw,6rem)] font-extrabold leading-none tracking-[-0.03em] text-[#111]">
                    {priceAmount}
                  </span>
                  <span className="pb-2 text-3xl font-extrabold text-[#e8654a] sm:pb-3">
                    €
                  </span>
                  <span className="pb-2 text-sm font-semibold uppercase tracking-widest text-[#0d4f4f]/60 sm:pb-3">
                    pro Hausbesuch
                  </span>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {priceDurations.map((duration) => (
                    <li
                      key={duration}
                      className="rounded-full border border-[#0d4f4f]/15 bg-[#f5fafa] px-5 py-2.5 text-sm font-bold text-[#0d4f4f]"
                    >
                      {duration}
                    </li>
                  ))}
                  <li className="px-1 py-2.5 text-sm text-[#555]">
                    beide zum selben Preis
                  </li>
                </ul>
              </div>

              <div className="lg:pt-2">
                <div className="rounded-3xl border border-[#0d4f4f]/10 bg-[#f5fafa] p-7 sm:p-9">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60">
                    Im Preis enthalten
                  </p>
                  <ul className="mt-5 divide-y divide-[#0d4f4f]/10">
                    {defaultPriceIncludes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b]">
                          <Check
                            size={11}
                            strokeWidth={3}
                            className="text-white"
                            aria-hidden={true}
                          />
                        </span>
                        <span className="text-sm font-semibold leading-snug text-[#111] sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-5 flex items-start gap-2.5 px-1 text-sm leading-relaxed text-[#555]">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#0d4f4f]"
                    aria-hidden={true}
                  />
                  <span>{priceNote}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAS ICH MITBRINGE ────────────────────────────────────── */}
        <section className="bg-[#f0f7f7] py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
                  {includedHeading}
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-[#555]">
                  {includedDescription}
                </p>
                <p className="mt-10 max-w-md text-balance text-2xl font-extrabold leading-snug tracking-tight text-[#0d4f4f]">
                  Ihre einzige Aufgabe:{" "}
                  <span className="text-[#e8654a]">liegen bleiben.</span>
                </p>
              </div>

              <ul className="divide-y divide-[#0d4f4f]/10 border-y border-[#0d4f4f]/10">
                {included.map((item, i) => {
                  const Icon = INCLUDED_ICONS[i % INCLUDED_ICONS.length];
                  return (
                    <li key={item.title} className="flex gap-5 py-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm shadow-[#0d4f4f]/10">
                        <Icon
                          size={20}
                          className="text-[#0d4f4f]"
                          strokeWidth={2}
                          aria-hidden={true}
                        />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-[#0d4f4f]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#555] sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FÜR WEN / ANLÄSSE ────────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
              {forWhomHeading}
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-[#555]">
              {forWhomDescription}
            </p>
            <ul className="mt-10 flex flex-wrap gap-3">
              {occasions.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-[#0d4f4f]/15 bg-white px-5 py-3 text-sm font-semibold text-[#111] shadow-sm shadow-[#0d4f4f]/5 sm:text-base"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── ABLAUF ───────────────────────────────────────────────── */}
        <section className="bg-[#f0f7f7] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
                {processHeading}
              </h2>
              <p className="mt-5 leading-relaxed text-[#555]">
                {processDescription}
              </p>
            </div>

            <ol className="mt-12 grid gap-8 lg:grid-cols-4 lg:gap-6">
              {processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="relative border-l-2 border-[#0d4f4f]/15 pl-6 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] lg:-top-[7px] lg:left-0"
                  />
                  <p className="text-sm font-extrabold tracking-[0.2em] text-[#e8654a]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[#0d4f4f]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#555] sm:text-base lg:text-sm">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── HOTEL & VIP ──────────────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#0d4f4f] p-8 sm:p-12 lg:p-14">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#e8654a] via-[#f2a93b] to-[#0d4f4f]" />
              <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#f2a93b]/8" />

              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                <div>
                  <BedDouble
                    size={28}
                    strokeWidth={1.75}
                    className="text-[#f2a93b]"
                    aria-hidden={true}
                  />
                  <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                    {vipHeading}
                  </h2>
                  <p className="mt-5 max-w-lg leading-relaxed text-white/70">
                    {vipText}
                  </p>
                  <a
                    href={telHref}
                    className={`mt-8 inline-flex items-center gap-2 rounded-full border border-[#f2a93b]/50 px-6 py-3 text-sm font-bold text-[#f2a93b] transition-all duration-200 hover:bg-[#f2a93b] hover:text-[#0d4f4f] ${FOCUS_RING} focus-visible:ring-offset-[#0d4f4f]`}
                  >
                    <Phone size={15} strokeWidth={2.5} aria-hidden={true} />
                    Diskret anfragen
                  </a>
                </div>

                <ul className="divide-y divide-white/10 border-y border-white/10 self-center">
                  {vipPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3.5 py-4">
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
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ─────────────────────────────────────────── */}
        <section className="bg-[#f0f7f7] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="relative order-2 lg:order-1">
                <div className="pointer-events-none absolute -bottom-5 -left-5 h-full w-full rotate-2 rounded-3xl bg-[#0d4f4f]/8" />
                <figure className="relative mx-auto max-w-md">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                    <Image
                      src={socialProofImageSrc}
                      alt="Domenic Hacker auf der Bühne beim Breakdance"
                      fill
                      className="object-cover"
                      quality={75}
                      sizes="(max-width: 1024px) 100vw, 448px"
                    />
                    <span className="absolute top-5 left-5 rounded-full bg-[#0d4f4f]/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      {socialProofEyebrow}
                    </span>
                  </div>
                  {socialProofCaption && (
                    <figcaption className="mt-4 text-sm leading-relaxed text-[#555]">
                      {socialProofCaption}
                    </figcaption>
                  )}
                </figure>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-balance text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-[#0d4f4f]">
                  {socialProofHeading}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#555] sm:text-lg">
                  {socialProofText}
                </p>
                <Link
                  href="/ueber-mich"
                  className={`mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] transition-all duration-200 hover:bg-[#0d4f4f] hover:text-white ${FOCUS_RING}`}
                >
                  Mehr über meinen Weg
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── EINZUGSGEBIET ────────────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
                  {areaHeading}
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-[#555]">
                  {areaDescription}
                </p>
              </div>

              <div>
                <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {areaDistricts.map((district) => (
                    <li
                      key={district}
                      className="flex items-center gap-3 border-b border-[#0d4f4f]/10 py-3.5 font-semibold text-[#111]"
                    >
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8654a]"
                      />
                      {district}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-[#555]">
                  Sie möchten lieber in die Praxis kommen? Die Behandlungsräume
                  liegen in der {practiceAddress} (Josefstadt) – dort gibt es
                  zusätzlich Anwendungen, die zuhause nicht möglich sind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="bg-[#f0f7f7] py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#0d4f4f] sm:text-4xl">
              Häufige Fragen zur mobilen Massage in Wien
            </h2>
            <p className="mt-4 leading-relaxed text-[#555]">
              Antworten auf die Fragen, die mir vor einem Hausbesuch am
              häufigsten gestellt werden.
            </p>
            <div className="mt-10 divide-y divide-[#0d4f4f]/10 border-y border-[#0d4f4f]/10">
              {faqs.map((faq) => (
                <details key={faq._key} className="group">
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold text-[#111] transition-colors hover:text-[#0d4f4f] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS_RING} rounded-lg`}
                  >
                    {faq.question}
                    <ChevronDown
                      size={20}
                      className="shrink-0 text-[#0d4f4f] transition-transform duration-200 group-open:rotate-180"
                      aria-hidden={true}
                    />
                  </summary>
                  <p className="max-w-3xl pb-6 text-sm leading-relaxed text-[#555] sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUERVERWEISE ─────────────────────────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-4 px-5 sm:grid-cols-2 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#f0f7f7] p-7 sm:p-9">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60">
                  In der Praxis
                </p>
                <p className="mt-2 text-balance text-xl font-extrabold tracking-tight text-[#111]">
                  Heilmassage bei Verspannungen, Rückenschmerzen und chronischen
                  Beschwerden
                </p>
              </div>
              <Link
                href="/heilmassage-wien-1080"
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] transition-all duration-200 hover:bg-[#0d4f4f] hover:text-white ${FOCUS_RING}`}
              >
                Heilmassage ansehen
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>

            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#f0f7f7] p-7 sm:p-9">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60">
                  Alle Behandlungen
                </p>
                <p className="mt-2 text-balance text-xl font-extrabold tracking-tight text-[#111]">
                  Preise und Block-Karten für die Praxis auf einen Blick
                </p>
              </div>
              <Link
                href="/preise"
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] transition-all duration-200 hover:bg-[#0d4f4f] hover:text-white ${FOCUS_RING}`}
              >
                Preise einsehen
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0d4f4f] py-20 sm:py-28">
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#f2a93b]/8" />
          <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {ctaHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-white/70">
              {ctaText}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/buchen"
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03] ${FOCUS_RING} focus-visible:ring-offset-[#0d4f4f]`}
              >
                <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                Hausbesuch anfragen
              </Link>
              <a
                href={telHref}
                className={`inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-white ${FOCUS_RING} focus-visible:ring-offset-[#0d4f4f]`}
              >
                <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                {phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer sanitySettings={settings} />
    </>
  );
}
