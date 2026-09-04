import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Droplets,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
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
      "Hausbesuch in ganz Wien — Massageliege, Öle und Handtücher bringe ich mit. 120 € Fixpreis für 60 oder 90 Minuten.",
    url: CANONICAL,
    locale: "de_AT",
    type: "website",
  },
};

const INCLUDED_ICONS = [BedDouble, Droplets, Waves, Sparkles];

const defaultIncluded = [
  {
    title: "Profi-Massageliege",
    description:
      "Stabile, gepolsterte Liege mit Nackenstütze — dieselbe Qualität wie in der Praxis, in wenigen Minuten aufgebaut.",
  },
  {
    title: "Öle & Emulsionen",
    description:
      "Hochwertige, hautverträgliche Öle. Auf Wunsch neutral und unparfümiert, wenn Sie empfindlich reagieren.",
  },
  {
    title: "Frische Handtücher",
    description:
      "Frisch gewaschene Handtücher und Auflagen für jeden Termin — Ihre eigenen Textilien bleiben unberührt.",
  },
  {
    title: "Ruhige Atmosphäre",
    description:
      "Auf Wunsch mit leiser Musik, sonst in Stille. Sie bestimmen, wie viel gesprochen wird.",
  },
];

const defaultOccasions = [
  "Massage zu Hause",
  "Nach langen Arbeitstagen",
  "Hotelaufenthalt in Wien",
  "Nach Fernflügen",
  "Eingeschränkte Mobilität",
  "Junge Eltern",
  "Vor wichtigen Terminen",
  "Als Geschenk",
];

const defaultProcessSteps = [
  {
    title: "Anfrage & Termin",
    description:
      "Sie nennen mir Adresse, Wunschtermin und ob 60 oder 90 Minuten. Ich bestätige den Termin und den Preis verbindlich.",
  },
  {
    title: "Aufbau in fünf Minuten",
    description:
      "Ich komme pünktlich, baue die Liege leise auf und Sie zeigen mir kurz, wo Sie es am liebsten hätten.",
  },
  {
    title: "Die Behandlung",
    description:
      "Kurzes Gespräch über Beschwerden und Intensität — danach 60 oder 90 Minuten gezielte Arbeit an Ihrem Körper.",
  },
  {
    title: "Nachklingen lassen",
    description:
      "Ich packe zusammen und gehe. Sie bleiben liegen, sitzen oder schlafen einfach weiter — kein Heimweg, kein Bruch.",
  },
];

const defaultVipPoints = [
  "Behandlung im Hotelzimmer oder in der Suite",
  "Diskretion und absolute Verschwiegenheit",
  "Termine auch am Abend und am Wochenende",
  "Auf Wunsch Abrechnung über die Rezeption oder das Management",
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
      "Ein Hausbesuch kostet 120 € als Fixpreis — für 60 genauso wie für 90 Minuten. Die Anfahrt innerhalb Wiens ist enthalten. Bei Adressen weiter außerhalb kann ein Anfahrtsaufschlag dazukommen, den ich Ihnen vor der Terminbestätigung nenne.",
  },
  {
    _key: "default-mobile-faq-2",
    question: "Was muss ich für den Termin zu Hause vorbereiten?",
    answer:
      "Nichts. Ich bringe Massageliege, Öle und frische Handtücher mit. Sie brauchen nur einen freien Platz von etwa zwei mal zwei Metern — Wohnzimmer, Schlafzimmer oder Büro funktionieren alle gleich gut.",
  },
  {
    _key: "default-mobile-faq-3",
    question: "Wie viel Platz braucht die Massageliege?",
    answer:
      "Die Liege ist rund 190 cm lang und 70 cm breit. Damit ich rundherum arbeiten kann, sind etwa zwei mal zwei Meter ideal. Wenn Sie unsicher sind, schicken Sie mir vorab ein Foto des Raums — dann klären wir das in einer Minute.",
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
      "Dieselbe Arbeit wie in der Praxis: klassische Massage, Heilmassage-Techniken und gezielte Behandlung von Verspannungen — abgestimmt auf das, was Ihr Körper an diesem Tag braucht. Nur Anwendungen mit Geräten sind zu Hause nicht möglich.",
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
      "Ein Hausbesuch wird als private Leistung abgerechnet und von den gesetzlichen Kassen nicht erstattet. Wenn Ihnen eine Rückerstattung wichtig ist, ist die Heilmassage mit ärztlicher Verordnung in der Praxis der passendere Weg — Details dazu auf der Preise-Seite.",
  },
];

