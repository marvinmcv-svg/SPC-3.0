"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  CLIENTES — muro de marcas nacionales con LOGOS REALES
 *  (marquee doble infinito) + reseñas de clientes en tarjetas 3D glossy
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BadgeCheck, MapPin, ShieldCheck, Truck, Factory, Sparkles, MessageSquareQuote } from "lucide-react";
import { CLIENTS, TESTIMONIALS, type Client } from "@/lib/site-config";
import { Reveal, WordsReveal, Eyebrow, TiltCard } from "./motion-primitives";
import { openSpcAi } from "./spc-ai-widget";
import { SiteLink } from "./site-router";

/* ── Tarjeta de marca: LOGO real o monograma de respaldo ── */
function ClientBadge({ client }: { client: Client }) {
  return (
    <div
      className="group flex shrink-0 items-center gap-3.5 rounded-2xl border border-spc-900/8 bg-white/85 px-5 py-3.5 shadow-[0_2px_12px_-4px_rgba(12,27,77,0.08)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-spc-900/15 hover:shadow-[0_16px_36px_-12px_rgba(12,27,77,0.22)]"
      title={client.note}
    >
      {client.logo ? (
        <span className="flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-xl bg-white px-1.5 shadow-[inset_0_0_0_1px_rgba(12,27,77,0.06)] transition-transform duration-500 group-hover:scale-105">
          <Image
            src={client.logo}
            alt={`Logo ${client.name}`}
            width={88}
            height={44}
            className="max-h-9 w-auto max-w-[104px] object-contain"
          />
        </span>
      ) : (
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-[13px] font-extrabold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_16px_-6px_rgba(6,15,46,0.35)] transition-transform duration-500 group-hover:scale-110"
          style={{
            background: `linear-gradient(140deg, ${client.color}e6, ${client.color})`,
          }}
        >
          {client.initials}
        </span>
      )}
      <span className="flex min-w-0 flex-col">
        <span className="font-display truncate text-[14px] font-bold tracking-tight text-spc-900">
          {client.name}
        </span>
        <span className="truncate text-[10.5px] font-semibold uppercase tracking-[0.14em] text-spc-500">
          {client.sector}
        </span>
      </span>
    </div>
  );
}

