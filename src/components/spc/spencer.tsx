"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SPenCer — recepcionista con IA + funnel de ventas guiado
 *
 *  Embudo: servicio → cantidad → fecha → extras → nombre → empresa →
 *  ciudad → resumen → WhatsApp (brief completo precargado).
 *  En cualquier paso el visitante puede escribir una pregunta libre:
 *  responde la IA (/api/spc-ai) o, sin red, las FAQ locales; luego
 *  SPenCer retoma el embudo donde quedó.
 * ══════════════════════════════════════════════════════════════════
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, SendHorizontal, RotateCcw, User, Check, ArrowRight, Pencil } from "lucide-react";
import { AI_RECEPTIONIST, FUNNEL, SECTORS, SERVICES, getService, waLink } from "@/lib/site-config";
import { buildQuoteMessage, localAnswer, type QuoteBrief } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-cta";
import { SpencerAvatar } from "./spencer-avatar";

/* Abre SPenCer desde cualquier componente (opcionalmente con un servicio ya elegido) */
export function openSpencer(serviceId?: string) {
  window.dispatchEvent(new CustomEvent("spencer-open", { detail: serviceId }));
}

type Step = "service" | "unsure" | "quantity" | "deadline" | "extras" | "name" | "company" | "city" | "done";
const MAIN_STEPS: Step[] = ["service", "quantity", "deadline", "extras", "name", "company", "city"];

type Msg = { id: number; role: "user" | "assistant"; content: string; kind?: "summary" };

/* Recomendación por sector cuando el visitante no sabe qué necesita */
const SECTOR_TO_SERVICES: Record<string, string[]> = {
  alimentos: ["packaging-alimentos", "paper-bags", "packaging-comercial"],
  farmaceutica: ["packaging-farmaceutico", "impresos-comerciales"],
  editorial: ["libros", "revistas", "impresion-digital"],
  retail: ["paper-bags", "packaging-comercial", "calendarios"],
  corporativo: ["impresos-comerciales", "calendarios", "revistas"],
  agencias: ["impresion-digital", "revistas", "packaging-comercial"],
};

const PROMPTS: Record<Step, string> = {
  service: "¿Qué te gustaría imprimir?",
  unsure: "¡Sin problema! Te recomiendo según tu rubro. **¿A qué sector pertenece tu proyecto?**",
  quantity: "**¿Qué cantidad aproximada necesitas?** (un rango está perfecto)",
  deadline: "**¿Para cuándo lo necesitas?**",
  extras: "¿Necesitas algo adicional? Marca todo lo que aplique y toca **Continuar**.",
  name: "¡Ya casi! **¿Cómo te llamas?** ✍️",
  company: "**¿Para qué empresa o marca es?** (puedes omitirlo)",
  city: "**¿En qué ciudad recibes el pedido?** Entregamos en los 9 departamentos.",
  done: "",
};

/** Mini-markdown: **negritas**, listas “- ” y saltos de línea */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => {
        const t = line.trim();
        const inline = (s: string) =>
          s.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
            p.startsWith("**") && p.endsWith("**") ? (
              <strong key={i} className="font-bold text-gold-200">
                {p.slice(2, -2)}
              </strong>
            ) : (
              <span key={i}>{p}</span>
            )
          );
        if (t.startsWith("- "))
          return (
            <span key={li} className="flex gap-2 pl-1">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              <span>{inline(t.slice(2))}</span>
            </span>
          );
        if (t === "") return <span key={li} className="block h-2" />;
        return (
          <span key={li} className="block">
            {inline(line)}
          </span>
        );
      })}
    </>
  );
}

function Chip({
  children,
  onClick,
  selected = false,
  delay = 0,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
  delay?: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 380, damping: 26 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors",
        selected
          ? "border-gold-400 bg-gold-500 text-spc-950"
          : "border-gold-500/30 bg-gold-500/10 text-gold-100 hover:border-gold-400/60 hover:bg-gold-500/20"
      )}
    >
      {selected && <Check className="h-3.5 w-3.5" aria-hidden />}
      {children}
    </motion.button>
  );
}

