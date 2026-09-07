import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import {
  GOOGLE_MAPS_URL,
  formatPrice,
  getMobileMassageContent,
  splitHeading,
} from "../_shared/content";

export const metadata: Metadata = {
  title: "E · Split-Screen – Mobile Massage (Labs)",
};

/*
 * Variante E · Split-Screen
 * lg+: linkes Panel (45 %) sticky mit Portrait, H1, Preis, CTAs, Google-Zeile;
 * rechte Spalte (55 %) scrollt auf weißem Grund. Die Person bleibt im Raum,
 * während das Angebot vorbeizieht.
 *
 * Die Navbar startet auf /labs mit dunkler Schrift (nicht in DARK_HERO_PATHS),
 * deshalb liegt oben ein weißes Band in Navbar-Höhe; das Panel dockt darunter an.
 */

const NAV_OFFSET = "lg:top-20 lg:h-[calc(100svh-5rem)]";

const RING_LIGHT =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d4f4f]";
const RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const BTN_GOLD = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f2a93b] px-7 py-3 text-base font-bold text-[#0b3535] shadow-lg shadow-black/20 transition-[background-color,transform] duration-200 hover:bg-[#f6b854] motion-safe:hover:scale-[1.02] ${RING_LIGHT}`;
const BTN_GHOST_LIGHT = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/45 px-7 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10 ${RING_LIGHT}`;

const SECTION_X = "px-5 sm:px-8 lg:px-10 xl:px-14";
const SECTION_Y = "py-16 lg:py-24";
const H2 =
  "text-balance text-3xl font-extrabold tracking-[-0.02em] text-[#0d4f4f] sm:text-4xl";
const LEDE = "font-light leading-relaxed text-[#333]";
const EYEBROW =
  "text-xs font-bold uppercase tracking-[0.2em] text-[#0d4f4f]/80";

const rise = (delay: string) =>
  `motion-safe:animate-[mm-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both] ${delay}`;

export default async function SplitScreenVariant() {
  const content = await getMobileMassageContent();
  const [headingLead, headingRest] = splitHeading(content.heroHeading);
  const priceLine = `${formatPrice(content.priceAmount)} €`;

  return (
    <>
      <main className="bg-white pt-16 selection:bg-[#f2a93b]/40 selection:text-[#111] sm:pt-20">
        <div className="lg:grid lg:grid-cols-[45fr_55fr]">
          {/* ── LINKES PANEL / MOBILE HERO ─────────────────────────── */}
          <aside
            aria-label="Angebot im Überblick"
            className={`relative flex flex-col bg-[#0d4f4f] text-white lg:sticky lg:self-start lg:overflow-hidden ${NAV_OFFSET}`}
          >
            {/* Portrait: mobil 4:5 im Fluss, ab lg füllt es das Panel */}
            <figure className="relative aspect-[4/5] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <Image
                src={content.heroImageSrc}
                alt={`${content.name}, ${content.identityLine}`}
                fill
                priority
                fetchPriority="high"
                quality={85}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_22%]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[#0d4f4f]/15 mix-blend-multiply"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0d4f4f] via-[#0d4f4f]/92 via-40% to-transparent lg:h-[78%] lg:via-45%"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0d4f4f]/35 to-transparent"
              />
            </figure>

            {/* Overlay-Text: mobil über dem unteren Bilddrittel, ab lg über allem */}
            <div className="relative -mt-40 px-5 pb-10 sm:-mt-48 sm:px-8 lg:mt-0 lg:flex lg:h-full lg:flex-col lg:justify-end lg:px-10 lg:pb-10 xl:px-14 xl:pb-12">
              <p
                className={`text-xs font-bold uppercase tracking-[0.2em] text-[#f2a93b] ${rise("[animation-delay:0ms]")}`}
              >
                {content.name}
                <span className="block font-semibold normal-case tracking-normal text-white/80">
                  {content.identityLine}
                </span>
              </p>

              <h1
                className={`mt-5 text-[clamp(2.1rem,6.5vw,2.6rem)] font-extrabold leading-[1.04] tracking-[-0.025em] text-white lg:text-[clamp(1.9rem,2.8vw,2.5rem)] ${rise("[animation-delay:80ms]")}`}
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

              <div
                className={`mt-7 flex flex-wrap items-end gap-x-5 gap-y-2 border-l-2 border-[#f2a93b] pl-5 ${rise("[animation-delay:160ms]")}`}
              >
                <span className="text-5xl font-extrabold leading-none tracking-tight text-white">
                  {formatPrice(content.priceAmount)}
                  <span className="ml-1 text-2xl font-bold text-[#f2a93b]">
                    €
                  </span>
                </span>
                <span className="pb-0.5 text-sm leading-snug text-white/80">
                  <span className="block font-semibold text-white">
                    Fixpreis für {content.durationSummary}
                  </span>
                  Anfahrt innerhalb Wiens inklusive
                </span>
              </div>

              <div
                id="hero-cta"
                className={`mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center ${rise("[animation-delay:240ms]")}`}
              >
                <Link href={content.bookingHref} className={BTN_GOLD}>
                  <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                  {content.ctaPrimaryLabel}
                </Link>
                <a href={content.telHref} className={BTN_GHOST_LIGHT}>
                  <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                  {content.phone}
                </a>
              </div>

              <div
                className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 ${rise("[animation-delay:320ms]")}`}
              >
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex min-h-11 w-fit max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-lg transition-opacity duration-300 hover:opacity-80 ${RING_LIGHT}`}
                >
                  <span className="flex -space-x-2">
                    {content.reviews.avatars.slice(0, 3).map((a, i) => (
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
                      {content.reviews.rating.toFixed(1)}
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-sm text-white/80">
                    {content.reviews.count} Google-Bewertungen
                  </span>
                </a>

                <a
                  href={content.mailHref}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline ${RING_LIGHT}`}
                >
                  <Mail size={14} strokeWidth={2.5} aria-hidden={true} />
                  {content.email}
                </a>
              </div>
            </div>
          </aside>

          {/* ── RECHTE SPALTE ──────────────────────────────────────── */}
          <div className="min-w-0 bg-white">
            {/* Lede */}
            <section className={`${SECTION_X} pt-14 pb-14 lg:pt-24 lg:pb-20`}>
              <p
                className={`flex flex-col gap-y-1 xl:flex-row xl:flex-wrap xl:items-center xl:gap-x-2.5 ${EYEBROW}`}
              >
                <span>{content.heroBadge}</span>
                <span className="flex items-center gap-x-2.5 text-[#b8471a]">
                  <span aria-hidden className="hidden text-[#0d4f4f]/45 xl:inline">
                    ·
                  </span>
                  {content.heroServiceLine}
                </span>
              </p>
              <p
                className={`mt-6 max-w-[34ch] text-balance text-2xl leading-snug sm:text-[1.75rem] lg:text-[1.55rem] xl:text-3xl ${LEDE}`}
              >
                {content.heroSubtitle}
              </p>
            </section>

            {/* Im Preis enthalten */}
            <section
              className={`border-t border-[#0d4f4f]/10 ${SECTION_X} ${SECTION_Y}`}
            >
              <p className={EYEBROW}>Im Preis enthalten</p>
              <h2 className={`mt-3 ${H2}`}>{content.priceHeading}</h2>
              <p className={`mt-5 max-w-[62ch] text-lg ${LEDE}`}>
                {content.priceDescription}
              </p>

              <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_240px] md:gap-12 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px] 2xl:grid-cols-[minmax(0,1fr)_280px]">
                <ul className="divide-y divide-[#0d4f4f]/10 border-y border-[#0d4f4f]/10">
                  {[...content.included, content.includedExtra].map((item) => (
                    <li key={item.title} className="flex gap-4 py-5">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0d4f4f]">
                        <Check
                          size={11}
                          strokeWidth={3}
                          className="text-white"
                          aria-hidden={true}
                        />
                      </span>
                      <div>
                        <p className="font-bold text-[#111]">{item.title}</p>
                        <p className="mt-1 max-w-[60ch] text-[15px] leading-relaxed text-[#555]">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <figure className="md:self-start lg:max-w-[320px] xl:sticky xl:top-28 xl:max-w-none">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                    <Image
                      src={content.roomImageSrc}
                      alt="Die Massageliege im Behandlungsraum von Domenic Hacker"
                      fill
                      quality={75}
                      sizes="(min-width: 1536px) 280px, (min-width: 1280px) 220px, (min-width: 768px) 320px, 100vw"
                      className="object-cover object-bottom"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm leading-relaxed text-[#555]">
                    {content.roomCaption}
                  </figcaption>
                </figure>
              </div>

              <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-[#555]">
                {content.priceNote}
              </p>
            </section>

            {/* Pull-Quote – das eine typografische Ereignis */}
            <section
              aria-label="Zitat"
              className={`border-t border-[#0d4f4f]/10 ${SECTION_X} py-14 lg:py-20`}
            >
              <p className="text-balance text-[clamp(2.4rem,5vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#0d4f4f]">
                {content.pullQuote.lead}{" "}
                <span className="text-[#e8654a]">{content.pullQuote.accent}</span>
              </p>
            </section>

            {/* Ablauf */}
            <section
              id="ablauf"
              className={`border-t border-[#0d4f4f]/10 ${SECTION_X} ${SECTION_Y}`}
            >
              <p className={EYEBROW}>Ablauf</p>
              <h2 className={`mt-3 ${H2}`}>{content.processHeading}</h2>
              <p className={`mt-5 max-w-[62ch] text-lg ${LEDE}`}>
                {content.processDescription}
              </p>
              <div className="mt-8">
                <ProcessTimeline steps={content.processSteps} />
              </div>
            </section>

            {/* Bühne + Hotel/Suite/Backstage */}
            <section
              className={`border-t border-[#0d4f4f]/10 ${SECTION_X} ${SECTION_Y}`}
            >
              <div className="grid gap-10 md:grid-cols-[240px_minmax(0,1fr)] md:gap-12 lg:grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)]">
                <figure className="md:self-start lg:max-w-[320px] xl:sticky xl:top-28 xl:max-w-none">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl">
                    <Image
                      src={content.stageImageSrc}
                      alt="Domenic Hacker als B-Boy auf der Bühne"
                      fill
                      quality={75}
                      sizes="(min-width: 1536px) 280px, (min-width: 1280px) 220px, (min-width: 768px) 320px, 100vw"
                      className="object-cover object-[50%_55%]"
                    />
                  </div>
                  <figcaption className="rounded-b-2xl bg-[#0d4f4f] px-5 py-4 text-sm leading-relaxed text-white/85">
                    {content.stageCaption}
                  </figcaption>
                </figure>

                <div>
                  <p className={EYEBROW}>Bühne</p>
                  <h2 className={`mt-3 ${H2}`}>{content.stageHeading}</h2>
                  <p className={`mt-5 max-w-[62ch] text-lg ${LEDE}`}>
                    {content.stageText}
                  </p>

                  <div className="mt-12 border-t border-[#0d4f4f]/10 pt-10">
                    <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-[#0d4f4f]">
                      {content.vipHeading}
                    </h3>
                    <p className="mt-4 max-w-[62ch] leading-relaxed text-[#555]">
                      {content.vipText}
                    </p>
                    <ul className="mt-6 divide-y divide-[#0d4f4f]/10 border-y border-[#0d4f4f]/10">
                      {content.vipPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3.5 py-3.5"
                        >
                          <Check
                            size={16}
                            strokeWidth={3}
                            className="mt-1 shrink-0 text-[#b8471a]"
                            aria-hidden={true}
                          />
                          <span className="font-semibold leading-snug text-[#111]">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Für wen & wo */}
            <section
              className={`border-t border-[#0d4f4f]/10 ${SECTION_X} ${SECTION_Y}`}
            >
              <figure className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl lg:max-w-[340px]">
                <Image
                  src={content.treatmentImageSrc}
                  alt="Behandlung durch Domenic Hacker in warmem Licht"
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 340px, 100vw"
                  className="object-cover"
                />
              </figure>

              <div className="mt-12 grid gap-12 lg:gap-14">
                <div>
                  <p className={EYEBROW}>Für wen</p>
                  <h2 className={`mt-3 ${H2}`}>{content.forWhomHeading}</h2>
                  <p className="mt-5 max-w-[60ch] leading-relaxed text-[#555]">
                    {content.forWhomDescription}
                  </p>
                  <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-2.5 font-medium text-[#111] sm:grid-cols-2">
                    {content.occasions.map((label) => (
                      <li key={label} className="flex items-start gap-2.5">
                        <span
                          aria-hidden
                          className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8654a]"
                        />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className={EYEBROW}>Wo</p>
                  <h2 className={`mt-3 ${H2}`}>{content.areaHeading}</h2>
                  <p className="mt-5 max-w-[60ch] leading-relaxed text-[#555]">
                    {content.areaDescription}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {content.areaDistricts.map((d) => (
                      <li
                        key={d}
                        className="rounded-full border border-[#0d4f4f]/15 px-3 py-1.5 text-sm font-medium text-[#0d4f4f]"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 flex max-w-[60ch] items-start gap-2.5 text-sm leading-relaxed text-[#555]">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0d4f4f]"
                      aria-hidden={true}
                    />
                    <span>
                      Lieber in die Praxis? Die Behandlungsräume liegen in der{" "}
                      {content.practiceAddress} (Josefstadt) – dort gibt es
                      zusätzlich Anwendungen, die zuhause nicht möglich sind.
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section
              className={`border-t border-[#0d4f4f]/10 ${SECTION_X} ${SECTION_Y}`}
            >
              <p className={EYEBROW}>FAQ</p>
              <h2 className={`mt-3 ${H2}`}>{content.faqHeading}</h2>
              <p className={`mt-5 max-w-[62ch] text-lg ${LEDE}`}>
                {content.faqIntro}
              </p>
              <div className="mt-8 divide-y divide-[#0d4f4f]/10 border-y border-[#0d4f4f]/10">
                {content.faqs.map((faq) => (
                  <details key={faq._key} className="group">
                    <summary
                      className={`flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 text-base font-semibold text-[#111] transition-colors hover:text-[#0d4f4f] sm:text-lg [&::-webkit-details-marker]:hidden ${RING_DARK}`}
                    >
                      {faq.question}
                      <ChevronDown
                        size={20}
                        className="shrink-0 text-[#0d4f4f] transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden={true}
                      />
                    </summary>
                    <p className="max-w-[65ch] pb-6 leading-relaxed text-[#555]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Final CTA – Teal-Block in der rechten Spalte */}
            <section
              className={`border-t border-[#0d4f4f]/10 ${SECTION_X} ${SECTION_Y}`}
            >
              <div
                id="final-cta"
                className="relative overflow-hidden rounded-3xl bg-[#0d4f4f] px-6 py-12 text-white sm:px-10 sm:py-14 xl:px-14"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f2a93b]/10"
                />
                <div className="relative">
                  <h2 className="text-balance text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
                    {content.ctaHeading}
                  </h2>
                  <p className="mt-5 max-w-[52ch] font-light leading-relaxed text-white/85 sm:text-lg">
                    {content.ctaText}
                  </p>
                  <p className="mt-6 text-sm font-semibold tracking-wide text-[#f2a93b]">
                    {priceLine} · {content.durationSummary} · ganz Wien
                  </p>
                  <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link href={content.bookingHref} className={BTN_GOLD}>
                      <Calendar size={18} strokeWidth={2.5} aria-hidden={true} />
                      {content.ctaPrimaryLabel}
                    </Link>
                    <a href={content.telHref} className={BTN_GHOST_LIGHT}>
                      <Phone size={16} strokeWidth={2.5} aria-hidden={true} />
                      {content.phone}
                    </a>
                  </div>
                  <a
                    href={content.mailHref}
                    className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline ${RING_LIGHT}`}
                  >
                    <Mail size={14} strokeWidth={2.5} aria-hidden={true} />
                    {content.email}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <MobileStickyCta
        href={content.bookingHref}
        telHref={content.telHref}
        label={content.ctaPrimaryLabel}
        watchIds={["hero-cta", "final-cta", "site-footer"]}
      />
      <div id="site-footer">
        <Footer sanitySettings={content.settings} />
      </div>
    </>
  );
}
