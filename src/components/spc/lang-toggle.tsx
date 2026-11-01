"use client";

/** Conmutador ES / EN con píldora deslizante */
import { motion } from "framer-motion";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Lang; label: string; aria: string }[] = [
  { value: "es", label: "ES", aria: "Español" },
  { value: "en", label: "EN", aria: "English" },
];

export function LangToggle({ dark = false, className, id = "nav" }: { dark?: boolean; className?: string; id?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div
      role="radiogroup"
      aria-label={lang === "en" ? "Language" : "Idioma"}
      className={cn(
        "relative flex h-9 items-center rounded-full p-1 text-[11.5px] font-extrabold tracking-[0.08em]",
        dark ? "bg-white/12 ring-1 ring-white/30 backdrop-blur-md" : "bg-spc-50 ring-1 ring-spc-600/15",
        className
      )}
    >
      {OPTIONS.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.aria}
            onClick={() => setLang(o.value)}
            className={cn(
              "relative z-10 h-7 w-9 rounded-full transition-colors duration-300",
              active ? "text-spc-900" : dark ? "text-white/75 hover:text-white" : "text-spc-700/70 hover:text-spc-700"
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 shadow-[0_4px_12px_-4px_rgba(255,179,28,0.7)]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
