import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { ArrowUpRight, Mail, Phone, Plus, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  GOOGLE_MAPS_URL,
  formatPrice,
  getMobileMassageContent,
  splitHeading,
} from "../_shared/content";
import { ChapterIndex, type Chapter } from "./ChapterIndex";
import { StickyBar } from "./StickyBar";
import s from "./editorial.module.css";

/* Der einzige Serif-Moment der Seite: das Pull-Quote. */
const serif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "C · Editorial Magazine – Mobile Massage | Labs",
};

const WRAP = "mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const BTN_PRIMARY = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#111] px-7 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#333] ${FOCUS}`;
const BTN_SECONDARY = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#111] px-7 py-3 text-base font-semibold text-[#111] transition-colors duration-200 hover:bg-[#111] hover:text-white ${FOCUS}`;
const TEXT_LINK = `inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold text-[#0d4f4f] underline decoration-[#0d4f4f]/30 underline-offset-4 transition-colors hover:decoration-[#0d4f4f] ${FOCUS}`;
const H2 =
  "text-balance text-[clamp(2rem,3vw,2.75rem)] font-black leading-[1.02] tracking-[-0.03em] text-[#111]";
const BODY = "text-lg leading-relaxed text-[#555]";
const SMALL = "text-sm leading-relaxed text-[#555]";

