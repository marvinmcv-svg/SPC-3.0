"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SERVICE PAGE — página profunda de cada servicio (#/servicios/[id])
 *
 *  Nació como Dialog modal; ahora es una página completa del sitio:
 *  hero cinematográfico con parallax + Ken Burns, chips operativos,
 *  dato educativo "¿Sabías que…?", especificaciones y casos de uso,
 *  galería de producción, FAQ profunda, servicios relacionados y
 *  banda final de conversión (WhatsApp + formulario).
 * ══════════════════════════════════════════════════════════════════
 */

import { useRef } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ClipboardCheck,
  FileQuestion,
  Hash,
  Layers,
  Lightbulb,
  PackageCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { SERVICES, waLink, type Service } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Eyebrow, Reveal, TiltCard, WordsReveal } from "./motion-primitives";
import { Breadcrumb, SiteLink, navigate } from "./site-router";
import { WhatsAppIcon } from "./whatsapp-cta";

/** Abre la página de un servicio desde cualquier parte (hero, cards, footer…) */
export function openServiceDetail(serviceId: string) {
  navigate(`servicios/${serviceId}`);
}

/* ─── Colores de chip por categoría ─────────────────────────────── */

const CATEGORY_STYLES: Record<Service["category"], string> = {
  Packaging: "bg-spc-600/10 text-spc-600 ring-spc-600/15",
  "Impresión Comercial": "bg-gold-100/70 text-[#856629] ring-gold-600/20",
  Digital: "bg-emerald-600/10 text-emerald-700 ring-emerald-600/20",
};

/* ═══ Página completa del servicio ════════════════════════════════ */

