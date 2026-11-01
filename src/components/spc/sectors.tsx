"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SECTORES — industrias atendidas con tarjetas glossy
 * ══════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import { UtensilsCrossed, Pill, BookOpen, ShoppingBag, Building2, Megaphone } from "lucide-react";
import { waLink } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n";
import { useContent } from "@/lib/use-content";
import { Reveal, WordsReveal, Eyebrow, TiltCard } from "./motion-primitives";
import { WhatsAppIcon } from "./whatsapp-cta";

const ICONS = [UtensilsCrossed, Pill, BookOpen, ShoppingBag, Building2, Megaphone] as const;

export function Sectors() {
  const { t } = useI18n();
  const { sectors: SECTORS, wa } = useContent();
  return (
    <section
      id="sectores"
      className="relative overflow-hidden bg-spc-50 py-24 sm:py-32"
      aria-label={t("Sectores que atendemos", "Sectors we serve")}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t("Sectores", "Sectors")}</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
            <WordsReveal text={t("Industrias que", "Industries we")} />{" "}
            <WordsReveal text={t("imprimimos todos los días", "print for every day")} wordClassName="text-gradient-spc" delay={0.14} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-spc-900/65">
              {t("Cada sector tiene normas distintas. Nosotros ya las conocemos:", "Every sector has its own standards. We already know them:")}{" "}
              <strong className="font-semibold text-spc-800">
                {t(
                  "cuéntanos a qué industria perteneces y llegamos con la solución correcta.",
                  "tell us your industry and we'll come back with the right solution."
                )}
              </strong>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={sector.id} delay={(i % 3) * 0.1} y={36}>
                <TiltCard maxTilt={7} scale={1.02} className="h-full">
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="glossy-card flex h-full items-center gap-4 rounded-[1.4rem] p-5 sm:p-6"
                  >
                    <span className="depth-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-spc-600 to-spc-800 shadow-[0_10px_24px_-10px_rgba(0,60,141,0.6)] transition-shadow duration-500 group-hover:shadow-[0_14px_32px_-10px_rgba(0,60,141,0.7)]">
                      <Icon className="h-5.5 w-5.5 text-white" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[15.5px] font-bold leading-tight text-spc-900">
                        {sector.label}
                      </h3>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-spc-900/60">
                        {sector.detail}
                      </p>
                    </div>
                  </motion.article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* línea de funnel */}
        <Reveal delay={0.15} className="mt-12">
          <p className="mx-auto max-w-xl text-center text-[14px] leading-relaxed text-spc-900/60">
            {t("¿Tu industria no está en la lista? Igual podemos imprimirlo.", "Industry not on the list? We can still print it.")}{" "}
            <a
              href={waLink(wa.services)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full py-1.5 font-bold text-spc-600 underline decoration-gold-500/60 decoration-2 underline-offset-4 transition-colors hover:text-spc-800"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t("Cuéntanos tu caso", "Tell us about your case")}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
