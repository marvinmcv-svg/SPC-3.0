"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  SITE ROUTER — hash router del sitio multipágina
 *
 *  Convierte la landing en un sitio web completo:
 *    #/                    → Inicio
 *    #/nosotros            → Nosotros (historia, tecnología, sectores)
 *    #/servicios           → Servicios (9 líneas, grid completo)
 *    #/servicios/[id]      → Página profunda de cada servicio
 *    #/proceso             → Proceso de trabajo
 *    #/clientes            → Clientes (muro de logos + reseñas)
 *    #/faq                 → Preguntas frecuentes
 *    #/contacto            → Contacto / cotizador (funnel WhatsApp)
 *
 *  Transiciones de página con blur + rise (estilo Apple).
 * ══════════════════════════════════════════════════════════════════
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SERVICE_IDS, type NavPage } from "@/lib/site-config";

/* ─── Tipos de ruta ──────────────────────────────────────────────── */

export type PageId = NavPage;

export type Route = {
  page: PageId;
  /** id de servicio cuando page === "servicio" */
  serviceId?: string;
  /** clave única para las transiciones de página */
  key: string;
};

/* ─── Parser del hash ────────────────────────────────────────────── */

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  const [seg, sub] = clean.split("/");

  switch (seg) {
    case "":
    case undefined:
      return { page: "home", key: "home" };
    case "nosotros":
      return { page: "nosotros", key: "nosotros" };
    case "servicios":
      if (sub && SERVICE_IDS.includes(sub)) {
        return { page: "servicio", serviceId: sub, key: `servicio-${sub}` };
      }
      return { page: "servicios", key: "servicios" };
    case "proceso":
      return { page: "proceso", key: "proceso" };
    case "clientes":
      return { page: "clientes", key: "clientes" };
    case "faq":
      return { page: "faq", key: "faq" };
    case "contacto":
      return { page: "contacto", key: "contacto" };
    default:
      return { page: "home", key: "home" };
  }
}

/* ─── Contexto ───────────────────────────────────────────────────── */

type RouterCtx = {
  route: Route;
  navigate: (path: string) => void;
};

const RouterContext = createContext<RouterCtx>({
  route: { page: "home", key: "home" },
  navigate: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}

/** Hook de conveniencia: ruta actual */
export function useRoute() {
  return useRouter().route;
}

/* ─── Navegación imperativa (desde botones, eventos…) ────────────── */

export function navigate(path: string) {
  const target = `#/${path.replace(/^[#/]+/, "")}`;
  if (window.location.hash === target) return;
  window.location.hash = target;
}

/* ─── Provider (colocar UNA vez en la raíz de la página) ────────── */

function readHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash;
}

export function SiteRouter({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseHash(readHash()));

  useEffect(() => {
    const onHash = () => {
      const next = parseHash(readHash());
      setRoute((prev) =>
        prev.key === next.key && prev.serviceId === next.serviceId ? prev : next
      );
      /* reset de scroll al cambiar de página (instantáneo, sin salto) */
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const nav = useCallback((path: string) => navigate(path), []);

  const value = useMemo(() => ({ route, navigate: nav }), [route, nav]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

/* ─── Link interno: <a> nativo + reset de scroll ─────────────────── */

export function SiteLink({
  to,
  children,
  className,
  onClick,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const href = to.startsWith("#") ? to : `#/${to.replace(/^[#/]+/, "")}`;
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.();
        /* Si el destino es la página actual, forzamos scroll top manualmente */
        if (window.location.hash === href) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ─── Transición de página ───────────────────────────────────────── */

export function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={routeKey}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(10px)" }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18, filter: "blur(8px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

/* ─── Breadcrumb de páginas internas ─────────────────────────────── */

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="text-white/40">/</span>}
          {item.to ? (
            <SiteLink
              to={item.to}
              className="text-gold-300 transition-colors hover:text-gold-200"
            >
              {item.label}
            </SiteLink>
          ) : (
            <span className="text-white/70" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
