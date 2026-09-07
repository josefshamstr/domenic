"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

type Props = {
  href: string;
  telHref: string;
  label: string;
  /** IDs of elements that already show the CTA – the bar hides while one is in view */
  watchIds: string[];
};

/**
 * Mobile-only sticky action bar in the soft-wellness palette. Same behaviour as
 * components/MobileStickyCta, restyled: sage glass surface, deep-teal pill.
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
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-300 lg:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-[#0d4f4f]/10 bg-[#f2f7f5]/90 p-1.5 shadow-[0_18px_40px_-16px_rgba(13,79,79,0.45)] backdrop-blur-md">
        <Link
          href={href}
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#0d4f4f] px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2"
        >
          {label}
          <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden={true} />
        </Link>
        <a
          href={telHref}
          tabIndex={visible ? 0 : -1}
          aria-label="Anrufen"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0d4f4f] ring-1 ring-[#0d4f4f]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2"
        >
          <Phone size={18} strokeWidth={2.25} aria-hidden={true} />
        </a>
      </div>
    </div>
  );
}
