import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, Phone, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  GOOGLE_MAPS_URL,
  formatPrice,
  getMobileMassageContent,
} from "../_shared/content";
import { StickyCta } from "./StickyCta";

/*
 * Variante J · Story Scroll
 * Ein Longread in der Ich-Form: Lesespalten (Geist 17/18px · 1.75) wechseln
 * sich mit vollflächigen Bildbändern ab. Eine Schrift für alles: Geist –
 * Fließtext regular, Display extrabold/tracking-tight wie auf der Website.
 * Papier #fbfaf7 · Tinte #1d2b2b · Teal für Links/Labels · Coral nur im Zitat.
 */

export const metadata: Metadata = {
  title: "J · Story Scroll – Mobile Massage",
};

const TEAL = "#0d4f4f";
const CORAL = "#e8654a";

/* Display-Stil der Website: Geist extrabold, eng gesetzt. */
const DISPLAY = "font-extrabold tracking-tight";
const BODY = "text-[17px] leading-[1.75] text-[#1d2b2b] sm:text-[18px]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfaf7]";
const FOCUS_TEAL =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d4f4f]";

const TEXT_LINK = `inline-flex min-h-11 items-center gap-2 rounded-sm font-sans text-[15px] font-semibold text-[#0d4f4f] underline decoration-[#0d4f4f]/35 underline-offset-[5px] transition-colors hover:decoration-[#0d4f4f] ${FOCUS}`;
const PRIMARY_BTN = `inline-flex min-h-12 items-center justify-center rounded-full bg-[#0d4f4f] px-7 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-[#0b4343] ${FOCUS}`;

/* ─── kleine Bausteine ────────────────────────────────────────────────── */