export function SpencerWidget() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("service");
  const [lead, setLead] = useState<QuoteBrief>({ extras: [] });
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextId = () => ++idRef.current;
  const push = useCallback((role: Msg["role"], content: string, kind?: Msg["kind"]) => {
    setMsgs((m) => [...m, { id: ++idRef.current, role, content, kind }]);
  }, []);

  /** SPenCer "escribe" un momento antes de responder (sensación humana) */
  const botSay = useCallback(
    (content: string, then?: () => void, kind?: Msg["kind"], wait = 650) => {
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        push("assistant", content, kind);
        then?.();
      }, wait);
    },
    [push]
  );

  /* ── apertura (global + teaser proactivo) ── */
  const startedRef = useRef(false);
  const begin = useCallback(
    (serviceId?: string) => {
      setOpen(true);
      setTeaser(false);
      if (startedRef.current && !serviceId) return;
      startedRef.current = true;
      setMsgs([{ id: nextId(), role: "assistant", content: AI_RECEPTIONIST.greeting }]);
      if (serviceId && getService(serviceId)) {
        const svc = getService(serviceId)!;
        setLead({ extras: [], serviceId });
        push("user", svc.title);
        botSay(`¡Excelente elección! 💡 ${svc.insight}\n\n${PROMPTS.quantity}`, () => setStep("quantity"));
      } else {
        setLead({ extras: [] });
        setStep("service");
      }
    },
    [botSay, push]
  );

  useEffect(() => {
    const onOpen = (e: Event) => begin((e as CustomEvent<string | undefined>).detail);
    window.addEventListener("spencer-open", onOpen);
    window.addEventListener("spc-ai-open", onOpen);
    return () => {
      window.removeEventListener("spencer-open", onOpen);
      window.removeEventListener("spc-ai-open", onOpen);
    };
  }, [begin]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("spencer-teaser") === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => {
      setTeaser(!startedRef.current);
      try {
        sessionStorage.setItem("spencer-teaser", "1");
      } catch {}
    }, 9000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, step, open]);

  useEffect(() => {
    if (open && (step === "name" || step === "company")) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, step]);

  /* ── avance del embudo ── */
  const goto = (s: Step, prefix = "") => botSay(`${prefix}${PROMPTS[s]}`, () => setStep(s));

  const chooseService = (id: string) => {
    const svc = getService(id);
    if (!svc) return;
    setLead((l) => ({ ...l, serviceId: id }));
    push("user", svc.title);
    goto("quantity", `¡Excelente elección! 💡 ${svc.insight}\n\n`);
  };

  const chooseSector = (sectorId: string, label: string) => {
    push("user", label);
    const recs = (SECTOR_TO_SERVICES[sectorId] ?? []).map((id) => getService(id)!).filter(Boolean);
    botSay(
      `Para **${label}** nuestros clientes suelen elegir:\n${recs.map((r) => `- **${r.title}**: ${r.description}`).join("\n")}\n\n¿Cuál se parece más a lo que buscas?`,
      () => setStep("service")
    );
  };

  const toggleExtra = (x: string) =>
    setLead((l) => {
      const has = l.extras?.includes(x);
      return { ...l, extras: has ? l.extras!.filter((e) => e !== x) : [...(l.extras ?? []), x] };
    });

  const finish = (final: QuoteBrief) => {
    botSay(
      `¡Perfecto, ${final.name?.split(" ")[0] ?? ""}! 🎉 Este es tu brief. Revisa y envíalo: un asesor de SPC te responde por WhatsApp con la cotización.`,
      () => {
        push("assistant", "", "summary");
        setStep("done");
      }
    );
  };

  const answerText = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setInput("");
    if (step === "name") {
      setLead((l) => ({ ...l, name: clean }));
      push("user", clean);
      goto("company", `Un gusto, **${clean.split(" ")[0]}**. `);
      return;
    }
    if (step === "company") {
      setLead((l) => ({ ...l, company: clean }));
      push("user", clean);
      goto("city");
      return;
    }
    askAi(clean);
  };

  /* Pregunta libre → IA (con contexto del embudo) → fallback local */
  const askAi = async (q: string) => {
    push("user", q);
    setTyping(true);
    const history = [...msgs.filter((m) => !m.kind && m.content), { role: "user" as const, content: q }]
      .slice(-12)
      .map(({ role, content }) => ({ role, content }));
    let reply = "";
    try {
      const res = await fetch("/api/spc-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, funnel: { step, lead } }),
      });
      const data = (await res.json()) as { reply?: string };
      if (res.ok && data.reply) reply = data.reply;
    } catch {}
    if (!reply) reply = localAnswer(q);
    setTyping(false);
    push("assistant", step === "done" ? reply : `${reply}\n\n${PROMPTS[step]}`);
  };

  const reset = () => {
    startedRef.current = false;
    setMsgs([]);
    setInput("");
    setTyping(false);
    begin();
  };

  const svc = lead.serviceId ? getService(lead.serviceId) : undefined;
  const stepIndex = step === "done" ? MAIN_STEPS.length : Math.max(0, MAIN_STEPS.indexOf(step === "unsure" ? "service" : step));
  const progress = Math.round((stepIndex / MAIN_STEPS.length) * 100);
  const waHref = waLink(buildQuoteMessage(lead, "spencer"));

  /* ── opciones del paso actual ── */
  const renderOptions = () => {
    if (typing) return null;
    switch (step) {
      case "service":
        return (
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s, i) => (
              <Chip key={s.id} delay={i * 0.03} onClick={() => chooseService(s.id)}>
                {s.shortTitle}
              </Chip>
            ))}
            <Chip delay={0.3} onClick={() => { push("user", "No estoy seguro"); goto("unsure"); }}>
              🤔 No estoy seguro
            </Chip>
          </div>
        );
      case "unsure":
        return (
          <div className="flex flex-wrap gap-2">
            {SECTORS.map((s, i) => (
              <Chip key={s.id} delay={i * 0.04} onClick={() => chooseSector(s.id, s.label)}>
                {s.label}
              </Chip>
            ))}
          </div>
        );
      case "quantity":
        return (
          <div className="flex flex-wrap gap-2">
            {FUNNEL.quantities.map((q, i) => (
              <Chip
                key={q}
                delay={i * 0.04}
                onClick={() => {
                  setLead((l) => ({ ...l, quantity: q }));
                  push("user", q);
                  goto("deadline", svc ? `Anotado. Para ${svc.shortTitle.toLowerCase()} el mínimo orientativo es ${svc.minRun}. ` : "Anotado. ");
                }}
              >
                {q}
              </Chip>
            ))}
          </div>
        );
      case "deadline":
        return (
          <div className="flex flex-wrap gap-2">
            {FUNNEL.deadlines.map((d, i) => (
              <Chip
                key={d}
                delay={i * 0.04}
                onClick={() => {
                  setLead((l) => ({ ...l, deadline: d }));
                  push("user", d);
                  goto("extras", svc ? `⏱️ Referencia: ${svc.shortTitle} se produce en ${svc.turnaround}. ` : "");
                }}
              >
                {d}
              </Chip>
            ))}
          </div>
        );
      case "extras":
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {FUNNEL.extras.map((x, i) => (
                <Chip key={x} delay={i * 0.04} selected={!!lead.extras?.includes(x)} onClick={() => toggleExtra(x)}>
                  {x}
                </Chip>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                push("user", lead.extras?.length ? lead.extras.join(", ") : "Nada adicional");
                goto("name");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-2 text-[12.5px] font-bold text-spc-950 shadow-[0_8px_20px_-8px_rgba(255,179,28,0.7)]"
            >
              Continuar <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        );
      case "company":
        return (
          <Chip onClick={() => { push("user", "Es personal / omitir"); goto("city"); }}>Omitir</Chip>
        );
      case "city":
        return (
          <div className="flex flex-wrap gap-2">
            {FUNNEL.cities.map((c, i) => (
              <Chip
                key={c}
                delay={i * 0.03}
                onClick={() => {
                  const final = { ...lead, city: c };
                  setLead(final);
                  push("user", c);
                  finish(final);
                }}
              >
                {c}
              </Chip>
            ))}
          </div>
        );
      default:
        return null;
    }
  }

  const renderSummary = () => {
    const rows: [string, string | undefined][] = [
      ["Servicio", svc?.title],
      ["Cantidad", lead.quantity],
      ["Fecha", lead.deadline],
      ["Extras", lead.extras?.length ? lead.extras.join(", ") : "—"],
      ["Nombre", lead.name],
      ["Empresa", lead.company ?? "—"],
      ["Ciudad", lead.city],
    ];
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="glossy-dark overflow-hidden rounded-2xl"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <WhatsAppIcon className="h-4 w-4 text-[#4ce083]" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">Tu brief de cotización</p>
        </div>
        <dl className="space-y-1.5 px-4 py-3 text-[12.5px]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <dt className="w-16 shrink-0 text-white/50">{k}</dt>
              <dd className="font-semibold text-white">{v || "—"}</dd>
            </div>
          ))}
        </dl>
        <div className="space-y-2 p-3 pt-0">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shine flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-5 py-3 text-[13.5px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.7)]"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
            Enviar brief por WhatsApp
          </a>
          <button
            type="button"
            onClick={reset}
            className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold text-white/60 transition-colors hover:text-white"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden /> Empezar de nuevo
          </button>
        </div>
      </motion.div>
    );
  }

  const textMode = step === "name" || step === "company";

  return (
    <>
      {/* ── Teaser proactivo ── */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[calc(9.5rem+max(0px,env(safe-area-inset-bottom)))] right-4 z-[60] hidden w-[260px] sm:right-6 sm:block"
          >
            <div className="glossy-dark rounded-2xl rounded-br-sm p-4 pr-9">
              <button
                type="button"
                onClick={() => setTeaser(false)}
                aria-label="Cerrar sugerencia"
                className="absolute right-2 top-2 rounded-full p-1.5 text-white/50 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="text-[13px] leading-snug text-white/90">
                👋 Soy <strong className="text-gold-300">SPenCer</strong>. ¿Te ayudo a cotizar tu impresión en 60 segundos?
              </p>
              <button
                type="button"
                onClick={() => begin()}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3.5 py-1.5 text-[12px] font-bold text-spc-950"
              >
                ¡Sí, empecemos! <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <motion.button
        initial={{ scale: 0, rotate: 30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => (open ? setOpen(false) : begin())}
        aria-expanded={open}
        aria-label={open ? "Cerrar SPenCer" : "Hablar con SPenCer, recepcionista con IA"}
        className={cn(
          "group fixed bottom-[calc(5.5rem+max(0px,env(safe-area-inset-bottom)))] right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-spc-500 via-spc-700 to-spc-950 shadow-[0_16px_40px_-10px_rgba(0,60,141,0.8),inset_0_1px_0_rgba(255,255,255,0.35)] ring-2 ring-gold-400/70 transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-6",
          !open && "animate-gold-pulse"
        )}
      >
        {open ? <X className="h-6 w-6 text-white" aria-hidden /> : <SpencerAvatar className="h-10 w-10" />}
        <span
          aria-hidden
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-spc-950 px-3.5 py-2 text-[12px] font-bold text-white opacity-0 shadow-xl ring-1 ring-white/15 transition-all duration-300 group-hover:opacity-100 md:block"
        >
          SPenCer · Cotiza en 60 s
        </span>
      </motion.button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat con SPenCer, recepcionista con IA de SPC"
            initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{ transformOrigin: "bottom right", transformPerspective: 1000 }}
            className="fixed bottom-[calc(9.5rem+max(0px,env(safe-area-inset-bottom)))] right-4 z-[59] flex h-[min(600px,calc(100svh-190px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-[1.6rem] bg-spc-950 shadow-[0_50px_110px_-30px_rgba(6,15,46,0.85)] ring-1 ring-white/15 sm:right-6"
          >
            {/* header */}
            <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-spc-800 via-spc-700 to-spc-800 px-4 pb-3 pt-3.5">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_top,rgba(255,196,79,0.25),transparent_55%)]" />
              <div className="relative flex items-center gap-3">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-spc-950/60 ring-1 ring-gold-400/40">
                  <SpencerAvatar className="h-10 w-10" talking={typing} />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#4ce083] ring-2 ring-spc-800" aria-hidden />
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="font-display truncate text-[15.5px] font-extrabold text-white">
                    SPenCer
                    <span className="ml-2 rounded-full bg-gold-500/20 px-2 py-0.5 align-middle text-[9px] font-bold uppercase tracking-[0.14em] text-gold-300 ring-1 ring-gold-500/40">
                      IA
                    </span>
                  </p>
                  <p className="truncate text-[11.5px] font-medium text-white/75">
                    {AI_RECEPTIONIST.role} · {AI_RECEPTIONIST.tagline}
                  </p>
                </div>
                <button type="button" onClick={reset} className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Reiniciar conversación">
                  <RotateCcw className="h-4.5 w-4.5" aria-hidden />
                </button>
                <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Cerrar chat">
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              {/* progreso del brief */}
              <div className="relative mt-3 flex items-center gap-2.5">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-[#4ce083]"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
                <span className="text-[10.5px] font-bold tabular-nums text-gold-300">{progress}% brief</span>
              </div>
            </div>

            {/* cuerpo */}
            <div ref={scrollRef} className="nice-scrollbar-dark flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
              {msgs.map((m) =>
                m.kind === "summary" ? (
                  <div key={m.id} className="pl-10">
                    {renderSummary()}
                  </div>
                ) : (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("flex gap-2.5", m.role === "user" && "flex-row-reverse")}
                  >
                    {m.role === "assistant" ? (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-spc-800 ring-1 ring-gold-400/30">
                        <SpencerAvatar className="h-6 w-6" />
                      </span>
                    ) : (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-spc-600 ring-1 ring-spc-400/50">
                        <User className="h-4 w-4 text-white" aria-hidden />
                      </span>
                    )}
                    <div
                      className={cn(
                        "max-w-[84%] space-y-1 rounded-2xl p-3.5 text-[13px] leading-relaxed ring-1",
                        m.role === "assistant"
                          ? "rounded-tl-sm bg-white/10 text-white/90 ring-white/10"
                          : "rounded-tr-sm bg-spc-600 text-white ring-spc-400/40"
                      )}
                    >
                      <Rich text={m.content} />
                    </div>
                  </motion.div>
                )
              )}

              {typing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-spc-800 ring-1 ring-gold-400/30">
                    <SpencerAvatar className="h-6 w-6" talking />
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
                  </div>
                </motion.div>
              )}

              <div className="pl-10">
                {renderOptions()}
              </div>
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                answerText(input);
              }}
              className="border-t border-white/10 bg-spc-900/80 p-3"
            >
              <div className="flex items-center gap-2.5">
                <label htmlFor="spencer-input" className="sr-only">
                  Escribe a SPenCer
                </label>
                <input
                  ref={inputRef}
                  id="spencer-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    step === "name" ? "Tu nombre…" : step === "company" ? "Empresa o marca…" : "Pregúntame lo que quieras…"
                  }
                  autoComplete={step === "name" ? "name" : step === "company" ? "organization" : "off"}
                  maxLength={300}
                  className={cn(
                    "h-12 min-w-0 flex-1 rounded-full border bg-white/5 px-5 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:ring-2",
                    textMode ? "border-gold-500/60 ring-2 ring-gold-500/25 focus:ring-gold-500/40" : "border-white/15 focus:border-gold-500/60 focus:ring-gold-500/25"
                  )}
                />
                <button
                  type="submit"
                  disabled={typing || !input.trim()}
                  aria-label="Enviar mensaje"
                  className="shine flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-spc-900 shadow-[0_8px_22px_-6px_rgba(255,179,28,0.7)] transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <SendHorizontal className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-3 px-1">
                <p className="text-[10px] leading-tight text-white/40">{AI_RECEPTIONIST.disclaimer}</p>
                <a
                  href={waHref}
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
