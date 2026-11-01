"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SERVICIOS — grid de tarjetas 3D glossy estilo Apple
 *  • filtros por categoría con animación de layout
 *  • la foto de la tarjeta recorre la galería de producto real al hover
 *  • logos de las marcas cliente que imprimen esa línea
 *  • cada tarjeta lleva a su página completa /servicios/[id]
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowUpRight, Flame, Images } from "lucide-react";
import { SERVICES, waLink, type Service } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n";
import { useContent, type LocalizedService } from "@/lib/use-content";
import { cn } from "@/lib/utils";
import { Reveal, WordsReveal, CharReveal, Eyebrow, TiltCard } from "./motion-primitives";
import { WhatsAppIcon } from "./whatsapp-cta";

const CATEGORY_STYLES: Record<Service["category"], string> = {
  Packaging: "text-spc-700 ring-spc-600/20",
  "Impresión Comercial": "text-[#856629] ring-gold-600/30",
  Digital: "text-emerald-700 ring-emerald-600/25",
};

type Filter = "Todos" | Service["category"];
const FILTERS: Filter[] = ["Todos", "Packaging", "Impresión Comercial", "Digital"];
/* referencia estable para contar por categoría */
const ALL = SERVICES;

/** Imagen que recorre la galería mientras el cursor está encima */
function CyclingImage({ service, active }: { service: Service; active: boolean }) {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const n = service.gallery.length;
  useEffect(() => {
    if (!active || n < 2) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), 1300);
    return () => {
      window.clearInterval(id);
      setI(0);
    };
  }, [active, n]);
  const img = service.gallery[i];
  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={img.src}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: active ? 1.06 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(img.brand ? "bg-white object-contain p-6" : "object-cover")}
          />
        </motion.div>
      </AnimatePresence>
      {img.brand && (
        <motion.span
          key={`b-${img.src}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-3.5 left-3.5 rounded-full bg-spc-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-300 backdrop-blur-md"
        >
          {t("Producto real", "Real product")} · {img.brand}
        </motion.span>
      )}
      {n > 1 && (
        <span className="absolute bottom-3.5 right-3.5 flex gap-1" aria-hidden>
          {service.gallery.map((g, k) => (
            <span key={g.src} className={cn("h-1.5 rounded-full transition-all duration-500", k === i ? "w-5 bg-white" : "w-1.5 bg-white/50")} />
          ))}
        </span>
      )}
    </>
  );
}

export function ServiceCard({ service, index }: { service: LocalizedService; index: number }) {
  const [hover, setHover] = useState(false);
  const { t } = useI18n();
  const { getClient } = useContent();
  const brands = service.brands.map(getClient).filter(Boolean).slice(0, 4);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, rotateX: 14, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TiltCard maxTilt={9} scale={1.02} className="h-full">
        <article className="glossy-card group flex h-full flex-col rounded-[1.6rem]">
          <span aria-hidden className="glossy-sheen" />
          <Link
            href={`/servicios/${service.id}`}
            className="relative block aspect-[4/3] w-full overflow-hidden rounded-t-[calc(1.6rem-1px)] bg-spc-50"
            aria-label={`${t("Ver", "View")} ${service.title}`}
          >
            <CyclingImage service={service} active={hover} />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-spc-950/40 via-transparent to-transparent" />
            <span className={cn("absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] ring-1 backdrop-blur-md", CATEGORY_STYLES[service.category])}>
              {service.categoryLabel}
            </span>
            {service.featured ? (
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-spc-950/70 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-300 ring-1 ring-gold-500/40 backdrop-blur-md">
                <Flame className="h-3 w-3" aria-hidden />
                {t("Popular", "Popular")}
              </span>
            ) : service.gallery.length > 1 ? (
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-spc-950/70 px-3 py-1.5 text-[10.5px] font-bold text-white ring-1 ring-white/20 backdrop-blur-md">
                <Images className="h-3 w-3" aria-hidden />
                {service.gallery.length}
              </span>
            ) : null}
            <span aria-hidden className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </Link>

          <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(28px)" }}>
            <h3 className="font-display text-[19px] font-bold leading-tight tracking-tight text-spc-900">
              <Link href={`/servicios/${service.id}`} className="transition-colors hover:text-spc-600">
                {service.title}
              </Link>
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-spc-900/65">{service.description}</p>

            <div className="mt-4 flex gap-3 rounded-2xl bg-gradient-to-br from-gold-100/80 to-gold-500/10 p-3.5 ring-1 ring-gold-600/20">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden />
              <p className="text-[12px] leading-relaxed text-[#856629]">
                <span className="font-bold">{t("¿Sabías que…? ", "Did you know? ")}</span>
                {service.insight}
              </p>
            </div>

            {brands.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-spc-400">{t("Lo imprimen con nosotros", "Brands printing this with us")}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {brands.map((c) =>
                    c!.logo ? (
                      <span key={c!.id} title={c!.name} className="logo-mono relative h-8 w-16 rounded-lg bg-white px-1.5 ring-1 ring-spc-900/8">
                        <Image src={c!.logo} alt={c!.name} fill sizes="64px" className="object-contain p-1" />
                      </span>
                    ) : (
                      <span
                        key={c!.id}
                        title={c!.name}
                        className="flex h-8 items-center rounded-lg px-2 text-[10.5px] font-extrabold text-white"
                        style={{ background: c!.color }}
                      >
                        {c!.initials}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-5">
              <Link
                href={`/servicios/${service.id}`}
                className="group/cta inline-flex items-center gap-2 rounded-full text-[13.5px] font-bold text-spc-600 transition-colors hover:text-spc-800"
              >
                {t("Ver servicio completo", "View full service")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" aria-hidden />
              </Link>
              <a
                href={waLink(service.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa inline-flex items-center gap-2 rounded-full text-[13px] font-bold text-emerald-700 transition-colors hover:text-emerald-600"
                aria-label={`${t("Cotizar", "Quote")} ${service.title} ${t("por WhatsApp", "on WhatsApp")}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-wa/10 ring-1 ring-wa/25 transition-all duration-300 group-hover/wa:bg-wa">
                  <WhatsAppIcon className="h-4 w-4 transition-colors group-hover/wa:text-white" />
                </span>
                {t("Cotizar", "Quote")}
              </a>
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

export function Services({ limit, showHeader = true }: { limit?: number; showHeader?: boolean }) {
  const [filter, setFilter] = useState<Filter>("Todos");
  const { t } = useI18n();
  const { services: SERVICES, wa, categoryLabel } = useContent();
  const filtered = filter === "Todos" ? SERVICES : SERVICES.filter((s) => s.category === filter);
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="servicios" className="relative overflow-hidden bg-gradient-to-b from-spc-50 via-white to-white py-24 sm:py-32" aria-label={t("Servicios y productos", "Services and products")}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[460px] w-[460px] rounded-full bg-spc-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {showHeader && (
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("Servicios · 9 líneas de producto", "Services · 9 product lines")}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
              <CharReveal text={t("Nueve líneas.", "Nine lines.")} />{" "}
              <WordsReveal text={t("Un solo estándar.", "One standard.")} wordClassName="text-gradient-spc" delay={0.3} />
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-spc-900/65">
                {t(
                  "Del packaging que protege tu producto hasta la revista que cuenta tu historia. Pasa el cursor por cada tarjeta para ver producto real de marcas que imprimen con nosotros —",
                  "From the packaging that protects your product to the magazine that tells your story. Hover over each card to see real products from brands that print with us —"
                )}{" "}
                <strong className="font-semibold text-spc-800">{t("y cotiza por WhatsApp en un clic.", "and get a WhatsApp quote in one click.")}</strong>
              </p>
            </Reveal>
          </div>
        )}

        <Reveal delay={0.15} className="mt-9">
          <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label={t("Filtrar servicios por categoría", "Filter services by category")}>
            {FILTERS.map((f) => {
              const active = filter === f;
              const count = f === "Todos" ? ALL.length : ALL.filter((s) => s.category === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 text-[13px] font-bold transition-colors duration-300",
                    active ? "text-white" : "text-spc-700 hover:text-spc-500"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-spc-700 to-spc-500 shadow-[0_8px_24px_-8px_rgba(0,60,141,0.55)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f === "Todos" ? t("Todos", "All") : categoryLabel(f)}
                  <span className={cn("ml-2 text-[11px] font-semibold", active ? "text-white/70" : "text-spc-400")}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {limit && (
          <Reveal className="mt-10 flex justify-center">
            <Link
              href="/servicios"
              className="shine group inline-flex items-center gap-2.5 rounded-full bg-spc-950 px-7 py-4 text-[14px] font-bold text-white shadow-[0_18px_40px_-16px_rgba(6,15,46,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("Ver las 9 líneas de producto", "See all 9 product lines")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-14">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glossy-card relative overflow-hidden rounded-[2rem] p-8 sm:p-10"
          >
            <span className="glossy-sheen" aria-hidden />
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-spc-600">{t("¿No sabes cuál necesitas?", "Not sure which one you need?")}</p>
                <h3 className="font-display mt-2.5 text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-tight text-spc-900">
                  {t("Cuéntanos tu proyecto y te asesoramos gratis.", "Tell us about your project and we'll advise you for free.")}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-spc-900/65">
                  {t(
                    "No necesitas saber nada de impresión. Descríbenos tu idea por WhatsApp y un especialista te recomienda la mejor opción: papel, acabado, tiraje y fecha.",
                    "You don't need to know anything about printing. Describe your idea on WhatsApp and a specialist will recommend the best option: paper, finish, run size and date."
                  )}
                </p>
              </div>
              <a
                href={waLink(wa.services)}
                target="_blank"
                rel="noopener noreferrer"
                className="shine group inline-flex shrink-0 items-center gap-3 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-7 py-4 text-[15px] font-bold text-white shadow-[0_14px_40px_-12px_rgba(37,211,102,0.65),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t("Pedir asesoría gratis", "Get free advice")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
