"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  QUOTE FUNNEL — el punto de conversión del sitio
 *
 *  Diseño premium oscuro inspirado en el patrón "live preview":
 *  ┌────────────────────────┬──────────────────────┐
 *  │  Formulario de cotiza- │  Vista previa en     │
 *  │  ción (nombre, servi-  │  vivo del mensaje    │
 *  │  cio, cantidad, fecha, │  de WhatsApp que     │
 *  │  comentarios)          │  enviará el cliente  │
 *  └────────────────────────┴──────────────────────┘
 *  El botón "CONTINUAR EN WHATSAPP" abre wa.me con el
 *  mensaje ya compuesto → funnel que termina en WhatsApp.
 * ══════════════════════════════════════════════════════════════════
 */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCheck, Minus, Plus, Send, User } from "lucide-react";
import { BRAND, CONTACT, SERVICES, WA_MESSAGES, waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Reveal, WordsReveal, Eyebrow } from "./motion-primitives";
import { WhatsAppIcon } from "./whatsapp-cta";

/* Etiquetas de pills de servicio (cortas para caber) */
const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.shortTitle),
  "Otro / no estoy seguro",
] as const;

type FormState = {
  name: string;
  service: string;
  quantity: number;
  date: string;
  comments: string;
};

const INITIAL: FormState = {
  name: "",
  service: "",
  quantity: 500,
  date: "",
  comments: "",
};

/* ── Campo etiqueta (estilo del diseño de referencia) ── */
function FieldLabel({ children }: { children: string }) {
  return (
    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
      {children}
    </span>
  );
}

const inputBase =
  "w-full rounded-xl border border-white/12 bg-[#1b1f2e]/80 px-4 py-3.5 text-[14px] font-medium text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-gold-500/60 focus:bg-[#1b1f2e] focus:ring-4 focus:ring-gold-500/15";

