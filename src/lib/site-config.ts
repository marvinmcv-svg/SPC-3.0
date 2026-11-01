/**
 * ══════════════════════════════════════════════════════════════════
 *  SPC IMPRESORES S.A. — Configuración global del sitio
 * ══════════════════════════════════════════════════════════════════
 *  Datos de marca, contacto y funnel de WhatsApp.
 *
 *  ⚠️  IMPORTANTE — NÚMERO DE WHATSAPP:
 *  Reemplaza WHATSAPP_NUMBER con la línea móvil real de la empresa
 *  (formato internacional SIN "+", espacios ni guiones).
 *  Actualmente usa el número publicado de la empresa: +591 2 2111121
 * ══════════════════════════════════════════════════════════════════
 */

export const BRAND = {
  name: "SPC Impresores S.A.",
  shortName: "SPC",
  tagline: "Gráfica Industrial",
  slogan: "Imprimiendo lo mejor de Bolivia",
  pillars: ["Calidad", "Puntualidad", "Capacidad", "Servicio"],
  foundedYear: 2001,
  city: "La Paz, Bolivia",
} as const;

export const CONTACT = {
  phone: "+591 2 2111121",
  phoneHref: "tel:+5912211121",
  email: "graficaindustrial@spc.com.bo",
  address: "Av. Saavedra N.º 2411 (Final), Zona Miraflores",
  addressFull: "Edificio SPC, Av. Saavedra N.º 2411, Zona Miraflores, La Paz — Bolivia",
  hours: "Lun – Vie · 8:00 a 18:00",
  website: "www.spc.net.bo",
} as const;

/** ─── FUNNEL DE WHATSAPP ───────────────────────────────────────────
 *  Cambia aquí el número y todos los CTA del sitio se actualizan.
 */
export const WHATSAPP_NUMBER = "5912211121"; // ← REEMPLAZAR con la línea WhatsApp real (ej. 591XXXXXXXX)

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensajes pre-cargados del funnel (uno por contexto) */
export const WA_MESSAGES = {
  general:
    "¡Hola SPC Gráfica Industrial! 👋 Vi su sitio web y me gustaría cotizar un proyecto de impresión.",
  services:
    "¡Hola SPC! 👋 Estoy explorando sus servicios y me gustaría recibir asesoría para mi proyecto.",
  quote: (service: string) =>
    `¡Hola SPC! 👋 Me interesa cotizar *${service}*. ¿Podrían darme más información sobre tiempos y precios?`,
  process:
    "¡Hola SPC! 👋 Quiero iniciar un proyecto con ustedes. ¿Me explican cómo funciona el proceso de cotización?",
  packaging:
    "¡Hola SPC! 👋 Tengo un proyecto de *packaging* (alimentos / farmacéutico / promocional) y quiero asesoría técnica.",
  commercial:
    "¡Hola SPC! 👋 Necesito impresión comercial: libros, revistas, catálogos o material corporativo. ¿Me ayudan con una cotización?",
  digital:
    "¡Hola SPC! 👋 Me interesa la *impresión digital bajo demanda* para tirajes cortos. ¿Qué opciones manejan?",
  final:
    "¡Hola SPC! 👋 Estoy listo/a para imprimir mi próximo proyecto con ustedes. ¿Cómo empezamos?",
} as const;

