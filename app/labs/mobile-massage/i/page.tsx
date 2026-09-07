import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist_Mono } from "next/font/google";
import { ArrowUpRight, Mail, Phone, Plus, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  GOOGLE_MAPS_URL,
  formatPrice,
  getMobileMassageContent,
  splitHeading,
} from "../_shared/content";
import { StickyCta } from "./StickyCta";

/*
 * Variante I · Swiss Grid
 * International Typographic Style: weißer Grund, 12-Spalten-Raster,
 * 1px-Hairlines zwischen allen Modulen, Mono-Labels mit Datenpräzision,
 * Geist 700 für Headlines, Teal als einzige Farbe für Werte und Button,
 * Coral ausschließlich im Akzentwort des Pull-Quotes.
 */

const mono = Geist_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-i-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "I · Swiss Grid – Mobile Massage Wien",
};

const HAIR = "border-[#111]/15";
const WRAP = "mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10";
const GRID = "grid grid-cols-12 gap-x-4 sm:gap-x-6";

const MONO = "font-[family-name:var(--font-i-mono)]";
const LABEL_BASE = `${MONO} text-[11px] font-medium uppercase leading-none tracking-[0.16em]`;
const LABEL = `${LABEL_BASE} text-[#555]`;
const LABEL_ON_TEAL = `${LABEL_BASE} text-white/70`;
/** Mono note in sentence case – for lines that need to breathe over two rows. */
const MONO_NOTE = `${MONO} text-[11px] leading-[1.6] tracking-[0.01em] text-[#555]`;

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const FOCUS_TEAL =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d4f4f]";

const BTN_PRIMARY = `inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-[#0d4f4f] px-6 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#0a3f3f] ${FOCUS}`;
const BTN_SECONDARY = `inline-flex h-12 items-center justify-center gap-2 rounded-[2px] border border-[#111]/25 px-5 text-[15px] font-semibold text-[#111] transition-colors duration-200 hover:border-[#111] ${FOCUS}`;
const BTN_ON_TEAL = `inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-white px-6 text-[15px] font-semibold text-[#0d4f4f] transition-colors duration-200 hover:bg-[#e6f0f0] ${FOCUS_TEAL}`;
const BTN_GHOST_TEAL = `inline-flex h-12 items-center justify-center gap-2 rounded-[2px] border border-white/40 px-5 text-[15px] font-semibold text-white transition-colors duration-200 hover:border-white ${FOCUS_TEAL}`;

const H2 =
  "text-balance text-[clamp(1.75rem,2.6vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#111]";
const BODY = "text-base leading-[1.6] text-[#111]";
const BODY_MUTED = "text-[15px] leading-[1.6] text-[#555]";

const pad2 = (n: number) => String(n).padStart(2, "0");

function ModuleLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className={`${LABEL} flex items-center gap-3`}>
      <span className="text-[#0d4f4f]">{index}</span>
      <span aria-hidden className="h-px w-6 bg-[#111]/30" />
      <span>{children}</span>
    </p>
  );
}

