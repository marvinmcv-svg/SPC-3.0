"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  PROCESO — funnel educativo de 4 pasos que guía al WhatsApp
 *  Línea de progreso que se dibuja con el scroll
 * ══════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MessageCircle, ClipboardList, Factory, PackageCheck, Info } from "lucide-react";
import { waLink } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n";
import { useContent } from "@/lib/use-content";
import { Reveal, WordsReveal, Eyebrow } from "./motion-primitives";
import { WhatsAppIcon } from "./whatsapp-cta";

const STEP_ICONS = [MessageCircle, ClipboardList, Factory, PackageCheck];

/** La línea del proceso es horizontal (≥768px) o vertical (móvil):
 * el eje del dibujo debe cambiar con el layout o la animación no se ve. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { t } = useI18n();
  const { process: PROCESS_STEPS, wa } = useContent();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section
      id="proceso"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
      aria-label={t("Proceso de trabajo", "How we work")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-gold-100/60 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* encabezado */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t("Cómo trabajamos", "How we work")}</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
            <WordsReveal text={t("De tu idea,", "From your idea")} />{" "}
            <WordsReveal text={t("a tus manos.", "to your hands.")} wordClassName="text-gradient-spc" delay={0.14} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-spc-900/65">
              {t("Imprimir por primera vez puede sonar técnico. Lo hacemos simple:", "Printing for the first time can sound technical. We make it simple:")}{" "}
              <strong className="font-semibold text-spc-800">{t("todo empieza con un mensaje", "it all starts with a message")}</strong>{" "}
              {t("y termina con tu proyecto entregado a tiempo.", "and ends with your project delivered on time.")}
            </p>
          </Reveal>
        </div>

        {/* pasos */}
        <div ref={ref} className="relative mt-16">
          {/* línea conectora que se dibuja (eje según orientación del layout).
              top-[27px] = centro exacto de los nodos h-14 (56px) en escritorio. */}
          <div aria-hidden className="absolute left-[27px] top-2 bottom-2 w-[3px] rounded-full bg-spc-100 md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-[3px] md:w-auto">
            <motion.div
              style={
                isDesktop
                  ? { scaleX: lineScale, transformOrigin: "left" }
                  : { scaleY: lineScale, transformOrigin: "top" }
              }
              className="h-full w-full rounded-full bg-gradient-to-b from-spc-600 via-spc-400 to-gold-500 md:bg-gradient-to-r md:from-spc-600 md:via-spc-400 md:to-gold-500"
            />
          </div>

          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li key={step.id} className="relative flex gap-5 md:block">
                  {/* nodo numerado */}
                  <Reveal y={30} delay={i * 0.14}>
                    <div className="relative">
                      <motion.span
                        whileHover={{ scale: 1.08, rotate: -4 }}
                        transition={{ type: "spring", stiffness: 320, damping: 18 }}
                        className="font-display relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-spc-600 to-spc-800 text-lg font-extrabold text-white shadow-[0_14px_32px_-10px_rgba(0,60,141,0.55),inset_0_1px_0_rgba(255,255,255,0.3)] ring-4 ring-white"
                      >
                        {String(i + 1).padStart(2, "0")}
                        <span
                          aria-hidden
                          className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-spc-900 shadow-md"
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      </motion.span>
                    </div>
                  </Reveal>

                  {/* contenido */}
                  <div className="md:mt-6 md:pr-4">
                    <Reveal y={26} delay={i * 0.14 + 0.08}>
                      <h3 className="font-display text-[17px] font-bold tracking-tight text-spc-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-spc-900/65">
                        {step.detail}
                      </p>
                      <div className="mt-3.5 flex gap-2.5 rounded-xl bg-spc-50 p-3 ring-1 ring-spc-600/10">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-spc-400" aria-hidden />
                        <p className="text-[12px] leading-relaxed text-spc-800/70">{step.tip}</p>
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA del paso 1 — arranca el funnel */}
        <Reveal delay={0.1} className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[clamp(1.3rem,2.4vw,1.8rem)] font-extrabold tracking-tight text-spc-900">
              {t("El paso 01 toma menos de un minuto.", "Step 01 takes less than a minute.")}
            </p>
            <p className="mt-2 text-[14px] text-spc-900/60">
              {t("Escríbenos ahora y recibe tu cotización hoy mismo.", "Message us now and get your quote today.")}
            </p>
            <div className="mt-6">
              <a
                href={waLink(wa.process)}
                target="_blank"
                rel="noopener noreferrer"
                className="shine group inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-8 py-4 text-base font-bold text-white shadow-[0_16px_44px_-12px_rgba(37,211,102,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-14px_rgba(37,211,102,0.85)]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t("Empezar por WhatsApp", "Start on WhatsApp")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
