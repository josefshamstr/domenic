"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VARIANTS } from "./variants";

/** Kleine Leiste zum Durchklicken der Varianten – nur unter /labs. */
export function VariantSwitcher() {
  const pathname = usePathname();
  const current = pathname.split("/").filter(Boolean).pop();
  const active = VARIANTS.find((v) => v.slug === current);

  return (
    <div className="fixed right-3 top-1/2 z-[60] hidden -translate-y-1/2 flex-col gap-1 rounded-2xl border border-black/10 bg-white/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-md sm:flex">
      <Link
        href="/labs/mobile-massage"
        className="rounded-lg px-2 py-1 text-center text-[10px] font-bold uppercase tracking-widest text-black/50 hover:bg-black/5"
        title="Übersicht"
      >
        Labs
      </Link>
      {VARIANTS.map((v) => (
        <Link
          key={v.slug}
          href={`/labs/mobile-massage/${v.slug}`}
          title={v.name}
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-extrabold uppercase transition-colors ${
            active?.slug === v.slug
              ? "bg-[#0d4f4f] text-white"
              : "text-black/70 hover:bg-black/5"
          }`}
        >
          {v.slug}
        </Link>
      ))}
    </div>
  );
}
