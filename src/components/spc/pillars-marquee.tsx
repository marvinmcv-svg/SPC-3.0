"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  MARQUEE — banda infinita de los 4 pilares de la marca
 * ══════════════════════════════════════════════════════════════════
 */

import { Sparkle } from "lucide-react";
import { useSiteData, useLang } from "@/lib/i18n";

function Row() {
  const { BRAND } = useSiteData();
  const { lang } = useLang();
  const items = BRAND.pillars;
  const phrase =
    BRAND.slogan + " — " + BRAND.pillars.join(" · ") + " — " +
    (lang === "es"
      ? `Líderes de la industria gráfica desde ${BRAND.foundedYear} — `
      : `Leaders of the printing industry since ${BRAND.foundedYear} — `);

  return (
    <span className="flex shrink-0 items-center" aria-hidden>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="font-display px-7 text-[15px] font-bold uppercase tracking-[0.28em] text-spc-50 sm:text-lg">
            {item}
          </span>
          <Sparkle className="h-4 w-4 text-gold-500" aria-hidden />
        </span>
      ))}
      <span className="font-display px-7 text-[15px] font-semibold uppercase tracking-[0.2em] text-gold-200/80 sm:text-base">
        {phrase}
      </span>
    </span>
  );
}

export function PillarsMarquee() {
  return (
    <div
      className="relative z-10 overflow-hidden border-y border-white/10 bg-gradient-to-r from-spc-800 via-spc-600 to-spc-800 py-4 sm:py-5"
      role="presentation"
    >
      {/* Velado lateral para desvanecer el flujo */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-spc-800 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-spc-800 to-transparent" />
      <div className="animate-marquee flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
