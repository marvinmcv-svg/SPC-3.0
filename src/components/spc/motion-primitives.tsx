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
  animate,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import React, { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

/* ────────────────────────────────────────────────────────────────
   MAGNETIC — el botón se deja atraer sutilmente por el cursor
   (efecto premium de landings de referencia mundial)
   ──────────────────────────────────────────────────────────────── */
export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 17, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 17, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   RING CAROUSEL 3D — anillo giratorio estilo Apple:
   • tarjetas distribuidas en círculo real (rotateY + translateZ)
   • auto-rotación con pausa al interactuar
   • arrastre con pointer events (mouse + touch) y snap elástico
   • clic en tarjeta lateral la trae al frente
   ──────────────────────────────────────────────────────────────── */
export type CarouselItem = {
  id: string;
  title: string;
  badge?: string;
  image: string;
};

/* Normaliza un ángulo al rango (-180, 180] */
function shortestAngle(a: number): number {
  let d = a % 360;
  if (d > 180) d -= 360;
  if (d <= -180) d += 360;
  return d;
}

function CarouselCard({
  item,
  angle,
  rot,
  active,
  onSelect,
}: {
  item: CarouselItem;
  angle: number;
  rot: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
}) {
  /* distancia angular de esta tarjeta al frente (−180…180) */
  const dist = useTransform(rot, (r) => shortestAngle(angle + r));
  const opacity = useTransform(
    dist,
    [-180, -110, -55, 0, 55, 110, 180],
    [0.16, 0.34, 0.82, 1, 0.82, 0.34, 0.16]
  );
  const filter = useTransform(
    dist,
    [-180, -90, 0, 90, 180],
    ["brightness(0.4) saturate(0.6)", "brightness(0.66) saturate(0.8)", "brightness(1.08) saturate(1.08)", "brightness(0.66) saturate(0.8)", "brightness(0.4) saturate(0.6)"]
  );
  const ring = useTransform(
    dist,
    [-180, -45, -12, 0, 12, 45, 180],
    [
      "0 0 0 rgba(255,196,79,0)",
      "0 0 0 rgba(255,196,79,0)",
      "0 0 0 1.5px rgba(255,196,79,0.55)",
      "0 18px 60px -12px rgba(255,196,79,0.45), 0 0 0 2px rgba(255,196,79,0.9)",
      "0 0 0 1.5px rgba(255,196,79,0.55)",
      "0 0 0 rgba(255,196,79,0)",
      "0 0 0 rgba(255,196,79,0)",
    ]
  );

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={`Ver ${item.title}`}
      aria-current={active}
      className="ring-card group absolute left-1/2 top-1/2 block cursor-pointer rounded-[1.3rem] focus-visible:outline-none"
      style={{
        width: "var(--card-w)",
        height: "var(--card-h)",
        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(var(--radius))`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        opacity,
        filter,
        boxShadow: ring,
      }}
    >
      <span className="absolute inset-0 block overflow-hidden rounded-[1.3rem] bg-spc-950 ring-1 ring-white/15">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="220px"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-spc-950/90 via-spc-950/15 to-transparent"
        />
        {item.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-spc-800 backdrop-blur-sm">
            {item.badge}
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-3.5 text-left">
          <span className="font-display text-[13.5px] font-bold leading-tight text-white">
            {item.title}
          </span>
          <span className="flex items-center gap-1 text-[10.5px] font-semibold text-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {active ? "En pantalla" : "Girar al frente"}
          </span>
        </span>
        {/* línea de luz superior */}
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
      </span>
    </motion.button>
  );
}

export function RingCarousel({
  items,
  onSelect,
  autoMs = 4000,
  className,
}: {
  items: CarouselItem[];
  /** Se dispara al hacer clic en la tarjeta ACTIVA del frente */
  onSelect?: (index: number) => void;
  autoMs?: number;
  className?: string;
}) {
  const n = items.length;
  const step = 360 / n;
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [cardW, setCardW] = useState(190);

  const rot = useMotionValue(0);
  const dragRef = useRef({ active: false, startX: 0, startRot: 0, moved: 0 });
  const indexRef = useRef(0);

  /* radio del anillo a partir del ancho de tarjeta */
  const radius = Math.round(cardW / 2 / Math.sin(Math.PI / n) + 16);
  const cardH = Math.round(cardW * 1.32);

  /* mide el contenedor para dimensionar tarjetas (mobile-friendly) */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setCardW(Math.max(136, Math.min(206, Math.round(w * 0.38))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (i: number, instant = false) => {
      const norm = ((i % n) + n) % n;
      setIndex(norm);
      /* rotación objetivo: camino más corto desde la posición actual */
      const current = rot.get();
      let target = -norm * step;
      while (target - current > 180) target -= 360;
      while (target - current < -180) target += 360;
      if (instant) rot.jump(target);
      else animate(rot, target, { type: "spring", stiffness: 90, damping: 18, mass: 0.9 });
    },
    [n, step, rot]
  );

  /* auto-rotación (pausada en hover/drag/reduced-motion/pestaña oculta) */
  useEffect(() => {
    if (paused || dragging || reduce) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      goTo(indexRef.current + 1);
    }, autoMs);
    return () => clearInterval(id);
  }, [paused, dragging, reduce, autoMs, goTo]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  /* ── drag con pointer events ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, startX: e.clientX, startRot: rot.get(), moved: 0 };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.abs(dx);
    rot.set(d.startRot + dx * 0.32);
  };
  const onPointerUp = () => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    setDragging(false);
    /* snap al múltiplo de step más cercano */
    const snapped = Math.round(rot.get() / step) * step;
    const norm = ((Math.round(-snapped / step) % n) + n) % n;
    setIndex(norm);
    animate(rot, snapped, { type: "spring", stiffness: 110, damping: 19, mass: 0.85 });
  };

  const activeItem = items[index];

  return (
    <div className={cn("relative select-none", className)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* ── escena 3D ── */}
      <div
        ref={wrapRef}
        role="group"
        aria-label="Carrusel de servicios SPC"
        className="relative mx-auto h-[300px] w-full cursor-grab touch-pan-y sm:h-[340px] lg:h-[360px]"
        style={{
          perspective: "1200px",
          "--card-w": `${cardW}px`,
          "--card-h": `${cardH}px`,
          "--radius": `${radius}px`,
        } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            rotateY: rot,
            transformStyle: "preserve-3d",
            width: 0,
            height: 0,
          }}
        >
          {items.map((item, i) => (
            <CarouselCard
              key={item.id}
              item={item}
              angle={i * step}
              rot={rot}
              active={i === index}
              onSelect={() => {
                if (dragRef.current.moved > 6) return; /* era un drag, no un clic */
                if (i === index) onSelect?.(i);
                else goTo(i);
              }}
            />
          ))}
        </motion.div>

        {/* brillo de piso (sensación de superficie) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[12%] bottom-1 h-16 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,196,79,0.22),transparent_70%)] blur-md"
        />
      </div>

      {/* ── controles ── */}
      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Servicio anterior"
          className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-all duration-300 hover:scale-105 hover:text-gold-300"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        {/* dots */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Seleccionar servicio">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={item.title}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-400",
                i === index ? "w-7 bg-gold-400" : "w-1.5 bg-white/25 hover:bg-white/45"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Siguiente servicio"
          className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-all duration-300 hover:scale-105 hover:text-gold-300"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {/* ── panel del servicio activo ── */}
      <div className="relative mt-4 h-[64px] sm:h-[60px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-start text-center"
          >
            <p className="font-display text-[17px] font-bold leading-tight text-white sm:text-lg">
              {activeItem.title}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300/90">
              {`0${index + 1} / 0${n} — toca la tarjeta para ver el detalle`}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CHAR REVEAL — titular letra por letra con giro 3D (rotateX)
   ──────────────────────────────────────────────────────────────── */
export function CharReveal({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.022,
  once = true,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** true = anima al montar (heros), false = al entrar en vista */
  animateOnMount?: boolean;
}) {
  const words = text.split(" ");
  let charIndex = 0;
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: { once, margin: "-60px" } };
  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{ perspective: 600 }}
      aria-label={text}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {Array.from(word).map((ch) => {
            charIndex += 1;
            return (
              <motion.span
                key={charIndex}
                className={cn("inline-block origin-bottom will-change-transform", charClassName)}
                variants={{
                  hidden: { opacity: 0, y: "0.6em", rotateX: -80, filter: "blur(6px)" },
                  visible: {
                    opacity: 1,
                    y: "0em",
                    rotateX: 0,
                    filter: "blur(0px)",
                    transition: { type: "spring", stiffness: 260, damping: 22 },
                  },
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">{" "}</span>}
        </span>
      ))}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────────────
   SCROLL HIGHLIGHT — párrafo que se "enciende" palabra por palabra
   mientras haces scroll (efecto keynote de Apple)
   ──────────────────────────────────────────────────────────────── */
function HighlightWord({
  word,
  progress,
  range,
  accent,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className={cn("inline-block", accent && "text-gradient-gold")}>
      {word}
      {" "}
    </motion.span>
  );
}

export function ScrollHighlight({
  text,
  className,
  accentWords = [],
}: {
  text: string;
  className?: string;
  /** Palabras que se pintan en dorado al encenderse */
  accentWords?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = w.replace(/[.,;:!?¡¿—]/g, "").toLowerCase();
        return (
          <HighlightWord
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[start, end]}
            accent={accentWords.some((a) => a.toLowerCase() === clean)}
          />
        );
      })}
    </p>
  );
}

/* ────────────────────────────────────────────────────────────────
   IMAGE REVEAL — imagen que se descubre con barrido (clip-path) +
   zoom-out cinematográfico al entrar en vista
   ──────────────────────────────────────────────────────────────── */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  direction = "up",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  direction?: "up" | "left" | "right";
  delay?: number;
}) {
  const hidden =
    direction === "up"
      ? "inset(100% 0% 0% 0% round 1.6rem)"
      : direction === "left"
        ? "inset(0% 100% 0% 0% round 1.6rem)"
        : "inset(0% 0% 0% 100% round 1.6rem)";
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.6rem)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.25, delay, ease: [0.77, 0, 0.18, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.28 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   STAGGER — contenedor + item: los hijos entran en cascada
   ──────────────────────────────────────────────────────────────── */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 46, scale: 0.94, rotateX: 12, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   GLOSSY CARD — tarjeta 3D estilo Apple lista para usar:
   TiltCard + superficie glossy (claro u oscuro) + reflejo especular
   ──────────────────────────────────────────────────────────────── */
export function GlossyCard({
  children,
  className,
  innerClassName,
  dark = false,
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  dark?: boolean;
  maxTilt?: number;
}) {
  return (
    <TiltCard maxTilt={maxTilt} scale={1.02} className={cn("h-full", className)}>
      <div className={cn(dark ? "glossy-dark" : "glossy-card", "h-full rounded-[1.6rem]", innerClassName)}>
        <span aria-hidden className="glossy-sheen" />
        {children}
      </div>
    </TiltCard>
  );
}
