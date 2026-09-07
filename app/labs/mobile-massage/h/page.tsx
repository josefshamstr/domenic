import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  GOOGLE_MAPS_URL,
  formatPrice,
  getMobileMassageContent,
} from "../_shared/content";
import { StickyCta } from "./StickyCta";

export const metadata: Metadata = {
  title: "H · Soft Wellness – Mobile Massage Wien (Labs)",
};

/* ── Typografie & Tokens ───────────────────────────────────────────── */

/* Displaystimme = Geist (Site-Font). Weichheit kommt aus Farbe,
   Weissraum und Radien, nicht aus einem leichten Schnitt. */
const DISPLAY = "font-extrabold tracking-tight";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef4f1]";

const PILL = `inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-[#0d4f4f] px-7 text-base font-semibold text-white shadow-[0_14px_34px_-14px_rgba(13,79,79,0.6)] transition-colors duration-200 hover:bg-[#0a4141] ${FOCUS}`;

const PILL_LIGHT = `inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-white px-7 text-base font-semibold text-[#0d4f4f] shadow-[0_14px_34px_-14px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-[#f2f7f5] ${FOCUS} focus-visible:ring-white focus-visible:ring-offset-[#0d4f4f]`;

const TEXT_LINK = `group inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-base font-semibold text-[#0d4f4f] underline-offset-[6px] transition-colors hover:underline ${FOCUS}`;

const EYEBROW =
  "text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#2f4f4f]";

const BODY = "text-[#2f4a4a]";

const rise = (delay: string) =>
  `motion-safe:animate-[mm-rise_1s_cubic-bezier(0.16,1,0.3,1)_both] ${delay}`;

/* Feine Salbei-Linie zwischen den Abschnitten – keine harten Bänder. */
function Rule() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8" aria-hidden>
      <div className="h-px w-full bg-[#0d4f4f]/12" />
    </div>
  );
}