export default async function SwissGridVariant() {
  const c = await getMobileMassageContent();
  const [headingLead, headingRest] = splitHeading(c.heroHeading);
  const price = `${formatPrice(c.priceAmount)} €`;
  const rating = c.reviews.rating.toFixed(1);

  const facts: { label: string; value: React.ReactNode }[] = [
    {
      label: "Preis",
      value: (
        <span className="text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-[#0d4f4f] tabular-nums">
          {price}
        </span>
      ),
    },
    {
      label: "Dauer",
      value: (
        <span className="font-bold text-[#0d4f4f] tabular-nums">
          {c.durationSummary}
        </span>
      ),
    },
    {
      label: "Anfahrt",
      value: <span className="font-bold text-[#0d4f4f]">Wien inklusive</span>,
    },
    {
      label: "Bewertung",
      value: (
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-[44px] flex-wrap items-center justify-end gap-x-2.5 gap-y-1 rounded-[2px] font-bold text-[#0d4f4f] underline-offset-4 hover:underline ${FOCUS}`}
        >
          <span className="flex -space-x-1.5">
            {c.reviews.avatars.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-white bg-[#e6f0f0] text-[10px] font-bold text-[#0d4f4f]"
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
          <span className="inline-flex items-center gap-1 tabular-nums">
            <Star
              size={13}
              className="fill-[#0d4f4f] text-[#0d4f4f]"
              aria-hidden={true}
            />
            {rating}
          </span>
          <span className="whitespace-nowrap font-medium text-[#111]">
            {c.reviews.count} Google-Bewertungen
          </span>
          <ArrowUpRight size={14} aria-hidden={true} />
        </a>
      ),
    },
  ];

  return (
    <>
      <main className={`${mono.variable} bg-white text-[#111] selection:bg-[#0d4f4f]/15`}>
        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="pt-24 sm:pt-32">
          <div className={WRAP}>
            {/* Meta strip */}
            <div
              className={`flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b ${HAIR} pb-4 ${LABEL}`}
            >
              <span className="text-[#111]">Mobile Massage · Wien</span>
              <span className="hidden sm:inline">{c.heroBadge}</span>
              <span className="text-[#0d4f4f]">{c.heroServiceLine}</span>
            </div>

            {/* Row 1 · H1 + fact table */}
            <div className={`${GRID} py-10 sm:py-14`}>
              <h1 className="col-span-12 text-[clamp(2.25rem,4.6vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#111] lg:col-span-8 lg:pr-6">
                {headingRest ? (
                  <>
                    <span className="block">{headingLead}</span>
                    <span className="block text-balance">{headingRest}</span>
                  </>
                ) : (
                  <span className="text-balance">{headingLead}</span>
                )}
              </h1>

              <dl
                className={`col-span-12 mt-10 grid grid-cols-1 border-b ${HAIR} sm:grid-cols-2 sm:gap-x-6 lg:col-span-4 lg:mt-1 lg:grid-cols-1 lg:gap-x-0 lg:self-start lg:border-l lg:border-[#111]/15`}
              >
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className={`flex items-center justify-between gap-4 border-t ${HAIR} py-3.5 lg:pl-6`}
                  >
                    <dt className={`${LABEL} shrink-0`}>{f.label}</dt>
                    <dd className="text-right text-[1.0625rem] leading-tight">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Row 2 · Portrait + Lede + CTAs */}
            <div className={`${GRID} border-t ${HAIR} py-10 sm:py-14`}>
              <figure className="col-span-12 sm:col-span-5 lg:col-span-4">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f0f0]">
                  <Image
                    src={c.heroImageSrc}
                    alt={`${c.name}, diplomierter Heilmasseur in Wien`}
                    fill
                    priority
                    fetchPriority="high"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 430px"
                    className="object-cover object-[50%_22%]"
                  />
                </div>
                <figcaption
                  className={`mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 ${LABEL}`}
                >
                  <span className="text-[#111]">{c.name}</span>
                  <span>{c.identityLine}</span>
                </figcaption>
              </figure>

              <div className="col-span-12 mt-10 sm:col-span-7 sm:mt-0 lg:col-span-8">
                <p className="max-w-[54ch] text-balance text-[clamp(1.1875rem,1.7vw,1.5rem)] leading-[1.5] text-[#111]">
                  {c.heroSubtitle}
                </p>

                <div id="hero-cta" className="mt-10">
                  <p className={`${LABEL} mb-4`}>Anfrage</p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link href={c.bookingHref} className={BTN_PRIMARY}>
                      {c.ctaPrimaryLabel}
                    </Link>
                    <a href={c.telHref} className={BTN_SECONDARY}>
                      <Phone size={16} strokeWidth={2} aria-hidden={true} />
                      <span className="tabular-nums">{c.phone}</span>
                    </a>
                    <a href={c.mailHref} className={BTN_SECONDARY}>
                      <Mail size={16} strokeWidth={2} aria-hidden={true} />
                      E-Mail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 01 PREIS ───────────────────────────────────────────── */}
        <section className={`border-t ${HAIR}`}>
          <div className={`${WRAP} py-14 sm:py-20`}>
            <ModuleLabel index="01">Preis</ModuleLabel>
            <div className={`${GRID} mt-8`}>
              <div className="col-span-12 lg:col-span-7">
                <h2 className={H2}>{c.priceHeading}</h2>
                <p className={`${BODY} mt-5 max-w-[62ch]`}>{c.priceDescription}</p>

                <table className="mt-10 w-full border-collapse text-left">
                  <caption className="sr-only">
                    Preise für den Hausbesuch in Wien
                  </caption>
                  <thead>
                    <tr className={`border-y ${HAIR}`}>
                      <th scope="col" className={`${LABEL} py-3 pr-4 font-medium`}>
                        Leistung
                      </th>
                      <th scope="col" className={`${LABEL} py-3 pr-4 font-medium`}>
                        Dauer
                      </th>
                      <th
                        scope="col"
                        className={`${LABEL} hidden py-3 pr-4 font-medium sm:table-cell`}
                      >
                        Anfahrt
                      </th>
                      <th
                        scope="col"
                        className={`${LABEL} py-3 text-right font-medium`}
                      >
                        Preis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.priceDurations.map((d) => (
                      <tr key={d} className={`border-b ${HAIR}`}>
                        <td className="py-5 pr-4 align-top">
                          <span className="block font-bold">Hausbesuch</span>
                          <span className="block text-sm text-[#555]">
                            Mobile Massage
                          </span>
                        </td>
                        <td className="py-5 pr-4 align-top font-medium tabular-nums">
                          {d}
                        </td>
                        <td className="hidden py-5 pr-4 align-top font-medium sm:table-cell">
                          Wien inklusive
                        </td>
                        <td className="py-5 text-right align-top text-[1.5rem] font-bold leading-none tracking-[-0.02em] text-[#0d4f4f] tabular-nums">
                          {price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className={`${MONO_NOTE} mt-4`}>
                  Fixpreis · keine Staffelung · Anfahrt innerhalb Wiens inklusive
                </p>
              </div>

              <figure className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f0f0]">
                  <Image
                    src={c.roomImageSrc}
                    alt={`Die Massageliege von ${c.name} im Behandlungsraum`}
                    fill
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 430px"
                    className="object-cover object-bottom"
                  />
                </div>
                <figcaption className={`${BODY_MUTED} mt-3 text-sm`}>
                  {c.roomCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── 02 IM PREIS ENTHALTEN ──────────────────────────────── */}
        <section className={`border-t ${HAIR}`}>
          <div className={`${WRAP} py-14 sm:py-20`}>
            <ModuleLabel index="02">Ausstattung</ModuleLabel>
            <div className={`${GRID} mt-8`}>
              <h2 className={`${H2} col-span-12 lg:col-span-4`}>
                Im Preis enthalten
              </h2>
              <dl
                className={`col-span-12 mt-8 grid grid-cols-1 gap-x-6 border-b ${HAIR} sm:grid-cols-2 lg:col-span-8 lg:mt-0`}
              >
                {[...c.included, c.includedExtra].map((item, i) => (
                  <div key={item.title} className={`border-t ${HAIR} py-5`}>
                    <dt className="flex items-baseline gap-3 font-bold">
                      <span className={`${MONO} text-[11px] text-[#0d4f4f] tabular-nums`}>
                        {pad2(i + 1)}
                      </span>
                      {item.title}
                    </dt>
                    {/* Indent aligns with the title: mono index (2 x 0.6em x 11px) + gap-3 */}
                    <dd className={`${BODY_MUTED} mt-1.5 pl-[25.2px]`}>
                      {item.description}
                    </dd>
                  </div>
                ))}
                <div className={`border-t ${HAIR} py-5`}>
                  <dt className={LABEL}>Hinweis</dt>
                  <dd className={`${BODY_MUTED} mt-2`}>{c.priceNote}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ── PULL QUOTE ─────────────────────────────────────────── */}
        <section className={`border-t ${HAIR}`}>
          <div className={`${WRAP} py-16 sm:py-24`}>
            <p className="max-w-[16ch] text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-[#111]">
              {c.pullQuote.lead}{" "}
              <span className="text-[#e8654a]">{c.pullQuote.accent}</span>
            </p>
          </div>
        </section>

        {/* ── 03 ABLAUF ──────────────────────────────────────────── */}
        <section id="ablauf" className={`border-t ${HAIR}`}>
          <div className={`${WRAP} py-14 sm:py-20`}>
            <ModuleLabel index="03">Ablauf</ModuleLabel>
            <div className={`${GRID} mt-8`}>
              <h2 className={`${H2} col-span-12 lg:col-span-5`}>
                {c.processHeading}
              </h2>
              <p className={`${BODY} col-span-12 mt-4 max-w-[52ch] lg:col-span-6 lg:col-start-7 lg:mt-0`}>
                {c.processDescription}
              </p>
            </div>
            <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {c.processSteps.map((step, i) => (
                <li key={step.title} className="border-t border-[#111] pt-4">
                  <span className={`${MONO} block text-[12px] font-medium text-[#0d4f4f] tabular-nums`}>
                    {pad2(i + 1)}
                  </span>
                  <h3 className="mt-6 text-lg font-bold leading-snug tracking-[-0.01em] lg:mt-8">
                    {step.title}
                  </h3>
                  <p className={`${BODY_MUTED} mt-3`}>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 04 BÜHNE & HOTEL ───────────────────────────────────── */}
        <section className={`border-t ${HAIR}`}>
          <div className={`${WRAP} py-14 sm:py-20`}>
            <ModuleLabel index="04">Bühne &amp; Hotel</ModuleLabel>
            <div className={`${GRID} mt-8`}>
              <figure className="col-span-12 sm:col-span-6 lg:col-span-5">
                <div className="relative aspect-square overflow-hidden bg-[#f0f0f0]">
                  <Image
                    src={c.stageImageSrc}
                    alt={c.stageCaption}
                    fill
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                    className="object-cover object-[50%_55%]"
                  />
                </div>
                <figcaption className={`${BODY_MUTED} mt-3 text-sm`}>
                  {c.stageCaption}
                </figcaption>
              </figure>

              <div className="col-span-12 mt-10 sm:col-span-6 sm:mt-0 sm:pl-2 lg:col-span-6 lg:col-start-7 lg:pl-0">
                <h2 className={H2}>{c.stageHeading}</h2>
                <p className={`${BODY} mt-5 max-w-[60ch]`}>{c.stageText}</p>

                <div className={`mt-10 border-t ${HAIR} pt-8`}>
                  <h3 className="text-xl font-bold leading-tight tracking-[-0.015em]">
                    {c.vipHeading}
                  </h3>
                  <p className={`${BODY} mt-4 max-w-[60ch]`}>{c.vipText}</p>
                  <ul className="mt-6">
                    {c.vipPoints.map((point, i) => (
                      <li
                        key={point}
                        className={`flex items-baseline gap-4 border-t ${HAIR} py-3 last:border-b`}
                      >
                        <span className={`${MONO} shrink-0 text-[11px] text-[#0d4f4f] tabular-nums`}>
                          {pad2(i + 1)}
                        </span>
                        <span className="text-[15px] font-medium leading-snug">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a href={c.telHref} className={BTN_SECONDARY}>
                      <Phone size={16} strokeWidth={2} aria-hidden={true} />
                      Diskret anrufen
                    </a>
                    <a href={c.mailHref} className={BTN_SECONDARY}>
                      <Mail size={16} strokeWidth={2} aria-hidden={true} />
                      Per E-Mail anfragen
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 ANLÄSSE & BEZIRKE ───────────────────────────────── */}
        <section className={`border-t ${HAIR}`}>
          <div className={`${WRAP} py-14 sm:py-20`}>
            <ModuleLabel index="05">Anlässe &amp; Bezirke</ModuleLabel>
            <div className={`${GRID} mt-8`}>
              <div className="col-span-12 lg:col-span-5">
                <h2 className={H2}>{c.forWhomHeading}</h2>
                <p className={`${BODY} mt-5 max-w-[56ch]`}>{c.forWhomDescription}</p>
                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6">
                  {c.occasions.map((label, i) => (
                    <li
                      key={label}
                      className={`flex items-baseline gap-3 border-t ${HAIR} py-3 text-[15px] font-medium ${
                        i === c.occasions.length - 1 ? "border-b" : ""
                      } ${i === c.occasions.length - 2 ? "sm:border-b" : ""}`}
                    >
                      <span className={`${MONO} text-[11px] text-[#0d4f4f] tabular-nums`}>
                        {pad2(i + 1)}
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-10 aspect-[3/2] overflow-hidden bg-[#f0f0f0]">
                  <Image
                    src={c.treatmentWideImageSrc}
                    alt={`${c.name} bei der Behandlung in der Praxis`}
                    fill
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="col-span-12 mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0">
                <h2 className={H2}>{c.areaHeading}</h2>
                <p className={`${BODY} mt-5 max-w-[56ch]`}>{c.areaDescription}</p>
                <p className={`${LABEL} mt-8 border-b ${HAIR} pb-3`}>Bezirke</p>
                <ul
                  className={`${MONO} grid grid-cols-2 gap-x-6 gap-y-2.5 pt-4 text-[13px] leading-snug text-[#111] sm:grid-cols-3`}
                >
                  {c.areaDistricts.map((d) => (
                    <li key={d} className="tabular-nums">
                      {d}
                    </li>
                  ))}
                </ul>
                <div className={`mt-10 border-t ${HAIR} pt-6`}>
                  <p className={LABEL}>Praxis</p>
                  <p className={`${BODY_MUTED} mt-3 max-w-[56ch]`}>
                    Lieber in die Praxis? Die Behandlungsräume liegen in der{" "}
                    <span className="font-medium text-[#111]">
                      {c.practiceAddress}
                    </span>{" "}
                    (Josefstadt) – dort gibt es zusätzlich Anwendungen, die
                    zuhause nicht möglich sind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 06 FRAGEN ──────────────────────────────────────────── */}
        <section className={`border-t ${HAIR}`}>
          <div className={`${WRAP} py-14 sm:py-20`}>
            <ModuleLabel index="06">Fragen</ModuleLabel>
            <div className={`${GRID} mt-8`}>
              <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                <h2 className={H2}>{c.faqHeading}</h2>
                <p className={`${BODY_MUTED} mt-4 max-w-[40ch]`}>{c.faqIntro}</p>
              </div>
              <div className="col-span-12 mt-8 lg:col-span-8 lg:mt-0">
                {c.faqs.map((faq, i) => (
                  <details
                    key={faq._key}
                    className={`group border-t ${HAIR} last:border-b`}
                  >
                    <summary
                      className={`grid min-h-[44px] cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-2 rounded-[2px] py-5 [&::-webkit-details-marker]:hidden ${FOCUS}`}
                    >
                      <span className={`${MONO} text-[12px] text-[#0d4f4f] tabular-nums`}>
                        {pad2(i + 1)}
                      </span>
                      <span className="text-[1.0625rem] font-bold leading-snug tracking-[-0.01em] sm:text-lg">
                        {faq.question}
                      </span>
                      <Plus
                        size={18}
                        strokeWidth={2}
                        className="self-center text-[#0d4f4f] motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-45"
                        aria-hidden={true}
                      />
                    </summary>
                    <p className="max-w-[62ch] pb-6 pl-10 text-base leading-[1.6] text-[#555]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 07 ANFRAGE (FINAL CTA) ─────────────────────────────── */}
        <section
          id="final-cta"
          className={`border-t ${HAIR} bg-[#0d4f4f] text-white`}
        >
          <div className={`${WRAP} py-16 sm:py-24`}>
            <p className={`${LABEL_ON_TEAL} flex items-center gap-3`}>
              <span className="text-white">07</span>
              <span aria-hidden className="h-px w-6 bg-white/40" />
              <span>Anfrage</span>
            </p>
            <div className={`${GRID} mt-8`}>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="text-balance text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
                  {c.ctaHeading}
                </h2>
                <p className="mt-5 max-w-[56ch] text-base leading-[1.6] text-white/85">
                  {c.ctaText}
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={c.bookingHref} className={BTN_ON_TEAL}>
                    {c.ctaPrimaryLabel}
                  </Link>
                  <a href={c.telHref} className={BTN_GHOST_TEAL}>
                    <Phone size={16} strokeWidth={2} aria-hidden={true} />
                    <span className="tabular-nums">{c.phone}</span>
                  </a>
                </div>
                <a
                  href={c.mailHref}
                  className={`mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-[2px] text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline ${FOCUS_TEAL}`}
                >
                  <Mail size={14} strokeWidth={2} aria-hidden={true} />
                  {c.email}
                </a>
              </div>

              <dl className="col-span-12 mt-12 border-b border-white/20 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-start lg:border-l lg:border-white/20">
                {[
                  ["Preis", price],
                  ["Dauer", c.durationSummary],
                  ["Anfahrt", "Wien inklusive"],
                  ["Gebiet", c.heroBadge],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-t border-white/20 py-3.5 lg:pl-6"
                  >
                    <dt className={LABEL_ON_TEAL}>{k}</dt>
                    <dd className="text-right font-bold tabular-nums text-white">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
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
    </>
  );
}
