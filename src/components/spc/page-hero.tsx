"use client";

/**
 * PAGE HERO — cabecera oscura de las páginas internas: imagen con
 * parallax + Ken Burns, migas de pan y titular letra por letra.
 */

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CharReveal } from "./motion-primitives";
import { pick, useI18n, type Localized } from "@/lib/i18n";

export function PageHero({
  eyebrow: eyebrowL,
  title: titleL,
  accent: accentL,
  description: descriptionL,
  image,
  crumbs = [],
  children,
}: {
  eyebrow: Localized;
  title: Localized;
  /** segunda línea del titular, en dorado */
  accent?: Localized;
  description?: Localized;
  image: string;
  crumbs?: { href?: string; label: Localized }[];
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();
  const eyebrow = pick(lang, eyebrowL);
  const title = pick(lang, titleL);
  const accent = accentL ? pick(lang, accentL) : undefined;
  const description = descriptionL ? pick(lang, descriptionL) : undefined;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-spc-950 pb-20 pt-36 sm:pb-24 sm:pt-44">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.08, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-spc-950/95 via-spc-950/80 to-spc-900/40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-spc-950 via-transparent to-spc-950/50" />
      <div aria-hidden className="aurora right-[-10%] top-10 h-[420px] w-[420px] bg-gold-500/20" />

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <motion.nav
          aria-label={t("Migas de pan", "Breadcrumb")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold text-white/55"
        >
          <Link href="/" className="hover:text-white">
            {t("Inicio", "Home")}
          </Link>
          {crumbs.map((c, k) => (
            <span key={k} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              {c.href ? (
                <Link href={c.href} className="hover:text-white">
                  {pick(lang, c.label)}
                </Link>
              ) : (
                <span className="text-gold-300">{pick(lang, c.label)}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-400"
        >
          <span className="h-px w-8 bg-gold-500/70" aria-hidden />
          {eyebrow}
        </motion.p>

        <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.3rem,6vw,4.6rem)] font-extrabold leading-[1.04] tracking-tight text-white">
          <span className="block">
            <CharReveal text={title} animateOnMount delay={0.4} stagger={0.025} />
          </span>
          {accent && (
            <span className="block">
              <CharReveal
                text={accent}
                animateOnMount
                delay={0.4 + title.length * 0.025}
                stagger={0.025}
                charClassName="text-gold-400 [text-shadow:0_0_40px_rgba(255,196,79,0.35)]"
              />
            </span>
          )}
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-white/72"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
