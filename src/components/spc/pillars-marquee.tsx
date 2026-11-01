"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  MARQUEE — banda infinita de los 4 pilares de la marca
 * ══════════════════════════════════════════════════════════════════
 */

import { Sparkle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ITEMS = {
  es: ["Calidad", "Puntualidad", "Capacidad", "Servicio"],
  en: ["Quality", "Punctuality", "Capacity", "Service"],
};
const PHRASE = {
  es: "Imprimiendo lo mejor de Bolivia — Calidad · Puntualidad · Capacidad · Servicio — Líderes de la industria gráfica desde 2001 — ",
  en: "Printing the best of Bolivia — Quality · Punctuality · Capacity · Service — Leaders in Bolivian printing since 2001 — ",
};

function Row() {
  const { lang } = useI18n();
  return (
    <span className="flex shrink-0 items-center" aria-hidden>
      {ITEMS[lang].map((item) => (
        <span key={item} className="flex items-center">
          <span className="font-display px-7 text-[15px] font-bold uppercase tracking-[0.28em] text-spc-50 sm:text-lg">
            {item}
          </span>
          <Sparkle className="h-4 w-4 text-gold-500" aria-hidden />
        </span>
      ))}
      <span className="font-display px-7 text-[15px] font-semibold uppercase tracking-[0.2em] text-gold-200/80 sm:text-base">
        {PHRASE[lang]}
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
