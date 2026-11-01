/**
 * ══════════════════════════════════════════════════════════════════
 *  Brief de cotización → mensaje de WhatsApp
 *  Compartido por el formulario "Cotiza en WhatsApp" y por SPenCer,
 *  para que el asesor siempre reciba el mismo formato ordenado.
 * ══════════════════════════════════════════════════════════════════
 */

import { GENERAL_FAQS, SERVICES, getService } from "./site-config";
import { GENERAL_FAQS_EN, SERVICES_EN } from "./content-en";

export type QuoteLang = "es" | "en";

/** Etiquetas del brief en cada idioma */
export const QUOTE_LABELS = {
  es: {
    intro: "Hola, SPC Impresores. Me gustaría cotizar un proyecto de impresión.",
    name: "Nombre",
    company: "Empresa",
    service: "Servicio",
    qty: "Cantidad",
    date: "Fecha objetivo",
    city: "Ciudad de entrega",
    extras: "Extras",
    comments: "Comentarios",
    units: "unidades",
    thanks: "¡Gracias!",
    spencer: "(Brief preparado con SPenCer, el asistente del sitio web)",
  },
  en: {
    intro: "Hi SPC Impresores. I'd like a quote for a printing project.",
    name: "Name",
    company: "Company",
    service: "Service",
    qty: "Quantity",
    date: "Target date",
    city: "Delivery city",
    extras: "Extras",
    comments: "Comments",
    units: "units",
    thanks: "Thank you!",
    spencer: "(Brief prepared with SPenCer, the website assistant)",
  },
} as const;

export function serviceTitle(id: string | undefined, lang: QuoteLang): string | undefined {
  if (!id) return undefined;
  return lang === "en" ? SERVICES_EN[id]?.title : getService(id)?.title;
}

export type QuoteBrief = {
  name?: string;
  company?: string;
  serviceId?: string;
  quantity?: string;
  deadline?: string;
  city?: string;
  extras?: string[];
  comments?: string;
};

const dash = (v?: string) => (v && v.trim() ? v.trim() : "—");

export function buildQuoteMessage(b: QuoteBrief, source: "form" | "spencer" = "form", lang: QuoteLang = "es"): string {
  const L = QUOTE_LABELS[lang];
  const service = serviceTitle(b.serviceId, lang);
  const lines = [
    L.intro,
    "",
    `${L.name}: ${dash(b.name)}`,
    `${L.company}: ${dash(b.company)}`,
    `${L.service}: ${dash(service)}`,
    `${L.qty}: ${dash(b.quantity)}`,
    `${L.date}: ${dash(b.deadline)}`,
    `${L.city}: ${dash(b.city)}`,
    `${L.extras}: ${b.extras && b.extras.length ? b.extras.join(", ") : "—"}`,
    `${L.comments}: ${dash(b.comments)}`,
    "",
    source === "spencer" ? L.spencer : L.thanks,
  ];
  return lines.join("\n");
}

/** Formatea una fecha ISO (yyyy-mm-dd) a "12 nov 2026" en español */
export function formatDateEs(iso: string, lang: QuoteLang = "es"): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(lang === "en" ? "en-US" : "es-BO", { day: "numeric", month: "short", year: "numeric" });
}

/* ────────────────────────────────────────────────────────────────
   Respuestas locales de SPenCer (sin red): si la API de IA no está
   disponible, SPenCer sigue respondiendo con las FAQ oficiales.
   ──────────────────────────────────────────────────────────────── */
const norm = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ ]/g, " ");

export function localAnswer(question: string, lang: QuoteLang = "es"): string {
  const en = lang === "en";
  const q = norm(question);
  const words = q.split(/\s+/).filter((w) => w.length > 3);

  // ¿pregunta por un servicio concreto?
  const svcBase = SERVICES.find((s) =>
    norm(`${s.title} ${s.shortTitle} ${SERVICES_EN[s.id]?.title ?? ""} ${SERVICES_EN[s.id]?.shortTitle ?? ""}`)
      .split(/\s+/)
      .some((w) => w.length > 4 && q.includes(w))
  );
  if (svcBase) {
    const svc = en ? { ...svcBase, ...SERVICES_EN[svcBase.id] } : svcBase;
    return en
      ? `**${svc.title}**: ${svc.description}\n\n- Minimum run: ${svc.minRun}\n- Production: ${svc.turnaround}\n\n💡 ${svc.insight}\n\nIf you like, let's build your quote right now: pick the options below.`
      : `**${svc.title}**: ${svc.description}\n\n- Tiraje mínimo: ${svc.minRun}\n- Producción: ${svc.turnaround}\n\n💡 ${svc.insight}\n\nSi quieres, armamos tu cotización ahora mismo: elige las opciones de abajo.`;
  }

  // mejor coincidencia en las FAQ oficiales
  let best: { a: string; score: number } = { a: "", score: 0 };
  for (const f of en ? GENERAL_FAQS_EN : GENERAL_FAQS) {
    const hay = norm(f.q + " " + f.a);
    const score = words.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
    if (score > best.score) best = { a: f.a, score };
  }
  if (best.score > 0)
    return en
      ? `${best.a}\n\nShall we continue with your quote? Pick an option below 👇`
      : `${best.a}\n\n¿Seguimos con tu cotización? Elige una opción de abajo 👇`;

  return en
    ? "Great question! To give you the exact answer, it's best for an advisor to review it with you. Meanwhile, let's build your brief: pick an option below and send it on **WhatsApp** in 60 seconds 👇"
    : "¡Buena pregunta! Para darte el dato exacto, lo mejor es que un asesor lo revise contigo. Mientras tanto, armemos tu brief: elige una opción de abajo y en 60 segundos lo envías por **WhatsApp** 👇";
}
