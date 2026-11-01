"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  PRUEBA SOCIAL
 *  • TrustBar: banda de logos de clientes justo debajo del hero
 *  • ProductWall: muro infinito de PRODUCTO REAL de marcas cliente,
 *    agrupado por línea de servicio (cada tarjeta lleva a su página)
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useContent } from "@/lib/use-content";
import { cn } from "@/lib/utils";
import { CharReveal, Counter, Eyebrow, Reveal, WordsReveal } from "./motion-primitives";
import { LogoMarquee } from "./client-logo";

/* ── Banda de confianza con logos ── */
export function TrustBar() {
  const { t } = useI18n();
  const { clients } = useContent();
  const withLogo = clients.filter((c) => c.logo);
  const rest = clients.filter((c) => !c.logo);
  return (
    <section aria-label={t("Marcas que confían en SPC", "Brands that trust SPC")} className="relative bg-white pb-4 pt-12 sm:pt-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal y={16}>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-spc-500">
            <BadgeCheck className="h-4 w-4 text-gold-600" aria-hidden />
            {t("Marcas líderes de Bolivia imprimen con SPC", "Bolivia's leading brands print with SPC")}
            <span className="text-spc-300">· {clients.length}+ {t("clientes", "clients")}</span>
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="mt-5">
        <LogoMarquee clients={[...withLogo, ...rest]} fade="from-white" />
      </Reveal>
    </section>
  );
}

/* ── Muro de producto real ── */
type WallItem = { src: string; alt: string; brand: string; serviceId: string; serviceTitle: string };

function ProductCard({ item }: { item: WallItem }) {
  return (
    <Link
      href={`/servicios/${item.serviceId}`}
      className="group relative block w-[200px] shrink-0 overflow-hidden rounded-[1.4rem] bg-white shadow-[0_18px_40px_-22px_rgba(6,15,46,0.45)] ring-1 ring-spc-900/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(6,15,46,0.55)] sm:w-[230px]"
    >
      <span className="relative block aspect-square">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="230px"
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </span>
      <span className="flex items-center justify-between gap-2 border-t border-spc-900/6 bg-spc-50/60 px-3.5 py-2.5">
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-extrabold text-spc-900">{item.brand}</span>
          <span className="block truncate text-[10.5px] font-semibold uppercase tracking-[0.1em] text-spc-400">
            {item.serviceTitle}
          </span>
        </span>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-spc-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-spc-600"
          aria-hidden
        />
      </span>
    </Link>
  );
}

function WallRow({ items, reverse = false }: { items: WallItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden py-3">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-spc-50 to-transparent sm:w-40" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-spc-50 to-transparent sm:w-40" />
      <div
        className={cn(
          "flex w-max gap-5 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee-slow"
        )}
      >
        {doubled.map((it, i) => (
          <div key={`${it.src}-${i}`} aria-hidden={i >= items.length ? true : undefined}>
            <ProductCard item={it} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductWall() {
  const { t } = useI18n();
  const { services, clients } = useContent();

  const items = useMemo<WallItem[]>(() => {
    const seen = new Set<string>();
    const out: WallItem[] = [];
    for (const s of services) {
      for (const g of s.gallery) {
        if (!g.brand || seen.has(g.src)) continue;
        seen.add(g.src);
        out.push({ src: g.src, alt: g.alt, brand: g.brand, serviceId: s.id, serviceTitle: s.shortTitle });
      }
    }
    return out;
  }, [services]);

  /* intercalado para que cada fila mezcle marcas y líneas */
  const rowA = items.filter((_, i) => i % 2 === 0);
  const rowB = items.filter((_, i) => i % 2 === 1);
  const brandCount = new Set(items.map((i) => i.brand.split(" · ")[0])).size;

  const stats = [
    { value: items.length, suffix: "", label: t("Productos reales en esta página", "Real products on this page") },
    { value: clients.length, suffix: "+", label: t("Marcas cliente", "Client brands") },
    { value: 9, suffix: "", label: t("Departamentos con entregas", "Departments we deliver to") },
    { value: new Date().getFullYear() - 2001, suffix: "", label: t("Años imprimiendo Bolivia", "Years printing Bolivia") },
  ];

  return (
    <section
      id="producto-real"
      aria-label={t("Producto real impreso para marcas bolivianas", "Real products printed for Bolivian brands")}
      className="relative overflow-hidden bg-spc-50 py-24 sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-gold-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t("Producto real · no maquetas", "Real products · not mock-ups")}</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-spc-900">
            <CharReveal text={t("Lo ves en el súper,", "You see it at the store,")} stagger={0.018} />{" "}
            <WordsReveal text={t("en la farmacia y en el kiosco.", "the pharmacy and the newsstand.")} wordClassName="text-gradient-spc" delay={0.14} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-spc-900/65">
              {t(
                `Estuches, envases, revistas y libros de ${brandCount} marcas que los bolivianos usan todos los días. Toca cualquier producto para ver la línea de servicio.`,
                `Cartons, packs, magazines and books from ${brandCount} brands Bolivians use every day. Tap any product to see its service line.`
              )}
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15} className="relative mt-12">
        <WallRow items={rowA} />
        <WallRow items={rowB} reverse />
      </Reveal>

      <div className="relative mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 px-5 sm:grid-cols-4 sm:px-8">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08} y={20}>
            <div className="rounded-2xl bg-white px-5 py-4 text-center shadow-[0_14px_34px_-24px_rgba(6,15,46,0.5)] ring-1 ring-spc-900/6">
              <p className="font-display text-[28px] font-extrabold leading-none text-gradient-spc">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-spc-900/55">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
