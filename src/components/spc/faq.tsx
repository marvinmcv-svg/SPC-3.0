"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  FAQ — preguntas frecuentes educativas en acordeón premium.
 *  Lateral: tarjeta de SPC AI (la IA responde estas y más preguntas).
 * ══════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import { Sparkles, MessageCircleQuestion, Phone, MapPin, Clock3 } from "lucide-react";
import { CONTACT, GENERAL_FAQS, WA_MESSAGES, waLink } from "@/lib/site-config";
import { Reveal, WordsReveal, Eyebrow } from "./motion-primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppIcon } from "./whatsapp-cta";
import { openSpcAi } from "./spc-ai-widget";
import { SiteLink } from "./site-router";

export function Faq({ limit }: { limit?: number } = {}) {
  const faqs = typeof limit === "number" ? GENERAL_FAQS.slice(0, limit) : GENERAL_FAQS;

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
      aria-label="Preguntas frecuentes"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-spc-50 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* ── Acordeón de preguntas ── */}
          <div>
            <div className="max-w-xl">
              <Eyebrow>Preguntas frecuentes</Eyebrow>
              <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
                <WordsReveal text="Todo lo que necesitas saber" />{" "}
                <WordsReveal text="antes de imprimir." wordClassName="text-gradient-spc" delay={0.14} />
              </h2>
              <Reveal delay={0.25}>
                <p className="mt-5 text-[15.5px] leading-relaxed text-spc-900/65">
                  Respondemos las dudas más comunes de quienes imprimen por primera vez —{" "}
                  <strong className="font-semibold text-spc-800">y de los que ya son expertos.</strong>
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-9">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${i}`}
                    className="glossy-card overflow-hidden rounded-2xl border-none data-[state=open]:border-spc-600/20"
                  >
                    <AccordionTrigger className="gap-4 px-5 py-4.5 text-left font-display text-[14.5px] font-bold text-spc-800 hover:no-underline sm:px-6">
                      <span className="flex items-center gap-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-spc-600/10 text-spc-600">
                          <MessageCircleQuestion className="h-4.5 w-4.5" aria-hidden />
                        </span>
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 pl-[4.6rem] pr-6 text-[13.5px] leading-relaxed text-spc-900/70 sm:px-6 sm:pl-[4.9rem]">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            {/* enlace a la página completa de FAQ (cuando es teaser) */}
            {typeof limit === "number" && faqs.length < GENERAL_FAQS.length && (
              <Reveal delay={0.1} className="mt-6">
                <SiteLink
                  to="faq"
                  className="group inline-flex items-center gap-2 rounded-full border border-spc-600/20 bg-white/70 px-6 py-3 text-[13.5px] font-bold text-spc-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-spc-600/40 hover:bg-white"
                >
                  Ver las {GENERAL_FAQS.length} preguntas frecuentes
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-spc-600/10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </SiteLink>
              </Reveal>
            )}
          </div>

          {/* ── Lateral: SPenCer + contacto directo ── */}
          <div className="space-y-5 lg:pt-24">
            {/* tarjeta SPenCer */}
            <Reveal y={40}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="grain relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-spc-900 via-spc-800 to-spc-950 p-7 shadow-[0_36px_80px_-30px_rgba(6,15,46,0.6)]"
              >
                <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold-500/25 blur-3xl" />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300 ring-1 ring-gold-500/40">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Nuevo · Inteligencia artificial
                  </span>
                  <h3 className="font-display mt-4 text-[clamp(1.4rem,2.6vw,1.9rem)] font-extrabold leading-tight text-white">
                    Conoce a SPenCer, nuestra recepcionista inteligente
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">
                    Responde todas estas preguntas — y cualquier otra que tengas — al instante, a
                    cualquier hora. Y cuando tu proyecto esté listo para cotizar, te conecta con
                    un asesor humano por WhatsApp en segundos.
                  </p>
                  <ul className="mt-5 space-y-2.5 text-[13px] font-medium text-white/80">
                    {[
                      "Respuesta inmediata, 24/7",
                      "Explica servicios, tiempos y tirajes",
                      "Te deriva a WhatsApp con tu contexto listo",
                    ].map((point) => (
                      <li key={point} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={openSpcAi}
                    className="shine group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-6 py-4 text-[14.5px] font-bold text-spc-900 shadow-[0_14px_38px_-10px_rgba(255,179,28,0.65)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Sparkles className="h-5 w-5" aria-hidden />
                    Preguntar a SPenCer
                  </button>
                </div>
              </motion.div>
            </Reveal>

            {/* tarjeta contacto */}
            <Reveal y={40} delay={0.1}>
              <div className="glossy-card rounded-[1.8rem] p-7">
                <h3 className="font-display text-[16px] font-bold text-spc-900">
                  ¿Prefieres hablar con una persona?
                </h3>
                <ul className="mt-4 space-y-3 text-[13.5px] text-spc-900/75">
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-spc-500" aria-hidden />
                    <a href={CONTACT.phoneHref} className="font-semibold transition-colors hover:text-spc-600">
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-spc-500" aria-hidden />
                    {CONTACT.address}
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock3 className="h-4 w-4 shrink-0 text-spc-500" aria-hidden />
                    {CONTACT.hours}
                  </li>
                </ul>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_32px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                  Escríbenos por WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
