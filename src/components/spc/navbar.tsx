"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  NAVBAR — fija, transparente sobre hero → glass al hacer scroll
 * ══════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, CONTACT, NAV_LINKS, WA_MESSAGES, waLink } from "@/lib/site-config";
import { WhatsappCta, WhatsAppIcon } from "./whatsapp-cta";
import { openSpcAi } from "./spc-ai-widget";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // sección activa
      const ids = NAV_LINKS.map((l) => l.href.slice(1));
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      }
      setActive(`#${current}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape cierra el menú móvil (accesibilidad teclado)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav shadow-[0_8px_32px_-16px_rgba(6,15,46,0.25)]" : "bg-transparent"
        )}
      >
        {/* barra de progreso de lectura */}
        <motion.div
          style={{ scaleX: progress }}
          className="scroll-progress absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300"
        />

        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8" aria-label="Principal">
          {/* Logo */}
          <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label={`${BRAND.name} — inicio`}>
            <span
              className={cn(
                "flex items-center rounded-2xl p-1.5 transition-all duration-500",
                scrolled ? "bg-white/95 shadow-[0_4px_20px_-6px_rgba(0,60,141,0.35)]" : "bg-white shadow-[0_6px_28px_-10px_rgba(0,0,0,0.45)]"
              )}
            >
              <Image
                src="/images/site/spc-logo.jpg"
                alt={`Logo ${BRAND.name}`}
                width={68}
                height={36}
                className="h-9 w-auto rounded-xl object-contain"
                priority
              />
            </span>
            <span className="hidden flex-col leading-tight md:flex">
              <span className={cn("font-display text-[15px] font-bold tracking-tight transition-colors", scrolled ? "text-spc-800" : "text-white")}>
                SPC <span className="sr-only">Impresores S.A.</span>
              </span>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors", scrolled ? "text-gold-700" : "text-gold-300")}>
                Gráfica Industrial
              </span>
            </span>
          </a>

          {/* Links escritorio */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-300",
                    scrolled ? "text-spc-800/75 hover:text-spc-600" : "text-white/80 hover:text-white"
                  )}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn(
                        "absolute inset-0 -z-10 rounded-full",
                        scrolled ? "bg-spc-50 ring-1 ring-spc-600/15" : "bg-white/15 ring-1 ring-white/20"
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + acciones */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSpcAi}
              className={cn(
                "group hidden h-11 items-center gap-2 rounded-full pl-1.5 pr-4 text-[13px] font-bold transition-all duration-300 sm:flex",
                scrolled
                  ? "bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-spc-900 shadow-[0_6px_20px_-6px_rgba(255,179,28,0.6)] hover:-translate-y-0.5"
                  : "bg-white/12 text-white ring-1 ring-white/30 backdrop-blur-md hover:bg-white/20"
              )}
              aria-label="Hablar con SPC AI, la recepcionista inteligente"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-spc-900">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              SPC AI
            </button>
            <a
              href={CONTACT.phoneHref}
              className={cn(
                "hidden h-11 w-11 items-center justify-center rounded-full transition-all duration-300 xl:flex",
                scrolled
                  ? "text-spc-700 ring-1 ring-spc-600/20 hover:bg-spc-50"
                  : "text-white ring-1 ring-white/30 hover:bg-white/15"
              )}
              aria-label={`Llamar al ${CONTACT.phone}`}
            >
              <Phone className="h-[17px] w-[17px]" />
            </a>
            <WhatsappCta
              href={waLink(WA_MESSAGES.general)}
              variant="gold"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Cotizar por WhatsApp
            </WhatsappCta>
            <button
              onClick={() => setOpen(!open)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full transition-colors xl:hidden",
                scrolled ? "text-spc-800 ring-1 ring-spc-600/20" : "text-white ring-1 ring-white/30"
              )}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Menú móvil */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-nav overflow-hidden xl:hidden"
              id="menu-movil"
            >
              <ul className="space-y-1 px-6 pb-6 pt-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -18, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold text-spc-800 transition-colors hover:bg-spc-50"
                    >
                      {link.label}
                      <WhatsAppIcon className="h-4 w-4 text-spc-300" />
                    </a>
                  </motion.li>
                ))}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openSpcAi();
                    }}
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 px-6 py-3.5 text-[14px] font-bold text-spc-900 shadow-[0_10px_28px_-8px_rgba(255,179,28,0.6)]"
                  >
                    <Sparkles className="h-4.5 w-4.5" aria-hidden />
                    Preguntar a SPC AI
                  </button>
                </li>
                <li className="pt-3">
                  <WhatsappCta href={waLink(WA_MESSAGES.general)} variant="gold" size="md" className="w-full">
                    Cotizar por WhatsApp
                  </WhatsappCta>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
