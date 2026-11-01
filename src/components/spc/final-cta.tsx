"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  CTA FINAL — el punto de conversión del funnel
 *  Tarjeta premium oscura + info de contacto + imagen "factor humano"
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock3, Quote, ShieldCheck, Zap, Timer } from "lucide-react";
import { BRAND, CONTACT, WA_MESSAGES, waLink } from "@/lib/site-config";
import { Reveal, WordsReveal, Eyebrow } from "./motion-primitives";
import { WhatsAppIcon } from "./whatsapp-cta";

/* Filas de contacto: los valores largos (correo, dirección) ocupan fila
   completa para que el email nunca se parta a media palabra. */
const CONTACT_ROWS = [
  { icon: Phone, label: "Teléfono", value: CONTACT.phone, href: CONTACT.phoneHref, wide: false },
  { icon: Clock3, label: "Horario de atención", value: CONTACT.hours, href: undefined, wide: false },
  { icon: Mail, label: "Correo", value: CONTACT.email, href: `mailto:${CONTACT.email}`, wide: true },
  { icon: MapPin, label: "Planta y oficinas", value: CONTACT.addressFull, href: undefined, wide: true },
] as const;

const ASSURANCES = [
  { icon: Zap, text: "Respuesta en minutos" },
  { icon: Timer, text: "Cotización el mismo día" },
  { icon: ShieldCheck, text: "Asesoría sin costo" },
] as const;

export function FinalCta() {
  return (
    <section id="contacto" className="relative bg-white pb-24 pt-4 sm:pb-32" aria-label="Contacto y cotización">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal y={50}>
          <div className="grain relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-spc-900 via-spc-800 to-spc-950 shadow-[0_60px_120px_-50px_rgba(6,15,46,0.7)]">
            {/* halos */}
            <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-600/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-spc-500/30 blur-3xl" />

            <div className="relative grid gap-0 lg:grid-cols-[1.15fr_1fr]">
              {/* ── Contenido ── */}
              <div className="p-8 sm:p-12 lg:p-14">
                <Eyebrow dark>Da el paso 01 ahora</Eyebrow>
                <h2 className="font-display mt-5 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.06] tracking-tight text-white">
                  <WordsReveal text="¿Listo para imprimir" />{" "}
                  <WordsReveal text="tu próximo proyecto?" wordClassName="text-gradient-gold" delay={0.14} />
                </h2>
                <Reveal delay={0.2}>
                  <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/70">
                    Escríbenos por WhatsApp y en minutos tendrás a un asesor real respondiendo tus
                    preguntas. Sin formularios eternos, sin llamadas en espera:{" "}
                    <strong className="font-semibold text-gold-300">
                      directo a lo que importa, tu proyecto.
                    </strong>
                  </p>
                </Reveal>

                {/* garantías del funnel */}
                <Reveal delay={0.28}>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {ASSURANCES.map((a) => (
                      <span
                        key={a.text}
                        className="glass-dark flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold text-white/90"
                      >
                        <a.icon className="h-3.5 w-3.5 text-gold-400" aria-hidden />
                        {a.text}
                      </span>
                    ))}
                  </div>
                </Reveal>

                {/* botón principal */}
                <Reveal delay={0.34}>
                  <div className="mt-9">
                    <motion.a
                      href={waLink(WA_MESSAGES.final)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="shine group inline-flex items-center gap-4 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] py-4 pl-5 pr-8 text-white shadow-[0_20px_56px_-16px_rgba(37,211,102,0.8),inset_0_1px_0_rgba(255,255,255,0.35)]"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
                        <WhatsAppIcon className="h-6 w-6" />
                      </span>
                      <span className="text-left">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                          Respuesta inmediata
                        </span>
                        <span className="font-display block text-[17px] font-extrabold leading-tight">
                          Abrir WhatsApp y cotizar
                        </span>
                      </span>
                    </motion.a>
                  </div>
                </Reveal>

                {/* filas de contacto */}
                <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                  {CONTACT_ROWS.map((row, i) => (
                    <Reveal
                      key={row.label}
                      delay={0.1 + i * 0.07}
                      y={18}
                      className={row.wide ? "sm:col-span-2" : undefined}
                    >
                      <li className="h-full">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="glass-dark group flex h-full items-center gap-3.5 rounded-2xl p-4 transition-all duration-300 hover:bg-white/15"
                          >
                            <RowIcon icon={row.icon} />
                            <div className="min-w-0">
                              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold-300/90">
                                {row.label}
                              </p>
                              <p className="text-[13.5px] font-semibold leading-snug text-white group-hover:text-white [overflow-wrap:anywhere]">
                                {row.value}
                              </p>
                            </div>
                          </a>
                        ) : (
                          <div className="glass-dark flex h-full items-center gap-3.5 rounded-2xl p-4">
                            <RowIcon icon={row.icon} />
                            <div className="min-w-0">
                              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold-300/90">
                                {row.label}
                              </p>
                              <p className="text-[13.5px] font-semibold text-white">{row.value}</p>
                            </div>
                          </div>
                        )}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* ── Imagen: factor humano ── */}
              <div className="relative min-h-[320px] lg:min-h-full">
                <Image
                  src="/images/site/qc-human.jpg"
                  alt="Especialista de control de calidad de SPC revisando una prueba de impresión"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-[50%_20%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-spc-950/90 via-spc-950/25 to-transparent lg:bg-gradient-to-r lg:from-spc-900/95 lg:via-spc-950/35 lg:to-transparent"
                />
                {/* cita */}
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8"
                >
                  <div className="glass-dark rounded-[1.5rem] p-5 sm:p-6">
                    <Quote className="h-6 w-6 text-gold-400" aria-hidden />
                    <p className="font-display mt-2.5 text-[15.5px] font-bold leading-snug text-white">
                      Al otro lado del chat hay una persona que conoce la planta, las máquinas y
                      tu proyecto.
                    </p>
                    <p className="mt-2 text-[12px] font-medium text-white/60">
                      Equipo {BRAND.name} — {BRAND.city}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RowIcon({ icon: Icon }: { icon: typeof Phone }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 ring-1 ring-gold-500/30">
      <Icon className="h-4.5 w-4.5 text-gold-400" aria-hidden />
    </span>
  );
}
