import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { Mail, MapPin, Phone, Plus, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  formatPrice,
  getMobileMassageContent,
  splitHeading,
  GOOGLE_MAPS_URL,
} from "../_shared/content";
import { StickyCta } from "./StickyCta";

/**
 * Variante F · Hotel Concierge
 * Die Seite ist gesetzt wie die Service-Karte eines Grandhotels: Papiercreme,
 * tiefes Teal als Tinte, doppelte Haarlinien als Rahmen, Kapitälchen mit
 * weiter Laufweite und eine klassische Serife für Überschriften und Preis.
 * Signatur: die Preiskarte mit Punktführungen – wie eine Zimmerservice-Karte.
 */

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-f-serif",
});

export const metadata: Metadata = {
  title: "F · Hotel Concierge – Mobile Massage Wien",
};

const SERIF = "font-[family-name:var(--font-f-serif)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3eee4]";
const FOCUS_ON_INK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3eee4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d4f4f]";

const BTN_SOLID = `inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-[#0d4f4f] px-7 py-3 text-base font-semibold text-[#f3eee4] transition-colors duration-200 hover:bg-[#093b3b] ${FOCUS}`;
const BTN_OUTLINE = `inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] border border-[#0d4f4f] px-7 py-3 text-base font-semibold text-[#0d4f4f] transition-colors duration-200 hover:bg-[#0d4f4f]/8 ${FOCUS}`;
const BTN_SOLID_CREAM = `inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-[#f3eee4] px-7 py-3 text-base font-semibold text-[#0d4f4f] transition-colors duration-200 hover:bg-white ${FOCUS_ON_INK}`;
const BTN_OUTLINE_CREAM = `inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] border border-[#f3eee4]/70 px-7 py-3 text-base font-semibold text-[#f3eee4] transition-colors duration-200 hover:bg-[#f3eee4]/10 ${FOCUS_ON_INK}`;

const TEXT_LINK = `rounded-sm underline decoration-[#0d4f4f]/35 underline-offset-[0.25em] transition-colors duration-200 hover:decoration-[#0d4f4f] ${FOCUS}`;

/** Punktführung wie in einer gesetzten Speisekarte: "60 Minuten ……… 120 €" */
const LEADER =
  "h-[3px] min-w-8 flex-1 bg-[radial-gradient(circle,rgba(13,79,79,0.6)_1.1px,transparent_1.5px)] bg-[length:8px_3px] bg-repeat-x";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const roman = (n: number) => ROMAN[n - 1] ?? String(n);

