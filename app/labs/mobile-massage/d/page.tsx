import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";
import { Plus, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  getMobileMassageContent,
  formatPrice,
  GOOGLE_MAPS_URL,
} from "../_shared/content";
import { StickyCta } from "./StickyCta";

/**
 * Variante D · Minimal One-Column
 * Eine schmale, zentrierte Spalte auf Weiß – die Seite liest sich wie ein
 * sorgfältig gesetzter Brief. Keine Karten, keine Bänder, keine Formen.
 * Drei Fotos, Hairlines zwischen den Abschnitten, der Preis als Schwerpunkt.
 */

const serif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-d-serif",
});

export const metadata: Metadata = {
  title: "D · Minimal One-Column – Mobile Massage Wien",
};

const TEAL = "#0d4f4f";
const CORAL = "#e8654a";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2";

const BTN_SOLID = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#0d4f4f] px-7 py-3 font-sans text-base font-semibold text-white transition-colors duration-200 hover:bg-[#0b4343] ${FOCUS}`;
const BTN_OUTLINE = `inline-flex min-h-12 items-center justify-center rounded-full border border-[#0d4f4f] px-7 py-3 font-sans text-base font-semibold text-[#0d4f4f] transition-colors duration-200 hover:bg-[#0d4f4f]/5 ${FOCUS}`;

const TEXT_LINK = `underline decoration-[#0d4f4f]/30 underline-offset-[0.2em] transition-colors duration-200 hover:decoration-[#0d4f4f] rounded-sm ${FOCUS}`;

const IMAGE_SIZES = "(min-width: 768px) 672px, 100vw";

/** Running text: 18px/1.7, measure capped at ~70 characters in Newsreader. */
const BODY = "max-w-[37rem] text-lg leading-[1.7]";

