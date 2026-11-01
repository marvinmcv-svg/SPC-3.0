"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  PÁGINA DE SERVICIO — /servicios/[id]
 *  Hero · galería 3D de producto real · dato clave · especificaciones
 *  · casos de uso · marcas cliente · FAQ · otros servicios · cotizador
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ClipboardCheck, Hash, Timer, PackageCheck, Layers } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { waLink, type Service } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n";
import { useContent } from "@/lib/use-content";
import { cn } from "@/lib/utils";
import { PageHero } from "./page-hero";
import { WhatsappCta } from "./whatsapp-cta";
import { CharReveal, Eyebrow, GlossyCard, Reveal, ScrollHighlight, Stagger, StaggerItem, TiltCard } from "./motion-primitives";
import { ClientLogo } from "./client-logo";
import { ServiceCard } from "./services";
import { QuoteBuilder } from "./quote-builder";
import { openSpencer } from "./spencer";
import { SpencerAvatar } from "./spencer-avatar";

function Gallery({ service }: { service: Service }) {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const n = service.gallery.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  const img = service.gallery[i];

  useEffect(() => {
    if (n < 2) return;
    const id = window.setInterval(() => go(1), 5000);
    return () => window.clearInterval(id);
  }, [go, n, i]);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
      <TiltCard maxTilt={6} scale={1.01}>
        <div className="glossy-card overflow-hidden rounded-[2rem] p-2.5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 1.08, rotateY: 12 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.96, rotateY: -12 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1200 }}
                className="absolute inset-0"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={cn(img.brand ? "object-contain p-8 sm:p-12" : "object-cover")}
                />
              </motion.div>
            </AnimatePresence>
            {img.brand && (
              <span className="absolute left-4 top-4 rounded-full bg-spc-950/85 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-300 backdrop-blur-md">
                {t("Producto real", "Real product")} · {img.brand}
              </span>
            )}
            {n > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label={t("Imagen anterior", "Previous image")} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-spc-800 shadow-lg backdrop-blur-md transition hover:scale-105">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={t("Imagen siguiente", "Next image")} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-spc-800 shadow-lg backdrop-blur-md transition hover:scale-105">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <p className="px-3 pb-1.5 pt-3 text-[12.5px] font-medium text-spc-900/60">
            {img.alt}
            {img.credit && <span className="block text-[10.5px] text-spc-900/40">{img.credit}</span>}
          </p>
        </div>
      </TiltCard>

      <div>
        <Eyebrow>{t("Galería de producto", "Product gallery")}</Eyebrow>
        <h2 className="font-display mt-4 text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-spc-900">
          <CharReveal text={t("Así se ve", "This is how it looks")} /> <CharReveal text={t("en la vida real.", "in real life.")} charClassName="text-spc-600" delay={0.2} />
        </h2>
        <p className="mt-4 text-[14.5px] leading-relaxed text-spc-900/65">
          {t(
            "Producto real de marcas que imprimen esta línea con nosotros. Toca una miniatura para verla en grande.",
            "Real products from brands that print this line with us. Tap a thumbnail to see it larger."
          )}
        </p>
        <Stagger className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3" stagger={0.06}>
          {service.gallery.map((g, k) => (
            <StaggerItem key={g.src}>
              <button
                type="button"
                onClick={() => setI(k)}
                aria-label={`${t("Ver", "View")} ${g.alt}`}
                aria-current={k === i}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-2xl bg-white ring-2 transition-all duration-300 hover:-translate-y-1",
                  k === i ? "ring-gold-500 shadow-[0_14px_30px_-12px_rgba(255,179,28,0.6)]" : "ring-spc-900/8"
                )}
              >
                <Image src={g.src} alt="" fill sizes="120px" className={cn(g.brand ? "object-contain p-2" : "object-cover")} />
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

export function ServicePage({ service: base }: { service: Service }) {
  const { t } = useI18n();
  const { services: SERVICES, getService, getClient } = useContent();
  const service = getService(base.id) ?? { ...base, categoryLabel: base.category };
  const brands = service.brands.map(getClient).filter(Boolean);
  const related = SERVICES.filter((s) => s.id !== service.id && s.category === service.category)
    .concat(SERVICES.filter((s) => s.category !== service.category))
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.categoryLabel}
        title={service.title}
        description={service.description}
        image={service.image}
        crumbs={[{ href: "/servicios", label: t("Servicios", "Services") }, { label: service.shortTitle }]}
      >
        <div className="flex flex-wrap items-center gap-3.5">
          <WhatsappCta href={waLink(service.waMessage)} variant="gold" size="lg" arrow>
            {t("Cotizar", "Quote")} {service.shortTitle.toLowerCase()}
          </WhatsappCta>
          <button
            type="button"
            onClick={() => openSpencer(service.id)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 py-2 pl-2 pr-6 text-[15px] font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/20"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-spc-800 ring-1 ring-gold-400/50">
              <SpencerAvatar className="h-8 w-8" />
            </span>
            {t("Armar brief con SPenCer", "Build a brief with SPenCer")}
          </button>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <span className="glass-dark inline-flex items-center gap-2.5 rounded-2xl px-4 py-3 text-[13px] text-white/85">
            <Hash className="h-4 w-4 text-gold-400" aria-hidden /> {t("Tiraje mínimo", "Minimum run")}: <strong className="text-white">{service.minRun}</strong>
          </span>
          <span className="glass-dark inline-flex items-center gap-2.5 rounded-2xl px-4 py-3 text-[13px] text-white/85">
            <Timer className="h-4 w-4 text-gold-400" aria-hidden /> {t("Producción", "Production")}: <strong className="text-white">{service.turnaround}</strong>
          </span>
        </div>
      </PageHero>

      {/* galería */}
      <section className="bg-gradient-to-b from-spc-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Gallery service={service} />
        </div>
      </section>

      {/* dato clave — se enciende con el scroll */}
      <section className="relative overflow-hidden bg-spc-950 py-24 sm:py-32">
        <div aria-hidden className="aurora left-1/4 top-0 h-[380px] w-[380px] bg-spc-500/40" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">💡 {t("¿Sabías que…?", "Did you know?")}</p>
          <ScrollHighlight
            key={service.insight}
            text={service.insight}
            className="font-display mt-6 text-[clamp(1.6rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-tight text-white"
          />
        </div>
      </section>

      {/* especificaciones + usos */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Eyebrow>{t("Especificaciones", "Specifications")}</Eyebrow>
            <h2 className="font-display mt-4 flex items-center gap-3 text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold tracking-tight text-spc-900">
              <Layers className="h-7 w-7 text-spc-600" aria-hidden />
              <CharReveal text={t("Lo técnico, explicado", "The technical side, explained")} />
            </h2>
            <Stagger className="mt-7 space-y-3" stagger={0.08}>
              {service.specs.map((spec, k) => (
                <StaggerItem key={spec}>
                  <GlossyCard maxTilt={4} innerClassName="flex items-start gap-4 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-spc-500 to-spc-800 font-display text-[13px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                      {String(k + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1.5 text-[14px] leading-relaxed text-spc-900/80">{spec}</p>
                  </GlossyCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <Eyebrow>{t("Casos de uso", "Use cases")}</Eyebrow>
            <h2 className="font-display mt-4 flex items-center gap-3 text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold tracking-tight text-spc-900">
              <PackageCheck className="h-7 w-7 text-spc-600" aria-hidden />
              <CharReveal text={t("¿Para qué se usa?", "What is it used for?")} />
            </h2>
            <Stagger className="mt-7 space-y-3" stagger={0.1}>
              {service.useCases.map((uc) => (
                <StaggerItem key={uc}>
                  <GlossyCard dark maxTilt={5} innerClassName="flex items-center gap-4 p-5">
                    <ClipboardCheck className="h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                    <p className="text-[14px] leading-relaxed text-white/90">{uc}</p>
                  </GlossyCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* marcas */}
      {brands.length > 0 && (
        <section className="border-y border-spc-900/5 bg-spc-50/60 py-16">
          <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-spc-500">{t("Marcas que imprimen esta línea con SPC", "Brands that print this line with SPC")}</p>
            <Stagger className="mt-8 flex flex-wrap items-center justify-center gap-4" stagger={0.08}>
              {brands.map((c) => (
                <StaggerItem key={c!.id}>
                  <TiltCard maxTilt={10} scale={1.05} glare={false}>
                    <ClientLogo client={c!} size="lg" />
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* FAQ del servicio */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center">
            <Eyebrow>{t("Preguntas frecuentes", "FAQ")}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold tracking-tight text-spc-900">
              <CharReveal text={t("Lo que más nos preguntan", "What people ask us most")} />
            </h2>
          </div>
          <Reveal className="mt-9">
            <Accordion type="single" collapsible className="space-y-3">
              {service.deepFaqs.map((faq, k) => (
                <AccordionItem key={faq.q} value={`f-${k}`} className="glossy-card overflow-hidden rounded-2xl border-none">
                  <AccordionTrigger className="px-6 py-5 text-left text-[15px] font-bold text-spc-800 hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-[14px] leading-relaxed text-spc-900/70">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <QuoteBuilder defaultServiceId={service.id} />

      {/* otros servicios */}
      <section className="bg-gradient-to-b from-white to-spc-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <Eyebrow>{t("Sigue explorando", "Keep exploring")}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold tracking-tight text-spc-900">
              <CharReveal text={t("Otras líneas que te pueden servir", "Other lines you might need")} />
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, k) => (
              <ServiceCard key={s.id} service={s} index={k} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
