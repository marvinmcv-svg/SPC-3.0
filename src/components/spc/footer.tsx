"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  FOOTER — pegado al fondo (mt-auto en el layout de página)
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { Phone, Mail, MapPin, Clock3 } from "lucide-react";
import { CONTACT, waLink } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n";
import { useContent } from "@/lib/use-content";
import { WhatsAppIcon } from "./whatsapp-cta";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18n();
  const { brand: BRAND, nav: NAV_LINKS, services: SERVICES, wa, contact } = useContent();

  return (
    <footer className="relative mt-auto overflow-hidden bg-spc-950 text-white" role="contentinfo">
      {/* franja superior dorada */}
      <div aria-hidden className="h-[3px] w-full bg-gradient-to-r from-gold-700 via-gold-500 to-gold-300" />

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* marca */}
          <div>
            <div className="flex items-center gap-3.5">
              <span className="rounded-2xl bg-white p-1.5 shadow-[0_8px_28px_-10px_rgba(255,255,255,0.4)]">
                <Image
                  src="/images/site/spc-logo.jpg"
                  alt={`Logo ${BRAND.name}`}
                  width={68}
                  height={36}
                  className="h-10 w-auto rounded-xl object-contain"
                />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[16px] font-extrabold">
                  SPC <span className="sr-only">Impresores S.A.</span>
                </p>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-gold-400">
                  {BRAND.tagline}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-white/60">
              {BRAND.slogan}.{" "}
              {t(
                `Empresa líder en la industria gráfica de Bolivia desde ${BRAND.foundedYear}, con tecnología de punta, insumos de primera calidad y el factor humano que marca la diferencia.`,
                `A leading company in Bolivia's printing industry since ${BRAND.foundedYear}, with cutting-edge technology, premium supplies and the human factor that makes the difference.`
              )}
            </p>
            {/* CTA del footer */}
            <a
              href={waLink(wa.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="shine group mt-6 inline-flex items-center gap-3 rounded-full bg-wa px-5 py-3 text-[13.5px] font-bold text-white shadow-[0_12px_32px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fbe5d]"
              aria-label={t("Escribir por WhatsApp", "Message on WhatsApp")}
            >
              <WhatsAppIcon className="h-4.5 w-4.5" />
              {t("Escríbenos", "Message us")}
            </a>
          </div>

          {/* navegación */}
          <nav aria-label={t("Enlaces del sitio", "Site links")}>
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">{t("Sitio", "Site")}</p>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* servicios */}
          <nav aria-label={t("Servicios", "Services")}>
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">{t("Servicios", "Services")}</p>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/servicios/${s.id}`}
                    className="text-left text-[13.5px] font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contacto */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">{t("Contacto", "Contact")}</p>
            <ul className="mt-5 space-y-3.5 text-[13.5px] text-white/65">
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-white/85 transition-colors hover:text-white">
                  {CONTACT.whatsapp}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                <a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                <span>{CONTACT.addressFull}</span>
              </li>
              <li className="flex gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                <span>{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* línea legal */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-[12px] text-white/45">
            © {BRAND.foundedYear}–{year} {BRAND.name}. {t("Todos los derechos reservados.", "All rights reserved.")}
          </p>
          <p className="font-display text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40">
            {BRAND.pillars.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