const formatRating = (rating: number) =>
  new Intl.NumberFormat("de-AT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);

function Rule() {
  return <hr className="border-0 border-t border-[#0d4f4f]/15" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-balance text-3xl font-medium leading-[1.12] tracking-[-0.01em] text-[#0d4f4f] sm:text-4xl">
      {children}
    </h2>
  );
}

function Figure({
  src,
  alt,
  caption,
  aspect,
  objectPosition,
  quality = 75,
}: {
  src: string;
  alt: string;
  caption: string;
  aspect: "4/5" | "4/3";
  objectPosition: string;
  quality?: 75 | 85;
}) {
  return (
    <figure className="my-14 last:mb-0 sm:my-16">
      <div
        className={`relative w-full overflow-hidden bg-[#0d4f4f]/5 ${
          aspect === "4/5" ? "aspect-[4/5]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={IMAGE_SIZES}
          quality={quality}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      <figcaption className="mt-3 font-sans text-sm leading-relaxed text-[#555]">
        {caption}
      </figcaption>
    </figure>
  );
}

export default async function VariantD() {
  const content = await getMobileMassageContent();
  const {
    name,
    identityLine,
    heroHeading,
    heroSubtitle,
    heroBadge,
    priceAmount,
    durationSummary,
    bookingHref,
    ctaPrimaryLabel,
    telHref,
    phone,
    mailHref,
    email,
    reviews,
    heroImageSrc,
    roomImageSrc,
    roomCaption,
    stageImageSrc,
    stageCaption,
    priceHeading,
    priceDescription,
    included,
    includedExtra,
    priceNote,
    processHeading,
    processDescription,
    processSteps,
    pullQuote,
    stageHeading,
    stageText,
    vipHeading,
    vipText,
    vipPoints,
    forWhomHeading,
    forWhomDescription,
    occasions,
    areaHeading,
    areaDescription,
    areaDistricts,
    practiceAddress,
    faqHeading,
    faqIntro,
    faqs,
    ctaHeading,
    ctaText,
    settings,
  } = content;

  const roundedRating = Math.round(reviews.rating);
  // Verbatim heading; the space before the en dash becomes a no-break space so
  // the dash never opens a line on narrow screens.
  const headingText = heroHeading.replace(" \u2013 ", "\u00a0\u2013 ");
  const [profession] = identityLine.split(" · ");

  return (
    <>
      <main
        className={`${serif.variable} bg-white text-[#111] [font-family:var(--font-d-serif),Georgia,serif]`}
      >
        <div className="mx-auto w-full max-w-2xl px-5 sm:px-6">
          {/* ───────────── Hero: text only, price as centre of gravity ───────────── */}
          <section className="pt-32 pb-16 sm:pt-32 sm:pb-20">
            {/* Letterhead: name on its own line below sm, one line from sm up. */}
            <p className="font-sans text-sm font-medium tracking-[0.02em] text-[#555]">
              <span className="block text-[#111] sm:inline sm:text-[#555]">
                {name}
              </span>
              <span aria-hidden={true} className="hidden sm:inline">
                {" · "}
              </span>
              <span className="block sm:inline">{identityLine}</span>
            </p>

            <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-[-0.015em] text-[#0d4f4f] sm:text-5xl">
              {headingText}
            </h1>

            <p className={`mt-7 ${BODY} text-[#111]`}>
              {heroSubtitle}
            </p>

            {/* Price lockup */}
            <div className="mt-12 sm:mt-14">
              <p className="flex items-baseline gap-2 text-[#0d4f4f]">
                <span className="text-7xl font-medium leading-none tracking-[-0.03em] lining-nums tabular-nums">
                  {formatPrice(priceAmount)}
                </span>
                <span className="text-4xl font-normal leading-none">€</span>
              </p>
              <p className="mt-4 text-xl leading-snug text-[#111]">
                {durationSummary}
              </p>
              <p className="mt-1 text-xl leading-snug text-[#555]">
                Anfahrt innerhalb Wiens inklusive
              </p>
            </div>

            {/* CTAs */}
            <div
              id="hero-cta"
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link href={bookingHref} className={BTN_SOLID}>
                {ctaPrimaryLabel}
              </Link>
              <a href={telHref} className={BTN_OUTLINE}>
                {phone}
              </a>
            </div>
            <p className="mt-5 font-sans text-sm leading-relaxed text-[#555]">
              Oder per E-Mail:{" "}
              <a href={mailHref} className={`${TEXT_LINK} text-[#0d4f4f]`}>
                {email}
              </a>
            </p>

            {/* Google rating row */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex min-h-11 items-center gap-3 rounded-sm font-sans text-sm text-[#111] ${FOCUS}`}
              aria-label={`${formatRating(reviews.rating)} von 5 Sternen bei ${reviews.count} Google-Bewertungen – auf Google Maps öffnen`}
            >
              <span className="flex items-center gap-0.5" aria-hidden={true}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    strokeWidth={1.5}
                    className={
                      i < roundedRating
                        ? "fill-[#f2a93b] text-[#f2a93b]"
                        : "text-[#f2a93b]"
                    }
                  />
                ))}
              </span>
              <span>
                <span className="font-semibold text-[#0d4f4f]">
                  {formatRating(reviews.rating)}
                </span>{" "}
                · {reviews.count} Google-Bewertungen
              </span>
            </a>
          </section>

          {/* Photo 1 – portrait */}
          <Figure
            src={heroImageSrc}
            alt={`${name}, ${profession}`}
            caption={`${name} · ${heroBadge}`}
            aspect="4/5"
            objectPosition="50% 22%"
            quality={85}
          />

          <Rule />

          {/* ───────────── Price ───────────── */}
          <section className="py-14 sm:py-20">
            <SectionHeading>{priceHeading}</SectionHeading>
            <p className={`mt-6 ${BODY}`}>{priceDescription}</p>

            {/* Photo 2 – room */}
            <Figure
              src={roomImageSrc}
              alt="Behandlungsraum mit Massageliege in der Praxis Josefstadt"
              caption={roomCaption}
              aspect="4/3"
              objectPosition="50% 100%"
            />

            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-[#0d4f4f]">
              Im Preis enthalten
            </h3>
            <ul className="mt-4 divide-y divide-[#0d4f4f]/15 border-y border-[#0d4f4f]/15">
              {[...included, includedExtra].map((item) => (
                <li key={item.title} className="py-4">
                  <p className="text-lg font-medium leading-snug text-[#0d4f4f]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-base leading-[1.7] text-[#555]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[37rem] text-base leading-[1.7] text-[#555]">
              {priceNote}
            </p>
          </section>

          <Rule />

          {/* ───────────── Process ───────────── */}
          <section id="ablauf" className="py-14 sm:py-20">
            <SectionHeading>{processHeading}</SectionHeading>
            <p className={`mt-6 ${BODY}`}>{processDescription}</p>

            <ol className="mt-10 space-y-8">
              {processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2.25rem_1fr] gap-x-2 sm:grid-cols-[4rem_1fr]"
                >
                  <span
                    aria-hidden={true}
                    /* 20px at 600 weight keeps the coral on white above the
                       3:1 threshold for large text. */
                    className="pt-0.5 font-sans text-xl font-semibold leading-snug tabular-nums text-[#e8654a]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium leading-snug text-[#0d4f4f]">
                      {step.title}
                    </h3>
                    <p className={`mt-2 ${BODY}`}>
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Rule />

          {/* ───────────── Pull quote – the one oversized moment ───────────── */}
          <section className="py-16 sm:py-24">
            <p className="text-balance text-4xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-6xl">
              <span style={{ color: TEAL }}>{pullQuote.lead}</span>{" "}
              <em className="italic" style={{ color: CORAL }}>
                {pullQuote.accent}
              </em>
            </p>
          </section>

          <Rule />

          {/* ───────────── Stage / B-Boy ───────────── */}
          <section className="py-14 sm:py-20">
            <SectionHeading>{stageHeading}</SectionHeading>
            <p className={`mt-6 ${BODY}`}>{stageText}</p>

            {/* Photo 3 – stage */}
            <Figure
              src={stageImageSrc}
              /* The figcaption below carries the description – an identical alt
                 would only make screen readers announce it twice. */
              alt=""
              caption={stageCaption}
              aspect="4/5"
              objectPosition="44% 55%"
            />
          </section>

          <Rule />

          {/* ───────────── Hotel / Suite / Backstage ───────────── */}
          <section className="py-14 sm:py-20">
            <SectionHeading>{vipHeading}</SectionHeading>
            <p className={`mt-6 ${BODY}`}>{vipText}</p>
            <ul className="mt-8 divide-y divide-[#0d4f4f]/15 border-y border-[#0d4f4f]/15">
              {vipPoints.map((point) => (
                <li key={point} className="py-3.5 text-lg leading-[1.6]">
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <Rule />

          {/* ───────────── For whom / where ───────────── */}
          <section className="py-14 sm:py-20">
            <SectionHeading>{forWhomHeading}</SectionHeading>
            <p className={`mt-6 ${BODY}`}>{forWhomDescription}</p>
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2 text-lg leading-[1.6] sm:grid-cols-2">
              {occasions.map((occasion) => (
                <li key={occasion} className="flex gap-3">
                  <span aria-hidden={true} className="text-[#e8654a]">
                    –
                  </span>
                  <span>{occasion}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-14 text-2xl font-medium leading-snug text-[#0d4f4f]">
              {areaHeading}
            </h3>
            <p className={`mt-4 ${BODY}`}>{areaDescription}</p>
            <p className={`mt-6 ${BODY} text-[#555]`}>
              {areaDistricts.map((district, i) => (
                <span key={district}>
                  <span className="whitespace-nowrap">{district}</span>
                  {i < areaDistricts.length - 1 && (
                    <span aria-hidden={true}> · </span>
                  )}
                </span>
              ))}
            </p>
            <p className="mt-6 font-sans text-sm leading-relaxed text-[#555]">
              Meine Praxis: {practiceAddress}
            </p>
          </section>

          <Rule />

          {/* ───────────── FAQ ───────────── */}
          <section className="py-14 sm:py-20">
            <SectionHeading>{faqHeading}</SectionHeading>
            <p className={`mt-6 ${BODY}`}>{faqIntro}</p>

            <div className="mt-10 border-b border-[#0d4f4f]/15">
              {faqs.map((faq) => (
                <details
                  key={faq._key}
                  className="group border-t border-[#0d4f4f]/15"
                >
                  <summary
                    className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-xl font-medium leading-snug text-[#0d4f4f] marker:content-none [&::-webkit-details-marker]:hidden ${FOCUS} rounded-sm`}
                  >
                    <span className="text-balance">{faq.question}</span>
                    <Plus
                      size={20}
                      strokeWidth={1.75}
                      aria-hidden={true}
                      className="shrink-0 text-[#e8654a] motion-safe:transition-transform motion-safe:duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className={`pb-6 pr-10 ${BODY}`}>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <Rule />

          {/* ───────────── Closing CTA ───────────── */}
          <section id="final-cta" className="py-16 sm:py-24">
            <SectionHeading>{ctaHeading}</SectionHeading>
            <p className={`mt-6 ${BODY}`}>{ctaText}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={bookingHref} className={BTN_SOLID}>
                {ctaPrimaryLabel}
              </Link>
              <a href={telHref} className={BTN_OUTLINE}>
                {phone}
              </a>
            </div>
            <p className="mt-5 font-sans text-sm leading-relaxed text-[#555]">
              Oder per E-Mail:{" "}
              <a href={mailHref} className={`${TEXT_LINK} text-[#0d4f4f]`}>
                {email}
              </a>
            </p>

            <p className="mt-14 text-lg leading-[1.7]">
              Herzlich,
              <br />
              <span className="text-2xl font-medium text-[#0d4f4f]">{name}</span>
            </p>
          </section>
        </div>
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