/** ─── DATOS DE SERVICIOS (9 líneas de producto) ─────────────────── */
export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  category: "Packaging" | "Impresión Comercial" | "Digital";
  description: string;
  insight: string; // dato educativo
  image: string;
  waMessage: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "packaging-alimentos",
    title: "Packaging de Alimentos",
    shortTitle: "Alimentos",
    category: "Packaging",
    description:
      "Cajas y envases primarios con tintas de grado alimentario, aptos para contacto directo con alimentos y sellado de frescura.",
    insight: "Las tintas de grado alimentario cumplen normas de migración: el color jamás pasa al producto.",
    image: "/images/services/food-packaging.jpg",
    waMessage: WA_MESSAGES.quote("Packaging de Alimentos"),
    featured: true,
  },
  {
    id: "packaging-farmaceutico",
    title: "Packaging Farmacéutico",
    shortTitle: "Farmacéutico",
    category: "Packaging",
    description:
      "Estuches con validación técnica para la industria farmacéutica: troquelado de precisión, códigos de lote y braille opcional.",
    insight: "El troquel de precisión garantiza que cada estuche se doble perfecto, sin variaciones en línea.",
    image: "/images/services/pharma-packaging.jpg",
    waMessage: WA_MESSAGES.quote("Packaging Farmacéutico"),
  },
  {
    id: "packaging-comercial",
    title: "Packaging Comercial y Promocional",
    shortTitle: "Comercial",
    category: "Packaging",
    description:
      "Cajas regalo, displays y envases promocionales que elevan la experiencia de marca en retail y campañas.",
    insight: "Un buen unboxing multiplica el valor percibido: el packaging es el primer apretón de manos de tu marca.",
    image: "/images/services/promo-packaging.jpg",
    waMessage: WA_MESSAGES.quote("Packaging Comercial y Promocional"),
  },
  {
    id: "paper-bags",
    title: "Paper Bags",
    shortTitle: "Paper Bags",
    category: "Packaging",
    description:
      "Bolsas de papel con asas, en gramajes resistentes y acabados de marca — la alternativa ecológica y elegante para retail.",
    insight: "El papel kraft de 120 g en adelante soporta hasta 8 kg: eco y resistencia no están reñidos.",
    image: "/images/services/paper-bags.jpg",
    waMessage: WA_MESSAGES.quote("Paper Bags"),
  },
  {
    id: "impresos-comerciales",
    title: "Impresos Comerciales",
    shortTitle: "Impresos",
    category: "Impresión Comercial",
    description:
      "Papelería corporativa, formularios, facturas y todo el material operativo de tu empresa con consistencia de marca total.",
    insight: "La papelería homologada (pantones fijos) mantiene tu marca idéntica en cada tiraje, sin deriva de color.",
    image: "/images/services/stationery.jpg",
    waMessage: WA_MESSAGES.quote("Impresos Comerciales"),
    featured: true,
  },
  {
    id: "libros",
    title: "Libros Emblocados HotMelt/PUR",
    shortTitle: "Libros",
    category: "Impresión Comercial",
    description:
      "Encuadernación perfecta con adhesivos HotMelt y PUR: libros que se abren planos y cuyas hojas jamás se despegan.",
    insight: "El adhesivo PUR soporta ±60 °C y humedad: las páginas aguantan miles de aperturas sin despegarse.",
    image: "/images/services/books.jpg",
    waMessage: WA_MESSAGES.quote("Libros Emblocados HotMelt/PUR"),
  },
  {
    id: "revistas",
    title: "Revistas y Catálogos",
    shortTitle: "Revistas",
    category: "Impresión Comercial",
    description:
      "Publicaciones periódicas con encuadernación a caballete, papel couché y color calibrado de portada a contraportada.",
    insight: "El color calibrado (Fogra) hace que tu portada se vea igual en pantalla, en prueba y en el kiosco.",
    image: "/images/services/magazines.jpg",
    waMessage: WA_MESSAGES.quote("Revistas y Catálogos"),
  },
  {
    id: "calendarios",
    title: "Calendarios",
    shortTitle: "Calendarios",
    category: "Impresión Comercial",
    description:
      "Calendarios corporativos de pared y escritorio que mantienen tu marca visible 365 días frente a tu cliente.",
    insight: "Un calendario corporativo recibe en promedio 6 visitas visuales al día: publicidad que no se apaga.",
    image: "/images/services/calendars.jpg",
    waMessage: WA_MESSAGES.quote("Calendarios"),
  },
  {
    id: "impresion-digital",
    title: "Impresión Digital bajo Demanda",
    shortTitle: "Digital",
    category: "Digital",
    description:
      "Tirajes cortos e imprenta instantánea: imprime solo lo que necesitas, cuando lo necesitas, sin stock muerto.",
    insight: "La impresión bajo demanda elimina el 100 % del inventario obsoleto: se imprime al ritmo de tus ventas.",
    image: "/images/services/digital-print.jpg",
    waMessage: WA_MESSAGES.quote("Impresión Digital bajo Demanda"),
    featured: true,
  },
];

/** ─── SECTORES ATENDIDOS ─────────────────────────────────────────── */
export const SECTORS = [
  { id: "alimentos", label: "Alimentos & Bebidas", detail: "Envases con certificación de grado alimentario" },
  { id: "farmaceutica", label: "Farmacéutica", detail: "Estuches con validación técnica y braille" },
  { id: "editorial", label: "Editorial", detail: "Libros, revistas y catálogos de gran tiraje" },
  { id: "retail", label: "Retail & Promocional", detail: "Bolsas, cajas regalo y campañas de marca" },
  { id: "corporativo", label: "Corporativo", detail: "Papelería y material operativo homologado" },
  { id: "agencias", label: "Agencias de Publicidad", detail: "Producción a todo color con entregas puntuales" },
] as const;

/** ─── PROCESO (funnel educativo hacia WhatsApp) ──────────────────── */
export const PROCESS_STEPS = [
  {
    id: "p1",
    title: "Cuéntanos tu idea",
    detail:
      "Escríbenos por WhatsApp con tu proyecto: tipo de producto, cantidad aproximada y fecha objetivo. No necesitas saber nada de impresión — nuestro equipo te guía.",
    tip: "Mientras más contexto compartas (uso, imagen de referencia, tiraje), más precisa será tu cotización.",
  },
  {
    id: "p2",
    title: "Asesoría y cotización a medida",
    detail:
      "Un asesor especializado revisa tu caso y te envía una propuesta con papel, acabados, tiempos y precio. Todo claro, sin letra chica.",
    tip: "¿Primera vez imprimiendo? Te explicamos cada término (gramaje, pantone, troquel) en palabras simples.",
  },
  {
    id: "p3",
    title: "Producción con estándar SPC",
    detail:
      "Tu proyecto entra a planta con control de calidad en cada etapa: prueba de color, supervisión de máquina y verificación final antes del despacho.",
    tip: "Trabajamos con tecnología de punta e insumos de primera calidad — los más altos estándares de la industria.",
  },
  {
    id: "p4",
    title: "Entrega puntual, donde la necesites",
    detail:
      "Recibes tu producción en tiempo y forma. Y si necesitas reimpresiones o ajustes, ya tienes a tu asesor a un mensaje de distancia.",
    tip: "La puntualidad es uno de nuestros 4 pilares: tu fecha objetivo es un compromiso, no una esperanza.",
  },
] as const;

/** ─── STATS ──────────────────────────────────────────────────────── */
export const STATS = [
  { value: 24, suffix: "", label: "Años de trayectoria", detail: "Desde 2001 en La Paz" },
  { value: 9, suffix: "", label: "Líneas de producto", detail: "Del packaging al digital" },
  { value: 4, suffix: "", label: "Pilares de garantía", detail: "Calidad · Puntualidad · Capacidad · Servicio" },
  { value: 100, suffix: "%", label: "Compromiso", detail: "El factor humano marca la diferencia" },
] as const;

/** ─── NAV ────────────────────────────────────────────────────────── */
export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#sectores", label: "Sectores" },
  { href: "#contacto", label: "Contacto" },
] as const;
