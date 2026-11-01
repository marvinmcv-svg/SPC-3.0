"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  COTIZA EN WHATSAPP — formulario + vista previa en vivo del mensaje
 *  El visitante completa su brief y ve, letra a letra, el mensaje que
 *  llegará a WhatsApp (+591 77165787). Un clic → chat abierto y listo.
 * ══════════════════════════════════════════════════════════════════
 */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, CheckCheck, ShieldCheck, Clock3, Sparkles } from "lucide-react";
import { CONTACT, waLink } from "@/lib/site-config";
import { QUOTE_LABELS, buildQuoteMessage, formatDateEs } from "@/lib/quote";
import { useI18n } from "@/lib/i18n";
import { useContent } from "@/lib/use-content";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-cta";
import { CharReveal, Reveal, Eyebrow } from "./motion-primitives";
import { openSpencer } from "./spencer";

const fieldBase =
  "w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-[15px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 placeholder:text-white/30 hover:border-white/25 focus:border-gold-400/70 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-gold-500/15";

function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
      {children}
    </label>
  );
}

export function QuoteBuilder({
  defaultServiceId,
  id = "cotizar",
  compactHeading = false,
}: {
  defaultServiceId?: string;
  id?: string;
  compactHeading?: boolean;
}) {
  const uid = useId();
  const { t, lang } = useI18n();
  const { services: SERVICES, funnel: FUNNEL } = useContent();
  const QL = QUOTE_LABELS[lang];
  const locale = lang === "en" ? "en-US" : "es-BO";
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [serviceId, setServiceId] = useState(defaultServiceId ?? "");
  const [qty, setQty] = useState(500);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("La Paz");
  const [extras, setExtras] = useState<string[]>([]);
  const [comments, setComments] = useState("");
  const [flash, setFlash] = useState<string | null>(null);
  const flashTimer = useRef<number | undefined>(undefined);

  /* resalta en la vista previa la línea que acaba de cambiar */
  const touch = (key: string) => {
    setFlash(key);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlash(null), 900);
  };
  useEffect(() => () => window.clearTimeout(flashTimer.current), []);

  const brief = useMemo(
    () => ({
      name,
      company,
      serviceId: serviceId || undefined,
      quantity: `${qty.toLocaleString(locale)} ${QL.units}`,
      deadline: formatDateEs(date, lang),
      city,
      extras,
      comments,
    }),
    [name, company, serviceId, qty, date, city, extras, comments, lang, locale, QL.units]
  );
  const message = buildQuoteMessage(brief, "form", lang);
  const href = waLink(message);
  const service = SERVICES.find((s) => s.id === serviceId);

  const step = qty < 1000 ? 100 : qty < 10000 ? 500 : 1000;
  const today = new Date().toISOString().slice(0, 10);

  /* líneas de la vista previa (clave → texto) */
  const preview: [string, string][] = [
    ["intro", QL.intro],
    ["gap1", ""],
    ["name", `${QL.name}: ${name || "…"}`],
    ["company", `${QL.company}: ${company || "—"}`],
    ["service", `${QL.service}: ${service?.title ?? "…"}`],
    ["qty", `${QL.qty}: ${qty.toLocaleString(locale)} ${QL.units}`],
    ["date", `${QL.date}: ${formatDateEs(date, lang) || "…"}`],
    ["city", `${QL.city}: ${city}`],
    ["extras", `${QL.extras}: ${extras.length ? extras.join(", ") : "—"}`],
    ["comments", `${QL.comments}: ${comments || "—"}`],
    ["gap2", ""],
    ["thanks", QL.thanks],
  ];

  const canSend = name.trim().length > 1 && !!serviceId;

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-[#0d0b0a] py-24 text-white sm:py-28"
      aria-label={t("Cotiza tu proyecto por WhatsApp", "Get a quote for your project on WhatsApp")}
    >
      {/* atmósfera */}
      <div aria-hidden className="aurora -left-40 top-10 h-[420px] w-[420px] bg-spc-600/40" />
      <div aria-hidden className="aurora -right-32 bottom-0 h-[380px] w-[380px] bg-gold-600/25 [animation-delay:-6s]" />
      <div aria-hidden className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {!compactHeading && (
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow dark>{t("Cotización en 1 minuto", "Quote in 1 minute")}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight">
              <CharReveal text={t("Arma tu pedido.", "Build your order.")} />{" "}
              <CharReveal text={t("Envíalo por WhatsApp.", "Send it on WhatsApp.")} charClassName="text-gold-400 [text-shadow:0_0_40px_rgba(255,196,79,0.45)]" delay={0.3} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-white/65">
                {t(
                  "Completa lo que sepas — mira tu mensaje armarse en vivo — y continúa la conversación con un asesor real. Sin formularios eternos, sin esperas.",
                  "Fill in what you know — watch your message build live — and continue the conversation with a real advisor. No endless forms, no waiting."
                )}
              </p>
            </Reveal>
          </div>
        )}

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* ═════ Formulario ═════ */}
          <Reveal y={36}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (canSend) window.open(href, "_blank", "noopener,noreferrer");
              }}
              className="space-y-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`${uid}-name`}>{QL.name}</Label>
                  <input
                    id={`${uid}-name`}
                    value={name}
                    onChange={(e) => { setName(e.target.value); touch("name"); }}
                    autoComplete="name"
                    required
                    className={cn(fieldBase, "h-[60px]")}
                    placeholder={t("Tu nombre", "Your name")}
                  />
                </div>
                <div>
                  <Label htmlFor={`${uid}-company`}>{t("Empresa (opcional)", "Company (optional)")}</Label>
                  <input
                    id={`${uid}-company`}
                    value={company}
                    onChange={(e) => { setCompany(e.target.value); touch("company"); }}
                    autoComplete="organization"
                    className={cn(fieldBase, "h-[60px]")}
                    placeholder={t("Marca o empresa", "Brand or company")}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <Label htmlFor={`${uid}-service`}>{QL.service}</Label>
                  <select
                    id={`${uid}-service`}
                    value={serviceId}
                    onChange={(e) => { setServiceId(e.target.value); touch("service"); }}
                    required
                    className={cn(fieldBase, "h-[60px] appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10 [&>option]:bg-spc-950")}
                  >
                    <option value="" disabled>
                      {t("Elegir…", "Choose…")}
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor={`${uid}-date`}>{QL.date}</Label>
                  <input
                    id={`${uid}-date`}
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => { setDate(e.target.value); touch("date"); }}
                    className={cn(fieldBase, "h-[60px] [color-scheme:dark]")}
                  />
                </div>
                <div>
                  <Label>{QL.qty}</Label>
                  <div className={cn(fieldBase, "flex h-[60px] items-center justify-between px-2")}>
                    <button
                      type="button"
                      onClick={() => { setQty((q) => Math.max(1, q - step)); touch("qty"); }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-gold-400 transition-colors hover:bg-white/10"
                      aria-label={t("Disminuir cantidad", "Decrease quantity")}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.input
                        key={qty}
                        initial={{ y: -12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 12, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        aria-label={QL.qty}
                        inputMode="numeric"
                        value={qty.toLocaleString(locale)}
                        onChange={(e) => {
                          const n = Number(e.target.value.replace(/\D/g, ""));
                          setQty(Math.max(1, Math.min(1_000_000, n || 1)));
                          touch("qty");
                        }}
                        className="w-20 bg-transparent text-center font-display text-[16px] font-bold tabular-nums text-white focus:outline-none"
                      />
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() => { setQty((q) => Math.min(1_000_000, q + step)); touch("qty"); }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-gold-400 transition-colors hover:bg-white/10"
                      aria-label={t("Aumentar cantidad", "Increase quantity")}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <Label>{QL.city}</Label>
                <div className="flex flex-wrap gap-2">
                  {FUNNEL.cities.slice(0, 6).map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={city === c}
                      onClick={() => { setCity(c); touch("city"); }}
                      className={cn(
                        "rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-all duration-300",
                        city === c
                          ? "border-gold-400 bg-gold-500/15 text-gold-200 shadow-[0_0_0_4px_rgba(255,196,79,0.1)]"
                          : "border-white/15 text-white/75 hover:border-white/35 hover:text-white"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                  <select
                    aria-label={t("Otra ciudad", "Other city")}
                    value={FUNNEL.cities.slice(0, 6).includes(city as never) ? "" : city}
                    onChange={(e) => { if (e.target.value) { setCity(e.target.value); touch("city"); } }}
                    className="rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-[13.5px] text-white/75 hover:border-white/35 focus:outline-none [&>option]:bg-spc-950"
                  >
                    <option value="">{t("Otra…", "Other…")}</option>
                    {FUNNEL.cities.slice(6).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>{t("Necesito además", "I also need")}</Label>
                <div className="flex flex-wrap gap-2">
                  {FUNNEL.extras.map((x) => {
                    const on = extras.includes(x);
                    return (
                      <motion.button
                        key={x}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        aria-pressed={on}
                        onClick={() => {
                          setExtras((xs) => (on ? xs.filter((e) => e !== x) : [...xs, x]));
                          touch("extras");
                        }}
                        className={cn(
                          "rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-all duration-300",
                          on
                            ? "border-gold-400 bg-gold-500/15 text-gold-200 shadow-[0_0_0_4px_rgba(255,196,79,0.1)]"
                            : "border-white/15 text-white/75 hover:border-white/35 hover:text-white"
                        )}
                      >
                        {x}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label htmlFor={`${uid}-comments`}>{t("Comentarios (opcional)", "Comments (optional)")}</Label>
                <textarea
                  id={`${uid}-comments`}
                  rows={4}
                  value={comments}
                  onChange={(e) => { setComments(e.target.value); touch("comments"); }}
                  placeholder={t("Medidas, papel, acabados, referencias…", "Size, paper, finishes, references…")}
                  className={cn(fieldBase, "resize-y py-4")}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  type="submit"
                  disabled={!canSend}
                  whileHover={canSend ? { y: -3, scale: 1.02 } : undefined}
                  whileTap={canSend ? { scale: 0.97 } : undefined}
                  className="shine inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-8 py-[18px] text-[13px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_48px_-14px_rgba(37,211,102,0.75),inset_0_1px_0_rgba(255,255,255,0.35)] transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t("Continuar en WhatsApp", "Continue on WhatsApp")}
                </motion.button>
                <button
                  type="button"
                  onClick={() => openSpencer(serviceId || undefined)}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[13px] font-semibold text-gold-300 transition-colors hover:text-gold-200"
                >
                  <Sparkles className="h-4 w-4" aria-hidden />
                  {t("¿Dudas? Pregúntale a SPenCer", "Questions? Ask SPenCer")}
                </button>
              </div>
              <p className="text-[13px] text-white/50">
                {canSend
                  ? t("Tu cotización queda confirmada cuando nuestro equipo te responde por WhatsApp.", "Your quote is confirmed once our team replies on WhatsApp.")
                  : t("Completa tu nombre y el servicio para continuar.", "Enter your name and the service to continue.")}
              </p>
            </form>
          </Reveal>

          {/* ═════ Vista previa del mensaje ═════ */}
          <Reveal y={36} delay={0.15} className="lg:sticky lg:top-28">
            <motion.div
              whileHover={{ rotateX: 2, rotateY: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformPerspective: 1200 }}
              className="glossy-dark rounded-[1.8rem] p-5 sm:p-7"
            >
              <span aria-hidden className="glossy-sheen" />
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-wa/15 ring-1 ring-wa/40">
                  <WhatsAppIcon className="h-5 w-5 text-[#4ce083]" />
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-[14px] font-semibold text-white">SPC Impresores · La Paz</p>
                  <p className="flex items-center gap-1.5 text-[12px] text-white/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ce083]" aria-hidden />
                    {CONTACT.whatsapp} · {t("en línea", "online")}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#0b141a] p-4 sm:p-5">
                <div className="wa-bubble ml-2 rounded-2xl rounded-tl-none bg-[#075e54] px-4 py-3.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
                  {preview.map(([key, text]) =>
                    text === "" ? (
                      <span key={key} className="block h-3.5" />
                    ) : (
                      <motion.span
                        key={key}
                        layout
                        animate={
                          flash === key
                            ? { backgroundColor: "rgba(255,196,79,0.28)", x: [0, 3, 0] }
                            : { backgroundColor: "rgba(255,196,79,0)", x: 0 }
                        }
                        transition={{ duration: 0.4 }}
                        className="-mx-1 block whitespace-pre-wrap break-words rounded-md px-1 text-[14px] leading-relaxed text-white/95"
                      >
                        {text}
                      </motion.span>
                    )
                  )}
                  <span className="mt-1.5 flex items-center justify-end gap-1 text-[10.5px] text-white/55">
                    {new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}
                    <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" aria-hidden />
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-[12px] text-white/65">
                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-gold-400" aria-hidden /> {t("Respuesta en minutos", "Replies in minutes")}
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold-400" aria-hidden /> {t("Cotización gratuita", "Free quote")}
                </span>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
