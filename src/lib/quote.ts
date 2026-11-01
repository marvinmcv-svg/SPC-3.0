/**
 * ══════════════════════════════════════════════════════════════════
 *  Brief de cotización → mensaje de WhatsApp
 *  Compartido por el formulario "Cotiza en WhatsApp" y por SPenCer,
 *  para que el asesor siempre reciba el mismo formato ordenado.
 * ══════════════════════════════════════════════════════════════════
 */

import { GENERAL_FAQS, SERVICES, getService } from "./site-config";

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

export function buildQuoteMessage(b: QuoteBrief, source: "form" | "spencer" = "form"): string {
  const service = b.serviceId ? getService(b.serviceId)?.title : undefined;
  const lines = [
    "Hola, SPC Impresores. Me gustaría cotizar un proyecto de impresión.",
    "",
    `Nombre: ${dash(b.name)}`,
    `Empresa: ${dash(b.company)}`,
    `Servicio: ${dash(service)}`,
    `Cantidad: ${dash(b.quantity)}`,
    `Fecha objetivo: ${dash(b.deadline)}`,
    `Ciudad de entrega: ${dash(b.city)}`,
    `Extras: ${b.extras && b.extras.length ? b.extras.join(", ") : "—"}`,
    `Comentarios: ${dash(b.comments)}`,
    "",
    source === "spencer" ? "(Brief preparado con SPenCer, el asistente del sitio web)" : "¡Gracias!",
  ];
  return lines.join("\n");
}

/** Formatea una fecha ISO (yyyy-mm-dd) a "12 nov 2026" en español */
export function formatDateEs(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-BO", { day: "numeric", month: "short", year: "numeric" });
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

export function localAnswer(question: string): string {
  const q = norm(question);
  const words = q.split(/\s+/).filter((w) => w.length > 3);

  // ¿pregunta por un servicio concreto?
  const svc = SERVICES.find((s) =>
    norm(`${s.title} ${s.shortTitle}`)
      .split(/\s+/)
      .some((w) => w.length > 4 && q.includes(w))
  );
  if (svc) {
    return `**${svc.title}**: ${svc.description}\n\n- Tiraje mínimo: ${svc.minRun}\n- Producción: ${svc.turnaround}\n\n💡 ${svc.insight}\n\nSi quieres, armamos tu cotización ahora mismo: elige las opciones de abajo.`;
  }

  // mejor coincidencia en las FAQ oficiales
  let best: { a: string; score: number } = { a: "", score: 0 };
  for (const f of GENERAL_FAQS) {
    const hay = norm(f.q + " " + f.a);
    const score = words.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
    if (score > best.score) best = { a: f.a, score };
  }
  if (best.score > 0) return `${best.a}\n\n¿Seguimos con tu cotización? Elige una opción de abajo 👇`;

  return "¡Buena pregunta! Para darte el dato exacto, lo mejor es que un asesor lo revise contigo. Mientras tanto, armemos tu brief: elige una opción de abajo y en 60 segundos lo envías por **WhatsApp** 👇";
}
