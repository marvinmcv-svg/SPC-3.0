"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  I18N — sistema bilingüe ES/EN del sitio SPC
 * ══════════════════════════════════════════════════════════════════
 *  - LangProvider: raíz de la app; persiste el idioma en localStorage
 *    vía useSyncExternalStore (hidratación segura, sin flashes)
 *  - useT(): traduce literales de UI en línea: t(L("Inicio", "Home"))
 *  - useSiteData(): datos completos del sitio en el idioma activo
 *  - LangToggle: pill ES/EN reutilizable (navbar + menú móvil)
 * ══════════════════════════════════════════════════════════════════
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_ES, type SiteData } from "./site-config";
import { SITE_EN } from "./site-config-en";

export type Lang = "es" | "en";

/** Texto bilingüe en línea. Uso: t(L("Inicio", "Home")) */
export type LText = { es: string; en: string };
export const L = (es: string, en: string): LText => ({ es, en });

const LANG_KEY = "spc-lang";
const LANG_EVENT = "spc-lang-change";

/* ── Store externo del idioma (localStorage + evento) ── */

function subscribe(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LANG_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "es") return saved;
    const nav = navigator.language?.toLowerCase() ?? "es";
    return nav.startsWith("en") ? "en" : "es";
  } catch {
    return "es";
  }
}

function getServerSnapshot(): Lang {
  return "es";
}

function writeLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new Event(LANG_EVENT));
}

/* ── Contexto ── */

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangCtx>({
  lang: "es",
  setLang: () => {},
  toggle: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

/** Traductor de literales UI: const t = useT(); t(L("Ver", "View")) */
export function useT() {
  const { lang } = useLang();
  return useCallback((l: LText) => l[lang], [lang]);
}

/** Datos del sitio (SERVICES, CLIENTS, FAQs…) en el idioma activo */
export function useSiteData(): SiteData {
  const { lang } = useLang();
  return useMemo(() => (lang === "en" ? SITE_EN : SITE_ES), [lang]);
}

export function LangProvider({ children }: { children: ReactNode }) {
  /* Store externo: hidrata sin mismatch y sin setState-in-effect */
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* Mantiene <html lang> sincronizado (accesibilidad + SEO) */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => writeLang(l), []);

  const toggle = useCallback(() => {
    writeLang(getSnapshot() === "es" ? "en" : "es");
  }, []);

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/* ─── Toggle ES/EN — dos presentaciones según fondo del navbar ──── */

export function LangToggle({ solid = true, compact = false }: { solid?: boolean; compact?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label={lang === "es" ? "Cambiar idioma" : "Switch language"}
      className={cn(
        "flex items-center gap-0.5 rounded-full p-1 transition-colors",
        compact ? "" : "h-11",
        solid
          ? "bg-spc-100/80 ring-1 ring-spc-600/15"
          : "bg-white/10 ring-1 ring-white/25 backdrop-blur-md"
      )}
    >
      <Globe
        className={cn("ml-1.5 shrink-0", compact ? "h-3.5 w-3.5" : "h-4 w-4", solid ? "text-spc-600" : "text-white/80")}
        aria-hidden
      />
      {(["es", "en"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={cn(
              "rounded-full font-bold uppercase tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
              compact ? "px-2.5 py-1 text-[11px]" : "px-2.5 py-1.5 text-[11.5px]",
              active
                ? "bg-gradient-to-r from-spc-700 to-spc-500 text-white shadow-[0_4px_12px_-4px_rgba(0,60,141,0.55)]"
                : solid
                  ? "text-spc-700/70 hover:text-spc-700"
                  : "text-white/65 hover:text-white"
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
