"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  HERO — cinematográfico: foto con Ken Burns + parallax,
 *  titular palabra por palabra, CTAs del funnel y strip de stats
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, Clock3, Gauge, Handshake, ChevronDown, Sparkles } from "lucide-react";
import { BRAND, STATS, WA_MESSAGES, waLink } from "@/lib/site-config";
import { WhatsappCta } from "./whatsapp-cta";
import { Counter } from "./motion-primitives";

const PILLARS = [
  { icon: BadgeCheck, label: "Calidad", detail: "Estándares de la industria" },
  { icon: Clock3, label: "Puntualidad", detail: "Tu fecha, compromiso" },
  { icon: Gauge, label: "Capacidad", detail: "Tecnología de punta" },
  { icon: Handshake, label: "Servicio", detail: "El factor humano" },
] as const;

export function Hero() {
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
      aria-label="Presentación de SPC"
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
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-spc-950 to-transparent"
      />

      {/* ── Contenido ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-36 sm:px-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass-dark mb-7 inline-flex w-fit items-center gap-2.5 rounded-full py-2 pl-3 pr-5"
        >
          <Sparkles className="h-4 w-4 text-gold-400" aria-hidden />
          <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/90">
            Líderes de la industria gráfica · desde {BRAND.foundedYear}
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
              Imprimiendo
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              lo mejor de
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="text-gradient-gold block"
              initial={{ y: "110%", filter: "blur(10px)" }}
              animate={{ y: "0%", filter: "blur(0px)" }}
              transition={{ duration: 1.05, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              Bolivia.
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
          Packaging para alimentos y farmacia, impresión comercial de libros y revistas, y
          soluciones digitales bajo demanda.{" "}
          <span className="font-semibold text-gold-300">
            Tú nos cuentas tu idea — nosotros la imprimimos con la calidad de siempre.
          </span>
        </motion.p>

        {/* CTAs del funnel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3.5"
        >
          <WhatsappCta href={waLink(WA_MESSAGES.general)} variant="gold" size="lg" arrow>
            Cotiza por WhatsApp
          </WhatsappCta>
          <WhatsappCta href="#servicios" variant="ghost-dark" size="lg" icon={false} className="px-8 py-4">
            Explorar servicios
          </WhatsappCta>
        </motion.div>

        {/* micro prueba social */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-5 text-[13px] font-medium text-white/60"
        >
          Respuesta en minutos dentro del horario laboral · Asesoría sin costo
        </motion.p>
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

      {/* ── Indicador de scroll ── */}
      <motion.a
        href="#nosotros"
        aria-label="Bajar a la sección nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 text-white/40 transition-colors hover:text-gold-400 md:block"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