function Chapter({
  n,
  title,
  light = false,
}: {
  n: number;
  title: string;
  light?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] ${
        light ? "text-white/70" : "text-[#0d4f4f]"
      }`}
    >
      <span>
        Kapitel {n}
        <span aria-hidden className="mx-2">
          ·
        </span>
        {title}
      </span>
      <span
        aria-hidden
        className={`h-px flex-1 ${light ? "bg-white/20" : "bg-[#0d4f4f]/20"}`}
      />
    </p>
  );
}

function Column({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-3xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function H2({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      className={`${DISPLAY} mt-7 max-w-[22ch] text-balance text-[clamp(1.8rem,3.6vw,2.5rem)] leading-[1.1] ${
        light ? "text-white" : "text-[#1d2b2b]"
      }`}
    >
      {children}
    </h2>
  );
}

function Band({
  src,
  alt,
  position,
  quote,
  caption,
  heading,
  label,
}: {
  src: string;
  alt: string;
  position: string;
  quote?: string;
  caption?: string;
  heading?: string;
  label?: ReactNode;
}) {
  return (
    <figure className="relative isolate h-[72svh] min-h-[440px] max-h-[860px] w-full overflow-hidden bg-[#1d2b2b]">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${position}`}
        quality={75}
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#101c1c]/92 via-[#101c1c]/55 to-[#101c1c]/8"
      />
      <figcaption className="absolute inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-3xl px-5 pb-10 sm:px-8 sm:pb-14">
          {label}
          {heading && (
            <h2
              className={`${DISPLAY} mt-5 max-w-[20ch] text-balance text-[clamp(1.75rem,3.4vw,2.7rem)] leading-[1.08] text-white`}
            >
              {heading}
            </h2>
          )}
          {quote && (
            <p
              className={`${DISPLAY} max-w-[26ch] text-balance text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.18] text-white`}
            >
              {quote}
            </p>
          )}
          {caption && (
            <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/85">
              {caption}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

/* ─── Seite ───────────────────────────────────────────────────────────── */

export default async function StoryScrollPage() {
  const c = await getMobileMassageContent();
  const price = formatPrice(c.priceAmount);
  const mapsRating = c.reviews.rating.toFixed(1);

  const rise = (delay: string) =>
    `motion-safe:animate-[mm-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both] ${delay}`;

  return (
    <div
      className="bg-[#fbfaf7] text-[#1d2b2b] selection:bg-[#0d4f4f]/15"
    >
      <main>
        {/* ── Kapitel 1 · Ich komme zu Ihnen (Hero) ─────────────────────── */}
        <section className="pt-28 pb-20 sm:pt-36 sm:pb-28">
          <Column>
            <div className={rise("[animation-delay:0ms]")}>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-[#1d2b2b]/10 sm:h-24 sm:w-24">
                  <Image
                    src={c.heroImageSrc}
                    alt={`${c.name}, diplomierter Heilmasseur in Wien`}
                    fill
                    priority
                    quality={85}
                    sizes="96px"
                    className="object-cover object-[50%_22%]"
                  />
                </div>
                <div className="font-sans">
                  <p className="text-[15px] font-semibold text-[#1d2b2b]">{c.name}</p>
                  <p className="mt-0.5 text-sm text-[#4b5856]">{c.identityLine}</p>
                </div>
              </div>
              <p className="mt-4 font-sans text-[11px] font-semibold uppercase leading-[1.7] tracking-[0.2em] text-[#0d4f4f]">
                {c.heroBadge}
                <span aria-hidden className="mx-2">
                  ·
                </span>
                {c.heroServiceLine}
              </p>
            </div>

            <div className={`mt-14 ${rise("[animation-delay:80ms]")}`}>
              <Chapter n={1} title="Ich komme zu Ihnen" />
            </div>

            <h1
              className={`${DISPLAY} mt-7 max-w-[15ch] text-balance text-[clamp(2.3rem,5vw,4.1rem)] leading-[1.02] text-[#1d2b2b] ${rise("[animation-delay:140ms]")}`}
            >
              {c.heroHeading}
            </h1>

            <p
              className={`mt-8 max-w-[36rem] text-pretty text-[1.2rem] leading-[1.5] text-[#1d2b2b] sm:text-[1.35rem] ${rise("[animation-delay:220ms]")}`}
            >
              {c.heroSubtitle}
            </p>

            <p className={`${BODY} mt-6 max-w-[36rem] text-[#4b5856] ${rise("[animation-delay:280ms]")}`}>
              {c.priceDescription}
            </p>

            {/* Formales Preis-Lockup */}
            <div
              className={`mt-10 flex flex-wrap items-end gap-x-8 gap-y-4 border-y border-[#1d2b2b]/12 py-7 ${rise("[animation-delay:340ms]")}`}
            >
              <p className={`${DISPLAY} leading-none text-[#1d2b2b] tabular-nums`}>
                <span className="text-[3.9rem] sm:text-[4.4rem]">{price}</span>
                <span className="ml-1.5 align-top text-[1.75rem] text-[#0d4f4f]">€</span>
              </p>
              <dl className="pb-1 font-sans text-[15px] leading-snug">
                <dt className="sr-only">Preis</dt>
                <dd className="font-semibold text-[#1d2b2b]">
                  Fixpreis · {c.durationSummary}
                </dd>
                <dt className="sr-only">Anfahrt</dt>
                <dd className="mt-1 text-[#4b5856]">Anfahrt innerhalb Wiens inklusive</dd>
              </dl>
            </div>

            <div
              id="hero-cta"
              className={`mt-9 flex flex-col items-start gap-x-8 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center ${rise("[animation-delay:400ms]")}`}
            >
              <Link href={c.bookingHref} className={PRIMARY_BTN}>
                {c.ctaPrimaryLabel}
              </Link>
              <a href={c.telHref} className={TEXT_LINK}>
                <Phone size={15} strokeWidth={2.25} aria-hidden={true} />
                {c.phone}
              </a>
              <a href={c.mailHref} className={TEXT_LINK}>
                <Mail size={15} strokeWidth={2.25} aria-hidden={true} />
                {c.email}
              </a>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex min-h-11 w-fit items-center gap-x-3 rounded-md font-sans transition-opacity hover:opacity-80 ${FOCUS} ${rise("[animation-delay:460ms]")}`}
            >
              <span className="flex -space-x-2">
                {c.reviews.avatars.slice(0, 3).map((a, i) => (
                  <span
                    key={i}
                    className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-[#fbfaf7] bg-[#0d4f4f]/10 text-xs font-bold text-[#0d4f4f]"
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
                <span className="flex items-center gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-[#0d4f4f] text-[#0d4f4f]" />
                  ))}
                </span>
                <span className="text-sm font-semibold text-[#1d2b2b]">{mapsRating}</span>
              </span>
              <span className="text-sm text-[#4b5856]">
                {c.reviews.count} Google-Bewertungen
              </span>
            </a>
          </Column>
        </section>

        {/* Bildband · Behandlung */}
        <Band
          src={c.treatmentImageSrc}
          alt="Behandlung durch Domenic Hacker in warmem Licht"
          position="object-[50%_35%]"
          quote="Dieselbe Arbeit wie in der Praxis: klassische Massage, Heilmassage-Techniken und gezielte Behandlung von Verspannungen."
        />

        {/* ── Kapitel 2 · Was ich mitbringe ─────────────────────────────── */}
        <section className="py-20 sm:py-28">
          <Column>
            <Chapter n={2} title="Was ich mitbringe" />
            <H2>{c.priceHeading}</H2>
            <p className={`${BODY} mt-7 max-w-[36rem]`}>
              Ich bringe Massageliege, Öle und frische Handtücher mit. Sie brauchen nur einen freien
              Platz von etwa zwei mal zwei Metern – Wohnzimmer, Schlafzimmer oder Büro funktionieren
              alle gleich gut.
            </p>

            <h3 className="mt-12 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d4f4f]">
              Im Preis enthalten
            </h3>
            <dl className="mt-4 max-w-[38rem] divide-y divide-[#1d2b2b]/10 border-y border-[#1d2b2b]/10">
              {[...c.included, c.includedExtra].map((item) => (
                <div key={item.title} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="font-sans text-[15px] font-semibold leading-snug text-[#1d2b2b]">
                    {item.title}
                  </dt>
                  <dd className="text-[16px] leading-[1.65] text-[#4b5856]">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 max-w-[34rem] text-[16px] leading-[1.7] text-[#4b5856]">
              {c.priceNote}
            </p>
          </Column>
        </section>

        {/* Bildband · Behandlungsraum */}
        <Band
          src={c.roomImageSrc}
          alt="Massageliege im Behandlungsraum von Domenic Hacker"
          position="object-bottom"
          caption={c.roomCaption}
        />

        {/* ── Kapitel 3 · So läuft es ab ────────────────────────────────── */}
        <section className="py-20 sm:py-28">
          <Column>
            <Chapter n={3} title="So läuft es ab" />
            <H2>{c.processHeading}</H2>
            <p className={`${BODY} mt-7 max-w-[36rem] text-[#4b5856]`}>{c.processDescription}</p>

            <ol className="mt-12 max-w-[38rem]">
              {c.processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="flow-root border-t border-[#1d2b2b]/10 pt-9 pb-9 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d4f4f]">
                    {step.title}
                  </h3>
                  <p className={`${BODY} mt-3 max-w-[38rem]`}>
                    <span
                      aria-hidden
                      className={`${DISPLAY} float-left mt-1 mr-4 text-[4rem] leading-[0.9] text-[#0d4f4f] tabular-nums`}
                    >
                      {i + 1}
                    </span>
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Column>
        </section>

        {/* ── Kapitel 4 · Von der Bühne ─────────────────────────────────── */}
        <Band
          src={c.stageImageSrc}
          alt={c.stageCaption}
          position="object-[50%_55%]"
          label={<Chapter n={4} title="Von der Bühne" light />}
          heading={c.stageHeading}
          caption={c.stageCaption}
        />
        <section className="py-20 sm:py-28">
          <Column>
            <p className={`${BODY} max-w-[36rem]`}>{c.stageText}</p>

            <aside
              aria-labelledby="vip-heading"
              className="mt-14 border border-[#0d4f4f]/20 bg-white/70 p-7 sm:p-10"
            >
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d4f4f]">
                Auf Anfrage
              </p>
              <h3
                id="vip-heading"
                className={`${DISPLAY} mt-3 max-w-[22ch] text-balance text-[clamp(1.4rem,2.6vw,1.85rem)] leading-[1.12] text-[#1d2b2b]`}
              >
                {c.vipHeading}
              </h3>
              <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.7] text-[#1d2b2b] sm:text-[17px]">
                {c.vipText}
              </p>
              <ul className="mt-6 grid gap-y-2.5 font-sans text-[15px] leading-snug text-[#1d2b2b] sm:grid-cols-2 sm:gap-x-8">
                {c.vipPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d4f4f]" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col items-start gap-x-8 gap-y-1 sm:flex-row sm:items-center">
                <a href={c.telHref} className={TEXT_LINK}>
                  <Phone size={15} strokeWidth={2.25} aria-hidden={true} />
                  Diskret anrufen
                </a>
                <a href={c.mailHref} className={TEXT_LINK}>
                  <Mail size={15} strokeWidth={2.25} aria-hidden={true} />
                  Per E-Mail anfragen
                </a>
              </div>
            </aside>
          </Column>
        </section>

        {/* Bildband · Praxis-Behandlung */}
        <Band
          src={c.treatmentWideImageSrc}
          alt="Domenic Hacker bei der Behandlung in der Praxis"
          position="object-center"
          quote="Sie müssen nirgendwohin – Sie bleiben, wo Sie sind, und lassen die Wirkung nachklingen."
        />

        {/* ── Kapitel 5 · Für wen, wo ───────────────────────────────────── */}
        <section className="py-20 sm:py-28">
          <Column>
            <Chapter n={5} title="Für wen, wo" />
            <H2>{c.forWhomHeading}</H2>
            <p className={`${BODY} mt-7 max-w-[36rem]`}>{c.forWhomDescription}</p>
            <ul className="mt-5 flex max-w-[36rem] flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[17px] leading-[1.6] text-[#1d2b2b] sm:text-[18px]">
              {c.occasions.map((label, i) => (
                <li key={label}>
                  {label}
                  {i < c.occasions.length - 1 && (
                    <span aria-hidden className="ml-2.5 text-[#0d4f4f]">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <h3 className={`${DISPLAY} mt-14 max-w-[22ch] text-balance text-[clamp(1.4rem,2.6vw,1.85rem)] leading-[1.12] text-[#1d2b2b]`}>
              {c.areaHeading}
            </h3>
            <p className={`${BODY} mt-5 max-w-[36rem]`}>{c.areaDescription}</p>
            <ul className="mt-5 flex max-w-[36rem] flex-wrap gap-x-2.5 gap-y-1 font-sans text-[15px] leading-relaxed text-[#4b5856]">
              {c.areaDistricts.map((d, i) => (
                <li key={d} className="whitespace-nowrap">
                  {d}
                  {i < c.areaDistricts.length - 1 && (
                    <span aria-hidden className="ml-2.5 text-[#0d4f4f]">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[34rem] text-[16px] leading-[1.7] text-[#4b5856]">
              Lieber in die Praxis? Meine Praxis liegt in der {c.practiceAddress} (Josefstadt) –
              dort sind zusätzlich Anwendungen mit Geräten möglich, die zuhause nicht gehen.
            </p>
          </Column>
        </section>

        {/* ── Kapitel 6 · Fragen ────────────────────────────────────────── */}
        <section className="border-y border-[#1d2b2b]/10 bg-white py-20 sm:py-28">
          <Column>
            <Chapter n={6} title="Fragen" />
            <H2>{c.faqHeading}</H2>
            <p className={`${BODY} mt-7 max-w-[36rem] text-[#4b5856]`}>{c.faqIntro}</p>

            <div className="mt-10 divide-y divide-[#1d2b2b]/10 border-y border-[#1d2b2b]/10">
              {c.faqs.map((faq) => (
                <details key={faq._key} className="group">
                  <summary
                    className={`flex min-h-11 cursor-pointer list-none items-start justify-between gap-5 rounded-sm py-5 text-[1.05rem] font-semibold leading-[1.4] tracking-tight text-[#1d2b2b] transition-colors hover:text-[#0d4f4f] sm:text-[1.15rem] [&::-webkit-details-marker]:hidden ${FOCUS}`}
                  >
                    <span className="text-balance">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className="mt-1 shrink-0 text-[#0d4f4f] motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180"
                      aria-hidden={true}
                    />
                  </summary>
                  <p className="max-w-[34rem] pb-7 text-[16px] leading-[1.7] text-[#4b5856] sm:text-[17px]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Column>
        </section>

        {/* ── Kapitel 7 · Zum Schluss (Teal) ───────────────────────────── */}
        <section id="final-cta" className="bg-[#0d4f4f] py-20 text-white sm:py-28">
          <Column>
            <Chapter n={7} title="Zum Schluss" light />
            <H2 light>{c.ctaHeading}</H2>
            <p className="mt-7 max-w-[36rem] text-[17px] leading-[1.75] text-white/85 sm:text-[18px]">
              {c.ctaText}
            </p>
            <p className="mt-6 font-sans text-sm font-semibold tracking-wide text-white/80">
              {price} € · {c.durationSummary} · Anfahrt innerhalb Wiens inklusive
            </p>
            <div className="mt-9 flex flex-col items-start gap-x-8 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={c.bookingHref}
                className={`inline-flex min-h-12 items-center justify-center rounded-full bg-[#fbfaf7] px-7 font-sans text-[15px] font-semibold text-[#0d4f4f] transition-colors hover:bg-white ${FOCUS_TEAL}`}
              >
                {c.ctaPrimaryLabel}
              </Link>
              <a
                href={c.telHref}
                className={`inline-flex min-h-11 items-center gap-2 rounded-sm font-sans text-[15px] font-semibold text-white underline decoration-white/40 underline-offset-[5px] hover:decoration-white ${FOCUS_TEAL}`}
              >
                <Phone size={15} strokeWidth={2.25} aria-hidden={true} />
                {c.phone}
              </a>
              <a
                href={c.mailHref}
                className={`inline-flex min-h-11 items-center gap-2 rounded-sm font-sans text-[15px] font-semibold text-white underline decoration-white/40 underline-offset-[5px] hover:decoration-white ${FOCUS_TEAL}`}
              >
                <Mail size={15} strokeWidth={2.25} aria-hidden={true} />
                {c.email}
              </a>
            </div>
          </Column>
        </section>

        {/* Schlusszeile · das Zitat als letzter Satz der Geschichte */}
        <section aria-label="Schlusszeile" className="py-24 sm:py-36">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <p
              className={`${DISPLAY} text-balance text-[clamp(2.1rem,6.4vw,5.5rem)] leading-[1] text-[#1d2b2b]`}
            >
              <span className="block">{c.pullQuote.lead}</span>
              <span className="block" style={{ color: CORAL }}>
                {c.pullQuote.accent}
              </span>
            </p>
            <p className="mt-10 font-sans text-[13px] font-semibold uppercase tracking-[0.2em]" style={{ color: TEAL }}>
              — {c.name}
              <span className="mt-2 block font-normal normal-case tracking-normal text-[#4b5856] sm:mt-0 sm:ml-3 sm:inline">
                {c.identityLine}
              </span>
            </p>
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