export function QuoteFunnel({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(INITIAL);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  /* ── Mensaje en vivo (lo que llegará a WhatsApp) ── */
  const message = useMemo(() => {
    const dash = (v: string | number) => (v === "" || v === 0 ? "---" : String(v));
    return [
      `Hola ${BRAND.shortName}! Quiero cotizar un proyecto de impresión.`,
      "",
      `Nombre: ${dash(form.name)}`,
      `Servicio: ${dash(form.service)}`,
      `Cantidad aprox.: ${dash(form.quantity)}`,
      `Fecha deseada: ${dash(form.date)}`,
      `Comentarios: ${dash(form.comments)}`,
      "",
      "¡Gracias!",
    ].join("\n");
  }, [form]);

  const link = waLink(message);
  const filled =
    (form.name ? 1 : 0) + (form.service ? 1 : 0) + (form.quantity ? 1 : 0) + (form.date ? 1 : 0);

  return (
    <section
      id="contacto"
      className="grain relative overflow-hidden bg-[#10131d] py-24 sm:py-32"
      aria-label="Cotiza tu proyecto por WhatsApp"
    >
      {/* halos de fondo */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-gold-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── Encabezado ── */}
        {!compact && (
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow dark>Cotización en 1 minuto</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-white">
              <WordsReveal text="Cuéntanos tu proyecto" />{" "}
              <WordsReveal text="y lo llevamos a WhatsApp" wordClassName="text-gradient-gold" delay={0.14} />
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-white/65">
                Completa el formulario y mira en vivo el mensaje que recibirá nuestro equipo.
                Un asesor especializado te responde{" "}
                <strong className="font-semibold text-gold-300">el mismo día</strong> con
                propuesta de papel, acabados, tiempos y precio.
              </p>
            </Reveal>
          </div>
        )}

        {/* ── Split: formulario + vista previa ── */}
        <Reveal delay={0.15} className={compact ? "" : "mt-14"}>
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
            {/* ══ IZQUIERDA: formulario ══ */}
            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8">
              {/* nombre */}
              <div>
                <FieldLabel>Nombre / Empresa</FieldLabel>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Ej.: Marcela Rojas — Pastelería Delicia"
                    className={cn(inputBase, "pl-11")}
                    maxLength={80}
                    aria-label="Tu nombre o empresa"
                  />
                </div>
              </div>

              {/* servicio (pills) */}
              <div className="mt-6">
                <FieldLabel>Servicio</FieldLabel>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Selecciona un servicio">
                  {SERVICE_OPTIONS.map((opt) => {
                    const active = form.service === opt;
                    return (
                      <motion.button
                        key={opt}
                        type="button"
                        onClick={() => set("service", active ? "" : opt)}
                        whileTap={{ scale: 0.96 }}
                        aria-pressed={active}
                        className={cn(
                          "rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-all duration-300",
                          active
                            ? "border-gold-500/70 bg-gold-500/15 text-gold-200 shadow-[0_0_0_4px_rgba(255,179,28,0.08)]"
                            : "border-white/15 text-white/65 hover:border-white/35 hover:text-white"
                        )}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* cantidad + fecha */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel>Cantidad aprox.</FieldLabel>
                  <div className="flex items-center gap-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.92 }}
                      onClick={() => set("quantity", Math.max(0, form.quantity - 250))}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                      aria-label="Reducir cantidad en 250"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <input
                      type="number"
                      min={0}
                      step={250}
                      value={form.quantity || ""}
                      onChange={(e) => set("quantity", Math.max(0, Number(e.target.value) || 0))}
                      placeholder="500"
                      className={cn(inputBase, "text-center tabular-nums")}
                      aria-label="Cantidad aproximada de unidades"
                    />
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.92 }}
                      onClick={() => set("quantity", form.quantity + 250)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                      aria-label="Aumentar cantidad en 250"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                <div>
                  <FieldLabel>Fecha deseada</FieldLabel>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      className={cn(inputBase, "pl-11 [color-scheme:dark]")}
                      aria-label="Fecha en la que necesitas tu pedido"
                    />
                  </div>
                </div>
              </div>

              {/* comentarios */}
              <div className="mt-6">
                <FieldLabel>Comentarios (opcional)</FieldLabel>
                <textarea
                  value={form.comments}
                  onChange={(e) => set("comments", e.target.value)}
                  placeholder="Medidas, materiales, referencias, acabados que te gustan…"
                  rows={3}
                  maxLength={400}
                  className={cn(inputBase, "resize-none")}
                  aria-label="Comentarios adicionales sobre tu proyecto"
                />
              </div>

              {/* botón + helper */}
              <div className="mt-7">
                <motion.a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="shine group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] py-4 text-[15px] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_20px_56px_-16px_rgba(37,211,102,0.7),inset_0_1px_0_rgba(255,255,255,0.4)]"
                  aria-label="Continuar la conversación en WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Continuar en WhatsApp
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden />
                </motion.a>
                <p className="mt-3.5 text-center text-[12px] leading-relaxed text-white/45">
                  Tu cotización avanza cuando nuestro equipo te responde por WhatsApp —{" "}
                  <strong className="font-semibold text-white/65">asesoría gratuita y sin compromiso.</strong>
                </p>
              </div>
            </div>

            {/* ══ DERECHA: vista previa en vivo ══ */}
            <div className="flex flex-col">
              <Reveal delay={0.2}>
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d1421] shadow-[0_50px_110px_-45px_rgba(0,0,0,0.9)]">
                  {/* header del "chat" */}
                  <div className="flex items-center gap-3.5 border-b border-white/8 bg-[#111a2b] px-6 py-4">
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2fe076] to-[#1da851] shadow-[0_8px_24px_-6px_rgba(37,211,102,0.6)]">
                      <WhatsAppIcon className="h-5.5 w-5.5 text-white" />
                      <span aria-hidden className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#111a2b] bg-emerald-400" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display truncate text-[14.5px] font-bold text-white">
                        {BRAND.name}
                      </p>
                      <p className="truncate text-[11.5px] font-medium text-emerald-300/90">
                        {BRAND.city} · {CONTACT.whatsapp}
                      </p>
                    </div>
                    <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300 ring-1 ring-emerald-500/30">
                      <span aria-hidden className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      En vivo
                    </span>
                  </div>

                  {/* cuerpo del chat */}
                  <div className="grain relative px-5 py-7 sm:px-7" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)", backgroundSize: "22px 22px" }}>
                    {/* burbuja: gradiente esmeralda como el diseño de referencia */}
                    <div className="ml-auto max-w-[92%]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={message}
                          initial={{ opacity: 0.55, scale: 0.985 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="relative rounded-[1.35rem] rounded-br-md bg-gradient-to-b from-[#0d4a3b] to-[#1a7a5e] p-5 shadow-[0_24px_60px_-24px_rgba(16,122,87,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] sm:p-6"
                        >
                          <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-white/95">
                            {message}
                          </p>
                          <p className="mt-3 flex items-center justify-end gap-1.5 text-[10.5px] font-medium text-emerald-100/70">
                            {new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" })}
                            <CheckCheck className="h-3.5 w-3.5" aria-hidden />
                          </p>
                          {/* brillo superior estilo glossy */}
                          <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* indicador de respuesta del equipo */}
                    <div className="mt-6 flex max-w-[80%] items-center gap-2.5 rounded-2xl rounded-bl-md bg-white/8 px-4.5 py-3 ring-1 ring-white/10">
                      <span className="flex gap-1" aria-hidden>
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-white/50"
                            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                          />
                        ))}
                      </span>
                      <p className="text-[11.5px] font-medium text-white/60">
                        Un asesor real te responderá en minutos…
                      </p>
                    </div>
                  </div>

                  {/* barra inferior: progreso de datos */}
                  <div className="flex items-center justify-between gap-4 border-t border-white/8 bg-[#111a2b] px-6 py-4">
                    <p className="text-[11.5px] font-semibold text-white/50">
                      {filled >= 4
                        ? "¡Listo! Tu mensaje se enviará completo."
                        : `Completa ${4 - filled} campo${4 - filled === 1 ? "" : "s"} para un asesor más rápido`}
                    </p>
                    <div className="flex gap-1.5" aria-hidden>
                      {[0, 1, 2, 3].map((i) => (
                        <motion.span
                          key={i}
                          layout
                          className={cn(
                            "h-1.5 rounded-full transition-colors duration-500",
                            i < filled ? "w-6 bg-gold-400" : "w-1.5 bg-white/15"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* mini fila de garantías bajo la preview */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: "⚡", text: "Respuesta en minutos" },
                  { icon: "📋", text: "Cotización el mismo día" },
                  { icon: "🤝", text: "Asesoría sin costo" },
                ].map((g) => (
                  <div
                    key={g.text}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center"
                  >
                    <span className="text-lg" aria-hidden>{g.icon}</span>
                    <p className="text-[11px] font-semibold leading-tight text-white/65">{g.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
