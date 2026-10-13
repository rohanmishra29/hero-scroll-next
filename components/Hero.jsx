"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const WORDS = ["WELCOME", "ITZFIZZ"];

const STATS = [
  { value: 58, label: "Increase in pick up point use" },
  { value: 23, label: "Decrease in customer phone calls" },
  { value: 27, label: "Increase in pick up point use" },
  { value: 40, label: "Decrease in customer phone calls" },
];

export default function Hero() {
  const rootRef = useRef(null);
  const carRef = useRef(null);
  const lanesRef = useRef(null);

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      root.classList.add("is-static");
      root.querySelectorAll("[data-count]").forEach((s) => {
        s.textContent = s.dataset.count;
      });
      return;
    }

    const ctx = gsap.context(() => {
      const car = carRef.current;
      const lanes = lanesRef.current;

      gsap.set(".char", { yPercent: 110 });
      gsap.set(".stat", { y: 40 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .to(".char", { yPercent: 0, opacity: 1, duration: 1, stagger: 0.05 })
        .to(".stat", { y: 0, opacity: 1, duration: 0.9, stagger: 0.18 }, "-=0.4")
        .to("#hint", { opacity: 1, duration: 0.8 }, "-=0.4");

      root.querySelectorAll("[data-count]").forEach((span, i) => {
        const state = { v: 0 };
        span.textContent = "0";
        intro.to(
          state,
          {
            v: Number(span.dataset.count),
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              span.textContent = Math.round(state.v);
            },
          },
          0.9 + i * 0.18
        );
      });

      const scroll = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scroll.to(
        car,
        {
          y: () => -(window.innerHeight + car.offsetHeight * 1.4),
          scale: 1.35,
          duration: 1,
        },
        0
      );
      scroll.to(
        car,
        { x: () => window.innerWidth * 0.12, rotation: 6, duration: 0.25, ease: "sine.inOut" },
        0
      );
      scroll.to(
        car,
        { x: () => -window.innerWidth * 0.12, rotation: -6, duration: 0.5, ease: "sine.inOut" },
        0.25
      );
      scroll.to(car, { x: 0, rotation: 0, duration: 0.25, ease: "sine.inOut" }, 0.75);
      scroll.to(lanes, { y: () => window.innerHeight * 1.2, duration: 1 }, 0);
      scroll.to("#stats", { y: -30, opacity: 0.15, duration: 0.5 }, 0.45);
      scroll.to("#headline", { y: -40, opacity: 0.2, duration: 0.5 }, 0.55);
      scroll.to("#hintText", { opacity: 0, duration: 0.1 }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="hero" className="relative h-[100svh] w-full overflow-hidden">
      <div className="road absolute inset-y-0 left-1/2 w-[34vw] min-w-[240px] max-w-[460px] -translate-x-1/2">
        <div className="road__edge road__edge--l" />
        <div className="road__edge road__edge--r" />
        <div ref={lanesRef} className="road__lanes" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-4 pt-[9vh] text-center">
        <h1 id="headline" className="headline" aria-label="Welcome ItzFizz">
          {WORDS.map((word) => (
            <span key={word} className="word" aria-hidden="true">
              {[...word].map((ch, i) => (
                <span key={i} className="char">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div
          id="stats"
          className="mt-[5vh] grid w-full max-w-5xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <article key={i} className="stat">
              <p className="stat__num">
                <span data-count={s.value}>0</span>%
              </p>
              <p className="stat__label">{s.label}</p>
            </article>
          ))}
        </div>
      </div>

      <div ref={carRef} className="car" aria-hidden="true">
        <svg viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="body" x1="0" x2="1">
              <stop offset="0" stopColor="#ff6a1a" />
              <stop offset=".5" stopColor="#ff9a3c" />
              <stop offset="1" stopColor="#e5520a" />
            </linearGradient>
            <linearGradient id="glass" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#1b2a3a" />
              <stop offset="1" stopColor="#0a1018" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="140" rx="54" ry="118" fill="#000" opacity=".35" />
          <rect x="4" y="38" width="16" height="42" rx="6" fill="#111" />
          <rect x="100" y="38" width="16" height="42" rx="6" fill="#111" />
          <rect x="2" y="168" width="18" height="46" rx="6" fill="#111" />
          <rect x="100" y="168" width="18" height="46" rx="6" fill="#111" />
          <path
            d="M60 4 C92 4 104 40 106 84 C108 130 110 190 104 232 C100 252 80 256 60 256 C40 256 20 252 16 232 C10 190 12 130 14 84 C16 40 28 4 60 4Z"
            fill="url(#body)"
          />
          <path
            d="M44 22 C46 56 46 80 44 98 M76 22 C74 56 74 80 76 98"
            stroke="#b83c00"
            strokeWidth="2"
            fill="none"
            opacity=".6"
          />
          <path
            d="M32 104 C34 94 46 90 60 90 C74 90 86 94 88 104 L92 160 C92 168 82 172 60 172 C38 172 28 168 28 160Z"
            fill="url(#glass)"
          />
          <path
            d="M34 186 C46 182 74 182 86 186 L84 232 C74 240 46 240 36 232Z"
            fill="#d94e08"
          />
          <path
            d="M26 30 L44 18 L42 28 L28 38Z M94 30 L76 18 L78 28 L92 38Z"
            fill="#fff6d6"
          />
          <rect x="30" y="246" width="20" height="4" rx="2" fill="#ff2a2a" />
          <rect x="70" y="246" width="20" height="4" rx="2" fill="#ff2a2a" />
        </svg>
      </div>

      <div id="hint" className="hint">
        <span id="hintText">Scroll</span>
      </div>
    </section>
  );
}