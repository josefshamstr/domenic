"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

type Props = {
  href: string;
  telHref: string;
  label: string;
  /** IDs of elements that already show the CTA – the bar hides while one is in view */
  watchIds: string[];
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2";

/**
 * Mobile-only sticky action bar for variant J (Story Scroll). Paper surface,
 * flat teal button, Geist for the label – keeps the primary action in the thumb
 * zone while the reader is deep in the longread, steps aside near hero/final CTA.
 */
export function StickyCta({ href, telHref, label, watchIds }: Props) {
  const [hiddenBy, setHiddenBy] = useState<Set<string>>(
    () => new Set(watchIds),
  );

  useEffect(() => {
    const targets = watchIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setHiddenBy((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) next.add(entry.target.id);
            else next.delete(entry.target.id);
          }
          return next;
        });
      },
      { threshold: 0.05 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [watchIds]);

  const visible = hiddenBy.size === 0;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden motion-safe:transition-all motion-safe:duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-[#1d2b2b]/10 bg-[#fbfaf7]/95 p-1.5 shadow-lg shadow-[#1d2b2b]/10 backdrop-blur-md">
        <Link
          href={href}
          tabIndex={visible ? 0 : -1}
          className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#0d4f4f] px-5 font-sans text-sm font-semibold text-white hover:bg-[#0b4343] ${FOCUS}`}
        >
          {label}
        </Link>
        <a
          href={telHref}
          tabIndex={visible ? 0 : -1}
          aria-label="Anrufen"
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0d4f4f]/50 text-[#0d4f4f] hover:bg-[#0d4f4f]/5 ${FOCUS}`}
        >
          <Phone size={18} strokeWidth={2.25} aria-hidden={true} />
        </a>
      </div>
    </div>
  );
}
