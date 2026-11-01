"use client";

/**
 * SPenCer — sección de presentación: demo animada de la conversación
 * (se reproduce al entrar en vista) + los 4 pasos del embudo.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MessageSquareText, ListChecks, FileText, Send, ArrowRight } from "lucide-react";
import { CharReveal, Eyebrow, GlossyCard, Reveal, Stagger, StaggerItem } from "./motion-primitives";
import { SpencerAvatar } from "./spencer-avatar";
import { WhatsAppIcon } from "./whatsapp-cta";
import { openSpencer } from "./spencer";
import { useI18n, type Lang } from "@/lib/i18n";

const DEMO_EN: { from: "bot" | "user"; text: string }[] = [
  { from: "bot", text: "Hi! I'm SPenCer 👋 What would you like to print?" },
  { from: "user", text: "Pharmaceutical packaging" },
  { from: "bot", text: "💡 Precision die-cutting ensures every carton folds perfectly. How many do you need?" },
  { from: "user", text: "2,000 – 10,000" },
  { from: "bot", text: "When do you need it? Typical production: 10 – 15 business days." },
  { from: "user", text: "This month" },
  { from: "bot", text: "Done! Your brief is ready. Send it and an advisor will quote you today ✅" },
];

const STEPS_EN = [
  { title: "Chat", text: "Ask anything: papers, finishes, lead times, files. Instant answers, 24/7." },
  { title: "Choose with a tap", text: "Service, quantity, date and extras with buttons. No endless forms." },
  { title: "Automatic brief", text: "SPenCer organizes everything into a technical brief your advisor gets right away." },
  { title: "Straight to WhatsApp", text: "One click and the brief reaches +591 77165787. A human quotes you the same day." },
];

const DEMO_ES: { from: "bot" | "user"; text: string }[] = [
  { from: "bot", text: "¡Hola! Soy SPenCer 👋 ¿Qué te gustaría imprimir?" },
  { from: "user", text: "Packaging farmacéutico" },
  { from: "bot", text: "💡 El troquel de precisión garantiza que cada estuche se doble perfecto. ¿Qué cantidad necesitas?" },
  { from: "user", text: "2.000 – 10.000" },
  { from: "bot", text: "¿Para cuándo? Producción típica: 10 – 15 días hábiles." },
  { from: "user", text: "Este mes" },
  { from: "bot", text: "¡Listo! Tu brief está armado. Envíalo y un asesor te cotiza hoy mismo ✅" },
];

const STEPS = [
  { icon: MessageSquareText, title: "Conversa", text: "Pregúntale lo que quieras: papeles, acabados, tiempos, archivos. Responde al instante, 24/7." },
  { icon: ListChecks, title: "Elige con un toque", text: "Servicio, cantidad, fecha y extras con botones. Nada de formularios eternos." },
  { icon: FileText, title: "Brief automático", text: "SPenCer ordena todo en un brief técnico que tu asesor entiende a la primera." },
  { icon: Send, title: "Directo a WhatsApp", text: "Un clic y el brief llega al +591 77165787. Un humano te cotiza el mismo día." },
];

function DemoChat({ lang }: { lang: Lang }) {
  const DEMO = lang === "en" ? DEMO_EN : DEMO_ES;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (count >= DEMO.length) {
      const t = window.setTimeout(() => setCount(0), 4200);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 400 : 1300);
    return () => window.clearTimeout(t);
  }, [inView, count]);

  const typing = inView && count < DEMO.length && DEMO[count].from === "bot";

  return (
    <div ref={ref} className="glossy-dark relative overflow-hidden rounded-[2rem] p-1.5">
      <span aria-hidden className="glossy-sheen" />
      <div className="flex items-center gap-3 rounded-t-[1.7rem] bg-gradient-to-r from-spc-800 to-spc-700 px-5 py-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-spc-950/60 ring-1 ring-gold-400/40">
          <SpencerAvatar className="h-9 w-9" talking={typing} />
        </span>
        <div>
          <p className="font-display text-[15px] font-extrabold text-white">SPenCer</p>
          <p className="text-[11.5px] text-white/70">{lang === "en" ? "AI receptionist · online" : "Recepcionista IA · en línea"}</p>
        </div>
      </div>
      <div className="h-[380px] space-y-3 overflow-hidden px-4 py-5" aria-hidden>
        <AnimatePresence initial={false}>
          {DEMO.slice(0, count).map((m, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className={m.from === "user" ? "flex justify-end" : "flex"}
            >
              <span
                className={
                  m.from === "user"
                    ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-gold-500 px-4 py-2.5 text-[13px] font-semibold text-spc-950"
                    : "max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-[13px] leading-relaxed text-white/90 ring-1 ring-white/10"
                }
              >
                {m.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5 px-2 pt-1">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-gold-300"
                animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </motion.div>
        )}
        {count >= DEMO.length && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 flex w-fit items-center gap-2 rounded-full bg-wa px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.8)]"
          >
            <WhatsAppIcon className="h-4 w-4" /> {lang === "en" ? "Send brief on WhatsApp" : "Enviar brief por WhatsApp"}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function SpencerSection() {
  const { t, lang } = useI18n();
  return (
    <section id="spencer" className="relative overflow-hidden bg-spc-950 py-24 text-white sm:py-32" aria-label={t("SPenCer, recepcionista con IA", "SPenCer, AI receptionist")}>
      <div aria-hidden className="aurora -left-24 top-0 h-[460px] w-[460px] bg-spc-500/35" />
      <div aria-hidden className="aurora bottom-0 right-0 h-[420px] w-[420px] bg-gold-500/20 [animation-delay:-8s]" />
      <div aria-hidden className="bg-grid-dark absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Eyebrow dark>{t("Nuevo · Recepcionista con IA", "New · AI receptionist")}</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.04] tracking-tight">
            <CharReveal text={t("Conoce a", "Meet")} />{" "}
            <CharReveal text="SPenCer." delay={0.25} stagger={0.05} charClassName="text-gold-400 [text-shadow:0_0_40px_rgba(255,196,79,0.4)]" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
              {t(
                "Tu atajo a una cotización. SPenCer resuelve dudas al instante, te guía en 60 segundos por lo que necesitamos saber y entrega tu pedido ordenado a un asesor real por WhatsApp.",
                "Your shortcut to a quote. SPenCer answers questions instantly, guides you in 60 seconds through what we need to know and hands your order, neatly organized, to a real advisor on WhatsApp."
              )}
            </p>
          </Reveal>

          <Stagger className="mt-9 grid gap-4 sm:grid-cols-2" stagger={0.1}>
            {STEPS.map((s, i) => (
              <StaggerItem key={i}>
                <GlossyCard dark maxTilt={7} innerClassName="p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400/30 to-gold-600/10 ring-1 ring-gold-500/40">
                      <s.icon className="h-5 w-5 text-gold-300" aria-hidden />
                    </span>
                    <span className="font-display text-[12px] font-bold text-gold-300/80">{t("PASO", "STEP")} {i + 1}</span>
                  </div>
                  <p className="font-display mt-4 text-[16px] font-bold">{lang === "en" ? STEPS_EN[i].title : s.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{lang === "en" ? STEPS_EN[i].text : s.text}</p>
                </GlossyCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-9">
            <motion.button
              type="button"
              onClick={() => openSpencer()}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="shine group inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 py-2 pl-2 pr-7 text-[15px] font-bold text-spc-950 shadow-[0_18px_48px_-14px_rgba(255,179,28,0.7)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-spc-950">
                <SpencerAvatar className="h-9 w-9" />
              </span>
              {t("Cotizar con SPenCer", "Quote with SPenCer")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </motion.button>
          </Reveal>
        </div>

        <Reveal y={50} delay={0.15}>
          <motion.div
            initial={{ rotateY: -14, rotateX: 6 }}
            whileInView={{ rotateY: -6, rotateX: 2 }}
            whileHover={{ rotateY: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ transformPerspective: 1400 }}
          >
            <DemoChat key={lang} lang={lang} />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
