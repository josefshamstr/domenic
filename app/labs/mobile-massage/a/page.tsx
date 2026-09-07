import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { Plus, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  GOOGLE_MAPS_URL,
  formatPrice,
  getMobileMassageContent,
  splitHeading,
} from "../_shared/content";
import { StickyCta } from "./StickyCta";

export const metadata: Metadata = {
  title: "A · Quiet Luxury – Mobile Massage Wien (Labs)",
  robots: { index: false, follow: false },
};

/**
 * Variante A · Quiet Luxury
 * Warmer Off-White-Grund, Fraunces als Display-Serife, Gold nur als Hairline,
 * Kapitälchen-Label und ein einziger Akzent im Pull-Quote. Teal als Text- und
 * Button-Farbe. Ruhig, viel Luft, keine Verläufe, keine farbigen Schatten.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

// ── Palette (alle Werte gegen #f6f2ec geprüft) ─────────────────────────────
// Teal #0d4f4f        8.4:1  – Headings, Buttons
// Ink #1c1a17        15+:1   – Fließtext
// Muted #5b554c       6.6:1  – Sekundärtext
// Gold-Text #856022   5.1:1  – Kapitälchen-Label (kleine Schrift)
// Gold-Accent #a67a2e 3.5:1  – nur große Schrift (Pull-Quote, Ziffern)
// Gold-Line #b8893a           – Hairlines (dekorativ)

const SERIF = "font-[family-name:var(--font-fraunces)]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f2ec]";
const FOCUS_ON_TEAL =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d4f4f]";

const BTN_BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium tracking-[0.01em] transition-colors duration-200";
const BTN_PRIMARY = `${BTN_BASE} bg-[#0d4f4f] text-white hover:bg-[#0a3f3f] ${FOCUS}`;
const BTN_GHOST = `${BTN_BASE} border border-[#0d4f4f]/60 text-[#0d4f4f] hover:border-[#0d4f4f] hover:bg-[#0d4f4f]/[0.04] ${FOCUS}`;
const BTN_PRIMARY_ON_TEAL = `${BTN_BASE} bg-[#f6f2ec] text-[#0d4f4f] hover:bg-white ${FOCUS_ON_TEAL}`;
const BTN_GHOST_ON_TEAL = `${BTN_BASE} border border-white/60 text-white hover:border-white hover:bg-white/5 ${FOCUS_ON_TEAL}`;

/** Kapitälchen-Label mit kurzer Gold-Hairline davor */
function Eyebrow({
  children,
  onTeal = false,
}: {
  children: React.ReactNode;
  onTeal?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] ${
        onTeal ? "text-[#d9b56a]" : "text-[#856022]"
      }`}
    >
      <span
        aria-hidden
        className={`h-px w-8 ${onTeal ? "bg-[#d9b56a]/70" : "bg-[#b8893a]"}`}
      />
      {children}
    </p>
  );
}

/** Foto im hohen 4:5-Rahmen mit versetzter 1px-Gold-Hairline */
function Frame({
  src,
  alt,
  position,
  sizes,
  priority = false,
  quality = 75,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  position: string;
  sizes: string;
  priority?: boolean;
  quality?: 75 | 85;
  caption?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-[#b8893a]"
        />
        <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e2d8]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            quality={quality}
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-7 text-sm leading-relaxed text-[#5b554c]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default async function VariantA() {
  const c = await getMobileMassageContent();
  const ratingLabel = c.reviews.rating.toLocaleString("de-AT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  // "Mobile Massage –" / "nachhaltige …" – hält den Gedankenstrich am Ende
  // der ersten Zeile statt als Waise am Zeilenanfang.
  const [headingLead, headingRest] = splitHeading(c.heroHeading);

  return (
    <div className={`${fraunces.variable} bg-[#f6f2ec] text-[#1c1a17]`}>
      <main className="overflow-x-clip selection:bg-[#0d4f4f]/15">
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32 lg:pt-36">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-20">
            <div>
              {/* Mobile Byline mit kleinem Rahmen */}
              <div className="mb-9 flex items-center gap-5 lg:hidden">
                <div className="relative h-[70px] w-14 shrink-0">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 border border-[#b8893a]"
                  />
                  <div className="relative h-full w-full overflow-hidden bg-[#e9e2d8]">
                    <Image
                      src={c.heroImageSrc}
                      alt={`${c.name}, diplomierter Heilmasseur in Wien`}
                      fill
                      priority
                      quality={85}
                      sizes="56px"
                      className="object-cover"
                      style={{ objectPosition: "50% 22%" }}
                    />
                  </div>
                </div>
                <div>
                  <span className={`${SERIF} block text-xl text-[#0d4f4f]`}>
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-[#5b554c]">
                    {c.identityLine}
                  </span>
                </div>
              </div>

              <Eyebrow>{c.heroBadge}</Eyebrow>

              <h1
                className={`${SERIF} mt-6 text-balance text-[clamp(2.5rem,5.4vw,4.5rem)] font-light leading-[1.04] tracking-[-0.015em] text-[#0d4f4f]`}
              >
                {headingLead}
                {headingRest && (
                  <>
                    {" "}
                    <span className="block">{headingRest}</span>
                  </>
                )}
              </h1>

              <p className="mt-7 max-w-[58ch] text-[17px] leading-relaxed text-[#5b554c] sm:text-lg">
                {c.heroSubtitle}
              </p>

              {/* Preis-Lockup */}
              <div className="mt-10">
                <span aria-hidden className="block h-px w-10 bg-[#b8893a]" />
                <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
                  <span
                    className={`${SERIF} text-[3.5rem] font-light leading-none tracking-[-0.02em] text-[#0d4f4f]`}
                  >
                    {formatPrice(c.priceAmount)}
                    <span className="ml-1.5 text-[2rem]">€</span>
                  </span>
                  <span className="pb-1 text-sm leading-snug">
                    <span className="block font-medium text-[#1c1a17]">
                      Fixpreis · {c.durationSummary}
                    </span>
                    <span className="mt-0.5 block text-[#5b554c]">
                      Anfahrt innerhalb Wiens inklusive
                    </span>
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div
                id="hero-cta"
                className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              >
                <Link href={c.bookingHref} className={BTN_PRIMARY}>
                  {c.ctaPrimaryLabel}
                </Link>
                <a href={c.telHref} className={BTN_GHOST}>
                  {c.phone}
                </a>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={c.mailHref}
                  className={`inline-flex min-h-11 items-center text-sm text-[#5b554c] underline decoration-[#b8893a] underline-offset-[5px] transition-colors hover:text-[#0d4f4f] ${FOCUS} rounded-sm`}
                >
                  {c.email}
                </a>
                <span
                  aria-hidden
                  className="hidden h-3.5 w-px bg-[#b8893a]/60 sm:block"
                />
                <span className="text-sm text-[#5b554c]">
                  {c.heroServiceLine}
                </span>
              </div>

              {/* Google-Bewertungen */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-10 flex w-fit min-h-11 flex-wrap items-center gap-x-3 gap-y-2 rounded-sm transition-opacity hover:opacity-75 ${FOCUS}`}
              >
                <span className="flex -space-x-2">
                  {c.reviews.avatars.slice(0, 3).map((a, i) => (
                    <span
                      key={`${a.name}-${i}`}
                      className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#f6f2ec] bg-[#0d4f4f]/10 text-[11px] font-medium text-[#0d4f4f]"
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
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className="fill-[#a67a2e] text-[#a67a2e]"
                      />
                    ))}
                  </span>
                  <span className="text-sm font-medium text-[#1c1a17]">
                    {ratingLabel}
                  </span>
                </span>
                <span className="text-sm text-[#5b554c]">
                  {c.reviews.count} Google-Bewertungen
                </span>
              </a>
            </div>

            {/* Portrait ab lg */}
            <div className="hidden lg:block">
              <Frame
                src={c.heroImageSrc}
                alt={`${c.name}, diplomierter Heilmasseur in Wien`}
                position="50% 22%"
                priority
                quality={85}
                sizes="(max-width: 1023px) 1px, 352px"
                caption={
                  <>
                    <span className={`${SERIF} block text-lg text-[#0d4f4f]`}>
                      {c.name}
                    </span>
                    <span className="mt-1 block">{c.identityLine}</span>
                  </>
                }
              />
            </div>
          </div>
        </section>

        {/* ── PREIS & AUSSTATTUNG ──────────────────────────────────── */}
        <section className="border-t border-[#b8893a]/40">
          <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
            <header className="max-w-2xl">
              <Eyebrow>Preis &amp; Ausstattung</Eyebrow>
              <h2
                className={`${SERIF} mt-6 text-balance text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-[#0d4f4f]`}
              >
                {c.priceHeading}
              </h2>
              <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[#5b554c]">
                {c.priceDescription}
              </p>
            </header>

            <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
              <Frame
                src={c.roomImageSrc}
                alt="Behandlungsraum von Domenic Hacker in der Josefstadt mit Massageliege"
                position="50% 100%"
                sizes="(max-width: 1024px) calc(100vw - 2.5rem), 352px"
                caption={c.roomCaption}
                className="mx-auto w-full max-w-sm lg:sticky lg:top-32 lg:mx-0 lg:max-w-none lg:self-start"
              />

              <div>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#856022]">
                  Im Preis enthalten
                </h3>
                <ul className="mt-5 border-y border-[#b8893a]/40 divide-y divide-[#b8893a]/40">
                  {[...c.included, c.includedExtra].map((item, i) => (
                    <li
                      key={item.title}
                      className="grid gap-x-8 gap-y-1 py-6 sm:grid-cols-[3rem_minmax(0,1fr)]"
                    >
                      <span
                        className={`${SERIF} text-[1.375rem] leading-none text-[#a67a2e] tabular-nums`}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-medium text-[#1c1a17]">{item.title}</p>
                        <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-[#5b554c]">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 max-w-[60ch] border-l border-[#b8893a] pl-5 text-sm leading-relaxed text-[#5b554c]">
                  {c.priceNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PULL-QUOTE (Signature Moment) ────────────────────────── */}
        <section
          aria-label="Leitsatz"
          className="border-y border-[#b8893a]/40 py-28 sm:py-40"
        >
          <p
            className={`${SERIF} mx-auto max-w-5xl px-5 text-balance text-center text-[clamp(2.75rem,9.5vw,8.25rem)] font-light leading-[1.02] tracking-[-0.025em] text-[#0d4f4f] sm:px-8`}
          >
            {c.pullQuote.lead}{" "}
            <em className="italic text-[#a67a2e]">{c.pullQuote.accent}</em>
          </p>
        </section>

        {/* ── ABLAUF ───────────────────────────────────────────────── */}
        <section>
          <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
            <header className="max-w-2xl">
              <Eyebrow>Ablauf</Eyebrow>
              <h2
                className={`${SERIF} mt-6 text-balance text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-[#0d4f4f]`}
              >
                {c.processHeading}
              </h2>
              <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[#5b554c]">
                {c.processDescription}
              </p>
            </header>

            <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-20">
              <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {c.processSteps.map((step, i) => (
                  <li
                    key={step.title}
                    className="border-t border-[#b8893a]/40 pt-6"
                  >
                    <span
                      className={`${SERIF} block text-[1.75rem] leading-none text-[#a67a2e] tabular-nums`}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-medium text-[#0d4f4f]">
                      <span className="sr-only">Schritt {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-[#5b554c]">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>

              <Frame
                src={c.treatmentImageSrc}
                alt="Massagebehandlung bei Domenic Hacker in warmem Licht"
                position="50% 50%"
                sizes="(max-width: 1024px) calc(100vw - 2.5rem), 320px"
                className="order-first mx-auto w-full max-w-sm lg:order-none lg:mx-0 lg:max-w-none"
              />
            </div>
          </div>
        </section>

        {/* ── BÜHNE & HOTEL ────────────────────────────────────────── */}
        <section className="border-t border-[#b8893a]/40">
          <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
              <Frame
                src={c.stageImageSrc}
                alt={`${c.name} als B-Boy auf der Bühne`}
                position="50% 55%"
                sizes="(max-width: 1024px) calc(100vw - 2.5rem), 352px"
                caption={c.stageCaption}
                className="mx-auto w-full max-w-sm lg:sticky lg:top-32 lg:mx-0 lg:max-w-none lg:self-start"
              />

              <div>
                <Eyebrow>Hintergrund</Eyebrow>
                <h2
                  className={`${SERIF} mt-6 text-balance text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-[#0d4f4f]`}
                >
                  {c.stageHeading}
                </h2>
                <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[#5b554c]">
                  {c.stageText}
                </p>

                <span
                  aria-hidden
                  className="my-14 block h-px w-full bg-[#b8893a]/40"
                />

                <Eyebrow>Auf Anfrage</Eyebrow>
                <h3
                  className={`${SERIF} mt-6 text-balance text-[clamp(1.75rem,3vw,2.375rem)] font-light leading-[1.12] text-[#0d4f4f]`}
                >
                  {c.vipHeading}
                </h3>
                <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-[#5b554c]">
                  {c.vipText}
                </p>
                <ul className="mt-8 border-y border-[#b8893a]/40 divide-y divide-[#b8893a]/40">
                  {c.vipPoints.map((point) => (
                    <li key={point} className="flex items-start gap-4 py-4">
                      <span
                        aria-hidden
                        className="mt-[0.8em] h-px w-5 shrink-0 bg-[#b8893a]"
                      />
                      <span className="leading-relaxed text-[#1c1a17]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a href={c.telHref} className={BTN_GHOST}>
                    Anrufen · {c.phone}
                  </a>
                  <a href={c.mailHref} className={BTN_GHOST}>
                    Per E-Mail anfragen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FÜR WEN & WO ─────────────────────────────────────────── */}
        <section className="border-t border-[#b8893a]/40">
          <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
              <div>
                <Eyebrow>Für wen</Eyebrow>
                <h2
                  className={`${SERIF} mt-6 text-balance text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-[#0d4f4f]`}
                >
                  {c.forWhomHeading}
                </h2>
                <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[#5b554c]">
                  {c.forWhomDescription}
                </p>
                <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {c.occasions.map((label) => (
                    <li key={label} className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className="mt-[0.8em] h-px w-5 shrink-0 bg-[#b8893a]"
                      />
                      <span className="leading-relaxed text-[#1c1a17]">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden
                  className="my-14 block h-px w-full bg-[#b8893a]/40"
                />

                <Eyebrow>Einzugsgebiet</Eyebrow>
                <h3
                  className={`${SERIF} mt-6 text-balance text-[clamp(1.75rem,3vw,2.375rem)] font-light leading-[1.12] text-[#0d4f4f]`}
                >
                  {c.areaHeading}
                </h3>
                <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-[#5b554c]">
                  {c.areaDescription}
                </p>
                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[15px]">
                  {c.areaDistricts.map((d) => {
                    const [code, ...rest] = d.split(" ");
                    return (
                      <li key={d} className="text-[#1c1a17]">
                        <span className="mr-1.5 font-medium tabular-nums text-[#0d4f4f]">
                          {code}
                        </span>
                        {rest.join(" ")}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-10 max-w-[60ch] border-l border-[#b8893a] pl-5 text-sm leading-relaxed text-[#5b554c]">
                  <span className="font-medium text-[#0d4f4f]">
                    Lieber in die Praxis?{" "}
                  </span>
                  Die Behandlungsräume liegen in der {c.practiceAddress}{" "}
                  (Josefstadt) – dort gibt es zusätzlich Anwendungen, die
                  zuhause nicht möglich sind.
                </p>
              </div>

              <Frame
                src={c.treatmentWideImageSrc}
                alt="Behandlung in der Praxis von Domenic Hacker"
                position="50% 40%"
                sizes="(max-width: 1024px) calc(100vw - 2.5rem), 352px"
                className="mx-auto w-full max-w-sm lg:sticky lg:top-32 lg:mx-0 lg:max-w-none lg:self-start"
              />
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="border-t border-[#b8893a]/40">
          <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
              <header className="lg:sticky lg:top-32 lg:self-start">
                <Eyebrow>Fragen</Eyebrow>
                <h2
                  className={`${SERIF} mt-6 text-balance text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-[#0d4f4f]`}
                >
                  {c.faqHeading}
                </h2>
                <p className="mt-6 max-w-[40ch] leading-relaxed text-[#5b554c]">
                  {c.faqIntro}
                </p>
              </header>

              <div className="border-y border-[#b8893a]/40 divide-y divide-[#b8893a]/40">
                {c.faqs.map((faq) => (
                  <details key={faq._key} className="group">
                    <summary
                      className={`flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 rounded-sm py-5 text-[17px] font-medium leading-snug text-[#1c1a17] transition-colors hover:text-[#0d4f4f] [&::-webkit-details-marker]:hidden ${FOCUS}`}
                    >
                      <span className="text-balance">{faq.question}</span>
                      <Plus
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden={true}
                        className="mt-1 shrink-0 text-[#856022] motion-safe:transition-transform motion-safe:duration-300 group-open:rotate-45"
                      />
                    </summary>
                    <p className="max-w-[65ch] pb-7 leading-relaxed text-[#5b554c]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section id="final-cta" className="bg-[#0d4f4f] text-white">
          <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex justify-center">
                <Eyebrow onTeal>Kontakt</Eyebrow>
              </div>
              <h2
                className={`${SERIF} mt-7 text-balance text-[clamp(2.25rem,4.6vw,3.75rem)] font-light leading-[1.06] tracking-[-0.015em]`}
              >
                {c.ctaHeading}
              </h2>
              <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-relaxed text-white/80">
                {c.ctaText}
              </p>

              <span
                aria-hidden
                className="mx-auto mt-10 block h-px w-10 bg-[#d9b56a]/70"
              />
              <p className={`${SERIF} mt-5 text-xl font-light text-white/90`}>
                {formatPrice(c.priceAmount)} € · {c.durationSummary} · Anfahrt
                in Wien inklusive
              </p>

              <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link href={c.bookingHref} className={BTN_PRIMARY_ON_TEAL}>
                  {c.ctaPrimaryLabel}
                </Link>
                <a href={c.telHref} className={BTN_GHOST_ON_TEAL}>
                  {c.phone}
                </a>
              </div>
              <a
                href={c.mailHref}
                className={`mt-7 inline-flex min-h-11 items-center rounded-sm text-sm text-white/80 underline decoration-[#d9b56a]/70 underline-offset-[5px] transition-colors hover:text-white ${FOCUS_ON_TEAL}`}
              >
                {c.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <StickyCta
        href={c.bookingHref}
        telHref={c.telHref}
        label={c.ctaPrimaryLabel}
        watchIds={["hero-cta", "final-cta", "site-footer"]}
      />
      <div id="site-footer">
        <Footer sanitySettings={c.settings} />
      </div>
    </div>
  );
}
