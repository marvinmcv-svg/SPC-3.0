"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  i18n — conmutador Español / English
 *  • Español es el idioma por defecto (render del servidor)
 *  • La elección se recuerda en localStorage y actualiza <html lang>
 *  • Uso: const { t, lang } = useI18n();  t("Hola", "Hello")
 * ══════════════════════════════════════════════════════════════════
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "es" | "en";

/** Texto que puede venir en un solo idioma o en ambos */
export type Localized = string | { es: string; en: string };

export function pick(lang: Lang, v: Localized): string {
  return typeof v === "string" ? v : v[lang];
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Devuelve el texto en el idioma activo */
  t: (es: string, en: string) => string;
};

const I18nContext = createContext<Ctx>({
  lang: "es",
  setLang: () => {},
  toggle: () => {},
  t: (es) => es,
});

const STORAGE_KEY = "spc-lang";

/* Pequeño store externo: la preferencia vive en localStorage y se lee
   con useSyncExternalStore (el servidor siempre renderiza en español). */
const listeners = new Set<() => void>();
let current: Lang | null = null;

function readStored(): Lang {
  if (current) return current;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    current = saved === "en" ? "en" : "es";
  } catch {
    current = "es"; /* almacenamiento bloqueado: seguimos en español */
  }
  return current;
}

function writeLang(l: Lang) {
  current = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* noop */
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStored, () => "es" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => writeLang(l), []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "es" ? "en" : "es"),
      t: (es: string, en: string) => (lang === "en" ? en : es),
    }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
