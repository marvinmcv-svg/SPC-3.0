"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  TECNOLOGÍA — sección oscura premium con collage parallax
 *  Educación: qué hace SPC distinto técnicamente
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Cpu, Droplets, Ruler, Palette } from "lucide-react";
import { Reveal, WordsReveal, Eyebrow } from "./motion-primitives";
import { WA_MESSAGES, waLink } from "@/lib/site-config";
import { WhatsAppIcon } from "./whatsapp-cta";

const MARKS = [
  {
    icon: Palette,
    title: "Color calibrado",
    body: "Pruebas de color certificadas: lo que ves en la aprobación es lo que recibes en tiraje.",
  },
  {
    icon: Droplets,
    title: "Tintas de grado alimentario",
    body: "Insumos de primera calidad, aptos para envases en contacto directo con alimentos.",
  },
  {
    icon: Ruler,
    title: "Troquel de precisión",
    body: "Cortes exactos en cada estuche: plegado perfecto, sin variaciones en línea de producción.",
  },
  {
    icon: Cpu,
    title: "Planta de punta",
    body: "Maquinaria offset y digital de última generación, con capacidad para tirajes de cualquier escala.",
  },
] as const;

export function Technology() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 110, reduce ? 0 : -40]);

  return (
    <section
      id="tecnologia"
      ref={ref}
      className="grain relative overflow-hidden bg-spc-950 py-24 sm:py-32"
      aria-label="Tecnología y calidad"
    >
      {/* halos de color */}
      <div aria-hidden className="pointer-events-none absolute -left-48 top-0 h-[560px] w-[560px] rounded-full bg-spc-800/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-48 bottom-0 h-[560px] w-[560px] rounded-full bg-gold-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── Collage parallax ── */}
          <div className="relative order-2 lg:order-1">
            <motion.div style={{ y: yA }} className="relative z-10">
              <Reveal y={50}>
                <div className="overflow-hidden rounded-[2rem] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
                  <Image
                    src="/images/site/tech-rollers.jpg"
                    alt="Placas y rodillos de la prensa offset de SPC en plena producción"
                    width={1344}
                    height={768}
                    className="h-[320px] w-full object-cover sm:h-[380px]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            </motion.div>
            <motion.div style={{ y: yB }} className="relative z-20 -mt-16 ml-auto w-[68%] sm:-mt-24">
              <Reveal y={70} delay={0.15}>
                <div className="glass-dark overflow-hidden rounded-[1.8rem] p-2 shadow-[0_36px_72px_-28px_rgba(0,0,0,0.65)]">
                  <Image
                    src="/images/site/packaging-line.jpg"
                    alt="Línea de producción de packaging con cajas impresas"
                    width={1344}
                    height={768}
                    className="h-[180px] w-full rounded-[1.4rem] object-cover sm:h-[220px]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </Reveal>
            </motion.div>

            {/* etiqueta flotante */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 18 }}
              className="animate-float absolute -top-6 right-6 z-30 sm:right-16"
            >
              <div className="glass-dark flex items-center gap-3 rounded-2xl px-5 py-3.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="text-[12.5px] font-bold text-white">
                  Producción en curso <span className="font-medium text-white/60">· La Paz</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Contenido ── */}
          <div className="order-1 lg:order-2">
            <Eyebrow dark>Tecnología & Calidad</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-white">
              <WordsReveal text="Lo que no se ve" />{" "}
              <WordsReveal text="se nota." wordClassName="text-gradient-gold" delay={0.14} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-white/65">
                Detrás de cada caja, libro o revista hay decisiones técnicas que definen el
                resultado. Estas son las cuatro garantías que aplicamos a{" "}
                <strong className="font-semibold text-gold-300">todos los proyectos, sin excepción</strong>:
              </p>
            </Reveal>

            <ul className="mt-8 space-y-3">
              {MARKS.map((mark, i) => (
                <Reveal key={mark.title} delay={0.1 + i * 0.09} y={24}>
                  <li className="glass-dark group flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-white/15 sm:p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400/30 to-gold-600/10 ring-1 ring-gold-500/30 transition-transform duration-500 group-hover:scale-110">
                      <mark.icon className="h-5 w-5 text-gold-400" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-[15.5px] font-bold text-white">{mark.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/60">{mark.body}</p>
                    </div>
                    <CheckCircle2
                      className="ml-auto h-5 w-5 shrink-0 text-emerald-400/80"
                      aria-hidden
                    />
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3} className="mt-8">
              <a
                href={waLink(WA_MESSAGES.process)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full py-1.5 text-[14px] font-bold text-gold-300 transition-colors hover:text-gold-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-wa/15 ring-1 ring-wa/40 transition-all duration-300 group-hover:bg-wa group-hover:ring-wa/60">
                  <WhatsAppIcon className="h-4.5 w-4.5 text-wa transition-colors group-hover:text-white" />
                </span>
                ¿Preguntas técnicas? Pregúntanos lo que quieras
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
