"use client";

/**
 * Datos del sitio en el idioma activo. Los componentes cliente usan
 * este hook en lugar de importar directamente las constantes de
 * site-config, así el conmutador ES/EN traduce todo el contenido.
 */

import { useMemo } from "react";
import { useI18n, type Lang } from "./i18n";
import {
  AI_RECEPTIONIST,
  BRAND,
  CLIENTS,
  CONTACT,
  FUNNEL,
  GENERAL_FAQS,
  NAV_LINKS,
  PROCESS_STEPS,
  SECTORS,
  SERVICES,
  STATS,
  TESTIMONIALS,
  WA_MESSAGES,
  type Client,
  type Service,
} from "./site-config";
import {
  AI_RECEPTIONIST_EN,
  BRAND_EN,
  CATEGORY_EN,
  CLIENT_NOTES_EN,
  CONTACT_EN,
  FUNNEL_EN,
  GALLERY_ALT_EN,
  GENERAL_FAQS_EN,
  NAV_LABELS_EN,
  PROCESS_STEPS_EN,
  SECTORS_EN,
  SECTOR_LABEL_EN,
  SERVICES_EN,
  STATS_EN,
  TESTIMONIALS_EN,
  TESTIMONIAL_COMPANY_EN,
  WA_MESSAGES_EN,
} from "./content-en";

export type LocalizedService = Service & { categoryLabel: string };
export type LocalizedClient = Client & { sectorLabel: string };

export function localizeService(s: Service, lang: Lang): LocalizedService {
  if (lang === "es") return { ...s, categoryLabel: s.category };
  const en = SERVICES_EN[s.id];
  return {
    ...s,
    ...en,
    categoryLabel: CATEGORY_EN[s.category],
    waMessage: WA_MESSAGES_EN.quote(en.title),
    gallery: s.gallery.map((g) => ({ ...g, alt: GALLERY_ALT_EN[g.src] ?? g.alt })),
  };
}

function buildContent(lang: Lang) {
  const en = lang === "en";
  const services = SERVICES.map((s) => localizeService(s, lang));
  const clients: LocalizedClient[] = CLIENTS.map((c) => ({
    ...c,
    note: en ? CLIENT_NOTES_EN[c.id] ?? c.note : c.note,
    sectorLabel: en ? SECTOR_LABEL_EN[c.sector] : c.sector,
  }));

  return {
    lang,
    services,
    getService: (id: string) => services.find((s) => s.id === id),
    clients,
    getClient: (id: string) => clients.find((c) => c.id === id),
    sectorLabel: (s: Client["sector"]) => (en ? SECTOR_LABEL_EN[s] : s),
    categoryLabel: (c: Service["category"]) => (en ? CATEGORY_EN[c] : c),
    brand: en ? { ...BRAND, ...BRAND_EN } : BRAND,
    contact: en ? { ...CONTACT, ...CONTACT_EN } : CONTACT,
    wa: en ? WA_MESSAGES_EN : WA_MESSAGES,
    testimonials: TESTIMONIALS.map((t) =>
      en
        ? { ...t, ...TESTIMONIALS_EN[t.id], company: TESTIMONIAL_COMPANY_EN[t.company] ?? t.company }
        : { ...t }
    ),
    faqs: en ? GENERAL_FAQS_EN : GENERAL_FAQS,
    process: PROCESS_STEPS.map((p) => (en ? { ...p, ...PROCESS_STEPS_EN[p.id] } : { ...p })),
    stats: STATS.map((s, i) => (en ? { ...s, ...STATS_EN[i] } : { ...s })),
    sectors: SECTORS.map((s) => (en ? { ...s, ...SECTORS_EN[s.id] } : { ...s })),
    nav: NAV_LINKS.map((n) => ({ ...n, label: en ? NAV_LABELS_EN[n.href] ?? n.label : n.label })),
    ai: en ? { ...AI_RECEPTIONIST, ...AI_RECEPTIONIST_EN } : AI_RECEPTIONIST,
    funnel: en ? { ...FUNNEL, ...FUNNEL_EN } : FUNNEL,
  };
}

export type SiteContent = ReturnType<typeof buildContent>;

export function useContent(): SiteContent {
  const { lang } = useI18n();
  return useMemo(() => buildContent(lang), [lang]);
}
