import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";
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
  title: "B · Dark Cinematic – Mobile Massage (Labs)",
  robots: { index: false, follow: false },
};

/* ── Typografie ─────────────────────────────────────────────────────── */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

/* ── Farben (teal-getönte Weißtöne, nie Grau) ───────────────────────── */
const T_PRIMARY = "text-[#f4fbf9]";
const T_BODY = "text-[#cfe4e0]";
const T_MUTED = "text-[#9fc6bf]";

const FOCUS = `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07302f]`;

const BTN_BASE =
  "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold tracking-[0.01em] transition-colors duration-200";
const BTN_GOLD = `${BTN_BASE} bg-[#f2a93b] text-[#07302f] hover:bg-[#f6ba5c] ${FOCUS}`;
const BTN_GHOST = `${BTN_BASE} border border-white/25 text-[#f4fbf9] hover:border-white/50 hover:bg-white/[0.04] ${FOCUS}`;

const EYEBROW = `text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2a93b]`;
const SERIF = "font-[family-name:var(--font-newsreader)]";
const H2 = `${SERIF} text-balance text-[clamp(2rem,3.4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.01em] ${T_PRIMARY}`;

const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8";

const RISE = "motion-safe:animate-[mm-rise_1s_cubic-bezier(0.16,1,0.3,1)_both]";
const rise = (delayMs: number) => ({ animationDelay: `${delayMs}ms` });

