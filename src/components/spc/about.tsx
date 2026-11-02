"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  NOSOTROS — historia + misión/visión (glossy) + factor humano
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote, Target, Eye, MapPin, Award } from "lucide-react";
import { useSiteData, useT, L } from "@/lib/i18n";
import { Reveal, WordsReveal, Eyebrow, TiltCard } from "./motion-primitives";
import { SiteLink } from "./site-router";

export function About() {
  const t = useT();
  const { BRAND, CONTACT } = useSiteData();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);
  const cardY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, reduce ? 0 : -30]);

  return (
    <section
      id="nosotros"
      ref={ref}
      className="relative overflow-hidden bg-white py-24 sm:py-32"
      aria-label={t(L("Quiénes somos", "About us"))}
    >
      {/* textura de fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[480px] w-[480px] rounded-full bg-spc-50 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* ── Columna visual: edificio real + tarjeta flotante ── */}
        <div className="relative order-2 lg:order-1">
          <motion.div style={{ y: imgY }} className="relative">
            <Reveal y={40}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-30px_rgba(12,27,77,0.4)] ring-1 ring-spc-900/10">
                <Image
                  src="/images/site/spc-building.jpg"
                  alt="Edificio corporativo de SPC Impresores en La Paz, Bolivia"
                  width={1000}
                  height={750}
                  className="h-[420px] w-full object-cover sm:h-[480px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-spc-950/55 via-transparent to-transparent" />
                {/* etiqueta sobre foto */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3.5">
                  <span className="glass-dark flex items-center gap-2 rounded-full px-4 py-2.5">
                    <MapPin className="h-4 w-4 text-gold-400" aria-hidden />
                    <span className="text-[12.5px] font-semibold text-white">{t(L("Zona Miraflores · La Paz", "Miraflores · La Paz"))}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* tarjeta flotante: factor humano */}
          <motion.div
            style={{ y: cardY }}
            className="absolute -bottom-8 right-4 z-10 sm:right-8 lg:-right-6"
          >
            <TiltCard maxTilt={8} scale={1.03} className="w-[240px] sm:w-[270px]">
              {/* el brillo especular lo inyecta TiltCard (overlay hermano) */}
              <div className="glossy-card rounded-[1.4rem] p-5">
                <Quote className="depth-2 h-7 w-7 text-gold-600" aria-hidden />
                <p className="font-display mt-2.5 text-[15.5px] font-bold leading-snug text-spc-900">
                  {t(L("El factor humano marca la diferencia", "The human factor makes the difference"))}
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-spc-800/60">
                  {t(L("Nuestro equipo es el pilar fundamental de todo lo que imprimimos.", "Our team is the fundamental pillar behind everything we print."))}
                </p>
                <div className="mt-4 flex items-center gap-2.5 border-t border-spc-900/10 pt-3.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-spc-600/10">
                    <Award className="h-4 w-4 text-spc-600" aria-hidden />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-spc-700">
                    {t(L("Personal altamente calificado", "Highly qualified staff"))}
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* ── Columna de contenido ── */}
        <div className="order-1 lg:order-2">
          <Eyebrow>{t(L("Quiénes somos", "About us"))}</Eyebrow>

          <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
            <WordsReveal text={t(L("La empresa que", "The company that"))} />{" "}
            <WordsReveal text={t(L("imprime Bolivia", "prints Bolivia"))} wordClassName="text-gradient-spc" delay={0.18} />
          </h2>

          <Reveal delay={0.15} className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-spc-900/70">
            <p>
              <strong className="font-semibold text-spc-800">
                {BRAND.name}
              </strong>{" "}
              {t(L(
                `fue fundada en ${BRAND.city} el año ${BRAND.foundedYear}. Somos una empresa`,
                `was founded in ${BRAND.city} in ${BRAND.foundedYear}. We are a`,
              ))}{" "}
              <strong className="font-semibold text-spc-800">{t(L("líder en la industria gráfica de Bolivia", "leader in Bolivia's printing industry"))}</strong>
              {t(L(", con infraestructura y tecnología de primer nivel para satisfacer las demandas del mercado.", ", with first-class infrastructure and technology to meet the demands of the market."))}
            </p>
            <p>
              {t(L("Cada proyecto pasa por manos de un equipo", "Every project passes through the hands of a team"))}{" "}
              <strong className="font-semibold text-spc-800">{t(L("altamente calificado y capacitado", "that is highly qualified and trained"))}</strong>
              {t(L(", con insumos de primera calidad y los más altos estándares de la industria.", ", with first-class supplies and the industry's highest standards."))}
            </p>
          </Reveal>

          {/* Misión / Visión — glossy cards */}
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Target,
                title: t(L("Misión", "Mission")),
                body: t(L(
                  "Brindar servicios integrales en impresión comercial y packaging, orientados a las necesidades de nuestros clientes.",
                  "Deliver comprehensive commercial printing and packaging services, oriented to our clients' needs.",
                )),
              },
              {
                icon: Eye,
                title: t(L("Visión", "Vision")),
                body: t(L(
                  "Fortalecer el liderazgo en la industria gráfica, consolidando el sector y promoviendo solo lo mejor.",
                  "Strengthen our leadership in the printing industry, consolidating the sector and promoting only the best.",
                )),
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.2 + i * 0.12} y={32}>
                <TiltCard maxTilt={7} scale={1.02} className="h-full">
                  <div className="glossy-card h-full rounded-[1.3rem] p-6">
                    <span className="depth-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-spc-600 to-spc-800 shadow-[0_8px_20px_-8px_rgba(0,60,141,0.6)]">
                      <item.icon className="h-5 w-5 text-white" aria-hidden />
                    </span>
                    <h3 className="font-display mt-4 text-lg font-bold text-spc-900">{item.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-spc-900/65">{item.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* dato de contacto en línea + enlace a la página completa */}
          <Reveal delay={0.35} className="mt-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-medium text-spc-800/60">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-spc-600" aria-hidden />
                {CONTACT.address}
              </span>
              <SiteLink
                to="nosotros"
                className="group inline-flex items-center gap-2 rounded-full bg-spc-600/10 px-5 py-2.5 text-[12.5px] font-bold text-spc-700 ring-1 ring-spc-600/20 transition-all duration-300 hover:bg-spc-600 hover:text-white hover:ring-spc-600"
              >
                {t(L("Conoce la planta y el equipo", "Explore the plant and team"))}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
              </SiteLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