const CHAPTERS: readonly Chapter[] = [
  { id: "preis", num: "01", label: "Preis" },
  { id: "ausstattung", num: "02", label: "Ausstattung" },
  { id: "ablauf", num: "03", label: "Ablauf" },
  { id: "backstage", num: "04", label: "Backstage" },
  { id: "fragen", num: "05", label: "Fragen" },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

function Kicker({ num, label }: { num: string; label: string }) {
  return (
    <p className="flex items-center gap-4">
      <span className="text-2xl font-black leading-none tabular-nums text-[#e8654a]">
        {num}
      </span>
      <span aria-hidden className="h-0.5 w-10 bg-[#e8654a]" />
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#0d4f4f]">
        {label}
      </span>
    </p>
  );
}

export default async function VariantC() {
  const c = await getMobileMassageContent();
  const [headingLead, headingRest] = splitHeading(c.heroHeading);
  const price = formatPrice(c.priceAmount);
  const includedAll = [...c.included, c.includedExtra];

  return (
    <>
      <main className="overflow-x-clip bg-white text-[#111] selection:bg-[#111] selection:text-white">
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          className={`${s.hero} relative pt-24 sm:pt-28 lg:pt-32`}
        >
          <div className={WRAP}>
            {/* Masthead */}
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-[#111] pb-4 text-xs font-bold uppercase tracking-[0.2em]">
              <p className="text-[#0d4f4f]">{c.heroBadge}</p>
              <p className="hidden text-[#555] sm:block">{c.heroServiceLine}</p>
              <p className="hidden text-[#111] xl:block">
                {c.name} — {c.identityLine}
              </p>
            </div>

            {/* Byline auf kleinen Screens */}
            <div className="mt-6 flex items-center gap-3 lg:hidden">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#eee]">
                <Image
                  src={c.heroImageSrc}
                  alt=""
                  fill
                  quality={75}
                  sizes="48px"
                  className={`object-cover object-[50%_22%] ${s.bw}`}
                />
              </span>
              <span>
                <span className="block text-sm font-bold leading-tight">
                  {c.name}
                </span>
                <span className="block text-xs leading-snug text-[#555]">
                  {c.identityLine}
                </span>
              </span>
            </div>

            <h1
              id="hero-heading"
              className={`${s.h1} mt-6 font-black text-[#111] lg:mt-12`}
            >
              <span className="block">{headingLead}</span>
              {headingRest && <span className="block">{headingRest}</span>}
            </h1>

            <div className="mt-10 grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
              <div className="lg:col-span-7 lg:flex lg:flex-col">
                <p className="max-w-[58ch] text-lg leading-relaxed text-[#555] sm:text-xl">
                  {c.heroSubtitle}
                </p>

                {/* Price lockup */}
                <div
                  id="hero-price"
                  className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-[#111] pt-6"
                >
                  <p className="flex items-baseline gap-3">
                    <span className="text-6xl font-black leading-none tracking-[-0.04em] tabular-nums sm:text-7xl">
                      {price}
                    </span>
                    <span className={`${s.smallCaps} text-xl font-semibold`}>
                      € · {c.durationSummary}
                    </span>
                  </p>
                  <p className="pb-1 text-sm leading-snug text-[#555]">
                    <span className="block font-semibold text-[#111]">
                      Ein Fixpreis, Sie wählen die Dauer.
                    </span>
                    Anfahrt innerhalb Wiens inklusive.
                  </p>
                </div>

                <div
                  id="hero-cta"
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                >
                  <Link href={c.bookingHref} className={BTN_PRIMARY}>
                    {c.ctaPrimaryLabel}
                    <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden />
                  </Link>
                  <a href={c.telHref} className={BTN_SECONDARY}>
                    <Phone size={16} strokeWidth={2.25} aria-hidden />
                    {c.phone}
                  </a>
                </div>
                <p className={`mt-3 ${SMALL}`}>
                  Oder schriftlich:{" "}
                  <a href={c.mailHref} className={TEXT_LINK}>
                    {c.email}
                  </a>
                </p>

                {/* Google rating – sitzt ab lg auf der Grundlinie des Portraits */}
                <div className="lg:mt-auto lg:border-t lg:border-[#111]/15 lg:pt-4">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex min-h-11 max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-sm transition-opacity hover:opacity-75 lg:mt-0 ${FOCUS}`}
                >
                  <span className="flex -space-x-2">
                    {c.reviews.avatars.slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#ddd] text-xs font-bold text-[#111] ${s.bw}`}
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
                          className="fill-[#111] text-[#111]"
                          aria-hidden
                        />
                      ))}
                    </span>
                    <span className="text-sm font-bold tabular-nums">
                      {c.reviews.rating.toFixed(1)}
                    </span>
                  </span>
                  <span className="text-sm text-[#555]">
                    {c.reviews.count} Google-Bewertungen
                  </span>
                </a>
                </div>
              </div>

              {/* Portrait: schwarz-weiß, rechts angeschnitten, steigt in die Headline */}
              <figure
                className={`${s.heroFigure} relative ml-auto w-[78%] sm:w-[62%] lg:col-span-4 lg:col-start-9 lg:w-auto`}
              >
                <div
                  className={`${s.bleedRight} relative aspect-[4/5] overflow-hidden bg-[#eee]`}
                >
                  <Image
                    src={c.heroImageSrc}
                    alt={`${c.name}, diplomierter Heilmasseur in Wien`}
                    fill
                    priority
                    quality={85}
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 65vw, 40vw"
                    className={`object-cover object-[50%_22%] ${s.bw}`}
                  />
                </div>
                <figcaption className="mt-3 hidden flex-wrap justify-between gap-x-4 text-xs uppercase tracking-[0.16em] text-[#555] lg:flex">
                  <span className="font-bold text-[#111]">{c.name}</span>
                  <span>{c.identityLine}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── ARTIKEL: Kapitelindex + Kapitel ───────────────────────── */}
        <div className={`${WRAP} mt-16 lg:mt-24`}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
            <aside className="border-t border-[#111] pt-2 lg:col-span-2 lg:border-t-0 lg:pt-10">
              <div className="lg:sticky lg:top-28">
                <ChapterIndex chapters={CHAPTERS} />
              </div>
            </aside>

            <div className="lg:col-span-10">
              {/* 01 · PREIS ───────────────────────────────────────── */}
              <section
                id="preis"
                className="mt-10 border-t border-[#111] pt-8 lg:mt-0 lg:pt-10"
              >
                <Kicker num="01" label="Preis" />
                <div className="mt-8 grid gap-y-12 lg:grid-cols-10 lg:gap-x-6">
                  <div className="lg:col-span-5">
                    <h2 className={H2}>{c.priceHeading}</h2>
                    <p className={`mt-6 max-w-[60ch] ${BODY}`}>
                      {c.priceDescription}
                    </p>
                    <div className="mt-12 flex flex-wrap items-end gap-x-5 gap-y-2">
                      <span className="text-[clamp(6rem,15vw,11rem)] font-black leading-[0.82] tracking-[-0.05em] tabular-nums">
                        {price}
                      </span>
                      <span className="pb-1">
                        <span className={`${s.smallCaps} block text-2xl font-semibold`}>
                          € · {c.durationSummary}
                        </span>
                        <span className={`mt-1 block ${SMALL}`}>
                          Anfahrt innerhalb Wiens inklusive
                        </span>
                      </span>
                    </div>
                  </div>

                  <figure className="lg:col-span-5 lg:col-start-6 lg:mt-20">
                    <div
                      className={`${s.bleedRight} relative aspect-[3/2] overflow-hidden bg-[#eee]`}
                    >
                      <Image
                        src={c.treatmentWideImageSrc}
                        alt="Behandlung durch Domenic Hacker in der Praxis"
                        fill
                        quality={75}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </figure>
                </div>

                {/* Wann & wo */}
                <div className="mt-20 grid gap-y-12 border-t border-[#111]/15 pt-12 lg:grid-cols-10 lg:gap-x-6">
                  <div className="lg:col-span-4 lg:col-start-2">
                    <h3 className="text-balance text-2xl font-black tracking-[-0.02em]">
                      {c.forWhomHeading}
                    </h3>
                    <p className={`mt-4 max-w-[60ch] ${BODY} !text-base`}>
                      {c.forWhomDescription}
                    </p>
                    <ul className="mt-6 grid border-t border-[#111]/15 sm:grid-cols-2 sm:gap-x-6">
                      {c.occasions.map((label) => (
                        <li
                          key={label}
                          className="border-b border-[#111]/15 py-3 text-base font-medium"
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-4 lg:col-start-7">
                    <h3 className="text-balance text-2xl font-black tracking-[-0.02em]">
                      {c.areaHeading}
                    </h3>
                    <p className={`mt-4 max-w-[60ch] ${BODY} !text-base`}>
                      {c.areaDescription}
                    </p>
                    <p className={`mt-6 max-w-[60ch] ${SMALL}`}>
                      <span className="font-semibold text-[#111]">
                        Zum Beispiel{" "}
                      </span>
                      {c.areaDistricts.join(" · ")}
                    </p>
                    <p className={`mt-6 max-w-[60ch] border-l border-[#e8654a] pl-4 ${SMALL}`}>
                      Lieber in die Praxis? Die Behandlungsräume liegen in der{" "}
                      {c.practiceAddress} (Josefstadt) – dort gibt es zusätzlich
                      Anwendungen, die zuhause nicht möglich sind.
                    </p>
                  </div>
                </div>
              </section>

              {/* 02 · AUSSTATTUNG ─────────────────────────────────── */}
              <section
                id="ausstattung"
                className="mt-24 border-t border-[#111] pt-8 lg:mt-32 lg:pt-10"
              >
                <Kicker num="02" label="Ausstattung" />
                <div className="mt-8 grid gap-y-12 lg:grid-cols-10 lg:gap-x-6">
                  <div className="lg:col-span-4">
                    <h2 className={H2}>Im Preis enthalten</h2>
                    <ol className="mt-8 border-t border-[#111]">
                      {includedAll.map((item, i) => (
                        <li
                          key={item.title}
                          className="grid grid-cols-[3rem_1fr] gap-x-2 border-b border-[#111]/15 py-5"
                        >
                          <span className="pt-0.5 text-xl font-black leading-none tabular-nums text-[#e8654a]">
                            {pad(i)}
                          </span>
                          <div>
                            <p className="font-bold leading-snug">{item.title}</p>
                            <p className={`mt-1 max-w-[52ch] ${SMALL}`}>
                              {item.description}
                              {i === includedAll.length - 1 && ` ${c.priceNote}`}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <figure className="lg:col-span-6 lg:col-start-5">
                    <div
                      className={`${s.bleedRight} relative aspect-[4/3] overflow-hidden bg-[#eee]`}
                    >
                      <Image
                        src={c.roomImageSrc}
                        alt="Die Massageliege im Behandlungsraum von Domenic Hacker"
                        fill
                        quality={75}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="scale-105 object-cover object-bottom [transform-origin:50%_100%]"
                      />
                    </div>
                    <figcaption className={`mt-3 max-w-[60ch] ${SMALL}`}>
                      {c.roomCaption}
                    </figcaption>
                  </figure>
                </div>
              </section>

              {/* PULL-QUOTE · der einzige Serif-Moment ─────────────── */}
              <div className="mt-24 border-y border-[#111] py-14 lg:mt-32 lg:py-20">
                <p
                  className={`${serif.className} text-balance text-[clamp(3rem,8vw,8rem)] italic leading-[0.95] tracking-[-0.01em] text-[#111]`}
                >
                  <span className="block">{c.pullQuote.lead}</span>
                  <span className="block text-[#e8654a] lg:pl-[14%]">
                    {c.pullQuote.accent}
                  </span>
                </p>
              </div>

              {/* 03 · ABLAUF ──────────────────────────────────────── */}
              <section id="ablauf" className="mt-24 pt-2 lg:mt-32">
                <Kicker num="03" label="Ablauf" />
                <div className="mt-8 grid gap-y-10 lg:grid-cols-10 lg:gap-x-6">
                  <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
                    <h2 className={H2}>{c.processHeading}</h2>
                    <p className={`mt-6 max-w-[40ch] ${BODY} !text-base`}>
                      {c.processDescription}
                    </p>
                  </div>
                  <ol className="border-t border-[#111] lg:col-span-6 lg:col-start-5">
                    {c.processSteps.map((step, i) => (
                      <li
                        key={step.title}
                        className="grid gap-y-1.5 border-b border-[#111]/15 py-6 sm:grid-cols-[3.5rem_minmax(0,13rem)_1fr] sm:gap-x-6 lg:py-8"
                      >
                        <span className="text-2xl font-black leading-none tabular-nums text-[#e8654a]">
                          {pad(i)}
                        </span>
                        <h3 className="text-lg font-bold leading-snug">
                          {step.title}
                        </h3>
                        <p className={`max-w-[52ch] ${BODY} !text-base`}>
                          {step.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="mt-16 grid lg:grid-cols-10 lg:gap-x-6">
                  <figure className="lg:col-span-7 lg:col-start-4">
                    <div
                      className={`${s.bleedRight} relative aspect-[3/2] overflow-hidden bg-[#eee]`}
                    >
                      <Image
                        src={c.treatmentImageSrc}
                        alt="Massagebehandlung in warmem Licht"
                        fill
                        quality={75}
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        className="object-cover"
                      />
                    </div>
                  </figure>
                </div>
              </section>

              {/* 04 · BACKSTAGE ───────────────────────────────────── */}
              <section
                id="backstage"
                className="mt-24 border-t border-[#111] pt-8 lg:mt-32 lg:pt-10"
              >
                <Kicker num="04" label="Backstage" />
                <div className="mt-8 grid gap-y-12 lg:grid-cols-10 lg:gap-x-6">
                  <div className="lg:col-span-4">
                    <h2 className={H2}>{c.stageHeading}</h2>
                    <p className={`mt-6 max-w-[60ch] ${BODY}`}>{c.stageText}</p>
                  </div>
                  <figure className="lg:col-span-6 lg:col-start-5">
                    <div
                      className={`${s.bleedRight} relative aspect-[4/3] overflow-hidden bg-[#eee] lg:aspect-[3/2]`}
                    >
                      <Image
                        src={c.stageImageSrc}
                        alt={c.stageCaption}
                        fill
                        quality={75}
                        sizes="(max-width: 1024px) 160vw, 100vw"
                        className="scale-[1.6] object-cover [transform-origin:46%_56%]"
                      />
                    </div>
                    <figcaption className={`mt-3 ${SMALL}`}>
                      {c.stageCaption}
                    </figcaption>
                  </figure>
                </div>

                <div className="mt-16 grid gap-y-10 border-t border-[#111]/15 pt-12 lg:grid-cols-10 lg:gap-x-6">
                  <div className="lg:col-span-4 lg:col-start-2">
                    <h3 className="text-balance text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                      {c.vipHeading}
                    </h3>
                    <p className={`mt-5 max-w-[58ch] ${BODY} !text-base`}>
                      {c.vipText}
                    </p>
                  </div>
                  <div className="lg:col-span-4 lg:col-start-7">
                    <ul className="border-t border-[#111]/15">
                      {c.vipPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-4 border-b border-[#111]/15 py-3.5 font-medium leading-snug"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.65em] h-0.5 w-5 shrink-0 bg-[#e8654a]"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                      <a href={c.telHref} className={BTN_SECONDARY}>
                        <Phone size={16} strokeWidth={2.25} aria-hidden />
                        Diskret anrufen
                      </a>
                      <a href={c.mailHref} className={TEXT_LINK}>
                        <Mail size={15} strokeWidth={2.25} aria-hidden />
                        Per E-Mail anfragen
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* 05 · FRAGEN ──────────────────────────────────────── */}
              <section
                id="fragen"
                className="mt-24 border-t border-[#111] pt-8 lg:mt-32 lg:pt-10"
              >
                <Kicker num="05" label="Fragen" />
                <div className="mt-8 grid gap-y-10 lg:grid-cols-10 lg:gap-x-6">
                  <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
                    <h2 className={H2}>{c.faqHeading}</h2>
                    <p className={`mt-6 max-w-[40ch] ${BODY} !text-base`}>
                      {c.faqIntro}
                    </p>
                  </div>
                  <div className="border-t border-[#111] lg:col-span-6 lg:col-start-5">
                    {c.faqs.map((faq, i) => (
                      <details
                        key={faq._key}
                        className="group border-b border-[#111]/15"
                      >
                        <summary
                          className={`flex cursor-pointer list-none items-start gap-4 rounded-sm py-5 [&::-webkit-details-marker]:hidden sm:gap-6 ${FOCUS}`}
                        >
                          <span className="w-9 shrink-0 pt-1 text-xl font-black leading-none tabular-nums text-[#e8654a]">
                            {pad(i)}
                          </span>
                          <span className="flex-1 pt-0.5 text-lg font-bold leading-snug">
                            {faq.question}
                          </span>
                          <span
                            aria-hidden
                            className="-my-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#111]/20 transition-colors group-hover:border-[#111]"
                          >
                            <Plus
                              size={16}
                              strokeWidth={2.25}
                              className="transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                            />
                          </span>
                        </summary>
                        <p className={`max-w-[62ch] pb-6 pl-[3.25rem] sm:pl-[3.75rem] ${BODY} !text-base`}>
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>

              {/* FINAL CTA ────────────────────────────────────────── */}
              <section
                id="final-cta"
                className="mt-24 border-t border-[#111] pb-24 pt-10 lg:mt-32 lg:pb-32 lg:pt-14"
              >
                <div className="grid gap-y-10 lg:grid-cols-10 lg:gap-x-6">
                  <div className="lg:col-span-7">
                    <h2 className="text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.92] tracking-[-0.03em]">
                      {c.ctaHeading}
                    </h2>
                    <p className={`mt-8 max-w-[58ch] ${BODY}`}>{c.ctaText}</p>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                      <Link href={c.bookingHref} className={BTN_PRIMARY}>
                        {c.ctaPrimaryLabel}
                        <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden />
                      </Link>
                      <a href={c.telHref} className={BTN_SECONDARY}>
                        <Phone size={16} strokeWidth={2.25} aria-hidden />
                        {c.phone}
                      </a>
                    </div>
                    <p className={`mt-3 ${SMALL}`}>
                      E-Mail:{" "}
                      <a href={c.mailHref} className={TEXT_LINK}>
                        {c.email}
                      </a>
                    </p>
                  </div>
                  <div className="text-sm leading-relaxed text-[#555] lg:col-span-3 lg:col-start-8 lg:border-l lg:border-[#111]/15 lg:pl-6">
                    <p className="text-4xl font-black tracking-[-0.03em] tabular-nums text-[#111]">
                      {price} €
                    </p>
                    <p className="mt-2 font-semibold text-[#111]">
                      Fixpreis · {c.durationSummary}
                    </p>
                    <p>Anfahrt innerhalb Wiens inklusive</p>
                    <p className="mt-6">{c.heroServiceLine}</p>
                    <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#0d4f4f]">
                      {c.heroBadge}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <StickyBar
        href={c.bookingHref}
        telHref={c.telHref}
        label={c.ctaPrimaryLabel}
        watchIds={["hero-price", "hero-cta", "final-cta", "site-footer"]}
      />
      <div id="site-footer">
        <Footer sanitySettings={c.settings} />
      </div>
    </>
  );
}
