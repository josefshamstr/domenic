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
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/**
 * Mobile-only sticky action bar for variant I (Swiss Grid). A flat white
 * strip with a hairline on top, one solid teal rectangle and a bordered
 * phone square – no pill, no gradient, no shadow. It appears once the hero
 * CTA leaves the viewport and steps aside near the closing CTA and footer.
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#111]/15 bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden motion-safe:transition-transform motion-safe:duration-300 ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-md items-stretch gap-2">
        <Link
          href={href}
          tabIndex={visible ? 0 : -1}
          className={`inline-flex h-12 flex-1 items-center justify-center rounded-[2px] bg-[#0d4f4f] px-5 text-[15px] font-semibold text-white ${FOCUS}`}
        >
          {label}
        </Link>
        <a
          href={telHref}
          tabIndex={visible ? 0 : -1}
          aria-label="Anrufen"
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] border border-[#111]/25 text-[#111] ${FOCUS}`}
        >
          <Phone size={18} strokeWidth={2} aria-hidden={true} />
        </a>
      </div>
    </div>
  );
}