/* ── Fila infinita: contenido duplicado para loop perfecto ── */
function MarqueeRow({ clients, reverse = false, slow = false }: { clients: readonly Client[]; reverse?: boolean; slow?: boolean }) {
  const doubled = [...clients, ...clients];
  return (
    <div className="group relative overflow-hidden py-2.5" role="presentation">
      {/* veladuras laterales */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-spc-50 via-spc-50/70 to-transparent sm:w-32" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-spc-50 via-spc-50/70 to-transparent sm:w-32" />
      <div
        className={
          reverse
            ? "animate-marquee-reverse flex w-max gap-4 group-hover:[animation-play-state:paused]"
            : "animate-marquee-slow flex w-max gap-4 group-hover:[animation-play-state:paused]"
        }
      >
        {doubled.map((client, i) => (
          <ClientBadge key={`${client.id}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

/* ── Tarjeta de reseña ── */
function TestimonialCard({ t, index }: { t: (typeof TESTIMONIALS)[number]; index: number }) {
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <Reveal delay={(index % 3) * 0.1} y={40}>
      <TiltCard maxTilt={7} scale={1.015} className="h-full">
        <article className="glossy-card relative flex h-full flex-col rounded-[1.6rem] p-6 sm:p-7">
          {/* comillas decorativas */}
          <span aria-hidden className="absolute right-6 top-5 text-spc-100">
            <MessageSquareQuote className="h-9 w-9" />
          </span>

          {/* estrellas */}
          <div className="flex items-center gap-1" aria-label={`${t.stars} de 5 estrellas`}>
            {Array.from({ length: t.stars }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 300, damping: 15 }}
              >
                <Star className="h-4 w-4 fill-gold-500 text-gold-500" aria-hidden />
              </motion.span>
            ))}
          </div>

          {/* reseña */}
          <p className="relative mt-4 flex-1 text-[13.5px] leading-relaxed text-spc-900/80">
            “{t.quote}”
          </p>

          {/* pie: autor + verificación */}
          <footer className="mt-6 flex items-center gap-3.5 border-t border-spc-900/8 pt-5">
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-spc-500 to-spc-800 font-display text-[13px] font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[13.5px] font-bold text-spc-900">
                {t.name}
                <BadgeCheck className="h-4 w-4 shrink-0 text-spc-500" aria-label="Cliente verificado" />
              </p>
              <p className="truncate text-[11.5px] font-medium text-spc-900/55">
                {t.role} · {t.company}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-spc-400">
                <MapPin className="h-3 w-3" aria-hidden />
                {t.city} · {t.service}
              </p>
            </div>
          </footer>
        </article>
      </TiltCard>
    </Reveal>
  );
}

/* ── Cifras de confianza ── */
const TRUST_STATS = [
  { icon: Truck, value: "9 / 9", label: "Departamentos con entregas" },
  { icon: Factory, value: "+1.000", label: "Proyectos productivos al año" },
  { icon: ShieldCheck, value: "24/7", label: "Atención vía SPenCer y WhatsApp" },
] as const;

export function Clients({ compact = false }: { compact?: boolean }) {
  const half = Math.ceil(CLIENTS.length / 2);
  const rowA = CLIENTS.slice(0, half);
  const rowB = CLIENTS.slice(half);
  const testimonials = compact ? TESTIMONIALS.slice(0, 3) : TESTIMONIALS;

  return (
    <section
      id="clientes"
      className="relative overflow-hidden bg-gradient-to-b from-spc-50 via-white to-white py-24 sm:py-32"
      aria-label="Clientes y reseñas"
    >
      {/* textura de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-1/4 h-[420px] w-[420px] rounded-full bg-gold-100/50 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Clientes · toda Bolivia</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
            <WordsReveal text="Las marcas que Bolivia consume" />{" "}
            <WordsReveal text="imprimen con SPC." wordClassName="text-gradient-spc" delay={0.14} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-spc-900/65">
              Del snacks que compras en el kiosco hasta el medicamento de tu farmacia:{" "}
              <strong className="font-semibold text-spc-800">
                la industria boliviana confía su imagen en nuestra planta.
              </strong>
            </p>
          </Reveal>
        </div>

        {/* marquee doble de marcas */}
        <Reveal delay={0.15} className="mt-12">
          <div className="relative">
            <MarqueeRow clients={rowA} />
            <MarqueeRow clients={rowB} reverse />
          </div>
        </Reveal>

        {/* cifras de confianza */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {TRUST_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} y={20}>
              <div className="flex items-center gap-3.5 rounded-2xl bg-spc-50/80 px-5 py-4 ring-1 ring-spc-600/10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-spc-600/10 text-spc-600">
                  <stat.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg font-extrabold leading-none text-spc-900">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-spc-900/55">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* reseñas */}
        <div className="mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-tight tracking-tight text-spc-900">
              Lo que dicen quienes ya imprimen con nosotros
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-spc-900/60">
              Marcas de alimentos, farmacia, retail y editorial que repiten tiraje tras tiraje —
              la mejor reseña de una imprenta es el pedido que vuelve.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </div>

          {/* enlace a la página completa de clientes */}
          {compact && (
            <Reveal delay={0.1} className="mt-8 text-center">
              <SiteLink
                to="clientes"
                className="group inline-flex items-center gap-2 rounded-full border border-spc-600/20 bg-white/70 px-6 py-3 text-[13.5px] font-bold text-spc-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-spc-600/40 hover:bg-white"
              >
                Ver todas las reseñas y marcas
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-spc-600/10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </SiteLink>
            </Reveal>
          )}

          {/* puente al funnel: SPC AI */}
          <Reveal delay={0.1} className="mt-10">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[1.8rem] bg-gradient-to-r from-spc-900 via-spc-800 to-spc-900 p-7 text-center shadow-[0_30px_70px_-30px_rgba(6,15,46,0.6)] sm:flex-row sm:text-left">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_12px_30px_-8px_rgba(255,179,28,0.65)]">
                <Sparkles className="h-7 w-7 text-spc-900" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="font-display text-[16px] font-bold text-white">
                  ¿Quieres ser la próxima historia de éxito?
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/70">
                  Pregunta a <strong className="font-semibold text-gold-300">SPenCer</strong>, nuestra
                  recepcionista inteligente: te guía de tu idea al WhatsApp en minutos.
                </p>
              </div>
              <button
                type="button"
                onClick={openSpcAi}
                className="shine inline-flex shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-6 py-3.5 text-[14px] font-bold text-spc-900 shadow-[0_10px_30px_-8px_rgba(255,179,28,0.6)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                Hablar con SPenCer
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