export default async function MobileMassageWien() {
  const [page, settings] = await Promise.all([
    getMobileMassagePage(),
    getSettings(),
  ]);

  // Platzhalter aus dem bestehenden Praxis-Bildpool. TODO(assets): sobald das
  // KC-Rebell-/Hyatt-Shooting da ist, kommt das Hero-Motiv hier rein.
  const heroImageSrc = page?.heroImage
    ? urlFor(page.heroImage).width(800).height(600).url()
    : "/images/domenic-massage.webp";

  // Platzhalter für den Social-Proof-Slot: aktuell das Breakdance-Bühnenfoto von
  // /ueber-mich. TODO(assets): wird durch das KC-Rebell-/Hyatt-Foto ersetzt,
  // Bildunterschrift dann über Sanity (socialProofCaption) nachziehen.
  const socialProofImageSrc = page?.socialProofImage
    ? urlFor(page.socialProofImage).width(900).height(1100).url()
    : "/images/breakdance.jpg";

  const heroBadge = page?.heroBadge ?? "Hausbesuch in ganz Wien";
  const heroHeading =
    page?.heroHeading ??
    "Mobile Massage – nachhaltige Entspannung bei Ihnen zuhause";
  const heroSubtitle =
    page?.heroSubtitle ??
    "Ich komme zu Ihnen — mit Massageliege, Ölen und Handtüchern. Sie brauchen nichts vorzubereiten außer einem ruhigen Platz. Diplomierte Heilmassage in Ihren eigenen vier Wänden.";
  const heroServiceLine =
    page?.heroServiceLine ?? "Hotel & VIP Service auf Anfrage";

  const priceHeading = page?.priceHeading ?? "Ein Fixpreis, zwei Längen";
  const priceDescription =
    page?.priceDescription ??
    "Keine Staffelung, keine Überraschungen: Ein Hausbesuch kostet 120 € — egal ob Sie 60 oder 90 Minuten buchen. Anfahrt innerhalb Wiens ist im Preis enthalten.";
  const priceAmount = page?.priceAmount ?? 120;
  const priceDurations =
    page?.priceDurations && page.priceDurations.length > 0
      ? page.priceDurations
      : ["60 Minuten", "90 Minuten"];
  const priceNote =
    page?.priceNote ??
    "Für Adressen außerhalb Wiens oder am Stadtrand kann ein Anfahrtsaufschlag dazukommen — den nenne ich Ihnen immer vorab, bevor der Termin fix ist.";
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
    "Sie müssen nichts besorgen, nichts umräumen und nichts vorbereiten. Ein Platz von etwa zwei mal zwei Metern reicht — den Rest bringe ich mit.";
  const included =
    page?.included && page.included.length > 0 ? page.included : defaultIncluded;

  const forWhomHeading =
    page?.forWhomHeading ?? "Wann eine Massage zu Hause die bessere Wahl ist";
  const forWhomDescription =
    page?.forWhomDescription ??
    "Manchmal ist der Weg zur Praxis genau das, was fehlt. Wer nach der Behandlung nicht mehr in die U-Bahn steigen muss, kommt tiefer runter — und bleibt länger entspannt.";
  const occasions =
    page?.occasions && page.occasions.length > 0
      ? page.occasions
      : defaultOccasions;

  const processHeading = page?.processHeading ?? "So läuft ein Hausbesuch ab";
  const processDescription =
    page?.processDescription ??
    "Diskret, pünktlich und ohne Aufwand für Sie. Vom Klingeln bis zum Abbau vergeht keine Minute, die Sie organisieren müssten.";
  const processSteps =
    page?.processSteps && page.processSteps.length > 0
      ? page.processSteps
      : defaultProcessSteps;

  const vipHeading = page?.vipHeading ?? "Hotel & VIP Service auf Anfrage";
  const vipText =
    page?.vipText ??
    "Für Gäste in Wiener Hotels, Künstlerinnen und Künstler auf Tour und alle, die einen diskreten Termin brauchen: Ich behandle auf Anfrage auch im Hotelzimmer, in der Suite oder Backstage. Terminfenster außerhalb der üblichen Zeiten sind möglich — fragen Sie einfach an.";
  const vipPoints =
    page?.vipPoints && page.vipPoints.length > 0
      ? page.vipPoints
      : defaultVipPoints;

  const socialProofEyebrow = page?.socialProofEyebrow ?? "Auf Tour & backstage";
  const socialProofHeading =
    page?.socialProofHeading ??
    "Vertrauen von Menschen, die auf ihren Körper angewiesen sind";
  const socialProofText =
    page?.socialProofText ??
    "Bühne, Studio, Wettkampf: Wer beruflich mit dem Körper arbeitet, kann sich keine verschleppte Verspannung leisten. Aus dem Breakdance kenne ich diese Welt von innen — und weiß, wie viel ein guter Termin am richtigen Tag wert ist.";
  const socialProofCaption = page?.socialProofCaption;

  const areaHeading = page?.areaHeading ?? "Mobile Massage in ganz Wien";
  const areaDescription =
    page?.areaDescription ??
    "Ausgangspunkt ist meine Praxis in der Josefstadt. Innerhalb Wiens komme ich in jeden Bezirk — in den Innenbezirken bin ich meist besonders kurzfristig verfügbar.";
  const areaDistricts =
    page?.areaDistricts && page.areaDistricts.length > 0
      ? page.areaDistricts
      : defaultAreaDistricts;

  const faqs = page?.faqs && page.faqs.length > 0 ? page.faqs : defaultFaqs;

  const ctaHeading = page?.ctaHeading ?? "Entspannung kommt zu Ihnen";
  const ctaText =
    page?.ctaText ??
    "Termin online anfragen oder direkt anrufen — sagen Sie mir Adresse und Wunschzeit, den Rest übernehme ich.";

  const phone = settings?.phone ?? "+43 670 189 52 56";

  return (
    <>
      <JsonLdService variant="mobilemassage" />
      <FaqJsonLd faqs={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative bg-[#0d4f4f] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e8654a] via-[#f2a93b] to-[#0d4f4f]" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#f2a93b]/8 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
                    {heroBadge}
                  </p>
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-[#f2a93b]/40 bg-[#f2a93b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#f2a93b]">
                    <Sparkles size={12} strokeWidth={2.5} aria-hidden={true} />
                    {heroServiceLine}
                  </p>
                </div>

                <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold text-white leading-[1.05] tracking-tight">
                  {heroHeading}
                </h1>
                <p className="mt-5 text-lg text-white/70 max-w-xl leading-relaxed">
                  {heroSubtitle}
                </p>

                {/* Preis-Chip — der wichtigste Fakt gleich im Sichtfeld */}
                <div className="mt-8 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/[0.12] bg-white/[0.07] px-5 py-4">
                  <span className="text-3xl font-extrabold text-[#f2a93b]">
                    {priceAmount} €
                  </span>
                  <span className="h-8 w-px bg-white/15" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/80">
                    Fixpreis für {durationSummary}
                  </span>
                </div>

                <div className="mt-9 flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="/buchen"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03]"
                  >
                    <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                    Hausbesuch anfragen
                  </Link>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                  >
                    <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                    {phone}
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#f2a93b]/15 rotate-1 pointer-events-none" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                  <Image
                    src={heroImageSrc}
                    alt="Domenic Hacker bei einer Massagebehandlung an der mobilen Massageliege"
                    fill
                    className="object-cover"
                    priority
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 512px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PREIS ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]">
              Preis
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#0d4f4f]">
              {priceHeading}
            </h2>
            <p className="mt-3 text-[#555] leading-relaxed max-w-2xl">
              {priceDescription}
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {priceDurations.map((duration) => (
                <div
                  key={duration}
                  className="rounded-3xl border border-[#0d4f4f]/10 bg-[#f5fafa] p-7 sm:p-8"
                >
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60">
                    <Clock size={13} strokeWidth={2.5} aria-hidden={true} />
                    {duration}
                  </p>
                  <p className="mt-3 text-4xl font-extrabold text-[#111]">
                    {priceAmount} €
                  </p>
                  <p className="mt-2 text-sm text-[#555]">
                    Inklusive Anfahrt innerhalb Wiens
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-4 rounded-2xl border border-[#0d4f4f]/10 bg-gradient-to-r from-[#0d4f4f]/[0.06] to-[#0d4f4f]/[0.02] p-6 sm:p-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d4f4f]/10">
                <MapPin size={20} className="text-[#0d4f4f]" aria-hidden={true} />
              </div>
              <div>
                <p className="font-bold text-[#111]">Hinweis zur Anfahrt</p>
                <p className="mt-1 text-sm text-[#555] leading-relaxed">
                  {priceNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAS ICH MITBRINGE ────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]">
              <Package size={14} strokeWidth={2.5} aria-hidden={true} />
              Ausstattung
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#0d4f4f]">
              {includedHeading}
            </h2>
            <p className="mt-3 text-[#555] leading-relaxed max-w-2xl">
              {includedDescription}
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {included.map((item, i) => {
                const Icon = INCLUDED_ICONS[i % INCLUDED_ICONS.length];
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0d4f4f]/8">
                      <Icon
                        size={20}
                        className="text-[#0d4f4f]"
                        strokeWidth={2}
                        aria-hidden={true}
                      />
                    </div>
                    <h3 className="mt-4 font-bold text-[#0d4f4f]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#555] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0d4f4f] shadow-sm">
              <ShieldCheck size={16} strokeWidth={2.5} aria-hidden={true} />
              Ihre Aufgabe: liegen bleiben.
            </p>
          </div>
        </section>

        {/* ── FÜR WEN / ANLÄSSE ────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {forWhomHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {forWhomDescription}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {occasions.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check
                      size={11}
                      strokeWidth={3}
                      className="text-white"
                      aria-hidden={true}
                    />
                  </span>
                  <span className="text-sm font-semibold text-[#111]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABLAUF ───────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {processHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {processDescription}
            </p>

            <ol className="grid sm:grid-cols-2 gap-5">
              {processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="relative overflow-hidden rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-5 text-[4.5rem] font-extrabold leading-none text-[#0d4f4f] opacity-[0.05] select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#e8654a]">
                    Schritt {i + 1}
                  </p>
                  <h3 className="mt-2 font-bold text-[#0d4f4f]">{step.title}</h3>
                  <p className="mt-2 text-sm text-[#555] leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── HOTEL & VIP ──────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#0d4f4f] p-8 sm:p-12">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e8654a] via-[#f2a93b] to-[#0d4f4f]" />
              <div className="absolute -bottom-28 -right-28 w-[360px] h-[360px] rounded-full bg-[#f2a93b]/8 pointer-events-none" />

              <div className="relative grid sm:grid-cols-2 gap-10 items-start">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#f2a93b]/40 bg-[#f2a93b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#f2a93b]">
                    <BedDouble size={13} strokeWidth={2.5} aria-hidden={true} />
                    Auf Anfrage
                  </span>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {vipHeading}
                  </h2>
                  <p className="mt-4 text-white/65 leading-relaxed">{vipText}</p>
                </div>

                <ul className="flex flex-col gap-3">
                  {vipPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4"
                    >
                      <Check
                        size={16}
                        strokeWidth={3}
                        className="mt-0.5 shrink-0 text-[#f2a93b]"
                        aria-hidden={true}
                      />
                      <span className="text-sm font-semibold text-white/85">
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
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl bg-[#0d4f4f]/8 rotate-2 pointer-events-none" />
                <figure className="relative">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto">
                    <Image
                      src={socialProofImageSrc}
                      alt="Domenic Hacker auf der Bühne beim Breakdance"
                      fill
                      className="object-cover"
                      quality={75}
                      sizes="(max-width: 1024px) 100vw, 448px"
                    />
                  </div>
                  {socialProofCaption && (
                    <figcaption className="mx-auto mt-4 max-w-md text-sm text-[#555]">
                      {socialProofCaption}
                    </figcaption>
                  )}
                </figure>
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]">
                  {socialProofEyebrow}
                </span>
                <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-[#111]">
                  {socialProofHeading}
                </h2>
                <p className="mt-5 text-base text-[#555] leading-relaxed max-w-xl">
                  {socialProofText}
                </p>
                <Link
                  href="/ueber-mich"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200"
                >
                  Mehr über meinen Weg
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── EINZUGSGEBIET ────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {areaHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {areaDescription}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {areaDistricts.map((district) => (
                <div
                  key={district}
                  className="rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5 text-sm font-semibold text-[#111]"
                >
                  {district}
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-[#555] leading-relaxed">
              Sie möchten lieber in die Praxis kommen? Die Behandlungsräume
              liegen in der {settings?.address ?? "Feldgasse 3/20"}, 1080 Wien
              (Josefstadt) — dort gibt es zusätzlich Anwendungen, die zu Hause
              nicht möglich sind.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
              Häufige Fragen zur mobilen Massage in Wien
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed">
              Antworten auf die Fragen, die mir vor einem Hausbesuch am
              häufigsten gestellt werden.
            </p>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq._key}
                  className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden={true}
                    />
                  </summary>
                  <p className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUERVERWEISE ─────────────────────────────────────────── */}
        <section className="py-12 sm:py-16 bg-white border-t border-[#0d4f4f]/8">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60 mb-1">
                  In der Praxis
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-[#111]">
                  Bei Verspannungen, Rückenschmerzen und chronischen Beschwerden
                </p>
              </div>
              <Link
                href="/heilmassage-wien-1080"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                Heilmassage ansehen
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60 mb-1">
                  Alle Behandlungen
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-[#111]">
                  Preise & Block-Karten für die Praxis auf einen Blick
                </p>
              </div>
              <Link
                href="/preise"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                Preise einsehen
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#0d4f4f]">
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {ctaHeading}
            </h2>
            <p className="text-white/65 mb-10 leading-relaxed">{ctaText}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/buchen"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03]"
              >
                <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                Hausbesuch anfragen
              </Link>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
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