const formatRating = (rating: number) =>
  new Intl.NumberFormat("de-AT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);

const rise = (delayClass: string) =>
  `motion-safe:animate-[mm-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both] ${delayClass}`;

/* ── Bausteine ─────────────────────────────────────────────────────── */

function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${className}`}
    >
      {children}
    </p>
  );
}

/** Doppelte Haarlinie: 1px, 3px Luft, 1px. */
function Frame({
  children,
  tone = "ink",
  className = "",
  innerClassName = "",
  id,
}: {
  children: React.ReactNode;
  tone?: "ink" | "cream";
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  const line = tone === "ink" ? "border-[#0d4f4f]/35" : "border-[#f3eee4]/45";
  return (
    <div id={id} className={`border ${line} p-[3px] ${className}`}>
      <div className={`h-full border ${line} ${innerClassName}`}>{children}</div>
    </div>
  );
}

/** Bogenrahmen (oben rund, unten gerade) mit doppelter Haarlinie. */
function Arch({
  children,
  tone = "ink",
  className = "",
  aspect = "aspect-[3/4]",
}: {
  children: React.ReactNode;
  tone?: "ink" | "cream";
  className?: string;
  aspect?: string;
}) {
  const line = tone === "ink" ? "border-[#0d4f4f]/40" : "border-[#f3eee4]/50";
  return (
    <div className={`rounded-t-full border ${line} p-[3px] ${className}`}>
      <div
        className={`relative overflow-hidden rounded-t-full border ${line} ${aspect}`}
      >
        {children}
      </div>
    </div>
  );
}

function LeaderRow({
  term,
  value,
  italic = false,
}: {
  term: string;
  value: string;
  italic?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3 sm:gap-4">
      <dt className="shrink-0 text-base text-[#0d4f4f] sm:text-lg">{term}</dt>
      <span aria-hidden className={LEADER} />
      <dd
        className={`${SERIF} shrink-0 text-2xl font-semibold [font-feature-settings:'lnum'] text-[#0d4f4f] sm:text-3xl ${
          italic ? "italic font-medium" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

/* ── Seite ─────────────────────────────────────────────────────────── */

export default async function VariantF() {
  const c = await getMobileMassageContent();
  const [headingLead, headingRest] = splitHeading(c.heroHeading);
  const price = `${formatPrice(c.priceAmount)} €`;
  const includedAll = [...c.included, c.includedExtra];

  return (
    <>
      <main
        className={`${serif.variable} bg-[#f3eee4] text-[#0d4f4f] selection:bg-[#0d4f4f] selection:text-[#f3eee4]`}
      >
        {/* ── HERO · Zimmerservice-Karte ─────────────────────────────── */}
        <section className="bg-[#e9e1d2]">
          <div className="mx-auto max-w-6xl px-5 pt-20 pb-14 sm:px-8 sm:pt-26 sm:pb-18 lg:pt-28 lg:pb-20">
            <div
              className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 border-y border-[#0d4f4f]/30 py-3 ${rise("[animation-delay:0ms]")}`}
            >
              <Label>Zimmerservice · Massage</Label>
              <Label className="text-[#0d4f4f]/85">{c.heroBadge}</Label>
            </div>

            <div className="mt-8 grid items-center gap-10 md:grid-cols-[240px_1fr] md:gap-12 lg:grid-cols-[340px_1fr] lg:gap-16">
              <figure className={rise("[animation-delay:120ms]")}>
                <Arch className="w-48 md:w-full">
                  <Image
                    src={c.heroImageSrc}
                    alt={`${c.name}, diplomierter Heilmasseur in Wien`}
                    fill
                    priority
                    fetchPriority="high"
                    quality={85}
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 240px, 192px"
                    className="object-cover object-[50%_22%]"
                  />
                </Arch>
                <figcaption className="mt-4 border-b border-[#0d4f4f]/30 pb-3">
                  <span className={`${SERIF} block text-xl font-semibold`}>
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0d4f4f]/85">
                    {c.identityLine}
                  </span>
                </figcaption>
              </figure>

              <div>
                <Label className={`text-[#0d4f4f]/85 ${rise("[animation-delay:80ms]")}`}>
                  {c.heroServiceLine}
                </Label>
                <h1
                  className={`${SERIF} mt-5 text-balance text-[clamp(2.75rem,5.4vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.01em] ${rise("[animation-delay:160ms]")}`}
                >
                  {headingRest ? (
                    <>
                      <span className="block">{headingLead}</span>
                      <span className="block">{headingRest}</span>
                    </>
                  ) : (
                    headingLead
                  )}
                </h1>
                <p
                  className={`mt-6 max-w-[60ch] text-lg leading-relaxed text-[#3f5553] ${rise("[animation-delay:240ms]")}`}
                >
                  {c.heroSubtitle}
                </p>

                <div
                  className={`mt-8 flex flex-wrap items-end gap-x-6 gap-y-3 border-l border-[#0d4f4f]/40 pl-5 ${rise("[animation-delay:320ms]")}`}
                >
                  <span
                    className={`${SERIF} text-6xl font-semibold leading-[0.9] [font-feature-settings:'lnum'] sm:text-7xl`}
                  >
                    {price}
                  </span>
                  <span className="pb-1 text-sm leading-snug text-[#3f5553]">
                    <span className="block font-semibold text-[#0d4f4f]">
                      Fixpreis · {c.durationSummary}
                    </span>
                    Anfahrt innerhalb Wiens inklusive
                  </span>
                </div>

                <div
                  id="hero-cta"
                  className={`mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center ${rise("[animation-delay:400ms]")}`}
                >
                  <Link href={c.bookingHref} className={BTN_SOLID}>
                    {c.ctaPrimaryLabel}
                  </Link>
                  <a href={c.telHref} className={BTN_OUTLINE}>
                    <Phone size={16} strokeWidth={2} aria-hidden={true} />
                    {c.phone}
                  </a>
                </div>
                <p className={`mt-4 text-sm text-[#3f5553] ${rise("[animation-delay:440ms]")}`}>
                  Oder per E-Mail:{" "}
                  <a href={c.mailHref} className={`${TEXT_LINK} text-[#0d4f4f]`}>
                    {c.email}
                  </a>
                </p>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex min-h-11 w-fit flex-wrap items-center gap-x-3 gap-y-1 rounded-sm transition-opacity duration-200 hover:opacity-80 ${FOCUS} ${rise("[animation-delay:480ms]")}`}
                >
                  <span className="flex -space-x-2">
                    {c.reviews.avatars.slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-[#e9e1d2] bg-[#0d4f4f] text-xs font-semibold text-[#f3eee4]"
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
                          size={13}
                          className="fill-[#0d4f4f] text-[#0d4f4f]"
                          aria-hidden={true}
                        />
                      ))}
                    </span>
                    <span
                      className={`${SERIF} text-xl font-semibold leading-none [font-feature-settings:'lnum']`}
                    >
                      {formatRating(c.reviews.rating)}
                    </span>
                  </span>
                  <span className="text-sm text-[#3f5553]">
                    {c.reviews.count} Google-Bewertungen
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIE KARTE · Preis als Zimmerservice-Menü ──────────────── */}
        <section id="preise" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <Frame>
                <div className="px-5 py-9 sm:px-10 sm:py-12 lg:px-12">
                  <Label className="text-center text-[#0d4f4f]/85">
                    Preise · Hausbesuch
                  </Label>
                  <h2
                    className={`${SERIF} mx-auto mt-4 max-w-[20ch] text-balance text-center text-4xl font-semibold leading-[1.05] sm:text-5xl`}
                  >
                    {c.priceHeading}
                  </h2>
                  <p className="mx-auto mt-5 max-w-[58ch] text-center leading-relaxed text-[#3f5553]">
                    {c.priceDescription}
                  </p>

                  <dl className="mt-10 space-y-4 sm:mt-12 sm:space-y-5">
                    {c.priceDurations.map((d) => (
                      <LeaderRow key={d} term={d} value={price} />
                    ))}
                    <LeaderRow
                      term="Anfahrt innerhalb Wiens"
                      value="inklusive"
                      italic
                    />
                  </dl>

                  <div className="mt-10 border-t border-[#0d4f4f]/25 pt-8 sm:mt-12">
                    <Label className="text-[#0d4f4f]/85">Im Preis enthalten</Label>
                    <ul className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                      {includedAll.map((item) => (
                        <li key={item.title}>
                          <p className={`${SERIF} text-xl font-semibold leading-tight`}>
                            {item.title}
                          </p>
                          <p className="mt-1.5 max-w-[42ch] text-sm leading-relaxed text-[#3f5553]">
                            {item.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 border-t border-dotted border-[#0d4f4f]/35 pt-5 text-sm italic leading-relaxed text-[#3f5553]">
                      {c.priceNote}
                    </p>
                  </div>
                </div>
              </Frame>

              <div className="lg:sticky lg:top-28">
                <figure>
                  <Frame>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={c.roomImageSrc}
                        alt="Die Massageliege im Behandlungsraum von Domenic Hacker"
                        fill
                        quality={75}
                        sizes="(min-width: 1152px) 430px, (min-width: 1024px) 42vw, 100vw"
                        className="object-cover object-bottom"
                      />
                    </div>
                  </Frame>
                  <figcaption className="mt-4 max-w-[52ch] text-sm leading-relaxed text-[#3f5553]">
                    {c.roomCaption}
                  </figcaption>
                </figure>

                {/* Concierge-Block: kurzer Weg zur Anfrage, direkt neben der Karte */}
                <Frame className="mt-8" id="menu-cta">
                  <div className="px-5 py-6 sm:px-6">
                    <Label className="text-[#0d4f4f]/85">Anfrage · Direkt</Label>
                    <Link
                      href={c.bookingHref}
                      className={`${BTN_SOLID} mt-4 w-full`}
                    >
                      {c.ctaPrimaryLabel}
                    </Link>
                    <div className="mt-4 space-y-2 text-sm">
                      <a
                        href={c.telHref}
                        className={`inline-flex min-h-11 items-center gap-2.5 ${TEXT_LINK}`}
                      >
                        <Phone size={15} strokeWidth={2} aria-hidden={true} />
                        {c.phone}
                      </a>
                      <a
                        href={c.mailHref}
                        className={`flex min-h-11 items-center gap-2.5 ${TEXT_LINK}`}
                      >
                        <Mail size={15} strokeWidth={2} aria-hidden={true} />
                        {c.email}
                      </a>
                    </div>
                  </div>
                </Frame>
              </div>
            </div>
          </div>
        </section>

        {/* ── PULL-QUOTE · das typografische Ereignis ────────────────── */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="border-y border-[#0d4f4f]/35 py-[3px]">
              <div className="border-y border-[#0d4f4f]/35 px-4 py-12 text-center sm:py-16">
                <p
                  className={`${SERIF} mx-auto max-w-[18ch] text-balance text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.02]`}
                >
                  {c.pullQuote.lead}{" "}
                  <em className="font-semibold italic">{c.pullQuote.accent}</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABLAUF · I–IV ──────────────────────────────────────────── */}
        <section id="ablauf" className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <Label className="text-[#0d4f4f]/85">Ablauf · In vier Schritten</Label>
              <h2
                className={`${SERIF} mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl`}
              >
                {c.processHeading}
              </h2>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-[#3f5553]">
                {c.processDescription}
              </p>
            </div>

            <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {c.processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="border-t border-[#0d4f4f]/40 pt-5"
                >
                  <span
                    aria-hidden
                    className={`${SERIF} block text-4xl font-medium leading-none`}
                  >
                    {roman(i + 1)}
                  </span>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.22em]">
                    <span className="sr-only">Schritt {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-[#3f5553]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── BILDBAND · Behandlung ──────────────────────────────────── */}
        <section className="pb-16 sm:pb-24" aria-label="Eindrücke aus der Behandlung">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-2 sm:px-8">
            <figure>
              <Frame>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={c.treatmentImageSrc}
                    alt="Massagebehandlung bei warmem Licht"
                    fill
                    quality={75}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Frame>
              <figcaption className="mt-3">
                <Label className="text-[#0d4f4f]/85">Behandlung · Praxis</Label>
              </figcaption>
            </figure>
            <figure>
              <Frame>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={c.treatmentWideImageSrc}
                    alt="Domenic Hacker bei der Behandlung in der Praxis"
                    fill
                    quality={75}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Frame>
              <figcaption className="mt-3">
                <Label className="text-[#0d4f4f]/85">
                  Dieselbe Arbeit · bei Ihnen
                </Label>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── HOTEL, SUITE, BACKSTAGE · die Concierge-Karte ──────────── */}
        <section id="hotel" className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="bg-[#0d4f4f] p-2 text-[#f3eee4] sm:p-3">
              <Frame tone="cream">
                <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
                  <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
                    <figure className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
                      <Frame tone="cream">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image
                            src={c.stageImageSrc}
                            alt="Domenic Hacker als B-Boy auf der Bühne"
                            fill
                            quality={75}
                            sizes="(min-width: 1024px) 380px, 90vw"
                            className="object-cover object-[50%_55%]"
                          />
                        </div>
                      </Frame>
                      <figcaption className="mt-4 text-sm leading-relaxed text-[#f3eee4]/80">
                        {c.stageCaption}
                      </figcaption>
                    </figure>

                    <div>
                      <Label className="text-[#f3eee4]/80">
                        Concierge · Auf Anfrage
                      </Label>
                      <h2
                        className={`${SERIF} mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl`}
                      >
                        {c.vipHeading}
                      </h2>
                      <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-[#f3eee4]/85">
                        {c.vipText}
                      </p>

                      <ul className="mt-8 divide-y divide-[#f3eee4]/20 border-y border-[#f3eee4]/20">
                        {c.vipPoints.map((point, i) => (
                          <li
                            key={point}
                            className="flex items-baseline gap-4 py-3.5"
                          >
                            <span
                              aria-hidden
                              className={`${SERIF} w-8 shrink-0 text-xl font-medium text-[#f3eee4]/70`}
                            >
                              {roman(i + 1)}
                            </span>
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <a href={c.telHref} className={BTN_SOLID_CREAM}>
                          <Phone size={16} strokeWidth={2} aria-hidden={true} />
                          Diskret anrufen
                        </a>
                        <a href={c.mailHref} className={BTN_OUTLINE_CREAM}>
                          <Mail size={16} strokeWidth={2} aria-hidden={true} />
                          Per E-Mail anfragen
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 grid gap-6 border-t border-[#f3eee4]/20 pt-10 lg:mt-16 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
                    <div>
                      <Label className="text-[#f3eee4]/80">Herkunft · Bühne</Label>
                      <h3
                        className={`${SERIF} mt-3 text-balance text-3xl font-semibold leading-[1.1]`}
                      >
                        {c.stageHeading}
                      </h3>
                    </div>
                    <p className="max-w-[62ch] leading-relaxed text-[#f3eee4]/85 lg:text-lg">
                      {c.stageText}
                    </p>
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </section>

        {/* ── ANLÄSSE & EINZUGSGEBIET ────────────────────────────────── */}
        <section id="fuer-wen" className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
              <div className="lg:pr-14">
                <Label className="text-[#0d4f4f]/85">Anlässe</Label>
                <h2
                  className={`${SERIF} mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl`}
                >
                  {c.forWhomHeading}
                </h2>
                <p className="mt-4 max-w-[56ch] leading-relaxed text-[#3f5553]">
                  {c.forWhomDescription}
                </p>
                <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                  {c.occasions.map((label) => (
                    <li
                      key={label}
                      className="flex items-baseline gap-3 border-b border-[#0d4f4f]/20 py-3 text-[15px] font-medium"
                    >
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 translate-y-[-0.1em] rotate-45 bg-[#0d4f4f]"
                      />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:border-l lg:border-[#0d4f4f]/25 lg:pl-14">
                <Label className="text-[#0d4f4f]/85">Einzugsgebiet</Label>
                <h2
                  className={`${SERIF} mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl`}
                >
                  {c.areaHeading}
                </h2>
                <p className="mt-4 max-w-[56ch] leading-relaxed text-[#3f5553]">
                  {c.areaDescription}
                </p>
                <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                  {c.areaDistricts.map((d) => {
                    const idx = d.indexOf(" ");
                    const plz = idx > 0 ? d.slice(0, idx) : null;
                    const name = idx > 0 ? d.slice(idx + 1) : d;
                    return (
                      <li
                        key={d}
                        className="flex items-baseline gap-3 border-b border-[#0d4f4f]/20 py-2.5 text-[15px]"
                      >
                        {plz && (
                          <span
                            className={`${SERIF} w-12 shrink-0 text-lg font-semibold [font-feature-settings:'lnum'] leading-none`}
                          >
                            {plz}
                          </span>
                        )}
                        <span className="text-[#3f5553]">{name}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#0d4f4f]/85">
                  Beispiele · alle weiteren Bezirke nach Vereinbarung
                </p>

                <Frame className="mt-10">
                  <div className="flex items-start gap-4 px-5 py-5">
                    <MapPin
                      size={18}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0"
                      aria-hidden={true}
                    />
                    <p className="text-sm leading-relaxed text-[#3f5553]">
                      <span className={`${SERIF} text-lg font-semibold text-[#0d4f4f]`}>
                        Lieber in die Praxis?
                      </span>{" "}
                      Die Behandlungsräume liegen in der {c.practiceAddress}. Dort
                      sind zusätzlich Anwendungen möglich, die zuhause nicht
                      gehen.
                    </p>
                  </div>
                </Frame>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ · nummerierter Index ───────────────────────────────── */}
        <section id="faq" className="bg-[#e9e1d2] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Label className="text-[#0d4f4f]/85">Index · Fragen</Label>
                <h2
                  className={`${SERIF} mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl`}
                >
                  {c.faqHeading}
                </h2>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-[#3f5553]">
                  {c.faqIntro}
                </p>
              </div>

              <div className="border-t border-[#0d4f4f]/35">
                {c.faqs.map((faq, i) => (
                  <details
                    key={faq._key}
                    className="group border-b border-[#0d4f4f]/35"
                  >
                    <summary
                      className={`flex min-h-14 cursor-pointer list-none items-baseline gap-4 rounded-sm py-5 [&::-webkit-details-marker]:hidden ${FOCUS}`}
                    >
                      <span
                        aria-hidden
                        className={`${SERIF} w-9 shrink-0 text-2xl font-medium [font-feature-settings:'lnum'] leading-none`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium leading-snug sm:text-lg">
                        {faq.question}
                      </span>
                      <span aria-hidden className={`${LEADER} hidden sm:block`} />
                      <Plus
                        size={18}
                        strokeWidth={1.75}
                        className="ml-auto shrink-0 self-center transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none sm:ml-0"
                        aria-hidden={true}
                      />
                    </summary>
                    <p className="max-w-[62ch] pb-6 pl-13 leading-relaxed text-[#3f5553]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABSCHLUSS ──────────────────────────────────────────────── */}
        <section id="final-cta" className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Frame>
              <div className="px-5 py-12 text-center sm:px-12 sm:py-16">
                <Label className="text-[#0d4f4f]/85">Zimmerservice · Massage</Label>
                <h2
                  className={`${SERIF} mx-auto mt-4 max-w-[16ch] text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl`}
                >
                  {c.ctaHeading}
                </h2>
                <p className="mx-auto mt-5 max-w-[50ch] leading-relaxed text-[#3f5553]">
                  {c.ctaText}
                </p>

                <dl className="mx-auto mt-8 max-w-md space-y-3 text-left">
                  <LeaderRow term={c.durationSummary} value={price} />
                  <LeaderRow term="Anfahrt innerhalb Wiens" value="inklusive" italic />
                </dl>

                <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link href={c.bookingHref} className={BTN_SOLID}>
                    {c.ctaPrimaryLabel}
                  </Link>
                  <a href={c.telHref} className={BTN_OUTLINE}>
                    <Phone size={16} strokeWidth={2} aria-hidden={true} />
                    {c.phone}
                  </a>
                </div>
                <p className="mt-5 text-sm text-[#3f5553]">
                  <a
                    href={c.mailHref}
                    className={`${TEXT_LINK} inline-flex min-h-11 items-center gap-2 text-[#0d4f4f]`}
                  >
                    <Mail size={14} strokeWidth={2} aria-hidden={true} />
                    {c.email}
                  </a>
                </p>
              </div>
            </Frame>
          </div>
        </section>
      </main>

      <StickyCta
        href={c.bookingHref}
        telHref={c.telHref}
        label={c.ctaPrimaryLabel}
        watchIds={["hero-cta", "menu-cta", "final-cta", "site-footer"]}
      />
      <div id="site-footer">
        <Footer sanitySettings={c.settings} />
      </div>
    </>
  );
}
