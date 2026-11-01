"use client";

/**
 * SPenCer — avatar animado (SVG propio): cabeza de robot dorada con
 * visor navy, ojos que parpadean y antena con pulso luminoso.
 */

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SpencerAvatar({ className, talking = false }: { className?: string; talking?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10", className)}
      aria-hidden
      animate={reduce ? undefined : { y: [0, -1.5, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="sp-head" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe3ac" />
          <stop offset="0.45" stopColor="#ffc44f" />
          <stop offset="1" stopColor="#e09a12" />
        </linearGradient>
        <linearGradient id="sp-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b4f91" />
          <stop offset="1" stopColor="#060f2e" />
        </linearGradient>
        <radialGradient id="sp-eye">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#bfe9ff" />
          <stop offset="1" stopColor="#5cc8ff" />
        </radialGradient>
      </defs>
      {/* antena */}
      <line x1="32" y1="9" x2="32" y2="15" stroke="#e09a12" strokeWidth="2.4" strokeLinecap="round" />
      <motion.circle
        cx="32"
        cy="7"
        r="3.4"
        fill="#ffd280"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduce ? undefined : { opacity: [1, 0.35, 1], scale: [1, 1.18, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      {/* orejas */}
      <rect x="5" y="28" width="6" height="14" rx="3" fill="#e09a12" />
      <rect x="53" y="28" width="6" height="14" rx="3" fill="#e09a12" />
      {/* cabeza */}
      <rect x="9" y="14" width="46" height="42" rx="16" fill="url(#sp-head)" />
      <rect x="9" y="14" width="46" height="42" rx="16" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1" />
      <path d="M17 19c6-3 24-3 30 0" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* visor */}
      <rect x="15" y="25" width="34" height="19" rx="9.5" fill="url(#sp-visor)" />
      {/* ojos */}
      <motion.g
        style={{ originY: "34px" }}
        animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] }}
      >
        <ellipse cx="25" cy="34.5" rx="3.6" ry="4.2" fill="url(#sp-eye)" />
        <ellipse cx="39" cy="34.5" rx="3.6" ry="4.2" fill="url(#sp-eye)" />
      </motion.g>
      {/* boca */}
      <motion.rect
        x="26"
        y="48"
        width="12"
        height="2.6"
        rx="1.3"
        fill="#11095b"
        animate={talking && !reduce ? { height: [2.6, 5, 2.6], y: [48, 46.8, 48] } : undefined}
        transition={{ duration: 0.35, repeat: Infinity }}
      />
    </motion.svg>
  );
}
