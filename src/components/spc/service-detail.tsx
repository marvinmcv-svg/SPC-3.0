"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SERVICE DETAIL — "página profunda" de cada servicio en un dialog
 *  premium estilo Apple: imagen, specs, casos de uso, mini FAQ y CTA
 *  de WhatsApp con mensaje precargado del servicio.
 * ══════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Sparkles,
  Layers,
  ClipboardCheck,
  PackageCheck,
  Timer,
  Hash,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES, waLink, type Service } from "@/lib/site-config";
import { WhatsAppIcon } from "./whatsapp-cta";

/** Abre el detalle de un servicio desde cualquier parte (hero, footer…) */
export function openServiceDetail(serviceId: string) {
  window.dispatchEvent(new CustomEvent("spc:service-detail", { detail: serviceId }));
}

/** Evento global → estado interno. Colocar UNA vez en la página. */
export function ServiceDetail() {
  const [serviceId, setServiceId] = useState<string | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => setServiceId((e as CustomEvent<string>).detail);
    window.addEventListener("spc:service-detail", onOpen);
    return () => window.removeEventListener("spc:service-detail", onOpen);
  }, []);

  const service = SERVICES.find((s) => s.id === serviceId) ?? null;

  return (
    <Dialog open={!!service} onOpenChange={(o) => !o && setServiceId(null)}>
      {service && <ServiceDetailBody key={service.id} service={service} />}
    </Dialog>
  );
}

function ServiceDetailBody({ service }: { service: Service }) {
  return (
    <DialogContent
      className="nice-scrollbar max-h-[92svh] gap-0 overflow-y-auto rounded-[1.8rem] border-spc-900/10 bg-white p-0 shadow-[0_60px_140px_-40px_rgba(6,15,46,0.6)] sm:max-w-4xl sm:rounded-[2rem]"
    >
      {/* ── Cabecera visual ── */}
      <div className="relative h-[240px] w-full overflow-hidden sm:h-[300px]">
        <Image
          src={service.image}
          alt={`${service.title} — producción de SPC`}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-spc-950/95 via-spc-950/45 to-spc-950/10"
        />
        <motion.div
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 p-6 sm:p-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold-300 ring-1 ring-white/25 backdrop-blur-md">
            <Sparkles className="h-3 w-3" aria-hidden />
            {service.category}
          </span>
          <h3 className="font-display mt-3 text-[clamp(1.5rem,3.4vw,2.3rem)] font-extrabold leading-tight tracking-tight text-white">
            {service.title}
          </h3>
        </motion.div>
      </div>

      {/* ── Cuerpo ── */}
      <div className="px-6 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-7">
        <DialogHeader className="space-y-0 text-left">
          <DialogTitle className="sr-only">{service.title} — detalle del servicio</DialogTitle>
          <DialogDescription className="text-[14.5px] leading-relaxed text-spc-900/70">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        {/* chips operativos */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl bg-spc-50 p-4 ring-1 ring-spc-600/10">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-spc-600/10 text-spc-600">
              <Hash className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-spc-500">Tiraje mínimo</p>
              <p className="mt-0.5 truncate text-[13.5px] font-semibold text-spc-900">{service.minRun}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-gold-100/70 p-4 ring-1 ring-gold-600/20">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-700">
              <Timer className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#856629]">Tiempo de producción</p>
              <p className="mt-0.5 truncate text-[13.5px] font-semibold text-spc-900">{service.turnaround}</p>
            </div>
          </div>
        </div>

        {/* dato educativo */}
        <div className="mt-5 flex gap-3.5 rounded-2xl bg-gradient-to-br from-spc-900 to-spc-800 p-5 text-white">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 ring-1 ring-gold-500/40">
            <Lightbulb className="h-5 w-5 text-gold-400" aria-hidden />
          </span>
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-300">Aprende algo nuevo</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/85">{service.insight}</p>
          </div>
        </div>

        {/* specs + casos de uso */}
        <div className="mt-7 grid gap-7 lg:grid-cols-[1.25fr_1fr]">
          <section aria-labelledby={`specs-${service.id}`}>
            <h4 className="flex items-center gap-2.5 font-display text-[15px] font-bold text-spc-900">
              <Layers className="h-4.5 w-4.5 text-spc-600" aria-hidden />
              <span id={`specs-${service.id}`}>Especificaciones técnicas</span>
            </h4>
            <ul className="mt-4 space-y-2.5">
              {service.specs.map((spec, i) => (
                <motion.li
                  key={spec}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                  className="flex items-start gap-3 rounded-xl bg-spc-50/70 px-4 py-3 text-[13px] leading-relaxed text-spc-900/80 ring-1 ring-spc-600/5"
                >
                  <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-spc-500" aria-hidden />
                  {spec}
                </motion.li>
              ))}
            </ul>
          </section>

          <section aria-labelledby={`uses-${service.id}`}>
            <h4 className="flex items-center gap-2.5 font-display text-[15px] font-bold text-spc-900">
              <PackageCheck className="h-4.5 w-4.5 text-spc-600" aria-hidden />
              <span id={`uses-${service.id}`}>¿Para qué se usa?</span>
            </h4>
            <ul className="mt-4 space-y-2.5">
              {service.useCases.map((uc, i) => (
                <motion.li
                  key={uc}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.45 }}
                  className="rounded-xl bg-gradient-to-br from-gold-100/80 to-gold-500/10 px-4 py-3 text-[13px] leading-relaxed text-spc-900/85 ring-1 ring-gold-600/15"
                >
                  {uc}
                </motion.li>
              ))}
            </ul>

            {/* CTA intermedio */}
            <a
              href={waLink(service.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="shine group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_34px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-4.5 w-4.5" />
              Cotizar {service.shortTitle.toLowerCase()} por WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </section>
        </div>

        {/* mini FAQ del servicio */}
        <section aria-labelledby={`faq-${service.id}`} className="mt-8">
          <h4 className="font-display text-[15px] font-bold text-spc-900" id={`faq-${service.id}`}>
            Preguntas frecuentes de este servicio
          </h4>
          <Accordion type="single" collapsible className="mt-3.5 space-y-2.5">
            {service.deepFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${service.id}-${i}`}
                className="overflow-hidden rounded-2xl border-none bg-spc-50/80 ring-1 ring-spc-600/10 data-[state=open]:bg-spc-50"
              >
                <AccordionTrigger className="px-5 py-4 text-left text-[13.5px] font-bold text-spc-800 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-[13px] leading-relaxed text-spc-900/70">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* cierre del funnel */}
        <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-spc-900 to-spc-700 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="font-display text-[15.5px] font-bold text-white">
              ¿Te imaginaste tu proyecto en esta línea?
            </p>
            <p className="mt-1 text-[12.5px] text-white/70">
              Un asesor especializado te responde hoy mismo — asesoría y cotización gratuitas.
            </p>
          </div>
          <a
            href={waLink(service.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="shine inline-flex shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-6 py-3 text-[13.5px] font-bold text-spc-900 shadow-[0_10px_30px_-8px_rgba(255,179,28,0.6)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir cotización
          </a>
        </div>
      </div>
    </DialogContent>
  );
}
