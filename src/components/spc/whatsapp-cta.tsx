"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  WhatsApp CTA — botones del funnel
 *  Variantes: gold (premium) · green (WhatsApp nativo) · outline · ghost
 * ══════════════════════════════════════════════════════════════════
 */

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* Glifo original de WhatsApp (path oficial simplificado) */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.255.59 4.468 1.712 6.413L3.2 28.8l6.564-1.686a12.736 12.736 0 0 0 6.24 1.622h.005c7.058 0 12.798-5.74 12.798-12.8 0-3.419-1.332-6.633-3.75-9.05a12.704 12.704 0 0 0-9.053-3.686Zm0 23.418h-.004a10.62 10.62 0 0 1-5.41-1.482l-.388-.23-3.898 1.002 1.04-3.79-.25-.39a10.57 10.57 0 0 1-1.623-5.658c0-5.865 4.773-10.636 10.637-10.636 2.844 0 5.514 1.108 7.52 3.122a10.562 10.562 0 0 1 3.114 7.524c0 5.868-4.773 10.638-10.638 10.638Zm5.836-7.962c-.32-.16-1.891-.933-2.184-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.497-2.571-1.586-.95-.847-1.592-1.892-1.779-2.212-.186-.32-.02-.494.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.053-.56-.107-.16-.72-1.734-.986-2.374-.26-.623-.523-.538-.72-.547l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.146 3.093 1.306 3.306.16.213 2.253 3.44 5.456 4.823.763.329 1.358.526 1.82.673.765.243 1.46.209 2.01.127.613-.092 1.891-.773 2.157-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373Z" />
    </svg>
  );
}

type CtaVariant = "gold" | "green" | "outline" | "ghost-dark";

const base =
  "shine group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500";

const variants: Record<CtaVariant, string> = {
  gold:
    "bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-spc-900 shadow-[0_10px_30px_-8px_rgba(255,179,28,0.55),inset_0_1px_0_rgba(255,255,255,0.7)] hover:shadow-[0_16px_44px_-10px_rgba(255,179,28,0.7),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-0.5 active:translate-y-0",
  green:
    "bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] hover:shadow-[0_16px_44px_-10px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-spc-600/25 bg-white/70 text-spc-700 backdrop-blur-sm hover:border-spc-600/50 hover:bg-white hover:-translate-y-0.5",
  "ghost-dark":
    "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5",
};

const sizes = {
  sm: "px-5 py-3 text-sm",
  md: "px-6 py-3.5 text-[15px]",
  lg: "px-8 py-4 text-base",
};

export function WhatsappCta({
  href,
  children,
  variant = "gold",
  size = "md",
  className,
  icon = true,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: CtaVariant;
  size?: keyof typeof sizes;
  className?: string;
  icon?: boolean;
  arrow?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {icon && <WhatsAppIcon className="h-[1.15em] w-[1.15em] shrink-0" />}
      <span>{children}</span>
      {arrow && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      )}
    </motion.a>
  );
}
