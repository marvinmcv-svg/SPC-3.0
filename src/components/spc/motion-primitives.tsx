"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SPC Motion Primitives — Sistema de animaciones premium
 *  Reveal · WordsReveal · Counter · TiltCard · Parallax
 * ══════════════════════════════════════════════════════════════════
 */

import {
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────
   MOTION PROVIDER — respeta prefers-reduced-motion en toda la app:
   las animaciones de transform/layout pasan a ser instantáneas
   (los fades de opacidad se conservan). Colocar en la raíz de la página.
   ──────────────────────────────────────────────────────────────── */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* ────────────────────────────────────────────────────────────────
   REVEAL — aparición al hacer scroll (fade + rise + blur)
   ──────────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Variantes de motion creadas fuera del render (requisito de react-hooks) */
const MOTION_TAGS = {
  span: motion.create("span"),
  h1: motion.create("h1"),
  h2: motion.create("h2"),
  h3: motion.create("h3"),
  p: motion.create("p"),
} as const;

/* ────────────────────────────────────────────────────────────────
   WORDS REVEAL — título que aparece palabra por palabra
   ──────────────────────────────────────────────────────────────── */
export function WordsReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.07,
  as: Tag = "span",
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  once?: boolean;
}) {
  const words = text.split(" ");
  const MotionTag = MOTION_TAGS[Tag];
  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className={cn("inline-block will-change-transform", wordClassName)}
              variants={{
                hidden: { y: "108%", opacity: 0, filter: "blur(8px)" },
                visible: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* separador fuera del span animado para que no se colapse */}
          {i < words.length - 1 && <span aria-hidden>{"\u00A0"}</span>}
        </React.Fragment>
      ))}
    </MotionTag>
  );
}

/* ────────────────────────────────────────────────────────────────
   COUNTER — número que cuenta hacia arriba al entrar en vista
   ──────────────────────────────────────────────────────────────── */
export function Counter({
  value,
  suffix = "",
  className,
  duration = 2,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
      {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
   TILT CARD — tarjeta 3D estilo Apple: inclinación + brillo especular
   El brillo (gloss) sigue al cursor mediante variables CSS --mx/--my.
   transformStyle: preserve-3d + transformPerspective hacen que los
   hijos con translateZ (v.g. .depth-1/.depth-2) floten de verdad.
   ──────────────────────────────────────────────────────────────── */
export function TiltCard({
  children,
  className,
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  perspective = 900,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const s = useMotionValue(1);

  /* Muelles afinados: seguimiento rápido (~0.2 s) con amortiguación
     casi crítica (ζ ≈ 0.93) — sensación "manteca", sin oscilación. */
  const springRx = useSpring(rx, { stiffness: 210, damping: 20, mass: 0.55 });
  const springRy = useSpring(ry, { stiffness: 210, damping: 20, mass: 0.55 });
  /* La escala sigue un pelín más lenta que la rotación: da peso orgánico. */
  const springS = useSpring(s, { stiffness: 170, damping: 22, mass: 0.7 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 2 * maxTilt);
    rx.set(-(py - 0.5) * 2 * maxTilt);
    s.set(scale);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
    s.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: springRx,
        rotateY: springRy,
        scale: springS,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      }}
      className={cn("tilt-card relative", className)}
    >
      {children}
      {glare && <span className="gloss" aria-hidden />}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   PARALLAX — desplazamiento sutil ligado al scroll
   ──────────────────────────────────────────────────────────────── */
export function useParallax(distance = 60): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : distance, reduce ? 0 : -distance]);
  return { ref, y };
}

/* ────────────────────────────────────────────────────────────────
   SECTION EYEBROW — kicker dorado encima de títulos de sección
   ──────────────────────────────────────────────────────────────── */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <Reveal y={12}>
      <span
        className={cn(
          "inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.32em]",
          dark ? "text-gold-500" : "text-spc-600"
        )}
      >
        <span className={cn("h-px w-8", dark ? "bg-gold-500/70" : "bg-spc-600/40")} aria-hidden />
        {children}
        <span className={cn("h-px w-8", dark ? "bg-gold-500/70" : "bg-spc-600/40")} aria-hidden />
      </span>
    </Reveal>
  );
}
