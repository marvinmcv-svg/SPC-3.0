"use client";

/** CONTACTO — tarjetas glossy de canales + mapa de la planta */

import { Phone, Mail, MapPin, Clock3 } from "lucide-react";
import { CONTACT, WA_MESSAGES, waLink } from "@/lib/site-config";
import { CharReveal, Eyebrow, GlossyCard, ImageReveal, Reveal, Stagger, StaggerItem } from "./motion-primitives";
import { WhatsAppIcon } from "./whatsapp-cta";

const CHANNELS = [
  { icon: WhatsAppIcon, label: "WhatsApp comercial", value: CONTACT.whatsapp, href: waLink(WA_MESSAGES.general), external: true, highlight: true },
  { icon: Phone, label: "Teléfono planta", value: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: Mail, label: "Correo", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Clock3, label: "Horario", value: CONTACT.hours },
] as const;

export function ContactInfo() {
  return (
    <section className="bg-gradient-to-b from-spc-50 to-white py-20 sm:py-28" aria-label="Datos de contacto">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <Eyebrow>Canales directos</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(1.7rem,3.2vw,2.5rem)] font-extrabold tracking-tight text-spc-900">
            <CharReveal text="Estamos a un mensaje de distancia" />
          </h2>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            const body = (
              <GlossyCard dark={"highlight" in c && c.highlight} innerClassName="flex h-full flex-col gap-4 p-6">
                <span className={"highlight" in c && c.highlight ? "flex h-12 w-12 items-center justify-center rounded-2xl bg-wa text-white shadow-[0_10px_24px_-8px_rgba(37,211,102,0.8)]" : "flex h-12 w-12 items-center justify-center rounded-2xl bg-spc-600/10 text-spc-600"}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className={"highlight" in c && c.highlight ? "text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300" : "text-[11px] font-bold uppercase tracking-[0.18em] text-spc-500"}>{c.label}</p>
                  <p className={"highlight" in c && c.highlight ? "font-display mt-1.5 break-words text-[17px] font-bold text-white" : "font-display mt-1.5 break-words text-[15px] font-bold text-spc-900"}>{c.value}</p>
                </div>
              </GlossyCard>
            );
            return (
              <StaggerItem key={c.label}>
                {"href" in c && c.href ? (
                  <a href={c.href} target={"external" in c ? "_blank" : undefined} rel={"external" in c ? "noopener noreferrer" : undefined} className="block h-full">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <GlossyCard innerClassName="flex h-full flex-col justify-between gap-6 p-7">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-700">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-spc-500">Planta y oficinas</p>
                <p className="font-display mt-2 text-[20px] font-bold leading-snug text-spc-900">{CONTACT.addressFull}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-spc-900/60">
                  ¿Quieres ver muestras físicas o validar una prueba de color en persona? Agenda tu visita por
                  WhatsApp y te recibimos en planta.
                </p>
              </div>
              <ImageReveal src="/images/site/spc-building.jpg" alt="Edificio de SPC Impresores en Miraflores, La Paz" className="aspect-[16/10] rounded-[1.4rem]" sizes="(max-width:1024px) 100vw, 40vw" />
            </GlossyCard>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glossy-card h-full min-h-[380px] overflow-hidden rounded-[1.6rem] p-2">
              <iframe
                title="Mapa: SPC Impresores, Av. Saavedra 2411, Miraflores, La Paz"
                src="https://maps.google.com/maps?q=Av.%20Saavedra%202411%2C%20Miraflores%2C%20La%20Paz%2C%20Bolivia&z=16&output=embed"
                className="h-full min-h-[364px] w-full rounded-[1.2rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
