import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VARIANTS } from "./_shared/variants";

export default function LabsIndex() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">
          Labs · nur intern
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111] sm:text-4xl">
          Mobile Massage – zehn Design-Varianten
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-[#555]">
          Gleiche Inhalte, gleiche Fotos, gleicher Preis – zehn verschiedene
          Richtungen. Zum Vergleich:{" "}
          <Link
            href="/mobile-massage-wien"
            className="font-semibold text-[#0d4f4f] underline underline-offset-4"
          >
            aktuelle Seite
          </Link>
          .
        </p>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {VARIANTS.map((v) => (
            <li key={v.slug}>
              <Link
                href={`/labs/mobile-massage/${v.slug}`}
                className="group flex h-full items-start gap-5 rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-[#0d4f4f]/40"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0d4f4f] text-lg font-extrabold uppercase text-white">
                  {v.slug}
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-extrabold text-[#111]">
                    {v.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#555]">
                    {v.blurb}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="mt-1 shrink-0 text-[#0d4f4f] transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