export function ServicePage({ serviceId }: { serviceId: string }) {
  const service = SERVICES.find((s) => s.id === serviceId);

  /* id inválido → fallback amable (nunca crashea) */
  if (!service) return <ServiceNotFound />;

  /* otros servicios de la misma categoría (sin el actual, máx. 3) */
  const related = SERVICES.filter(
    (s) => s.category === service.category && s.id !== service.id,
  ).slice(0, 3);

  return (
    <article aria-label={`Detalle del servicio ${service.title}`}>
      {/* ── 1· Hero cinematográfico ── */}
      <ServiceHero service={service} />

      {/* ── 2· Chips operativos + 3· dato educativo ── */}
      <section
        aria-label="Datos operativos del servicio"
        className="mx-auto w-full max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Reveal y={20} className="h-full">
            <div className="flex h-full items-center gap-4 rounded-2xl bg-spc-50 p-5 ring-1 ring-spc-600/10">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-spc-600/10 text-spc-600">
                <Hash className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-spc-500">
                  Tiraje mínimo
                </p>
                <p className="mt-1 text-[14.5px] font-semibold text-spc-900">
                  {service.minRun}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal y={20} delay={0.08} className="h-full">
            <div className="flex h-full items-center gap-4 rounded-2xl bg-gold-100/70 p-5 ring-1 ring-gold-600/20">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-700">
                <Timer className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#856629]">
                  Tiempo de producción
                </p>
                <p className="mt-1 text-[14.5px] font-semibold text-spc-900">
                  {service.turnaround}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* dato educativo */}
        <Reveal y={24} delay={0.12}>
          <div className="mt-5 flex gap-4 rounded-2xl bg-gradient-to-br from-spc-900 to-spc-800 p-6 text-white">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 ring-1 ring-gold-500/40">
              <Lightbulb className="h-5 w-5 text-gold-400" aria-hidden />
            </span>
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-300">
                ¿Sabías que…?
              </p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/85">
                {service.insight}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 4· Especificaciones + casos de uso ── */}
      <section
        aria-labelledby="specs-heading"
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Detalle técnico</Eyebrow>
          <Reveal delay={0.1}>
            <h2
              id="specs-heading"
              className="font-display mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-spc-900"
            >
              Especificaciones y casos de uso
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 text-[14.5px] leading-relaxed text-spc-900/65">
              Parámetros, materiales y acabados que manejamos de rutina en esta
              línea — explicados sin tecnicismos innecesarios.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          {/* especificaciones técnicas */}
          <div>
            <h3 className="flex items-center gap-2.5 font-display text-[16px] font-bold text-spc-900">
              <Layers className="h-4.5 w-4.5 text-spc-600" aria-hidden />
              Especificaciones técnicas
            </h3>
            <ul className="mt-5 space-y-3">
              {service.specs.map((spec, i) => (
                <motion.li
                  key={spec}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
                  className="flex items-start gap-3 rounded-xl bg-spc-50/70 px-4.5 py-3.5 text-[13.5px] leading-relaxed text-spc-900/80 ring-1 ring-spc-600/5"
                >
                  <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-spc-500" aria-hidden />
                  {spec}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* casos de uso */}
          <div>
            <h3 className="flex items-center gap-2.5 font-display text-[16px] font-bold text-spc-900">
              <PackageCheck className="h-4.5 w-4.5 text-spc-600" aria-hidden />
              ¿Para qué se usa?
            </h3>
            <ul className="mt-5 space-y-3">
              {service.useCases.map((uc, i) => (
                <motion.li
                  key={uc}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
                  className="rounded-xl bg-gradient-to-br from-gold-100/80 to-gold-500/10 px-4.5 py-3.5 text-[13.5px] leading-relaxed text-spc-900/85 ring-1 ring-gold-600/15"
                >
                  {uc}
                </motion.li>
              ))}
            </ul>

            {/* CTA intermedio del funnel */}
            <a
              href={waLink(service.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Cotizar ${service.title} por WhatsApp`}
              className="shine group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_34px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-4.5 w-4.5" />
              Cotizar {service.shortTitle.toLowerCase()} por WhatsApp
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── 5· Galería de producción (solo si existe) ── */}
      {service.gallery && service.gallery.length > 0 && (
        <section
          aria-labelledby="gallery-heading"
          className="bg-spc-50/70 py-16 sm:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Galería</Eyebrow>
              <Reveal delay={0.1}>
                <h2
                  id="gallery-heading"
                  className="font-display mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-spc-900"
                >
                  Producción real de esta línea
                </h2>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-4 text-[14.5px] leading-relaxed text-spc-900/65">
                  Piezas que salieron de nuestras prensas — el mismo estándar de
                  calidad que recibirá tu proyecto.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {service.gallery.map((src, i) => (
                <Reveal key={src} y={36} delay={i * 0.08}>
                  <TiltCard maxTilt={8} scale={1.02}>
                    <figure className="glossy-card group relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={src}
                        alt={`${service.title} — producción real de SPC (foto ${i + 1})`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                      />
                      {/* línea de luz inferior */}
                      <span
                        aria-hidden
                        className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
                      />
                    </figure>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6· Preguntas frecuentes profundas ── */}
      <section
        aria-labelledby="faq-heading"
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Resolvemos tus dudas</Eyebrow>
          <Reveal delay={0.1}>
            <h2
              id="faq-heading"
              className="font-display mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-spc-900"
            >
              Preguntas frecuentes de este servicio
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10">
          <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-2.5">
            {service.deepFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${service.id}-${i}`}
                className="overflow-hidden rounded-2xl border-none bg-spc-50/80 ring-1 ring-spc-600/10 data-[state=open]:bg-spc-50"
              >
                <AccordionTrigger className="px-5 py-4 text-left text-[13.5px] font-bold text-spc-800 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-[13px] leading-relaxed text-spc-900/70">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* ── 7· Servicios relacionados (misma categoría) ── */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="bg-spc-50/70 py-16 sm:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Sigue explorando</Eyebrow>
              <Reveal delay={0.1}>
                <h2
                  id="related-heading"
                  className="font-display mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-spc-900"
                >
                  Otros servicios de {service.category}
                </h2>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other, i) => (
                <Reveal key={other.id} y={36} delay={i * 0.08} className="h-full">
                  <TiltCard maxTilt={7} scale={1.015} className="h-full">
                    <button
                      type="button"
                      onClick={() => openServiceDetail(other.id)}
                      aria-label={`Ver detalle de ${other.title}`}
                      className="glossy-card group relative flex h-full w-full cursor-pointer flex-col rounded-[1.6rem] p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spc-600 sm:p-7"
                    >
                      <span
                        className={cn(
                          "w-fit rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] ring-1",
                          CATEGORY_STYLES[other.category],
                        )}
                      >
                        {other.category}
                      </span>
                      <h3 className="font-display mt-4 text-[18px] font-bold leading-tight tracking-tight text-spc-900">
                        {other.title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-spc-900/65">
                        {other.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-spc-600 transition-colors duration-300 group-hover:text-spc-800">
                        Ver detalle
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </span>
                    </button>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8· Banda final de conversión ── */}
      <section
        aria-label="Cotización de este servicio"
        className="mx-auto w-full max-w-7xl px-5 pb-20 pt-6 sm:px-8 sm:pb-24"
      >
        <Reveal y={30}>
          <div className="grain relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-spc-950 via-spc-900 to-spc-800 p-8 text-white shadow-[0_44px_110px_-44px_rgba(6,15,46,0.6)] sm:p-12">
            {/* halo cálido */}
            <div
              aria-hidden
              className="absolute right-[-12%] top-[-35%] h-[360px] w-[360px] rounded-full bg-gold-500/15 blur-[110px]"
            />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">
                  Cotiza {service.shortTitle.toLowerCase()}
                </p>
                <h2 className="font-display mt-3 text-[clamp(1.5rem,2.9vw,2.2rem)] font-extrabold leading-tight">
                  ¿Te imaginaste tu proyecto en esta línea?
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                  Cuéntanos tiraje, formato y acabados — un asesor especializado
                  te responde hoy mismo con una cotización clara, sin compromiso.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row lg:flex-col">
                <a
                  href={waLink(service.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Cotizar ${service.title} por WhatsApp`}
                  className="shine inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-7 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_34px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                  Cotizar por WhatsApp
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <SiteLink
                  to="contacto"
                  aria-label="Cotizar en el formulario de contacto"
                  className="shine inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-7 py-3.5 text-[14px] font-bold text-spc-900 shadow-[0_10px_30px_-8px_rgba(255,179,28,0.55)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Cotizar en el formulario
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </SiteLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}

/* ═══ Hero cinematográfico con parallax + Ken Burns ═══════════════ */

function ServiceHero({ service }: { service: Service }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  /* parallax desactivado si el usuario prefiere menos movimiento */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, reduce ? 1.02 : 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label={`Presentación de ${service.title}`}
      className="grain relative flex min-h-[44svh] items-end overflow-hidden bg-spc-950 pb-12 pt-28 sm:pb-16 sm:pt-32"
    >
      {/* fondo: parallax de scroll + Ken Burns lento */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05, x: "-1.2%" }}
          animate={reduce ? { scale: 1.05, x: "0%" } : { scale: 1.14, x: "1.2%" }}
          transition={{
            duration: 26,
            ease: "easeInOut",
            repeat: reduce ? 0 : Infinity,
            repeatType: "mirror",
          }}
        >
          <Image
            src={service.image}
            alt={`${service.title} — producción de SPC`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* veladuras de marca */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-spc-950 via-spc-950/55 to-spc-950/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-spc-950/75 via-spc-950/25 to-transparent"
      />
      {/* halo cálido */}
      <div
        aria-hidden
        className="absolute right-[-10%] top-1/4 h-[380px] w-[380px] rounded-full bg-gold-500/12 blur-[120px]"
      />

      {/* contenido */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Breadcrumb
            items={[
              { label: "Inicio", to: "/" },
              { label: "Servicios", to: "servicios" },
              { label: service.title },
            ]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold-300 ring-1 ring-white/25 backdrop-blur-md">
            <Sparkles className="h-3 w-3" aria-hidden />
            {service.category}
          </span>
        </motion.div>

        <WordsReveal
          as="h1"
          text={service.title}
          delay={0.28}
          stagger={0.08}
          className="font-display mt-4 max-w-4xl text-[clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight text-white"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75"
        >
          {service.description}
        </motion.p>
      </motion.div>

      {/* línea dorada de cierre del hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent"
      />
    </section>
  );
}

/* ═══ Fallback amable para ids inválidos ══════════════════════════ */

function ServiceNotFound() {
  return (
    <section
      aria-label="Servicio no encontrado"
      className="mx-auto flex min-h-[62svh] w-full max-w-7xl flex-col items-center justify-center px-5 py-24 sm:px-8"
    >
      <Reveal>
        <div className="glossy-card relative mx-auto w-full max-w-xl rounded-[2rem] p-10 text-center sm:p-12">
          <span className="gloss" aria-hidden />
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-spc-600/10 text-spc-600 ring-1 ring-spc-600/15">
            <FileQuestion className="h-8 w-8" aria-hidden />
          </span>
          <h1 className="font-display mt-6 text-[clamp(1.6rem,3.4vw,2.3rem)] font-extrabold tracking-tight text-spc-900">
            Servicio no encontrado
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-spc-900/65">
            El servicio que buscas no existe o cambió de dirección. Explora
            nuestras 9 líneas de impresión y encuentra la indicada para tu
            proyecto.
          </p>
          <SiteLink
            to="servicios"
            aria-label="Volver al listado de servicios"
            className="shine mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-spc-600 to-spc-800 px-7 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_32px_-10px_rgba(0,60,141,0.55)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Ver todos los servicios
          </SiteLink>
        </div>
      </Reveal>
    </section>
  );
}
