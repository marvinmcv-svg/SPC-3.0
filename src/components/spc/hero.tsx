"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  HERO — cinematográfico con CARRUSEL 3D ROTATORIO de servicios:
 *  foto con Ken Burns + parallax, titular palabra por palabra,
 *  anillo giratorio de las 9 líneas de producto y strip de stats.
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, Clock3, Gauge, Handshake, Sparkles, MoveHorizontal } from "lucide-react";
import { waLink } from "@/lib/site-config";
import { useSiteData, useT, L } from "@/lib/i18n";
import { WhatsappCta } from "./whatsapp-cta";
import { Counter, Magnetic, RingCarousel } from "./motion-primitives";
import { openServiceDetail } from "./service-detail";

export function Hero() {
  const t = useT();
  const { BRAND, SERVICES, STATS, WA_MESSAGES } = useSiteData();

  const PILLARS = [
    { icon: BadgeCheck, label: t(L("Calidad", "Quality")), detail: t(L("Estándares de la industria", "Industry standards")) },
    { icon: Clock3, label: t(L("Puntualidad", "On-time")), detail: t(L("Tu fecha, compromiso", "Your date, guaranteed")) },
    { icon: Gauge, label: t(L("Capacidad", "Capacity")), detail: t(L("Tecnología de punta", "Cutting-edge technology")) },
    { icon: Handshake, label: t(L("Servicio", "Service")), detail: t(L("El factor humano", "The human factor")) },
  ];

  /* Items del carrusel: una tarjeta por línea de producto */
  const CAROUSEL_ITEMS = SERVICES.map((s) => ({
    id: s.id,
    title: s.title,
    badge: s.categoryLabel,
    image: s.image,
  }));
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  /* Parallax desactivado si el usuario prefiere menos movimiento */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-spc-950"
      aria-label={t(L("Presentación de SPC", "SPC presentation"))}
    >
      {/* ── Fondo cinematográfico: parallax de scroll + Ken Burns lento ── */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08, x: "-1.2%" }}
          animate={{ scale: 1.15, x: "1.2%" }}
          transition={{ duration: 24, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        >
          <Image
            src="/images/site/hero-press.jpg"
            alt="Planta industrial de impresión de SPC con prensa offset"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* ── Veladuras de marca ── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-spc-950/95 via-spc-950/70 to-spc-900/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-spc-950 via-transparent to-spc-950/60"
      />
      {/* halo cálido tras el carrusel (profundidad) */}
      <div
        aria-hidden
        className="absolute right-[-10%] top-1/4 hidden h-[520px] w-[520px] rounded-full bg-gold-500/12 blur-[130px] lg:block"
      />

      {/* ── Contenido ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-32 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:pt-36"
      >
        {/* ══ Columna izquierda: mensaje + CTAs ══ */}
        <div className="flex-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark mb-7 inline-flex w-fit items-center gap-2.5 rounded-full py-2 pl-3 pr-5"
          >
            <Sparkles className="h-4 w-4 text-gold-400" aria-hidden />
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/90">
              {t(L("Líderes de la industria gráfica · desde", "Leaders of the printing industry · since"))} {BRAND.foundedYear}
            </span>
          </motion.div>

          {/* Titular */}
          <h1 className="font-display max-w-[13ch] text-[clamp(2.6rem,7.2vw,5.4rem)] font-extrabold leading-[1.02] tracking-tight text-white">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {t(L("Imprimiendo", "Printing"))}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                {t(L("lo mejor de", "the best of"))}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="text-gradient-gold block"
                initial={{ y: "110%", filter: "blur(10px)" }}
                animate={{ y: "0%", filter: "blur(0px)" }}
                transition={{ duration: 1.05, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                {t(L("Bolivia.", "Bolivia."))}
              </motion.span>
            </span>
          </h1>

          {/* Subtítulo educativo */}
          <motion.p
            initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[52ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-white/75"
          >
            {t(L(
              "Packaging para alimentos y farmacia, impresión comercial de libros y revistas, y soluciones digitales bajo demanda.",
              "Packaging for food and pharma, commercial printing of books and magazines, and on-demand digital solutions.",
            ))}{" "}
            <span className="font-semibold text-gold-300">
              {t(L(
                "Tú nos cuentas tu idea — nosotros la imprimimos con la calidad de siempre.",
                "You tell us your idea — we print it with the quality you expect.",
              ))}
            </span>
          </motion.p>

          {/* CTAs del funnel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <Magnetic>
              <WhatsappCta href={waLink(WA_MESSAGES.general)} variant="gold" size="lg" arrow>
                {t(L("Cotiza por WhatsApp", "Quote via WhatsApp"))}
              </WhatsappCta>
            </Magnetic>
            <WhatsappCta href="#/servicios" variant="ghost-dark" size="lg" icon={false} className="px-8 py-4">
              {t(L("Explorar servicios", "Explore services"))}
            </WhatsappCta>
          </motion.div>

          {/* micro prueba social */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-5 text-[13px] font-medium text-white/60"
          >
            {t(L(
              "Respuesta en minutos dentro del horario laboral · Asesoría sin costo",
              "Reply within minutes during business hours · Free advice",
            ))}
          </motion.p>
        </div>

        {/* ══ Columna derecha: carrusel 3D rotatorio de servicios ══ */}
        <motion.div
          initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 w-full shrink-0 lg:mt-0 lg:w-[46%] xl:w-[44%]"
        >
          {/* kicker del carrusel */}
          <div className="mb-1 flex items-center justify-center gap-2.5">
            <MoveHorizontal className="h-4 w-4 text-gold-400" aria-hidden />
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300/90">
              {t(L("Nuestras 9 líneas · gíralas", "Our 9 lines · spin them"))}
            </p>
          </div>

          <RingCarousel
            items={CAROUSEL_ITEMS}
            autoMs={4200}
            onSelect={(i) => openServiceDetail(SERVICES[i].id)}
          />
        </motion.div>
      </motion.div>

      {/* ── Strip inferior: pilares + stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-7 sm:px-8"
      >
        <div className="glass-dark grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.09, duration: 0.6 }}
              className="group flex items-center gap-3.5 px-5 py-4 sm:px-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400/25 to-gold-600/10 ring-1 ring-gold-500/30 transition-transform duration-500 group-hover:scale-110">
                <p.icon className="h-5 w-5 text-gold-400" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="font-display block text-[15px] font-bold leading-tight text-white">
                  {p.label}
                </span>
                <span className="block truncate text-[11.5px] font-medium text-white/60">{p.detail}</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats con contadores */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.65 + i * 0.08, duration: 0.7 }}
              className="rounded-2xl border border-white/10 bg-spc-950/40 px-4 py-3.5 backdrop-blur-sm"
            >
              <p className="font-display text-2xl font-extrabold text-white sm:text-[28px]">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-300/90">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
