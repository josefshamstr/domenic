import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist_Mono } from "next/font/google";
import {
  ArrowUpRight,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Plus,
  Star,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import {
  GOOGLE_MAPS_URL,
  formatPrice,
  getMobileMassageContent,
  splitHeading,
} from "../_shared/content";

export const metadata: Metadata = {
  title: "G · Bold Poster – Mobile Massage Labs",
};

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-g-mono",
});

/* ── Tokens: teal #0d4f4f · deep teal #062e2e · coral #e8654a · gold #f2a93b · ink #111 ── */
const MONO = "[font-family:var(--font-g-mono)]";
const LABEL = `${MONO} text-[11px] font-bold uppercase tracking-[0.22em] sm:text-xs`;
const DISPLAY = "font-black uppercase leading-[0.96] tracking-[-0.04em]";

const RING = "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-offset-2";
const PILL = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-bold transition-colors duration-200 ${RING}`;
/* Pills on dark/coral grounds use a gold focus ring; the paper-ground hero uses teal. */
const PILL_BLACK = `${PILL} bg-[#111] text-white hover:bg-black focus-visible:ring-[#f2a93b]`;
const PILL_WHITE = `${PILL} border-[3px] border-[#111] bg-white text-[#111] hover:bg-[#f3f3f0] focus-visible:ring-[#f2a93b]`;
const PILL_BLACK_LIGHT = `${PILL} bg-[#111] text-white hover:bg-black focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-[#f4f1e9]`;
const PILL_WHITE_LIGHT = `${PILL} border-[3px] border-[#111] bg-white text-[#111] hover:bg-[#fffdf8] focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-[#f4f1e9]`;

const CONTAINER = "mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12";
const GRID = "grid grid-cols-12 gap-x-5 sm:gap-x-6 lg:gap-x-8";

/** Highlights the last occurrence of `word` inside `text` without altering the text. */
function Accent({
  text,
  word,
  className,
}: {
  text: string;
  word: string;
  className: string;
}) {
  const idx = text.toLowerCase().lastIndexOf(word.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className={className}>{text.slice(idx, idx + word.length)}</span>
      {text.slice(idx + word.length)}
    </>
  );
}

/** Teal duotone: grayscale image → multiply (highlights → light teal) → lighten (shadows → deep teal). */
function Duotone({
  src,
  alt,
  sizes,
  priority = false,
  quality = 75,
  position = "50% 55%",
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  quality?: 75 | 85;
  position?: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 isolate overflow-hidden bg-[#062e2e] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        quality={quality}
        sizes={sizes}
        className="object-cover grayscale contrast-125"
        style={{ objectPosition: position }}
      />
      <div aria-hidden className="absolute inset-0 bg-[#2fb5ac] mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 bg-[#062e2e] mix-blend-lighten" />
    </div>
  );
}

export default async function BoldPosterVariant() {
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

  const [headingLead, headingRest] = splitHeading(heroHeading);
  const price = formatPrice(priceAmount);

  const sentences = heroSubtitle.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [heroSubtitle];
  const subtitleLead = sentences.slice(0, 2).join("").trim();
  const subtitleRest = sentences.slice(2).join("").trim() || null;

  const rise = (delay: string) =>
    `motion-safe:animate-[mm-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both] ${delay}`;

  return (
    <>
      <main className={`${mono.variable} bg-white text-[#111] selection:bg-[#f2a93b] selection:text-[#111]`}>
        {/* ── HERO · poster: headline + number + dancer ───────────── */}
        <section className="relative isolate overflow-hidden bg-[#f4f1e9] text-[#111]">
          <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-[#f2a93b]" />

          <div className={`${CONTAINER} flex min-h-[100svh] flex-col justify-center pb-14 pt-24 sm:pt-28 lg:pb-20`}>
            <div className={`${GRID} gap-y-12 lg:items-center`}>
              {/* ── type column ── */}
              <div className="col-span-12 lg:col-span-8">
                <span
                  className={`inline-flex min-h-9 items-center gap-2 rounded-full bg-[#111] px-4 text-white ${rise("[animation-delay:0ms]")}`}
                >
                  <MapPin size={14} strokeWidth={2.5} aria-hidden={true} />
                  <span className={LABEL}>{heroBadge}</span>
                </span>

                <h1
                  className={`${DISPLAY} mt-6 text-[clamp(2.75rem,6vw,6.5rem)] ${rise("[animation-delay:80ms]")}`}
                >
                  {headingRest ? (
                    <>
                      <span className="block">{headingLead}</span>
                      <span className="block">
                        <Accent text={headingRest} word="zuhause" className="text-[#c2452a]" />
                      </span>
                    </>
                  ) : (
                    <Accent text={headingLead} word="zuhause" className="text-[#c2452a]" />
                  )}
                </h1>

                <div
                  className={`mt-8 border-t-[3px] border-[#111] pt-6 ${rise("[animation-delay:160ms]")}`}
                >
                  <p className="max-w-[58ch] text-base leading-relaxed text-[#333] sm:text-lg">
                    {subtitleLead}
                    {subtitleRest && <span className="hidden sm:inline"> {subtitleRest}</span>}
                  </p>

                  <p className={`${LABEL} mt-6 text-[#0d4f4f]`}>
                    {price} € Fixpreis · {durationSummary} · Anfahrt innerhalb Wiens inklusive
                  </p>

                  <div
                    id="hero-cta"
                    className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                  >
                    <Link href={bookingHref} className={PILL_BLACK_LIGHT}>
                      <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                      {ctaPrimaryLabel}
                    </Link>
                    <a href={telHref} className={PILL_WHITE_LIGHT}>
                      <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                      {phone}
                    </a>
                    <a
                      href={mailHref}
                      className={`${RING} inline-flex min-h-11 items-center gap-2 self-start rounded-full px-2 text-sm font-bold text-[#111] underline decoration-[#e8654a] decoration-[3px] underline-offset-4 hover:text-[#c2452a] focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-[#f4f1e9] sm:self-auto`}
                    >
                      <Mail size={15} strokeWidth={2.5} aria-hidden={true} />
                      {email}
                    </a>
                  </div>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${RING} mt-6 inline-flex min-h-11 w-fit flex-wrap items-center gap-x-3 gap-y-1 rounded-full pr-2 hover:opacity-80 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-[#f4f1e9]`}
                  >
                    <span className="flex -space-x-2">
                      {reviews.avatars.slice(0, 3).map((a, i) => (
                        <span
                          key={i}
                          className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-[#f4f1e9] bg-[#0d4f4f] text-xs font-bold text-white"
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
                    <span className="flex items-center gap-1" aria-hidden={true}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-[#e8654a] text-[#e8654a]" />
                      ))}
                    </span>
                    <span className="text-sm font-black leading-none text-[#111]">
                      {reviews.rating.toFixed(1)}
                    </span>
                    <span className={`${LABEL} text-[#444]`}>
                      {reviews.count} Google-Bewertungen
                    </span>
                  </a>
                </div>
              </div>

              {/* ── dancer + poster number ── */}
              <figure
                className={`col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9 ${rise("[animation-delay:240ms]")}`}
              >
                <div className="relative">
                  <div className="relative aspect-[3/4] overflow-hidden border-[3px] border-[#111]">
                    <Duotone
                      src={stageImageSrc}
                      alt={stageCaption}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 420px"
                      priority
                      quality={85}
                      position="45% 50%"
                    />
                  </div>
                  <p
                    aria-hidden
                    className="absolute -left-3 top-6 flex items-end gap-1.5 border-[3px] border-[#111] bg-[#e8654a] px-4 py-2 sm:-left-6 sm:top-8 sm:px-5 sm:py-3 lg:-left-10"
                  >
                    <span className="text-[clamp(2.75rem,7vw,4.25rem)] font-black leading-[0.85] tracking-[-0.05em] text-[#111]">
                      {price}
                    </span>
                    <span className="pb-1 text-2xl font-black text-[#111] sm:text-3xl">€</span>
                  </p>
                </div>
                <figcaption className="mt-3 text-sm leading-relaxed text-[#555]">
                  {stageCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── CORAL · price + included ────────────────────────────── */}
        <section className="bg-[#e8654a] text-[#111]">
          <div className={`${CONTAINER} py-16 sm:py-20 lg:py-28`}>
            <div className={`${GRID} gap-y-14`}>
              <div className="col-span-12 lg:col-span-5">
                <p className={LABEL}>Preis</p>
                <h2 className={`${DISPLAY} mt-4 text-balance text-[clamp(2.25rem,5vw,4.5rem)] text-white`}>
                  {priceHeading}
                </h2>

                <div className="mt-10 border-y-[3px] border-[#111]">
                  <p className="flex items-end gap-3 py-4">
                    <span className="text-[clamp(5rem,12vw,9rem)] font-black leading-[0.85] tracking-[-0.05em] text-white">
                      {price}
                    </span>
                    <span className="pb-2 text-4xl font-black text-[#111] sm:text-5xl">€</span>
                  </p>
                  <dl className={`${MONO} grid grid-cols-2 border-t-[3px] border-[#111] font-bold uppercase text-[#111]`}>
                    <div className="border-r-[3px] border-[#111] py-3 pr-4">
                      <dt className="text-[10px] tracking-[0.22em]">Dauer</dt>
                      <dd className="mt-1.5 text-sm tracking-[0.08em] sm:text-base">{durationSummary}</dd>
                    </div>
                    <div className="py-3 pl-4">
                      <dt className="text-[10px] tracking-[0.22em]">Anfahrt</dt>
                      <dd className="mt-1.5 text-sm tracking-[0.08em] sm:text-base">
                        innerhalb Wiens inklusive
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-[#1a1a1a] sm:text-lg">
                  {priceDescription}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <p className={LABEL}>Im Preis enthalten</p>
                <ol className="mt-4 border-t-[3px] border-[#111]">
                  {[...included, includedExtra].map((item, i) => (
                    <li
                      key={item.title}
                      className="grid grid-cols-[3rem_1fr] gap-x-4 border-b-[3px] border-[#111] py-5 sm:grid-cols-[4rem_1fr]"
                    >
                      <span className={`${MONO} pt-1 text-sm font-bold tabular-nums text-[#111] sm:text-base`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 max-w-[60ch] leading-relaxed text-[#1a1a1a]">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* room + note + CTA band */}
            <div className={`${GRID} mt-14 gap-y-10 border-t-[3px] border-[#111] pt-12 lg:mt-20 lg:pt-16`}>
              <figure className="col-span-12 lg:col-span-6">
                <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-[#111]">
                  <Image
                    src={roomImageSrc}
                    alt="Die Massageliege im Behandlungsraum von Domenic Hacker"
                    fill
                    className="object-cover object-bottom"
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>
                <figcaption className="mt-3 max-w-[58ch] text-sm leading-relaxed text-[#1a1a1a]">
                  {roomCaption}
                </figcaption>
              </figure>

              <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:self-center">
                <p className={LABEL}>Gut zu wissen</p>
                <p className="mt-4 max-w-[46ch] text-lg font-bold leading-snug text-[#111] sm:text-xl">
                  {priceNote}
                </p>
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link href={bookingHref} className={`${PILL_BLACK} focus-visible:ring-offset-[#e8654a]`}>
                    <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                    {ctaPrimaryLabel}
                  </Link>
                  <a href={telHref} className={`${PILL_WHITE} focus-visible:ring-offset-[#e8654a]`}>
                    <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── WHITE · process as four big numbered blocks ─────────── */}
        <section id="ablauf" className="bg-white text-[#111]">
          <div className={`${CONTAINER} py-16 sm:py-20 lg:py-28`}>
            <div className={`${GRID} gap-y-6`}>
              <div className="col-span-12 lg:col-span-7">
                <p className={`${LABEL} text-[#0d4f4f]`}>Ablauf</p>
                <h2 className={`${DISPLAY} mt-4 text-balance text-[clamp(2.25rem,5.5vw,5rem)] text-[#0d4f4f]`}>
                  {processHeading}
                </h2>
              </div>
              <p className="col-span-12 max-w-[58ch] self-end text-base leading-relaxed text-[#333] sm:text-lg lg:col-span-4 lg:col-start-9">
                {processDescription}
              </p>
            </div>

            <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
              {processSteps.map((step, i) => (
                <li key={step.title} className="border-t-[3px] border-[#111] pt-4">
                  <span
                    className={`${DISPLAY} block text-[clamp(3.5rem,6vw,5.5rem)] tabular-nums text-[#0d4f4f]`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] leading-relaxed text-[#333]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── BLACK · stage story ─────────────────────────────────── */}
        <section className="bg-[#111] text-white">
          <div className={`${CONTAINER} py-16 sm:py-20 lg:py-28`}>
            <div className={`${GRID} gap-y-12`}>
              <figure className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-5 lg:col-start-1">
                <div className="relative aspect-[4/5] border-[3px] border-white">
                  <Duotone
                    src={stageImageSrc}
                    alt={stageCaption}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 520px"
                    position="45% 50%"
                  />
                </div>
                <figcaption className={`${LABEL} mt-3 text-white/70`}>{stageCaption}</figcaption>
              </figure>

              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <p className={`${LABEL} text-[#f2a93b]`}>Hintergrund</p>
                <h2 className={`${DISPLAY} mt-4 text-balance text-[clamp(2.25rem,4.6vw,4.25rem)] text-white`}>
                  {stageHeading}
                </h2>
                <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-white/85 sm:text-lg">
                  {stageText}
                </p>
                <div className="relative mt-8 aspect-[16/9] overflow-hidden border-[3px] border-white">
                  <Image
                    src={treatmentImageSrc}
                    alt="Behandlung in der Praxis von Domenic Hacker"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 660px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TEAL · Hotel, Suite, Backstage + portrait cut-in ────── */}
        <section className="relative bg-[#0d4f4f] text-white">
          <div className={`${CONTAINER} pb-16 sm:pb-20 lg:pb-28`}>
            <div className={`${GRID} gap-y-12`}>
              <figure className="relative z-10 col-span-12 -mt-10 sm:col-span-7 sm:-mt-14 lg:col-span-4 lg:-mt-20">
                <div className="relative aspect-[4/5] overflow-hidden border-[3px] border-[#f2a93b] bg-[#062e2e] lg:aspect-[3/4]">
                  <Image
                    src={heroImageSrc}
                    alt={`${name}, diplomierter Heilmasseur in Wien`}
                    fill
                    className="object-cover object-[50%_22%]"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 58vw, 440px"
                  />
                </div>
                <figcaption className="border-[3px] border-t-0 border-[#f2a93b] bg-[#111] px-4 py-3">
                  <span className="block text-lg font-black">{name}</span>
                  <span className={`${MONO} mt-1 block text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-white/80`}>
                    {identityLine}
                  </span>
                </figcaption>
              </figure>

              <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pt-10">
                <p className={`${LABEL} text-[#f2a93b]`}>{heroServiceLine}</p>
                <h2 className={`${DISPLAY} mt-4 text-balance text-[clamp(2.5rem,6.5vw,6rem)] text-[#f2a93b]`}>
                  {vipHeading}
                </h2>
                <p className="mt-8 max-w-[60ch] text-base leading-relaxed text-white/85 sm:text-lg">
                  {vipText}
                </p>

                <ul className="mt-10 border-t-[3px] border-white/90">
                  {vipPoints.map((point, i) => (
                    <li
                      key={point}
                      className="grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-b-[3px] border-white/90 py-4"
                    >
                      <span className={`${MONO} text-sm font-bold tabular-nums text-[#f2a93b]`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-bold leading-snug sm:text-xl">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <a href={telHref} className={`${PILL_BLACK} focus-visible:ring-offset-[#0d4f4f]`}>
                    <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                    {phone}
                  </a>
                  <a href={mailHref} className={`${PILL_WHITE} focus-visible:ring-offset-[#0d4f4f]`}>
                    <Mail size={16} strokeWidth={2.5} aria-hidden={true} />
                    E-Mail schreiben
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHITE · occasions + districts + practice note ───────── */}
        <section className="bg-white text-[#111]">
          <div className={`${CONTAINER} py-16 sm:py-20 lg:py-28`}>
            <div className={`${GRID} gap-y-12`}>
              <div className="col-span-12 lg:col-span-6">
                <p className={`${LABEL} text-[#0d4f4f]`}>Für wen</p>
                <h2 className={`${DISPLAY} mt-4 text-balance text-[clamp(2.25rem,5vw,4.5rem)] text-[#0d4f4f]`}>
                  {forWhomHeading}
                </h2>
                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-[#333] sm:text-lg">
                  {forWhomDescription}
                </p>
                <ul className="mt-8 grid grid-cols-1 border-t-[3px] border-[#111] sm:grid-cols-2 sm:gap-x-8">
                  {occasions.map((label, i) => (
                    <li
                      key={label}
                      className="flex items-baseline gap-3 border-b-[3px] border-[#111] py-3.5 text-lg font-bold"
                    >
                      <span className={`${MONO} text-xs font-bold tabular-nums text-[#b8452e]`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <div className="relative aspect-[3/2] overflow-hidden border-[3px] border-[#111]">
                  <Image
                    src={treatmentWideImageSrc}
                    alt="Domenic Hacker bei der Behandlung in der Praxis"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 660px"
                  />
                </div>
              </div>
            </div>

            <div className={`${GRID} mt-16 gap-y-10 border-t-[3px] border-[#111] pt-12 lg:mt-24 lg:pt-16`}>
              <div className="col-span-12 lg:col-span-5">
                <p className={`${LABEL} text-[#0d4f4f]`}>Einsatzgebiet</p>
                <h2 className={`${DISPLAY} mt-4 text-balance text-[clamp(2.25rem,5vw,4.5rem)] text-[#0d4f4f]`}>
                  {areaHeading}
                </h2>
                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-[#333] sm:text-lg">
                  {areaDescription}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-2">
                <p className={LABEL}>Zum Beispiel</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {areaDistricts.map((d) => (
                    <li
                      key={d}
                      className={`${MONO} inline-flex min-h-10 items-center rounded-full border-[3px] border-[#111] px-4 text-xs font-bold uppercase tracking-[0.12em] sm:text-sm`}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 flex max-w-[58ch] items-start gap-3 text-base leading-relaxed text-[#333]">
                  <MapPin size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-[#0d4f4f]" aria-hidden={true} />
                  <span>
                    Lieber in die Praxis? Die Behandlungsräume liegen in der {practiceAddress}{" "}
                    (Josefstadt) – dort gibt es zusätzlich Anwendungen, die zuhause nicht möglich
                    sind.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── GOLD · pull quote ───────────────────────────────────── */}
        <section className="bg-[#f2a93b] text-[#0d4f4f]" aria-label="Zitat">
          <div className={`${CONTAINER} py-16 sm:py-24 lg:py-32`}>
            <p className={`${DISPLAY} text-[clamp(2.75rem,10vw,9.5rem)]`}>
              <span className="block">{pullQuote.lead}</span>
              <span className="block text-[#111]">{pullQuote.accent}</span>
            </p>
            <p className={`${LABEL} mt-8 border-t-[3px] border-[#0d4f4f] pt-4`}>
              {name} · {heroBadge}
            </p>
          </div>
        </section>

        {/* ── WHITE · FAQ ─────────────────────────────────────────── */}
        <section className="bg-white text-[#111]">
          <div className={`${CONTAINER} py-16 sm:py-20 lg:py-28`}>
            <div className={`${GRID} gap-y-10`}>
              <div className="col-span-12 lg:col-span-4">
                <p className={`${LABEL} text-[#0d4f4f]`}>FAQ</p>
                <h2 className={`${DISPLAY} mt-4 text-balance text-[clamp(2.25rem,4.5vw,4rem)] text-[#0d4f4f]`}>
                  {faqHeading}
                </h2>
                <p className="mt-6 max-w-[40ch] leading-relaxed text-[#333]">{faqIntro}</p>
              </div>
              <div className="col-span-12 border-t-[3px] border-[#111] lg:col-span-7 lg:col-start-6">
                {faqs.map((faq) => (
                  <details key={faq._key} className="group border-b-[3px] border-[#111]">
                    <summary
                      className={`${RING} flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-lg font-black leading-snug tracking-tight hover:text-[#0d4f4f] focus-visible:ring-[#0d4f4f] sm:text-xl [&::-webkit-details-marker]:hidden`}
                    >
                      {faq.question}
                      <span
                        aria-hidden
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111] text-white motion-safe:transition-transform motion-safe:duration-300 group-open:rotate-45"
                      >
                        <Plus size={20} strokeWidth={3} />
                      </span>
                    </summary>
                    <p className="max-w-[65ch] pb-6 text-base leading-relaxed text-[#333]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CORAL · final CTA ───────────────────────────────────── */}
        <section id="final-cta" className="bg-[#e8654a] text-[#111]">
          <div className={`${CONTAINER} py-16 sm:py-20 lg:py-28`}>
            <div className={`${GRID} gap-y-10 lg:items-end`}>
              <div className="col-span-12 lg:col-span-7">
                <p className={LABEL}>Jetzt anfragen</p>
                <h2 className={`${DISPLAY} mt-4 text-balance text-[clamp(2.75rem,7vw,6.5rem)] text-white`}>
                  {ctaHeading}
                </h2>
                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-[#1a1a1a] sm:text-lg">
                  {ctaText}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-5">
                <p className={`${LABEL} border-t-[3px] border-[#111] pt-4`}>
                  {price} € · {durationSummary} · ganz Wien
                </p>
                <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link href={bookingHref} className={`${PILL_BLACK} focus-visible:ring-offset-[#e8654a]`}>
                    <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                    {ctaPrimaryLabel}
                  </Link>
                  <a href={telHref} className={`${PILL_WHITE} focus-visible:ring-offset-[#e8654a]`}>
                    <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                    {phone}
                  </a>
                </div>
                <a
                  href={mailHref}
                  className={`${RING} mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-base font-bold text-[#111] underline decoration-[3px] underline-offset-4 hover:decoration-white focus-visible:ring-[#111] focus-visible:ring-offset-[#e8654a]`}
                >
                  <Mail size={16} strokeWidth={2.5} aria-hidden={true} />
                  {email}
                  <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden={true} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileStickyCta
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
