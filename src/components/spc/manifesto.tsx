"use client";

/**
 * MANIFIESTO — frase que se enciende palabra por palabra con el scroll
 * (estilo keynote) + cifras con contador sobre tarjetas glossy.
 */

import { STATS } from "@/lib/site-config";
import { Counter, GlossyCard, ScrollHighlight, Stagger, StaggerItem } from "./motion-primitives";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32" aria-label="Manifiesto SPC">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-spc-50 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-spc-500">Nuestro oficio</p>
        <ScrollHighlight
          text="Cada caja, cada estuche y cada libro que sale de nuestra planta lleva la marca de alguien que confió en nosotros. Por eso imprimimos con calidad, puntualidad, capacidad y servicio — desde 2001."
          accentWords={["calidad", "puntualidad", "capacidad", "servicio"]}
          className="font-display mt-6 text-[clamp(1.7rem,3.8vw,3.1rem)] font-bold leading-[1.22] tracking-tight text-spc-900 [&_.text-gradient-gold]:bg-[linear-gradient(100deg,#e09a12,#ffb31c)]"
        />

        <Stagger className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.1}>
          {STATS.map((s) => (
            <StaggerItem key={s.label}>
              <GlossyCard innerClassName="p-6">
                <p className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold leading-none text-gradient-spc">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[13px] font-bold text-spc-900">{s.label}</p>
                <p className="mt-1 text-[12px] leading-snug text-spc-900/55">{s.detail}</p>
              </GlossyCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
