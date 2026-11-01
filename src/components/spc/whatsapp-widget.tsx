"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  WHATSAPP WIDGET — el widget original de chat flotante
 *  FAB verde con pulso → panel de chat con quick-replies
 * ══════════════════════════════════════════════════════════════════
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight, CheckCheck } from "lucide-react";
import { WA_MESSAGES, waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-cta";

const QUICK_REPLIES = [
  { id: "pack", label: "Quiero cotizar packaging", message: WA_MESSAGES.packaging },
  { id: "com", label: "Impresión comercial (libros, revistas…)", message: WA_MESSAGES.commercial },
  { id: "dig", label: "Impresión digital bajo demanda", message: WA_MESSAGES.digital },
  { id: "otro", label: "Otra consulta", message: WA_MESSAGES.general },
] as const;

const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export function WhatsappWidget() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [time] = useState(now);
  const footerInView = useRef(false);

  // teaser aparece tras 2.6s (solo si el footer no está en pantalla) y se autodisfraza a los 14s
  useEffect(() => {
    const show = setTimeout(() => {
      if (!footerInView.current) setTeaser(true);
    }, 2600);
    const hide = setTimeout(() => setTeaser(false), 14000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // el teaser se esconde cuando el footer está en pantalla (no tapa el contacto)
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

  const closeTeaser = useCallback(() => setTeaser(false), []);

  // Escape cierra el panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openWa = (message: string) => {
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* ── Teaser / burbuja de invitación ── */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="fixed bottom-[168px] right-5 z-[60] w-[240px] rounded-2xl rounded-br-md bg-white p-4 pr-5 shadow-[0_24px_60px_-20px_rgba(6,15,46,0.5)] ring-1 ring-spc-900/10 sm:right-6 sm:w-[260px]"
          >
            <span className="absolute -bottom-1.5 right-4 h-3.5 w-3.5 rotate-45 bg-white" aria-hidden />
            {/* botón real a pantalla completa: HTML válido + objetivo táctil ≥44px */}
            <button
              onClick={() => {
                setOpen(true);
                closeTeaser();
              }}
              className="absolute inset-0 z-10 rounded-2xl rounded-br-md"
              aria-label="Abrir chat de WhatsApp: ¿tienes un proyecto en mente?"
            />
            <p className="relative text-[13px] font-bold leading-snug text-spc-900">
              ¿Tienes un proyecto en mente? 💬
            </p>
            <p className="relative mt-1 text-[12px] leading-snug text-spc-900/60">
              Cotiza por WhatsApp — respondemos al instante.
            </p>
            {/* cierre con área táctil ampliada (24px visual + halo = 44px) */}
            <button
              onClick={closeTeaser}
              className="absolute -right-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-spc-900 text-white shadow-md transition-transform duration-200 hover:scale-110 after:absolute after:-inset-2.5 after:content-['']"
              aria-label="Cerrar invitación"
            >
              <X className="h-3 w-3" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <motion.button
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => {
          setOpen((v) => !v);
          closeTeaser();
        }}
        aria-expanded={open}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        className={cn(
          "fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] text-white shadow-[0_18px_44px_-12px_rgba(37,211,102,0.75)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-6",
          !open && "animate-wa-pulse"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex"
            >
              <X className="h-7 w-7" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex"
            >
              <WhatsAppIcon className="h-8 w-8" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-extrabold"
          >
            1
          </span>
        )}
      </motion.button>

      {/* ── Panel de chat ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat de WhatsApp con SPC"
            initial={{ opacity: 0, y: 40, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 34, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[92px] right-4 z-[59] flex h-[540px] max-h-[calc(100svh-120px)] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-[1.6rem] bg-[#ece5dd] shadow-[0_40px_90px_-24px_rgba(6,15,46,0.55)] ring-1 ring-spc-950/20 sm:right-6"
          >
            {/* header estilo WhatsApp original */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#075e54] to-[#128c7e] px-4 py-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-1 shadow-md">
                <Image
                  src="/images/site/spc-logo.jpg"
                  alt="SPC"
                  width={44}
                  height={44}
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[14.5px] font-bold text-white">SPC Gráfica Industrial</p>
                <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden />
                  en línea · respondemos al instante
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
                aria-label="Cerrar chat"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* cuerpo del chat con patrón clásico */}
            <div className="relative flex-1 overflow-y-auto px-4 py-5">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(11,27,77,0.10) 1.1px, transparent 1.1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              {/* mensaje entrante */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.12, type: "spring", stiffness: 320, damping: 24 }}
                className="relative ml-auto w-[86%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] p-3.5 shadow-[0_1px_2px_rgba(11,27,77,0.15)]"
              >
                <p className="text-[13px] leading-relaxed text-[#111b21]">
                  ¡Hola! 👋 Somos <strong>SPC Gráfica Industrial</strong>, líderes de la industria
                  gráfica en Bolivia. Cuéntanos qué necesitas imprimir y te cotizamos hoy mismo.
                </p>
                <p className="mt-1 flex items-center justify-end gap-1 text-[10.5px] text-[#667781]">
                  {time}
                  <CheckCheck className="h-3.5 w-3.5 text-sky-600" aria-hidden />
                </p>
              </motion.div>

              {/* quick replies */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5b6b8c]"
              >
                Puedes empezar con…
              </motion.p>
              <div className="relative mt-3 space-y-2">
                {QUICK_REPLIES.map((qr, i) => (
                  <motion.button
                    key={qr.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.09, duration: 0.35 }}
                    onClick={() => openWa(qr.message)}
                    className="group flex w-full items-center justify-between gap-3 rounded-xl border border-[#c8d5e0] bg-white/90 px-4 py-3 text-left text-[13px] font-semibold text-spc-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-wa/60 hover:shadow-md"
                  >
                    {qr.label}
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-spc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-wa"
                      aria-hidden
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* footer de acción */}
            <div className="border-t border-[#c8d5e0] bg-[#f0f2f5] p-3.5">
              <button
                onClick={() => openWa(WA_MESSAGES.final)}
                className="shine flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#2fe076] via-wa to-[#1da851] py-3.5 text-[14.5px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Iniciar chat ahora
              </button>
              <p className="mt-2 text-center text-[10.5px] font-medium text-[#5b6b8c]">
                Se abrirá WhatsApp con tu mensaje listo para enviar
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
