"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SERVICIOS — grid de tarjetas 3D glossy estilo Apple
 *  + filtros por categoría con animación de layout
 *  + cada tarjeta abre su "página profunda" (ServiceDetail)
 *  + bilingüe ES/EN vía useSiteData()/useT()
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowUpRight, Flame, Eye } from "lucide-react";
import { waLink, type Service, type ServiceCategory } from "@/lib/site-config";
import { useSiteData, useT, L } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal, WordsReveal, Eyebrow, TiltCard } from "./motion-primitives";
import { WhatsAppIcon } from "./whatsapp-cta";
import { openServiceDetail } from "./service-detail";
import { SiteLink } from "./site-router";

const CATEGORY_STYLES: Record<ServiceCategory, string> = {
  packaging: "text-spc-700 ring-spc-600/20",
  commercial: "text-[#856629] ring-gold-600/30",
  digital: "text-emerald-700 ring-emerald-600/25",
};

type Filter = "all" | ServiceCategory;

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const t = useT();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard maxTilt={9} scale={1.015} className="h-full">
        {/* overflow-hidden vive SOLO en el contenedor de imagen: así la
            tarjeta mantiene preserve-3d y el cuerpo flota con translateZ */}
        <article className="glossy-card group flex h-full flex-col rounded-[1.6rem]">
          {/* ── Imagen con zoom 3D (clic = abrir detalle) ── */}
          <button
            type="button"
            onClick={() => openServiceDetail(service.id)}
            className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-t-[calc(1.6rem-1px)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spc-600"
            aria-label={t(L(`Ver detalle de ${service.title}`, `View details for ${service.title}`))}
          >
            <Image
              src={service.image}
              alt={t(L(
                `${service.title} — ejemplo real de producción`,
                `${service.title} — real production example`,
              ))}
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
                "absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] ring-1 backdrop-blur-md",
                CATEGORY_STYLES[service.category],
              )}
            >
              {service.categoryLabel}
            </span>
            {service.featured && (
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-spc-950/70 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-300 ring-1 ring-gold-500/40 backdrop-blur-md">
                <Flame className="h-3 w-3" aria-hidden />
                {t(L("Popular", "Popular"))}
              </span>
            )}
            {/* affordance "ver detalle" */}
            <span className="absolute bottom-3.5 right-3.5 flex translate-y-2 items-center gap-1.5 rounded-full bg-spc-950/75 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white opacity-0 ring-1 ring-white/25 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              <Eye className="h-3.5 w-3.5" aria-hidden />
              {t(L("Ver detalle", "View details"))}
            </span>
            {/* línea de luz inferior de la imagen */}
            <span
              aria-hidden
              className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
            />
          </button>

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
                <span className="font-bold">{t(L("¿Sabías que…? ", "Did you know? "))}</span>
                {service.insight}
              </p>
            </div>

            {/* acciones del funnel: detalle + WhatsApp */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              <button
                type="button"
                onClick={() => openServiceDetail(service.id)}
                className="group/cta inline-flex items-center gap-2.5 self-start rounded-full py-1 pl-1 pr-2 text-[13.5px] font-bold text-spc-600 transition-colors hover:text-spc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spc-600"
                aria-label={t(L(`Abrir información completa de ${service.title}`, `Open full information for ${service.title}`))}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-spc-600/10 ring-1 ring-spc-600/20 transition-all duration-300 group-hover/cta:bg-spc-600 group-hover/cta:ring-spc-600/40">
                  <Eye className="h-4 w-4 text-spc-600 transition-colors group-hover/cta:text-white" />
                </span>
                {t(L("Ver detalle completo", "Full details"))}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
              </button>
              <a
                href={waLink(service.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa inline-flex items-center gap-2 rounded-full py-1 text-[13px] font-bold text-emerald-700 transition-colors hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
                aria-label={t(L(`Cotizar ${service.title} por WhatsApp`, `Quote ${service.title} on WhatsApp`))}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-wa/10 ring-1 ring-wa/25 transition-all duration-300 group-hover/wa:bg-wa group-hover/wa:ring-wa/50">
                  <WhatsAppIcon className="h-4 w-4 transition-colors group-hover/wa:text-white" />
                </span>
                {t(L("Cotizar", "Get a quote"))}
              </a>
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

export function Services({ variant = "full" }: { variant?: "full" | "teaser" }) {
  const [filter, setFilter] = useState<Filter>("all");
  const t = useT();
  const { SERVICES, WA_MESSAGES } = useSiteData();
  const teaser = variant === "teaser";
  /* teaser: solo los destacados (para el home); full: todas las líneas */
  const pool = teaser ? SERVICES.filter((s) => s.featured) : SERVICES;
  const visible = filter === "all" ? pool : pool.filter((s) => s.category === filter);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t(L("Todos", "All")) },
    ...(["packaging", "commercial", "digital"] as ServiceCategory[]).map((c) => ({
      id: c,
      label: SERVICES.find((s) => s.category === c)?.categoryLabel ?? c,
    })),
  ];

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-gradient-to-b from-spc-50 via-white to-white py-24 sm:py-32"
      aria-label={t(L("Servicios y productos", "Services and products"))}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t(L("Servicios · 9 líneas de producto", "Services · 9 product lines"))}</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
            <WordsReveal text={teaser ? t(L("Los más pedidos.", "Most requested.")) : t(L("Nueve líneas.", "Nine lines."))} />{" "}
            <WordsReveal text={t(L("Un solo estándar.", "One single standard."))} wordClassName="text-gradient-spc" delay={0.14} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-spc-900/65">
              {teaser ? (
                <>
                  {t(L(
                    "Packaging de alimentos, impresión digital bajo demanda e impresos comerciales: los tres servicios que más mueven la industria.",
                    "Food packaging, on-demand digital printing and commercial print: the three services that move the industry most.",
                  ))}{" "}
                  <strong className="font-semibold text-spc-800">{t(L("Explora las 9 líneas completas.", "Explore all 9 product lines."))}</strong>
                </>
              ) : (
                <>
                  {t(L(
                    "Del packaging que protege tu producto hasta la revista que cuenta tu historia. Abre cada servicio para conocer especificaciones, tiempos y respuestas —",
                    "From the packaging that protects your product to the magazine that tells your story. Open each service for specs, timelines and answers —",
                  ))}{" "}
                  <strong className="font-semibold text-spc-800">
                    {t(L("y cotiza por WhatsApp en un clic.", "and get a WhatsApp quote in one click."))}
                  </strong>
                </>
              )}
            </p>
          </Reveal>
        </div>

        {/* filtros por categoría (solo página completa) */}
        {!teaser && (
        <Reveal delay={0.15} className="mt-9">
          <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label={t(L("Filtrar servicios por categoría", "Filter services by category"))}>
            {filters.map((f) => {
              const active = filter === f.id;
              const count = f.id === "all" ? SERVICES.length : SERVICES.filter((s) => s.category === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 text-[13px] font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spc-600",
                    active ? "text-white" : "text-spc-700 hover:text-spc-500",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-spc-700 to-spc-500 shadow-[0_8px_24px_-8px_rgba(0,60,141,0.55)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f.label}
                  <span className={cn("ml-2 text-[11px] font-semibold", active ? "text-white/70" : "text-spc-400")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
        )}

        {/* grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA a la página completa de servicios (solo teaser del home) */}
        {teaser && (
          <Reveal delay={0.1} className="mt-12 text-center">
            <SiteLink
              to="servicios"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-spc-700 to-spc-500 px-8 py-4 text-[14.5px] font-bold text-white shadow-[0_14px_40px_-12px_rgba(0,60,141,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_-14px_rgba(0,60,141,0.7)]"
            >
              {t(L("Explorar las 9 líneas de producto", "Explore the 9 product lines"))}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </SiteLink>
            <p className="mt-3.5 text-[12.5px] font-medium text-spc-900/50">
              {t(L(
                "Packaging · Impresión comercial · Digital — con especificaciones y FAQs por servicio",
                "Packaging · Commercial print · Digital — with specs and FAQs per service",
              ))}
            </p>
          </Reveal>
        )}

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
                  {t(L("¿No sabes cuál necesitas?", "Not sure which one you need?"))}
                </p>
                <h3 className="font-display mt-2.5 text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-tight text-spc-900">
                  {t(L("Cuéntanos tu proyecto y te asesoramos gratis.", "Tell us about your project and get free advice."))}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-spc-900/65">
                  {t(L(
                    "No necesitas saber nada de impresión. Descríbenos tu idea por WhatsApp y un especialista te recomienda la mejor opción: papel, acabado, tiraje y fecha.",
                    "You don't need to know anything about printing. Describe your idea on WhatsApp and a specialist will recommend the best option: paper, finish, run size and date.",
                  ))}
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
                  {t(L("Pedir asesoría gratis", "Get free advice"))}
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
