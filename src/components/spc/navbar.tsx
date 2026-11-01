"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  NAVBAR — fija, transparente sobre los heroes oscuros → glass al
 *  hacer scroll. Mega-menú de servicios con imagen de producto y
 *  menú móvil a pantalla completa con cascada animada.
 * ══════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone, ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, CONTACT, waLink } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n";
import { useContent } from "@/lib/use-content";
import { LangToggle } from "./lang-toggle";
import { WhatsappCta } from "./whatsapp-cta";
import { openSpencer } from "./spencer";
import { SpencerAvatar } from "./spencer-avatar";

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const { services: SERVICES } = useContent();
  const { t } = useI18n();
  const [hover, setHover] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === hover) ?? SERVICES[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotateX: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      style={{ transformPerspective: 1200, transformOrigin: "top center" }}
      className="absolute left-1/2 top-full mt-3 w-[min(880px,calc(100vw-48px))] -translate-x-1/2"
    >
      <div className="glossy-card grid grid-cols-[1.25fr_1fr] gap-2 overflow-hidden rounded-[1.6rem] p-2.5">
        <ul className="grid grid-cols-1 gap-0.5 p-1.5">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * i }}
            >
              <Link
                href={`/servicios/${s.id}`}
                onMouseEnter={() => setHover(s.id)}
                onFocus={() => setHover(s.id)}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors",
                  hover === s.id ? "bg-spc-50 text-spc-700" : "text-spc-900/80 hover:bg-spc-50/60"
                )}
              >
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[13.5px] font-bold">{s.title}</span>
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-spc-400">{s.categoryLabel}</span>
                </span>
                <ArrowUpRight
                  className={cn("h-4 w-4 shrink-0 transition-all", hover === s.id ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")}
                  aria-hidden
                />
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.2rem] bg-spc-950">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={active.gallery[0].src} alt={active.gallery[0].alt} fill sizes="380px" className={active.gallery[0].brand ? "bg-white object-contain p-6" : "object-cover"} />
              <div className="absolute inset-0 bg-gradient-to-t from-spc-950 via-spc-950/30 to-transparent" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-display text-[17px] font-bold text-white">{active.title}</p>
                <p className="mt-1.5 line-clamp-3 text-[12.5px] leading-relaxed text-white/70">{active.description}</p>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                  {t("Desde", "From")} {active.minRun.split(" (")[0]} · {active.turnaround.split(/ según| depending/)[0]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { nav: NAV_LINKS, services: SERVICES, wa, brand } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // cerrar menús al cambiar de ruta (ajuste de estado durante el render)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMega(false);
  }

  useEffect(() => {
    if (!open && !mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mega]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "glass-nav shadow-[0_8px_32px_-16px_rgba(6,15,46,0.25)]" : "bg-transparent"
      )}
    >
      <motion.div
        style={{ scaleX: progress }}
        className="scroll-progress absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300"
      />

      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8" aria-label={t("Principal", "Main")}>
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${BRAND.name} — ${t("inicio", "home")}`}>
          <motion.span
            whileHover={{ rotate: -4, scale: 1.05 }}
            className={cn(
              "flex items-center rounded-2xl p-1.5 transition-all duration-500",
              solid ? "bg-white/95 shadow-[0_4px_20px_-6px_rgba(0,60,141,0.35)]" : "bg-white shadow-[0_6px_28px_-10px_rgba(0,0,0,0.45)]"
            )}
          >
            <Image src="/images/site/spc-logo.jpg" alt={`Logo ${BRAND.name}`} width={68} height={36} className="h-9 w-auto rounded-xl object-contain" priority />
          </motion.span>
          <span className="hidden flex-col leading-tight md:flex">
            <span className={cn("font-display text-[15px] font-bold tracking-tight transition-colors", solid ? "text-spc-800" : "text-white")}>
              SPC <span className="sr-only">Impresores S.A.</span>
            </span>
            <span className={cn("text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors", solid ? "text-gold-700" : "text-gold-300")}>
              {brand.tagline}
            </span>
          </span>
        </Link>

        {/* escritorio */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            const isMega = "mega" in link && link.mega;
            return (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => isMega && setMega(true)}
                onMouseLeave={() => isMega && setMega(false)}
              >
                <Link
                  href={link.href}
                  aria-expanded={isMega ? mega : undefined}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-[13.5px] font-semibold tracking-wide transition-colors duration-300",
                    solid ? "text-spc-800/75 hover:text-spc-600" : "text-white/80 hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn("absolute inset-0 -z-10 rounded-full", solid ? "bg-spc-50 ring-1 ring-spc-600/15" : "bg-white/15 ring-1 ring-white/20")}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                  {isMega && <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", mega && "rotate-180")} aria-hidden />}
                </Link>
                {isMega && (
                  <AnimatePresence>{mega && <MegaMenu onNavigate={() => setMega(false)} />}</AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openSpencer()}
            className={cn(
              "group hidden h-11 items-center gap-2 rounded-full pl-1 pr-4 text-[13px] font-bold transition-all duration-300 sm:flex",
              solid
                ? "bg-spc-950 text-white shadow-[0_6px_20px_-6px_rgba(6,15,46,0.5)] hover:-translate-y-0.5"
                : "bg-white/12 text-white ring-1 ring-white/30 backdrop-blur-md hover:bg-white/20"
            )}
            aria-label={t("Hablar con SPenCer, el recepcionista con IA", "Talk to SPenCer, the AI receptionist")}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-spc-800 ring-1 ring-gold-400/50">
              <SpencerAvatar className="h-7 w-7" />
            </span>
            SPenCer
          </button>
          <a
            href={CONTACT.phoneHref}
            className={cn(
              "hidden h-11 w-11 items-center justify-center rounded-full transition-all duration-300 xl:flex",
              solid ? "text-spc-700 ring-1 ring-spc-600/20 hover:bg-spc-50" : "text-white ring-1 ring-white/30 hover:bg-white/15"
            )}
            aria-label={`${t("Llamar al", "Call")} ${CONTACT.phone}`}
          >
            <Phone className="h-[17px] w-[17px]" />
          </a>
          <LangToggle dark={!solid} className="hidden sm:flex" />
          <WhatsappCta href={waLink(wa.general)} variant="gold" size="sm" className="hidden md:inline-flex">
            {t("Cotizar", "Get a quote")}
          </WhatsappCta>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-spc-800 ring-1 ring-spc-600/20" : "text-white ring-1 ring-white/30"
            )}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t("Cerrar menú", "Close menu") : t("Abrir menú", "Open menu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
            id="menu-movil"
          >
            <div className="max-h-[calc(100svh-72px)] overflow-y-auto px-5 pb-8 pt-2">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-xl px-4 py-3 font-display text-[19px] font-bold transition-colors",
                        isActive(link.href) ? "bg-spc-50 text-spc-600" : "text-spc-900 hover:bg-spc-50"
                      )}
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4 text-spc-300" aria-hidden />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-5 px-4 text-[10.5px] font-bold uppercase tracking-[0.2em] text-spc-400">{t("Servicios", "Services")}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {SERVICES.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.03 }}>
                    <Link href={`/servicios/${s.id}`} className="flex items-center gap-2.5 rounded-xl bg-spc-50/70 p-2 text-[12.5px] font-semibold text-spc-800">
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                        <Image src={s.gallery[0].src} alt="" fill sizes="36px" className={s.gallery[0].brand ? "bg-white object-contain p-0.5" : "object-cover"} />
                      </span>
                      <span className="leading-tight">{s.shortTitle}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openSpencer();
                  }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-spc-950 px-6 py-3.5 text-[14px] font-bold text-white"
                >
                  <SpencerAvatar className="h-6 w-6" />
                  {t("Cotizar con SPenCer", "Quote with SPenCer")}
                </button>
                <div className="flex justify-center sm:hidden">
                  <LangToggle id="mobile" />
                </div>
                <WhatsappCta href={waLink(wa.general)} variant="gold" size="md" className="w-full">
                  WhatsApp {CONTACT.whatsapp}
                </WhatsappCta>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
