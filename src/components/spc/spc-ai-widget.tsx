"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SPenCer — recepcionista inteligente con funnel de ventas (widget)
 *  Guía al visitante (Proyecto → Detalles → Listo) vía /api/spc-ai
 *  (z-ai SDK en backend) y deriva la conversación a WhatsApp.
 * ══════════════════════════════════════════════════════════════════
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, RotateCcw, SendHorizontal, User, X } from "lucide-react";
import { AI_RECEPTIONIST, WA_MESSAGES, waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-cta";

/* Abre el widget desde cualquier componente (navbar, secciones…) */
export function openSpcAi() {
  window.dispatchEvent(new CustomEvent("spc-ai-open"));
}

type ChatMessage = { role: "user" | "assistant"; content: string };

/* Pasos del funnel que se iluminan bajo el header del chat */
const FUNNEL_STEPS = ["Proyecto", "Detalles", "Listo", "WhatsApp"] as const;

/** Mini-markdown: **negritas**, listas con “- ” y saltos de línea */
function renderRich(text: string) {
  return text.split("\n").map((line, li) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      return (
        <span key={li} className="flex gap-2 pl-1">
          <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
          <span>{inline(trimmed.slice(2))}</span>
        </span>
      );
    }
    if (trimmed === "") return <span key={li} className="block h-2" />;
    return (
      <span key={li} className="block">
        {inline(line)}
      </span>
    );
  });
}

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-gold-200">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function SpcAiWidget() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const footerInView = useRef(false);

  const started = messages.length > 0;

  /* ── progreso del funnel, derivado de la conversación ──
     0 msgs → paso 1 · 2+ msgs → paso 2 · 4+ msgs → paso 3
     ≥2 mensajes del usuario → handoff a WhatsApp disponible */
  const userMsgs = messages.reduce((n, m) => (m.role === "user" ? n + 1 : n), 0);
  const stage = messages.length >= 4 ? 3 : messages.length >= 2 ? 2 : 1;
  const handoffReady = userMsgs >= 2;

  /* abre el widget desde eventos globales */
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setTeaser(false);
    };
    window.addEventListener("spc-ai-open", onOpen);
    return () => window.removeEventListener("spc-ai-open", onOpen);
  }, []);

  /* teaser de SPenCer: aparece a los ~5s (si el footer no está en
     pantalla) y se autodisfraza a los 17s. Se apila ARRIBA del teaser
     de WhatsApp (que vive a 168px) para no taparlo. */
  useEffect(() => {
    const show = setTimeout(() => {
      if (!footerInView.current) setTeaser(true);
    }, 5000);
    const hide = setTimeout(() => setTeaser(false), 17000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  /* el teaser se esconde cuando el footer está en pantalla */
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        footerInView.current = entry.isIntersecting;
        if (entry.isIntersecting) setTeaser(false);
      },
      { threshold: 0.08 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  /* Escape cierra */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* auto-scroll al último mensaje */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  /* foco al abrir */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || loading) return;
      const next: ChatMessage[] = [...messages, { role: "user", content: clean }];
      setMessages(next);
      setInput("");
      setLoading(true);
      try {
        const res = await fetch("/api/spc-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        const data = (await res.json()) as { reply?: string; error?: string };
        if (!res.ok || !data.reply) throw new Error(data.error ?? "Sin respuesta");
        setMessages([...next, { role: "assistant", content: data.reply }]);
      } catch {
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              "Perdón, tuve un problema técnico de conexión. 😅 Mientras lo reviso, mi colega humano te responde al instante por **WhatsApp** — o puedes intentar tu pregunta otra vez en unos segundos.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const reset = useCallback(() => {
    setMessages([]);
    setInput("");
    setLoading(false);
  }, []);

  /* handoff a WhatsApp: lleva la última consulta del usuario (máx. 200 car.) */
  const handoff = useCallback(() => {
    let last = "";
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        last = messages[i].content;
        break;
      }
    }
    const query = last.replace(/\s+/g, " ").trim().slice(0, 200);
    const message = query
      ? `¡Hola! 🤖 Vengo del chat con ${AI_RECEPTIONIST.name}. Mi consulta: "${query}"`
      : WA_MESSAGES.general;
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }, [messages]);

  return (
    <>
      {/* ── FAB SPenCer (encima del FAB de WhatsApp) ── */}
      <motion.button
        initial={{ scale: 0, rotate: 30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2.1, type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => {
          setOpen((v) => !v);
          setTeaser(false);
        }}
        aria-expanded={open}
        aria-label={
          open
            ? `Cerrar ${AI_RECEPTIONIST.name}`
            : `Hablar con ${AI_RECEPTIONIST.name}, recepcionista inteligente`
        }
        className={cn(
          "group fixed bottom-[calc(5.5rem+max(0px,env(safe-area-inset-bottom)))] right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-spc-900 shadow-[0_16px_40px_-10px_rgba(255,179,28,0.8)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-6",
          /* anillo pulsante (respete prefers-reduced-motion) */
          !open && "animate-gold-pulse"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <X className="h-6 w-6" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <Bot className="h-6 w-6" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
        {/* etiqueta flotante (desktop) */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-spc-950 px-3.5 py-2 text-[12px] font-bold text-white opacity-0 shadow-xl ring-1 ring-white/15 transition-all duration-300 group-hover:opacity-100 md:block"
        >
          {AI_RECEPTIONIST.name} · AI
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-5 border-transparent border-l-spc-950" />
        </span>
      </motion.button>

      {/* ── Teaser de SPenCer (apilado sobre el teaser de WhatsApp) ── */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="fixed bottom-[276px] right-5 z-[60] w-[250px] rounded-2xl rounded-br-md bg-spc-950 p-4 pr-5 shadow-[0_24px_60px_-20px_rgba(6,15,46,0.6)] ring-1 ring-white/15 sm:right-6 sm:w-[264px]"
          >
            <span aria-hidden className="absolute -bottom-1.5 right-4 h-3.5 w-3.5 rotate-45 bg-spc-950" />
            {/* botón real a pantalla completa: HTML válido + objetivo táctil ≥44px */}
            <button
              type="button"
              onClick={() => {
                setOpen(true);
                setTeaser(false);
              }}
              className="absolute inset-0 z-10 rounded-2xl rounded-br-md"
              aria-label={`Abrir el chat de ${AI_RECEPTIONIST.name}`}
            />
            <p className="relative text-[13px] font-bold leading-snug text-white">
              👋 ¡Hola! Soy <span className="text-gold-300">{AI_RECEPTIONIST.name}</span>, ¿qué necesitas
              imprimir hoy?
            </p>
            <p className="relative mt-1 text-[12px] leading-snug text-white/60">
              Te asesoro al instante — tu cotización gratis, hoy mismo.
            </p>
            {/* cierre con área táctil ampliada (24px visual + halo = 44px) */}
            <button
              type="button"
              onClick={() => setTeaser(false)}
              className="absolute -right-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-spc-900 shadow-md transition-transform duration-200 hover:scale-110 after:absolute after:-inset-2.5 after:content-['']"
              aria-label={`Cerrar invitación de ${AI_RECEPTIONIST.name}`}
            >
              <X className="h-3 w-3" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Panel de chat ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`Chat con ${AI_RECEPTIONIST.name}, recepcionista inteligente`}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[calc(9.5rem+max(0px,env(safe-area-inset-bottom)))] right-4 z-[59] flex h-[min(560px,calc(100svh-190px))] w-[min(392px,calc(100vw-32px))] flex-col overflow-hidden rounded-[1.6rem] bg-spc-950 shadow-[0_50px_110px_-30px_rgba(6,15,46,0.8)] ring-1 ring-white/15 sm:right-6"
          >
            {/* ── header ── */}
            <div className="relative flex items-center gap-3 overflow-hidden border-b border-white/10 bg-gradient-to-r from-spc-800 via-spc-700 to-spc-800 px-4 py-3.5">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_top,rgba(255,196,79,0.22),transparent_55%)]" />
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-[0_8px_20px_-6px_rgba(255,179,28,0.7)]">
                <Bot className="h-5.5 w-5.5 text-spc-900" aria-hidden />
              </span>
              <div className="relative min-w-0 flex-1 leading-tight">
                <p className="font-display truncate text-[15px] font-extrabold text-white">
                  {AI_RECEPTIONIST.name}
                  <span className="ml-2 rounded-full bg-gold-500/20 px-2 py-0.5 align-middle text-[9px] font-bold uppercase tracking-[0.14em] text-gold-300 ring-1 ring-gold-500/40">
                    Beta
                  </span>
                </p>
                <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-white/75">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
                  </span>
                  {AI_RECEPTIONIST.role} · Responde al instante
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Reiniciar conversación"
              >
                <RotateCcw className="h-4.5 w-4.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={`Cerrar chat de ${AI_RECEPTIONIST.name}`}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* ── funnel: pasos de la conversación ── */}
            <div className="border-b border-white/10 bg-spc-900/80 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                {FUNNEL_STEPS.map((label, i) => {
                  const done = i < stage - 1; /* pasos ya superados */
                  const current = i === stage - 1; /* paso activo (1–3) */
                  const ready = i === 3 && handoffReady; /* WhatsApp disponible */
                  const dotClass = ready
                    ? "bg-wa"
                    : current
                      ? "bg-gold-400 shadow-[0_0_10px_rgba(255,196,79,0.9)]"
                      : done
                        ? "bg-gold-400/70"
                        : "bg-white/25";
                  const textClass = ready
                    ? "text-[#4ce083]"
                    : current
                      ? "text-gold-200"
                      : done
                        ? "text-gold-200/60"
                        : "text-white/35";
                  const chip = (
                    <>
                      <span className="relative flex h-2 w-2 shrink-0">
                        {ready && (
                          <span
                            aria-hidden
                            className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-60"
                          />
                        )}
                        <span
                          aria-hidden
                          className={cn(
                            "relative inline-flex h-2 w-2 rounded-full transition-colors duration-500",
                            dotClass
                          )}
                        />
                      </span>
                      <span
                        className={cn(
                          "whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.14em] transition-colors duration-500",
                          textClass
                        )}
                      >
                        {label}
                      </span>
                    </>
                  );
                  const stepEl =
                    i === 3 && ready ? (
                      <button
                        type="button"
                        onClick={handoff}
                        className="flex items-center gap-1.5 rounded-full py-0.5 pr-1 transition-transform duration-300 hover:scale-105"
                        aria-label="Continuar en WhatsApp con tu consulta"
                      >
                        {chip}
                      </button>
                    ) : (
                      <span className="flex items-center gap-1.5">{chip}</span>
                    );
                  const connectorLit = done || (i === 2 && handoffReady);
                  const connectorClass = !connectorLit
                    ? "bg-white/15"
                    : i === 2
                      ? "bg-wa/70"
                      : "bg-gold-500/60";
                  return (
                    <span
                      key={label}
                      className={cn("flex items-center gap-1.5", i < 3 ? "min-w-0 flex-1" : "shrink-0")}
                    >
                      {stepEl}
                      {i < 3 && (
                        <span
                          aria-hidden
                          className={cn("h-px flex-1 rounded transition-colors duration-500", connectorClass)}
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* ── cuerpo ── */}
            <div
              ref={scrollRef}
              className="nice-scrollbar-dark flex-1 space-y-4 overflow-y-auto px-4 py-5"
              aria-live="polite"
            >
              {/* saludo */}
              {!started && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                  className="flex gap-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
                    <Bot className="h-4 w-4 text-spc-900" aria-hidden />
                  </span>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 p-3.5 text-[13px] leading-relaxed text-white/90 ring-1 ring-white/10">
                    {renderRich(AI_RECEPTIONIST.greeting)}
                  </div>
                </motion.div>
              )}

              {/* mensajes */}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  className={cn("flex gap-2.5", m.role === "user" ? "flex-row-reverse" : "")}
                >
                  {m.role === "assistant" && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
                      <Bot className="h-4 w-4 text-spc-900" aria-hidden />
                    </span>
                  )}
                  {m.role === "user" && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-spc-600 ring-1 ring-spc-400/50">
                      <User className="h-4 w-4 text-white" aria-hidden />
                    </span>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] space-y-1.5 rounded-2xl p-3.5 text-[13px] leading-relaxed ring-1",
                      m.role === "assistant"
                        ? "rounded-tl-sm bg-white/10 text-white/90 ring-white/10"
                        : "rounded-tr-sm bg-spc-600 text-white ring-spc-400/40"
                    )}
                  >
                    {renderRich(m.content)}
                  </div>
                </motion.div>
              ))}

              {/* indicador de escritura */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
                    <Bot className="h-4 w-4 text-spc-900" aria-hidden />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3.5 ring-1 ring-white/10">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-gold-300"
                        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                    <span className="ml-1.5 text-[11px] font-medium text-white/60">
                      {AI_RECEPTIONIST.name} está escribiendo…
                    </span>
                  </div>
                </motion.div>
              )}

              {/* preguntas rápidas */}
              {!started && !loading && (
                <div className="space-y-2 pl-11">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold-300/80">
                    Puedes preguntarme…
                  </p>
                  {AI_RECEPTIONIST.quickQuestions.map((q, i) => (
                    <motion.button
                      key={q}
                      type="button"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.35 }}
                      onClick={() => send(q)}
                      className="block w-full rounded-xl border border-gold-500/25 bg-gold-500/10 px-4 py-2.5 text-left text-[12.5px] font-semibold text-gold-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/50 hover:bg-gold-500/20"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* ── CTA: handoff a WhatsApp (cuando hay contexto) ── */}
            <AnimatePresence>
              {handoffReady && (
                <motion.div
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 12, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="border-t border-wa/25 bg-spc-900/90 px-3.5 pb-1 pt-3"
                >
                  <button
                    type="button"
                    onClick={handoff}
                    className="shine group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#2fe076] via-wa to-[#1da851] py-3 text-[13.5px] font-bold text-white shadow-[0_10px_26px_-10px_rgba(37,211,102,0.65)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-4.5 w-4.5" />
                    Continuar en WhatsApp
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </button>
                  <p className="py-2 text-center text-[10px] font-medium leading-tight text-white/45">
                    Cotización gratuita el mismo día · se abre WhatsApp con tu consulta lista
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── input ── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/10 bg-spc-900/80 p-3"
            >
              <div className="flex items-center gap-2.5">
                <label htmlFor="spc-ai-input" className="sr-only">
                  Escribe tu mensaje a {AI_RECEPTIONIST.name}
                </label>
                <input
                  ref={inputRef}
                  id="spc-ai-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Cuéntame qué necesitas imprimir…"
                  autoComplete="off"
                  maxLength={500}
                  className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-[13.5px] text-white placeholder:text-white/40 focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/25"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Enviar mensaje"
                  className="shine flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-spc-900 shadow-[0_8px_22px_-6px_rgba(255,179,28,0.7)] transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <SendHorizontal className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-3 px-1">
                <p className="text-[10px] leading-tight text-white/40">{AI_RECEPTIONIST.disclaimer}</p>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-wa/15 px-3 py-1.5 text-[11px] font-bold text-[#4ce083] ring-1 ring-wa/30 transition-all duration-300 hover:bg-wa hover:text-white"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
