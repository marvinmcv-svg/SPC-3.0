"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SERVICIOS — grid de tarjetas 3D glossy estilo Apple
 *  Cada tarjeta: tilt + brillo especular + zoom de imagen + micro-CTA
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbulb, ArrowUpRight, Flame } from "lucide-react";
import { SERVICES, WA_MESSAGES, waLink, type Service } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Reveal, WordsReveal, Eyebrow, TiltCard } from "./motion-primitives";
import { WhatsAppIcon } from "./whatsapp-cta";

const CATEGORY_STYLES: Record<Service["category"], string> = {
  Packaging: "bg-spc-600/10 text-spc-700 ring-spc-600/20",
  "Impresión Comercial": "bg-gold-500/15 text-[#856629] ring-gold-600/30",
  Digital: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/25",
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.1} y={44}>
      <TiltCard maxTilt={9} scale={1.015} className="h-full">
        {/* overflow-hidden vive SOLO en el contenedor de imagen: así la
            tarjeta mantiene preserve-3d y el cuerpo flota con translateZ */}
        <article className="glossy-card group flex h-full flex-col rounded-[1.6rem]">
          {/* ── Imagen con zoom 3D ── */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-[calc(1.6rem-1px)]">
            <Image
              src={service.image}
              alt={`${service.title} — producción real de SPC`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-spc-950/45 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-50"
            />
            {/* badge categoría */}
            <span
              className={cn(
                "absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] ring-1 backdrop-blur-md",
                CATEGORY_STYLES[service.category],
                "bg-opacity-90"
              )}
              style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
            >
              {service.category}
            </span>
            {service.featured && (
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-spc-950/70 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-300 ring-1 ring-gold-500/40 backdrop-blur-md">
                <Flame className="h-3 w-3" aria-hidden />
                Popular
              </span>
            )}
            {/* línea de luz inferior de la imagen */}
            <span
              aria-hidden
              className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
            />
          </div>

          {/* ── Cuerpo (flota 24px sobre el plano de la tarjeta: profundidad real) ── */}
          <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(24px)" }}>
            <h3 className="font-display text-[19px] font-bold leading-tight tracking-tight text-spc-900">
              {service.title}
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-spc-900/65">
              {service.description}
            </p>

            {/* dato educativo */}
            <div className="mt-4 flex gap-3 rounded-2xl bg-gradient-to-br from-gold-100/80 to-gold-500/10 p-3.5 ring-1 ring-gold-600/20">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden />
              <p className="text-[12px] leading-relaxed text-[#856629]">
                <span className="font-bold">¿Sabías que…? </span>
                {service.insight}
              </p>
            </div>

            {/* micro-CTA del funnel */}
            <a
              href={waLink(service.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta mt-5 inline-flex items-center gap-2.5 self-start rounded-full py-1 pl-1 pr-2 text-[13.5px] font-bold text-spc-600 transition-colors hover:text-spc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spc-600"
              aria-label={`Cotizar ${service.title} por WhatsApp`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-spc-600/10 ring-1 ring-spc-600/20 transition-all duration-300 group-hover/cta:bg-wa group-hover/cta:ring-wa/40">
                <WhatsAppIcon className="h-4 w-4 transition-colors group-hover/cta:text-white" />
              </span>
              Cotizar este servicio
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
            </a>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-gradient-to-b from-spc-50 via-white to-white py-24 sm:py-32"
      aria-label="Servicios y productos"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Servicios · 9 líneas de producto</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
            <WordsReveal text="Nueve líneas." />{" "}
            <WordsReveal text="Un solo estándar." wordClassName="text-gradient-spc" delay={0.14} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-spc-900/65">
              Del packaging que protege tu producto hasta la revista que cuenta tu historia.
              Explora lo que imprimimos — y si tienes dudas,{" "}
              <strong className="font-semibold text-spc-800">
                cada tarjeta te conecta directo con un asesor por WhatsApp.
              </strong>
            </p>
          </Reveal>
        </div>

        {/* grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA de asesoría (funnel educativo) */}
        <Reveal delay={0.1} className="mt-14">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glossy-card relative overflow-hidden rounded-[2rem] p-8 sm:p-10"
          >
            <span className="gloss" aria-hidden />
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-spc-600">
                  ¿No sabes cuál necesitas?
                </p>
                <h3 className="font-display mt-2.5 text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-tight text-spc-900">
                  Cuéntanos tu proyecto y te asesoramos gratis.
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-spc-900/65">
                  No necesitas saber nada de impresión. Descríbenos tu idea por WhatsApp y un
                  especialista te recomienda la mejor opción: papel, acabado, tiraje y fecha.
                </p>
              </div>
              <div className="shrink-0">
                <a
                  href={waLink(WA_MESSAGES.services)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine group inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-7 py-4 text-[15px] font-bold text-white shadow-[0_14px_40px_-12px_rgba(37,211,102,0.65),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_-14px_rgba(37,211,102,0.8)]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Pedir asesoría gratis
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