function CheckDot({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  return (
    <span
      className={`${box} mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-[#0d4f4f]/10 text-[#0d4f4f]`}
      aria-hidden
    >
      <Check size={size === "sm" ? 12 : 14} strokeWidth={2.75} />
    </span>
  );
}

export default async function SoftWellnessVariant() {
  const content = await getMobileMassageContent();
  const {
    phone,
    telHref,
    email,
    mailHref,
    bookingHref,
    practiceAddress,
    settings,
    reviews,
    heroImageSrc,
    stageImageSrc,
    roomImageSrc,
    treatmentImageSrc,
    treatmentWideImageSrc,
    heroBadge,
    heroHeading,
    heroSubtitle,
    heroServiceLine,
    identityLine,
    name,
    priceHeading,
    priceDescription,
    priceAmount,
    durationSummary,
    priceNote,
    included,
    includedExtra,
    pullQuote,
    roomCaption,
    forWhomHeading,
    forWhomDescription,
    occasions,
    areaHeading,
    areaDescription,
    areaDistricts,
    processHeading,
    processDescription,
    processSteps,
    stageHeading,
    stageText,
    stageCaption,
    vipHeading,
    vipText,
    vipPoints,
    faqs,
    faqHeading,
    faqIntro,
    ctaHeading,
    ctaText,
    ctaPrimaryLabel,
  } = content;

  const price = formatPrice(priceAmount);

  return (
    <>
      <main
        className={`relative isolate overflow-x-clip bg-[linear-gradient(180deg,#f2f7f5_0%,#eef4f1_45%,#e6efeb_100%)] ${BODY} selection:bg-[#0d4f4f]/15 selection:text-[#0d4f4f]`}
      >
        {/* Weiche Glows: Salbei oben rechts, Sand in der Mitte, Salbei unten links */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-12%] -z-10 h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(closest-side,rgba(13,79,79,0.11),rgba(13,79,79,0))]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[38%] left-[-18%] -z-10 h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgba(243,234,217,0.95),rgba(243,234,217,0))]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[68%] right-[-20%] -z-10 h-[56rem] w-[56rem] rounded-full bg-[radial-gradient(closest-side,rgba(13,79,79,0.09),rgba(13,79,79,0))]"
        />

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 pt-24 pb-16 sm:px-8 sm:pt-28 lg:pb-24">
          <figure
            className={`relative ${rise("[animation-delay:0ms]")}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(13,79,79,0.45)] ring-1 ring-white/60 sm:aspect-[16/9] lg:aspect-[5/2]">
              <Image
                src={treatmentImageSrc}
                alt="Massagebehandlung bei warmem Licht"
                fill
                priority
                fetchPriority="high"
                quality={85}
                sizes="(max-width: 1280px) 100vw, 1216px"
                className="object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d4f4f]/35 to-transparent"
              />
              <figcaption className="absolute bottom-5 left-5 flex flex-wrap items-center gap-2 sm:bottom-7 sm:left-7">
                <span className="inline-flex min-h-9 items-center gap-2 rounded-full bg-white/85 px-4 text-[0.78rem] font-semibold tracking-wide text-[#0d4f4f] backdrop-blur-md">
                  <MapPin size={13} strokeWidth={2.5} aria-hidden={true} />
                  {heroBadge}
                </span>
                <span className="hidden min-h-9 items-center rounded-full bg-[#0d4f4f]/85 px-4 text-[0.78rem] font-semibold tracking-wide text-white backdrop-blur-md sm:inline-flex">
                  {heroServiceLine}
                </span>
              </figcaption>
            </div>
          </figure>

          <div className="mt-9 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
            <div className={rise("[animation-delay:140ms]")}>
              <p className={EYEBROW}>
                <span className="block sm:inline">{name}</span>
                <span className="hidden sm:inline"> · </span>
                <span className="block sm:inline">{identityLine}</span>
              </p>
              <h1
                className={`${DISPLAY} mt-4 max-w-[24ch] text-pretty sm:text-balance text-[clamp(2rem,3.3vw,3.05rem)] leading-[1.08] text-[#0d4f4f]`}
              >
                {heroHeading}
              </h1>
              <p className="mt-6 max-w-[58ch] text-lg leading-relaxed">
                {heroSubtitle}
              </p>

              <div
                id="hero-cta"
                className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <Link href={bookingHref} className={PILL}>
                  {ctaPrimaryLabel}
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2.25}
                    aria-hidden={true}
                  />
                </Link>
                <a href={telHref} className={`${TEXT_LINK} sm:ml-2`}>
                  <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                  {phone}
                  <ArrowRight
                    size={16}
                    strokeWidth={2.25}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden={true}
                  />
                </a>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-11 w-fit items-center gap-3 rounded-full pr-2 transition-opacity hover:opacity-80 ${FOCUS}`}
                >
                  <span className="flex -space-x-2">
                    {reviews.avatars.slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#0d4f4f]/10 text-xs font-bold text-[#0d4f4f] ring-2 ring-[#eef4f1]"
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
                  <span className="flex items-center gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className="fill-[#b8862b] text-[#b8862b]"
                      />
                    ))}
                  </span>
                  <span className="text-sm">
                    <span className="font-bold text-[#0d4f4f]">
                      {reviews.rating.toFixed(1)}
                    </span>{" "}
                    · {reviews.count} Google-Bewertungen
                  </span>
                </a>
                <a
                  href={mailHref}
                  className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-full text-sm font-semibold text-[#0d4f4f] underline-offset-4 hover:underline ${FOCUS}`}
                >
                  <Mail size={15} strokeWidth={2.25} aria-hidden={true} />
                  {email}
                </a>
              </div>
            </div>

            {/* Preis-Lockup */}
            <div
              className={`rounded-[2rem] bg-white/55 p-7 ring-1 ring-white/70 backdrop-blur-sm sm:p-9 lg:justify-self-end lg:w-full lg:max-w-md ${rise("[animation-delay:260ms]")}`}
            >
              <p className={EYEBROW}>Fixpreis Hausbesuch</p>
              <p className="mt-4 flex items-baseline gap-2">
                <span
                  className={`${DISPLAY} text-[clamp(3.25rem,5.4vw,4.5rem)] leading-none text-[#0d4f4f]`}
                >
                  {price}
                </span>
                <span
                  className={`${DISPLAY} text-3xl leading-none text-[#0d4f4f]`}
                >
                  €
                </span>
              </p>
              <p className="mt-4 text-lg font-medium text-[#0d4f4f]">
                {durationSummary}
              </p>
              <p className="mt-1 text-base leading-relaxed">
                Anfahrt innerhalb Wiens inklusive
              </p>
              <ul className="mt-6 space-y-2 border-t border-[#0d4f4f]/12 pt-5 text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckDot size="sm" />
                  Sie wählen die Dauer – ein Preis
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckDot size="sm" />
                  Liege, Öle und Handtücher bringe ich mit
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── PREIS & IM PREIS ENTHALTEN ───────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            <div>
              <p className={EYEBROW}>Preis</p>
              <h2
                className={`${DISPLAY} mt-4 max-w-[18ch] text-balance text-[clamp(1.75rem,2.9vw,2.55rem)] leading-[1.12] text-[#0d4f4f]`}
              >
                {priceHeading}
              </h2>
              <p className="mt-6 max-w-[58ch] text-lg leading-relaxed">
                {priceDescription}
              </p>

              <figure className="mt-10">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-36px_rgba(13,79,79,0.45)] ring-1 ring-white/60">
                  <Image
                    src={roomImageSrc}
                    alt="Die Massageliege im Behandlungsraum von Domenic Hacker"
                    fill
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-bottom"
                  />
                </div>
                <figcaption className="mt-4 max-w-[58ch] text-sm leading-relaxed text-[#2f4f4f]">
                  {roomCaption}
                </figcaption>
              </figure>
            </div>

            <div className="lg:pt-14">
              <h3 className={EYEBROW}>Im Preis enthalten</h3>
              <ul className="mt-6 divide-y divide-[#0d4f4f]/10">
                {included.map((item) => (
                  <li key={item.title} className="flex gap-4 py-5 first:pt-0">
                    <CheckDot />
                    <div>
                      <p className="text-lg font-semibold text-[#0d4f4f]">
                        {item.title}
                      </p>
                      <p className="mt-1 max-w-[52ch] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="flex gap-4 py-5">
                  <CheckDot />
                  <div>
                    <p className="text-lg font-semibold text-[#0d4f4f]">
                      {includedExtra.title}
                    </p>
                    <p className="mt-1 max-w-[52ch] leading-relaxed">
                      {includedExtra.description}
                    </p>
                  </div>
                </li>
              </ul>
              <p className="mt-6 max-w-[58ch] rounded-[1.5rem] bg-[#f3ead9]/70 px-5 py-4 text-sm leading-relaxed text-[#2f4f4f]">
                {priceNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── PULL-QUOTE ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
          <div className="border-y border-[#0d4f4f]/12 py-14 sm:py-20">
            <p
              className={`${DISPLAY} mx-auto max-w-[24ch] text-balance text-center text-[clamp(1.75rem,3.5vw,2.95rem)] leading-[1.14] text-[#0d4f4f]`}
            >
              {pullQuote.lead}{" "}
              <em className="not-italic text-[#2f4f4f]">{pullQuote.accent}</em>
            </p>
          </div>
        </section>

        {/* ── ABLAUF ───────────────────────────────────────────────── */}
        <section
          id="ablauf"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="max-w-2xl">
            <p className={EYEBROW}>Ablauf</p>
            <h2
              className={`${DISPLAY} mt-4 max-w-[18ch] text-balance text-[clamp(1.75rem,2.9vw,2.55rem)] leading-[1.12] text-[#0d4f4f]`}
            >
              {processHeading}
            </h2>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed">
              {processDescription}
            </p>
          </div>

          <ol className="mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative pl-20 lg:pl-0">
                {/* Gepunktete Verbindung zum nächsten Schritt: vertikal mobil,
                    horizontal ab lg – endet immer am nächsten Kreis. */}
                {i < processSteps.length - 1 && (
                  <>
                    <span
                      aria-hidden
                      className="absolute top-12 -bottom-10 left-6 border-l border-dotted border-[#0d4f4f]/35 lg:hidden"
                    />
                    <span
                      aria-hidden
                      className="absolute top-6 left-12 -right-8 hidden border-t border-dotted border-[#0d4f4f]/35 lg:block"
                    />
                  </>
                )}
                <span
                  className={`${DISPLAY} absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg text-[#0d4f4f] ring-1 ring-[#0d4f4f]/15 shadow-[0_10px_24px_-14px_rgba(13,79,79,0.5)] lg:relative`}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="mt-1 text-xl font-semibold text-[#0d4f4f] lg:mt-6">
                  <span className="sr-only">Schritt {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[40ch] leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <Rule />

        {/* ── BÜHNE + HOTEL / SUITE / BACKSTAGE ────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
            <figure className="relative mx-auto w-full max-w-md lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(13,79,79,0.5)] ring-1 ring-white/60">
                <Image
                  src={stageImageSrc}
                  alt="Domenic Hacker als B-Boy auf der Bühne"
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 448px"
                  className="object-cover object-[50%_55%]"
                />
                {/* Kleines rundes Portrait als Avatar-Plakette auf dem Foto */}
                <div className="absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-[1.5rem] bg-white/90 p-1.5 pr-5 shadow-[0_18px_40px_-20px_rgba(13,79,79,0.5)] ring-1 ring-white/80 backdrop-blur-md">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                    <Image
                      src={heroImageSrc}
                      alt=""
                      fill
                      quality={75}
                      sizes="48px"
                      className="object-cover object-[50%_22%]"
                    />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-sm font-semibold text-[#0d4f4f]">
                      {name}
                    </span>
                    <span className="block text-[0.72rem] leading-snug text-[#2f4f4f]">
                      {identityLine}
                    </span>
                  </span>
                </div>
              </div>
              <figcaption className="mt-4 text-sm leading-relaxed text-[#2f4f4f]">
                {stageCaption}
              </figcaption>
            </figure>

            <div>
              <p className={EYEBROW}>Hintergrund</p>
              <h2
                className={`${DISPLAY} mt-4 max-w-[19ch] text-balance text-[clamp(1.75rem,2.9vw,2.55rem)] leading-[1.12] text-[#0d4f4f]`}
              >
                {stageHeading}
              </h2>
              <p className="mt-6 max-w-[60ch] text-lg leading-relaxed">
                {stageText}
              </p>

              <div className="mt-12 rounded-[2rem] bg-white/50 p-7 ring-1 ring-white/70 sm:p-9">
                <h3
                  className={`${DISPLAY} text-[clamp(1.4rem,2.1vw,1.85rem)] leading-[1.18] text-[#0d4f4f]`}
                >
                  {vipHeading}
                </h3>
                <p className="mt-4 max-w-[58ch] leading-relaxed">{vipText}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {vipPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckDot size="sm" />
                      <span className="leading-snug text-[#0d4f4f]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                  <a href={telHref} className={TEXT_LINK}>
                    <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                    Diskret anrufen
                    <ArrowRight
                      size={16}
                      strokeWidth={2.25}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden={true}
                    />
                  </a>
                  <a href={mailHref} className={TEXT_LINK}>
                    <Mail size={16} strokeWidth={2.25} aria-hidden={true} />
                    Per E-Mail anfragen
                    <ArrowRight
                      size={16}
                      strokeWidth={2.25}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden={true}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── FÜR WEN · WO · PRAXIS ────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className={EYEBROW}>Anlässe</p>
              <h2
                className={`${DISPLAY} mt-4 max-w-[18ch] text-balance text-[clamp(1.75rem,2.9vw,2.55rem)] leading-[1.12] text-[#0d4f4f]`}
              >
                {forWhomHeading}
              </h2>
              <p className="mt-6 max-w-[58ch] text-lg leading-relaxed">
                {forWhomDescription}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {occasions.map((label) => (
                  <li
                    key={label}
                    className="inline-flex min-h-11 items-center rounded-full bg-white/60 px-5 text-[0.95rem] font-medium text-[#0d4f4f] ring-1 ring-[#0d4f4f]/10"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="lg:pt-6">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-36px_rgba(13,79,79,0.45)] ring-1 ring-white/60">
                <Image
                  src={treatmentWideImageSrc}
                  alt="Behandlung in der Praxis von Domenic Hacker"
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-center"
                />
              </div>
            </figure>
          </div>

          <div className="mt-16 grid gap-10 border-t border-[#0d4f4f]/12 pt-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className={EYEBROW}>Einsatzgebiet</p>
              <h2
                className={`${DISPLAY} mt-4 max-w-[18ch] text-balance text-[clamp(1.6rem,2.5vw,2.2rem)] leading-[1.16] text-[#0d4f4f]`}
              >
                {areaHeading}
              </h2>
              <p className="mt-5 max-w-[58ch] leading-relaxed">
                {areaDescription}
              </p>
              <p className="mt-5 max-w-[58ch] text-sm leading-[1.9] text-[#2f4f4f]">
                <span className="font-semibold text-[#0d4f4f]">
                  Zum Beispiel:{" "}
                </span>
                {areaDistricts.join(" · ")}
              </p>
            </div>

            <div className="flex items-start gap-4 self-start rounded-[2rem] bg-[#f3ead9]/70 p-7 ring-1 ring-white/70 sm:p-8">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0d4f4f]"
                aria-hidden
              >
                <MapPin size={18} strokeWidth={2.25} />
              </span>
              <p className="max-w-[50ch] leading-relaxed">
                <span className="block font-semibold text-[#0d4f4f]">
                  Lieber in die Praxis?
                </span>
                Die Behandlungsräume liegen in der {practiceAddress}{" "}
                (Josefstadt) – dort gibt es zusätzlich Anwendungen, die zuhause
                nicht möglich sind.
              </p>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className={EYEBROW}>FAQ</p>
              <h2
                className={`${DISPLAY} mx-auto mt-4 max-w-[18ch] text-balance text-[clamp(1.75rem,2.9vw,2.55rem)] leading-[1.12] text-[#0d4f4f]`}
              >
                {faqHeading}
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed">
                {faqIntro}
              </p>
            </div>

            <div className="mt-12 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq._key}
                  className="group rounded-[1.5rem] bg-white/55 ring-1 ring-white/70 transition-colors open:bg-white/80"
                >
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between gap-5 rounded-[1.5rem] px-6 py-5 text-left text-lg font-semibold text-[#0d4f4f] sm:px-8 sm:py-6 [&::-webkit-details-marker]:hidden ${FOCUS}`}
                  >
                    <span>{faq.question}</span>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0d4f4f]/10 text-[#0d4f4f] transition-transform duration-300 group-open:rotate-180"
                      aria-hidden
                    >
                      <ChevronDown size={18} strokeWidth={2.25} />
                    </span>
                  </summary>
                  <p className="max-w-[62ch] px-6 pb-7 leading-relaxed sm:px-8">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section
          id="final-cta"
          className="mx-auto max-w-7xl px-5 pt-6 pb-24 sm:px-8 lg:pb-32"
        >
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[3.5rem] bg-[radial-gradient(closest-side,rgba(13,79,79,0.22),rgba(13,79,79,0))] blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0d4f4f] px-6 py-16 text-center text-white sm:px-12 sm:py-20 lg:py-24">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-40 -right-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(230,239,235,0.22),rgba(230,239,235,0))]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-48 -left-24 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(243,234,217,0.16),rgba(243,234,217,0))]"
              />
              <div className="relative mx-auto max-w-2xl">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/75">
                  {heroBadge}
                </p>
                <h2
                  className={`${DISPLAY} mt-4 text-balance text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.1] text-white`}
                >
                  {ctaHeading}
                </h2>
                <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-white/85">
                  {ctaText}
                </p>
                <p className="mt-6 text-sm font-medium tracking-wide text-white/85">
                  {price} € · {durationSummary} · Anfahrt innerhalb Wiens
                  inklusive
                </p>
                <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link href={bookingHref} className={PILL_LIGHT}>
                    {ctaPrimaryLabel}
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2.25}
                      aria-hidden={true}
                    />
                  </Link>
                  <a
                    href={telHref}
                    className={`inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full border border-white/35 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10 ${FOCUS} focus-visible:ring-white focus-visible:ring-offset-[#0d4f4f]`}
                  >
                    <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                    {phone}
                  </a>
                </div>
                <a
                  href={mailHref}
                  className={`mt-7 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-white/90 underline-offset-4 hover:underline ${FOCUS} focus-visible:ring-white focus-visible:ring-offset-[#0d4f4f]`}
                >
                  <Mail size={14} strokeWidth={2.25} aria-hidden={true} />
                  {email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StickyCta
        href={bookingHref}
        telHref={telHref}
        label={ctaPrimaryLabel}
        watchIds={["hero-cta", "final-cta", "site-footer"]}
      />
      <div id="site-footer">
        <Footer sanitySettings={settings} />
      </div>
    </>
  );
}
