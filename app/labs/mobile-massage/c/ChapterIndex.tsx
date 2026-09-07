"use client";

import { useEffect, useState } from "react";

export type Chapter = { id: string; num: string; label: string };

/**
 * Laufendes Kapitelverzeichnis. Auf Desktop vertikal und sticky in der linken
 * Spalte, auf kleinen Screens eine horizontale Zeile am Artikelanfang. Das
 * aktive Kapitel wird über einen IntersectionObserver bestimmt; ohne JS bleibt
 * das erste Kapitel markiert.
 */
export function ChapterIndex({ chapters }: { chapters: readonly Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const targets = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      // Schmales Band im oberen Drittel des Viewports.
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Kapitel">
      <p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-[#0d4f4f] lg:block">
        Inhalt
      </p>
      <ol className="flex flex-wrap gap-x-6 lg:mt-4 lg:flex-col lg:gap-x-0">
        {chapters.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group relative flex min-h-11 items-center gap-3 whitespace-nowrap rounded-sm py-2 text-sm transition-colors lg:pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2 lg:pl-4 ${
                  isActive
                    ? "font-bold text-[#111]"
                    : "font-medium text-[#555] hover:text-[#111]"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-1/2 hidden h-5 w-0.5 -translate-y-1/2 transition-opacity lg:block ${
                    isActive ? "bg-[#e8654a] opacity-100" : "opacity-0"
                  }`}
                />
                <span className="tabular-nums">{c.num}</span>
                <span>{c.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