function Hairline({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-px w-10 bg-[#f2a93b] ${className}`}
    />
  );
}

export default async function VariantB() {
  const c = await getMobileMassageContent();

  const [headingLead, headingRest] = splitHeading(c.heroHeading);
  // Das letzte Wort der Überschrift wird zum Akzentwort – Text bleibt wörtlich.
  const restWords = (headingRest ?? "").split(" ");
  const accentWord = restWords.pop() ?? "";
  const restBefore = restWords.join(" ");

  const price = formatPrice(c.priceAmount);
  const avatars = c.reviews.avatars.slice(0, 3);

  return (
    <div
      className={`${newsreader.variable} bg-[#07302f] ${T_BODY} selection:bg-[#f2a93b]/40 selection:text-[#f4fbf9]`}
    >
      <main>
        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src={c.treatmentImageSrc}
              alt=""
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="100vw"
              className="object-cover object-[50%_40%] saturate-[0.85]"
            />
            <div
              aria-hidden
              className={`absolute inset-0 bg-gradient-to-t from-[#07302f] via-[#07302f]/85 to-[#07302f]/45`}
            />
            <div
              aria-hidden
              className={`absolute inset-0 bg-gradient-to-r from-[#07302f]/80 via-[#07302f]/35 to-transparent`}
            />
            <div
              aria-hidden
              className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07302f]/70 to-transparent`}
            />
            {/* Rechte Kante abdunkeln: Nachtstimmung, Portraitkarte tritt hervor */}
            <div
              aria-hidden
              className={`absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#07302f]/55 to-transparent`}
            />
          </div>

          <div
            className={`${CONTAINER} flex flex-1 flex-col justify-end pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20`}
          >
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
              <div className="max-w-2xl">
                {/* Mobile Byline */}
                <div
                  className={`mb-8 flex items-center gap-4 lg:hidden ${RISE}`} style={rise(0)}
                >
                  <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/25">
                    <Image
                      src={c.heroImageSrc}
                      alt={`${c.name}, diplomierter Heilmasseur in Wien`}
                      fill
                      priority
                      quality={85}
                      sizes="56px"
                      className="object-cover object-[50%_22%]"
                    />
                  </span>
                  <span>
                    <span className={`block text-[15px] font-semibold ${T_PRIMARY}`}>
                      {c.name}
                    </span>
                    <span className={`block text-[13px] leading-snug ${T_MUTED}`}>
                      {c.identityLine}
                    </span>
                  </span>
                </div>

                <p className={`flex flex-col gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 ${EYEBROW} ${RISE}`} style={rise(0)}>
                  <span>{c.heroBadge}</span>
                  <span aria-hidden className="hidden h-px w-5 bg-[#f2a93b]/60 sm:block" />
                  <span>{c.heroServiceLine}</span>
                </p>

                <h1
                  className={`${SERIF} mt-5 text-[clamp(2.6rem,6vw,4.9rem)] sm:mt-6 font-medium leading-[1.02] tracking-[-0.015em] ${T_PRIMARY} ${RISE}`} style={rise(80)}
                >
                  <span className="block">{headingLead}</span>
                  {headingRest && (
                    <span className="block text-balance">
                      {restBefore}{" "}
                      <em className={`not-italic text-[#f2a93b]`}>
                        {accentWord}
                      </em>
                    </span>
                  )}
                </h1>

                <p
                  className={`mt-6 max-w-xl text-[17px] leading-[1.6] ${T_BODY} sm:mt-7 sm:text-lg sm:leading-[1.65] ${RISE}`} style={rise(160)}
                >
                  {c.heroSubtitle}
                </p>

                {/* Preis-Lockup */}
                <div
                  className={`mt-8 flex flex-wrap items-end gap-x-6 gap-y-2 sm:mt-9 ${RISE}`} style={rise(240)}
                >
                  <span
                    className={`${SERIF} text-[3.6rem] font-medium leading-[0.85] tracking-[-0.03em] tabular-nums text-[#f2a93b] sm:text-[4.25rem]`}
                  >
                    {price}
                    <span className="ml-1.5 text-[2rem] align-top">€</span>
                  </span>
                  <span className="pb-0.5">
                    <span className={`block text-[15px] font-semibold ${T_PRIMARY}`}>
                      Fixpreis · {c.durationSummary}
                    </span>
                    <span className={`block text-[14px] ${T_MUTED}`}>
                      Anfahrt innerhalb Wiens inklusive
                    </span>
                  </span>
                </div>

                {/* CTA */}
                <div
                  id="hero-cta"
                  className={`mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center ${RISE}`} style={rise(320)}
                >
                  <Link href={c.bookingHref} className={BTN_GOLD}>
                    <Calendar size={17} strokeWidth={2.25} aria-hidden={true} />
                    {c.ctaPrimaryLabel}
                  </Link>
                  <a href={c.telHref} className={BTN_GHOST}>
                    <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                    {c.phone}
                  </a>
                  <a
                    href={c.mailHref}
                    className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-3 text-[15px] font-medium ${T_BODY} underline-offset-[6px] decoration-white/30 hover:underline sm:justify-start ${FOCUS}`}
                  >
                    <Mail size={15} strokeWidth={2.25} aria-hidden={true} />
                    E-Mail schreiben
                  </a>
                </div>

                {/* Google */}
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex min-h-[44px] w-fit max-w-full items-center gap-2.5 rounded-full py-1 pr-2 transition-opacity hover:opacity-85 sm:mt-8 sm:gap-3 ${FOCUS} ${RISE}`} style={rise(400)}
                >
                  <span className="flex -space-x-2">
                    {avatars.map((a, i) => (
                      <span
                        key={`${a.name}-${i}`}
                        className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-[#07302f] bg-white/15 text-xs font-semibold ${T_PRIMARY}`}
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
                        className={`fill-[#f2a93b] text-[#f2a93b]`}
                      />
                    ))}
                  </span>
                  <span className={`text-[13px] ${T_BODY} sm:text-sm`}>
                    <span className={`font-semibold tabular-nums ${T_PRIMARY}`}>
                      {c.reviews.rating.toFixed(1)}
                    </span>{" "}
                    · {c.reviews.count} Google-Bewertungen
                  </span>
                  <ArrowUpRight
                    size={14}
                    className={`hidden shrink-0 sm:block ${T_MUTED}`}
                    aria-hidden={true}
                  />
                </a>
              </div>

              {/* Portrait-Karte, Desktop */}
              <figure className={`hidden lg:block ${RISE}`} style={rise(200)}>
                <div className="relative w-56 xl:w-64">
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -inset-3 border border-[#f2a93b]/35`}
                  />
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={c.heroImageSrc}
                      alt={`${c.name}, diplomierter Heilmasseur in Wien`}
                      fill
                      priority
                      quality={85}
                      sizes="(min-width: 1280px) 256px, 224px"
                      className="object-cover object-[50%_22%]"
                    />
                  </div>
                </div>
                <figcaption className="mt-6">
                  <span className={`block text-[15px] font-semibold ${T_PRIMARY}`}>
                    {c.name}
                  </span>
                  <span className={`block text-[13px] ${T_MUTED}`}>
                    {c.identityLine}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── PREIS & AUSSTATTUNG ────────────────────────────────── */}
        <section className={`border-t border-white/10 bg-[#0a3d3d] py-20 sm:py-28`}>
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <figure className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative">
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -inset-3 border border-[#f2a93b]/25`}
                  />
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={c.roomImageSrc}
                      alt="Der Behandlungsraum von Domenic Hacker in der Josefstadt"
                      fill
                      quality={75}
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover object-bottom"
                    />
                    <div
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a3d3d]/60 to-transparent`}
                    />
                  </div>
                </div>
                <figcaption className={`mt-6 max-w-md text-sm leading-relaxed ${T_MUTED}`}>
                  {c.roomCaption}
                </figcaption>
              </figure>

              <div>
                <p className={EYEBROW}>Der Preis</p>
                <h2 className={`${H2} mt-4`}>{c.priceHeading}</h2>
                <p className={`mt-5 max-w-xl text-[17px] leading-[1.65] ${T_BODY}`}>
                  {c.priceDescription}
                </p>

                <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-2 border-y border-white/10 py-5">
                  <span
                    className={`${SERIF} text-5xl font-medium leading-[0.85] tracking-[-0.03em] tabular-nums text-[#f2a93b]`}
                  >
                    {price}
                    <span className="ml-1 text-2xl align-top">€</span>
                  </span>
                  <span className={`pb-0.5 text-sm ${T_BODY}`}>
                    <span className={`block font-semibold ${T_PRIMARY}`}>
                      {c.durationSummary}
                    </span>
                    Anfahrt innerhalb Wiens inklusive
                  </span>
                </div>

                <h3 className={`mt-10 ${EYEBROW}`}>Im Preis enthalten</h3>
                <ul className="mt-2 divide-y divide-white/10">
                  {[...c.included, c.includedExtra].map((item, i, arr) => {
                    const isLast = i === arr.length - 1;
                    return (
                      <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                        <Hairline className="mt-3" />
                        <div>
                          <p className={`text-[17px] font-semibold ${T_PRIMARY}`}>
                            {item.title}
                          </p>
                          <p className={`mt-1 max-w-prose text-[15px] leading-relaxed ${T_MUTED}`}>
                            {item.description}
                            {isLast && <> {c.priceNote}</>}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── BÜHNE · Signature-Band ─────────────────────────────── */}
        <section className={`relative border-t border-white/10 bg-[#07302f]`}>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:aspect-[21/9]">
            <Image
              src={c.stageImageSrc}
              alt={c.stageCaption}
              fill
              quality={75}
              sizes="100vw"
              className="object-cover object-[50%_55%] lg:object-[50%_68%]"
            />
            {/* Scrim: getestet auf AA-Kontrast für Zitat, Story und Caption –
                dunkelt zugleich Sponsorentafeln rechts und links oben ab. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#07302f] via-[#07302f]/75 to-[#07302f]/35"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[#07302f]/70 via-transparent to-[#07302f]/85"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07302f]/70 to-transparent"
            />
            {/* Seitliche Keile ab sm: dort zeigt der 4/3- bzw. 21/9-Ausschnitt
                die Sponsorentafeln links oben und rechts. Der 4/5-Ausschnitt
                unter sm schneidet sie ohnehin weg. */}
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-[#07302f] via-[#07302f]/70 to-transparent sm:block"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-[28%] bg-gradient-to-r from-[#07302f]/85 to-transparent sm:block"
            />

            <div className={`${CONTAINER} absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 lg:justify-center lg:pb-0`}>
              <p
                className={`${SERIF} max-w-4xl text-balance text-[clamp(2.75rem,7.2vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.02em] ${T_PRIMARY}`}
              >
                {c.pullQuote.lead}{" "}
                <em className={`italic text-[#f2a93b]`}>{c.pullQuote.accent}</em>
              </p>
              <p className={`mt-6 text-xs ${T_MUTED} xl:hidden`}>{c.stageCaption}</p>
            </div>

            {/* Story-Overlay ab xl */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden xl:block">
              <div className={`${CONTAINER} flex justify-end pb-12`}>
                <div className="pointer-events-auto max-w-sm border-l border-[#f2a93b]/50 pl-6">
                  <h2 className={`${SERIF} text-balance text-2xl font-medium leading-tight ${T_PRIMARY}`}>
                    {c.stageHeading}
                  </h2>
                  <p className={`mt-3 text-[15px] leading-relaxed ${T_BODY}`}>
                    {c.stageText}
                  </p>
                  <p className={`mt-3 text-xs ${T_MUTED}`}>{c.stageCaption}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Story unter dem Band bis xl */}
          <div className={`${CONTAINER} py-16 sm:py-20 xl:hidden`}>
            <div className="max-w-2xl border-l border-[#f2a93b]/50 pl-6 sm:pl-8">
              <h2 className={H2}>{c.stageHeading}</h2>
              <p className={`mt-5 text-[17px] leading-[1.65] ${T_BODY}`}>
                {c.stageText}
              </p>
            </div>
          </div>
        </section>

        {/* ── ABLAUF ─────────────────────────────────────────────── */}
        <section id="ablauf" className={`border-t border-white/10 bg-[#0a3d3d] py-20 sm:py-28`}>
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className={EYEBROW}>Ablauf</p>
                <h2 className={`${H2} mt-4`}>{c.processHeading}</h2>
                <p className={`mt-5 max-w-md text-[17px] leading-[1.65] ${T_BODY}`}>
                  {c.processDescription}
                </p>
              </div>

              <ol>
                {c.processSteps.map((step, i) => {
                  const isLast = i === c.processSteps.length - 1;
                  return (
                    <li
                      key={step.title}
                      className="grid grid-cols-[3rem_1fr] gap-x-4 sm:grid-cols-[5.5rem_1fr] sm:gap-x-8"
                    >
                      <div className="flex flex-col items-start">
                        <span
                          className={`${SERIF} text-[2.6rem] font-medium leading-none tabular-nums text-[#f2a93b] sm:text-[3.4rem]`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {!isLast && (
                          <span
                            aria-hidden
                            className="mt-4 mb-2 ml-6 w-px min-h-6 flex-1 bg-gradient-to-b from-[#f2a93b]/75 to-white/15 sm:ml-8"
                          />
                        )}
                      </div>
                      <div className={isLast ? "pb-0" : "pb-12 sm:pb-14"}>
                        <h3 className={`pt-1 text-xl font-semibold ${T_PRIMARY} sm:pt-2.5 sm:text-2xl`}>
                          {step.title}
                        </h3>
                        <p className={`mt-3 max-w-xl text-[16px] leading-[1.65] ${T_BODY}`}>
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* ── HOTEL · SUITE · BACKSTAGE ──────────────────────────── */}
        <section className={`border-t border-white/10 bg-[#07302f] py-20 sm:py-28`}>
          <div className={CONTAINER}>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
              <div>
                <p className={EYEBROW}>Auf Anfrage</p>
                <h2 className={`${H2} mt-4`}>{c.vipHeading}</h2>
                <p className={`mt-5 max-w-xl text-[17px] leading-[1.65] ${T_BODY}`}>
                  {c.vipText}
                </p>
                <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {c.vipPoints.map((point) => (
                    <li key={point} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-4">
                      <Hairline className="mt-3" />
                      <span className={`text-[16px] font-medium leading-snug ${T_PRIMARY}`}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <a href={c.telHref} className={BTN_GOLD}>
                    <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                    Diskret anrufen
                  </a>
                  <a href={c.mailHref} className={BTN_GHOST}>
                    <Mail size={16} strokeWidth={2.25} aria-hidden={true} />
                    Per E-Mail anfragen
                  </a>
                </div>
              </div>

              <figure className="relative">
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -inset-3 border border-[#f2a93b]/25`}
                />
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={c.treatmentWideImageSrc}
                    alt="Domenic Hacker bei der Behandlung"
                    fill
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-t from-[#07302f]/55 via-transparent to-transparent`}
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* ── FÜR WEN · WO ───────────────────────────────────────── */}
        <section className={`border-t border-white/10 bg-[#0a3d3d] py-20 sm:py-28`}>
          <div className={CONTAINER}>
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className={EYEBROW}>Für wen</p>
                <h2 className={`${H2} mt-4 lg:min-h-[2lh]`}>{c.forWhomHeading}</h2>
                <p className={`mt-5 max-w-lg text-[17px] leading-[1.65] ${T_BODY}`}>
                  {c.forWhomDescription}
                </p>
                <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {c.occasions.map((label) => (
                    <li
                      key={label}
                      className={`flex items-center gap-3 border-b border-white/10 py-3 text-[16px] font-medium ${T_PRIMARY}`}
                    >
                      <span aria-hidden className={`h-1 w-1 shrink-0 rounded-full bg-[#f2a93b]`} />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={EYEBROW}>Wo</p>
                <h2 className={`${H2} mt-4 lg:min-h-[2lh]`}>{c.areaHeading}</h2>
                <p className={`mt-5 max-w-lg text-[17px] leading-[1.65] ${T_BODY}`}>
                  {c.areaDescription}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {c.areaDistricts.map((d) => (
                    <li
                      key={d}
                      className={`rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] tabular-nums ${T_BODY}`}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
                <p className={`mt-8 flex max-w-lg items-start gap-3 text-[15px] leading-relaxed ${T_MUTED}`}>
                  <MapPin size={16} className={`mt-1 shrink-0 text-[#f2a93b]`} aria-hidden={true} />
                  <span>
                    Lieber in die Praxis? Die Behandlungsräume liegen in der{" "}
                    <span className={T_PRIMARY}>{c.practiceAddress}</span> (Josefstadt) –
                    dort gibt es zusätzlich Anwendungen, die zuhause nicht möglich
                    sind.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className={`border-t border-white/10 bg-[#07302f] py-20 sm:py-28`}>
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className={EYEBROW}>Fragen</p>
                <h2 className={`${H2} mt-4`}>{c.faqHeading}</h2>
                <p className={`mt-5 max-w-md text-[17px] leading-[1.65] ${T_BODY}`}>
                  {c.faqIntro}
                </p>
              </div>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {c.faqs.map((faq) => (
                  <details key={faq._key} className="group">
                    <summary
                      className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-[17px] font-medium ${T_PRIMARY} transition-colors hover:text-[#f2a93b] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS}`}
                    >
                      <span className="text-balance">{faq.question}</span>
                      <Plus
                        size={18}
                        strokeWidth={1.75}
                        className={`shrink-0 text-[#f2a93b] transition-transform duration-300 motion-reduce:transition-none group-open:rotate-45`}
                        aria-hidden={true}
                      />
                    </summary>
                    <p className={`max-w-prose pb-6 text-[16px] leading-[1.7] ${T_BODY}`}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────────────────────────── */}
        <section
          id="final-cta"
          className={`relative overflow-hidden border-t border-white/10 bg-[#0a3d3d] py-24 sm:py-32`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,169,59,0.14),transparent)]"
          />
          <div className={`${CONTAINER} relative text-center`}>
            <Hairline className="mx-auto" />
            <h2 className={`${SERIF} mx-auto mt-8 max-w-3xl text-balance text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.015em] ${T_PRIMARY}`}>
              {c.ctaHeading}
            </h2>
            <p className={`mx-auto mt-6 max-w-lg text-[17px] leading-[1.65] ${T_BODY}`}>
              {c.ctaText}
            </p>
            <p className={`mt-7 text-balance text-sm font-semibold tracking-[0.06em] text-[#f2a93b]`}>
              {price} € · {c.durationSummary} · Anfahrt innerhalb Wiens inklusive
            </p>
            <div className="mx-auto mt-9 flex max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
              <Link href={c.bookingHref} className={BTN_GOLD}>
                <Calendar size={17} strokeWidth={2.25} aria-hidden={true} />
                {c.ctaPrimaryLabel}
              </Link>
              <a href={c.telHref} className={BTN_GHOST}>
                <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                {c.phone}
              </a>
            </div>
            <a
              href={c.mailHref}
              className={`mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-md px-2 text-[15px] ${T_BODY} underline-offset-[6px] decoration-white/30 hover:underline ${FOCUS}`}
            >
              <Mail size={14} strokeWidth={2.25} aria-hidden={true} />
              {c.email}
            </a>
          </div>
        </section>
      </main>

      <MobileStickyCta
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
