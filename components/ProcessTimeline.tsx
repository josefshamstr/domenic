"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Step = { title: string; description: string };

const TRACK = {
  /** x-position of the rail inside the component */
  left: 8,
  lineWidth: 2,
  dot: 12,
  travel: 14,
} as const;

const EASE_TRAVEL = "cubic-bezier(0.76, 0, 0.24, 1)";
const PAUSE_MS = 1000;
const TRAVEL_MS = 1000;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Vertical process timeline with a "running point": once the block scrolls
 * into view the rail draws in, the step markers pop in one after another and
 * a glowing dot travels from step to step in a loop. Users with
 * prefers-reduced-motion get the finished state without the loop.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLOListElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const travelerRef = useRef<HTMLSpanElement>(null);
  const [positions, setPositions] = useState<number[]>([]);
  // Sichtbar per Default (SSR, Crawler, kein JS). Erst nach dem Mount wird der
  // Block ausgeblendet, wenn er unterhalb des Viewports liegt, und beim
  // Einscrollen wieder eingeblendet.
  const [inView, setInView] = useState(true);
  const [active, setActive] = useState(-1);
  const [reduceMotion, setReduceMotion] = useState(false);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const top = container.getBoundingClientRect().top;
    setPositions(
      markerRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top - top + r.height / 2;
      }),
    );
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;
    setInView(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "-80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The running point: pause at a step, glide to the next, loop.
  useEffect(() => {
    if (!inView || positions.length < 2) return;
    if (reduceMotion) {
      setActive(positions.length - 1);
      return;
    }
    const traveler = travelerRef.current;
    if (!traveler) return;

    let alive = true;
    let current: Animation | null = null;
    const offset = TRACK.travel / 2;

    const run = async () => {
      await wait(400);
      while (alive) {
        traveler.style.transform = `translateY(${positions[0] - offset}px)`;
        setActive(0);
        for (let i = 0; i < positions.length && alive; i++) {
          await wait(PAUSE_MS);
          if (!alive || i === positions.length - 1) break;
          current = traveler.animate(
            [
              { transform: `translateY(${positions[i] - offset}px)` },
              { transform: `translateY(${positions[i + 1] - offset}px)` },
            ],
            { duration: TRAVEL_MS, easing: EASE_TRAVEL, fill: "forwards" },
          );
          const midpoint = setTimeout(() => setActive(i + 1), TRAVEL_MS / 2);
          try {
            await current.finished;
          } catch {
            clearTimeout(midpoint);
            return;
          }
          current.commitStyles();
          current.cancel();
        }
        if (alive) await wait(300);
      }
    };
    run();

    return () => {
      alive = false;
      current?.cancel();
    };
  }, [inView, positions, reduceMotion]);

  const first = positions[0] ?? 0;
  const last = positions[positions.length - 1] ?? 0;

  return (
    <ol ref={containerRef} className="relative">
      {/* Rail */}
      <div
        aria-hidden
        className="absolute"
        style={{
          left: TRACK.left,
          top: first,
          width: TRACK.lineWidth,
          height: Math.max(last - first, 0),
        }}
      >
        <div className="absolute inset-0 bg-[#0d4f4f]/15" />
        <div
          className="absolute inset-x-0 top-0 origin-top bg-[#0d4f4f]/45 transition-[height] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ height: inView ? "100%" : "0%" }}
        />
      </div>

      {/* Running point */}
      <span
        ref={travelerRef}
        aria-hidden
        className="pointer-events-none absolute top-0 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] shadow-[0_0_0_4px_rgba(242,169,59,0.25),0_0_18px_rgba(242,169,59,0.55)] transition-opacity duration-500"
        style={{
          left: TRACK.left + TRACK.lineWidth / 2 - TRACK.travel / 2,
          width: TRACK.travel,
          height: TRACK.travel,
          opacity: inView && !reduceMotion && positions.length > 1 ? 1 : 0,
        }}
      />

      {steps.map((step, i) => {
        const isActive = active === i;
        return (
          <li
            key={step.title}
            className="relative grid gap-1 py-7 pl-9 transition-all duration-500 after:absolute after:bottom-0 after:left-9 after:right-0 after:h-px after:bg-[#0d4f4f]/10 last:after:hidden md:grid-cols-[180px_1fr] md:items-baseline md:gap-8 md:py-9"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            {/* Static marker */}
            <span
              ref={(el) => {
                markerRefs.current[i] = el;
              }}
              aria-hidden
              className="absolute top-[2.35rem] rounded-full border-2 bg-white transition-colors duration-300 md:top-[2.85rem]"
              style={{
                left: TRACK.left + TRACK.lineWidth / 2 - TRACK.dot / 2,
                width: TRACK.dot,
                height: TRACK.dot,
                borderColor: isActive ? "#e8654a" : "rgba(13,79,79,0.3)",
                transform: inView ? "scale(1)" : "scale(0)",
                transition: `transform 400ms cubic-bezier(0.22,1,0.36,1) ${i * 150 + 300}ms, border-color 300ms`,
              }}
            />

            <div className="flex items-baseline gap-3 md:block">
              <span
                className={`text-sm font-extrabold tabular-nums tracking-[0.06em] transition-colors duration-300 ${
                  isActive ? "text-[#e8654a]" : "text-[#0d4f4f]/60"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold text-[#0d4f4f] md:mt-1 md:text-xl">
                {step.title}
              </h3>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-[#555]">
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
