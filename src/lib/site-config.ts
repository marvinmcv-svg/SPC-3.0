/**
 * ══════════════════════════════════════════════════════════════════
 *  SPC IMPRESORES S.A. — Configuración global del sitio
 * ══════════════════════════════════════════════════════════════════
 *  Datos de marca, contacto y funnel de WhatsApp.
 *
 *  NÚMERO DE WHATSAPP: línea comercial +591 77165787
 *  (formato internacional SIN "+", espacios ni guiones en WHATSAPP_NUMBER).
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
  whatsapp: "+591 77165787",
  whatsappHref: "https://wa.me/59177165787",
} as const;

/** ─── FUNNEL DE WHATSAPP ───────────────────────────────────────────
 *  Cambia aquí el número y todos los CTA del sitio se actualizan.
 */
export const WHATSAPP_NUMBER = "59177165787";

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
export type ServiceFaq = { q: string; a: string };

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
  /** Detalle profundo (sección "página completa" por servicio) */
  minRun: string; // tiraje mínimo orientativo
  turnaround: string; // tiempo de producción orientativo
  specs: string[]; // especificaciones técnicas educativas
  useCases: string[]; // casos de uso
  deepFaqs: ServiceFaq[]; // preguntas frecuentes del servicio
  /** Galería de producto real (marcas cliente + fotos de producción) */
  gallery: GalleryImage[];
  /** Clientes (ids de CLIENTS) que imprimen esta línea con SPC */
  brands: string[];
};

export type GalleryImage = {
  src: string;
  alt: string;
  /** Marca del producto mostrado, si aplica */
  brand?: string;
  /** Crédito de la foto (licencias Creative Commons) */
  credit?: string;
};

const SERVICE_DATA: Omit<Service, "gallery" | "brands">[] = [
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
    minRun: "1.000 unidades (orientativo)",
    turnaround: "7 – 12 días hábiles según acabados",
    specs: [
      "Cartulinas de 250 a 450 g con barreras de grado alimentario",
           "Tintas y barnices de base agua aptos para contacto directo con alimentos",
      "Troquelado y hendido de precisión para envasado automático o manual",
      "Opciones de laminado mate, brillante y soft-touch",
      "Impresión CMYK + pantones planos de marca",
    ],
    useCases: [
      "Cajas primarias para panificados, galletas y snacks",
      "Envases para lácteos, conservas y bebidas",
      "Sleeves y banderolas promocionales de temporada",
    ],
    deepFaqs: [
      {
        q: "¿Qué significa “grado alimentario” en la tinta?",
        a: "Son tintas formuladas con pigmentos de baja migración: cumplen normas internacionales que garantizan que ninguna sustancia del impreso pasa al alimento, incluso en contacto directo y a temperatura ambiente o refrigerada.",
      },
      {
        q: "¿Pueden producir para mi línea de envasado automático?",
        a: "Sí. El troquel de precisión garantiza que cada caja se doble y encaje sin variaciones, requisito para líneas de envasado de alta velocidad. Coordinamos las especificaciones de tu máquina antes de producir.",
      },
    ],
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
    minRun: "5.000 unidades (orientativo)",
    turnaround: "10 – 15 días hábiles con validación",
    specs: [
      "Estuches con validación técnica y control de lote incorporado",
      "Numeración y código de serie para trazabilidad",
      "Braille opcional conforme a normativas de accesibilidad",
      "Cartulinas blancas de alta blancura para legibilidad médica",
      "Proof de color certificado antes de tiraje",
    ],
    useCases: [
      "Estuches para medicamentos de venta libre y controlados",
      "Empaques para suplementos y productos hospitalarios",
      "Insertos y prospectos informativos (IFU)",
    ],
    deepFaqs: [
      {
        q: "¿Qué es el braille en estuches y es obligatorio?",
        a: "El braille impreso en el estuche permite identificar el medicamento a personas con discapacidad visual. En muchos mercados es exigido por normativa farmacéutica; lo integramos en el troquel sin costo adicional de estructura.",
      },
      {
        q: "¿Cómo garantizan la trazabilidad de lotes?",
        a: "Cada tiraje se produce bajo control de lote: el número se imprime en línea y queda registrado en nuestro sistema de calidad, de modo que todo estuche sea rastreable de principio a fin.",
      },
    ],
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
    minRun: "500 unidades (orientativo)",
    turnaround: "5 – 10 días hábiles",
    specs: [
      "Cajas regalo con ventana, asa o compartimentos internos",
      "Displays de piso y mostrador para retail",
      "Acentos en hot stamping, UV selectivo y láminas metálicas",
      "Estructuras especiales diseñadas a medida de tu producto",
      "Kits de unboxing para campañas y e-commerce",
    ],
    useCases: [
      "Ediciones especiales y lanzamientos de temporada",
      "Cajas de regalo corporativas para fechas clave",
      "Displays promocionales para puntos de venta",
    ],
    deepFaqs: [
      {
        q: "¿Pueden diseñar la estructura de mi caja?",
        a: "Sí. Nuestro equipo técnico desarrolla el troquel y el dummy físico para que valides volúmenes, resistencia y estética antes de la producción final.",
      },
      {
        q: "¿Qué acabado me recomiendan para premium?",
        a: "La combinación laminado mate + UV selectivo o hot stamping metálico genera el contraste táctil y visual más asociado a marcas de gama alta. En asesoría te mostramos muestras físicas.",
      },
    ],
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
    minRun: "1.000 unidades (orientativo)",
    turnaround: "7 – 10 días hábiles",
    specs: [
      "Papel kraft y sulfatado desde 120 g (soporta hasta 8 kg)",
      "Asas de papel trenzado, cinta o asa troquelada integrada",
      "Impresión a 1 a 4 tintas con tintas eco-solventes de base agua",
      "Formatos desde boutique hasta bolsa de supermercado",
      "Opción de fondo reforzado para mayor carga",
    ],
    useCases: [
      "Bolsas para tiendas de moda, farmacias y delivery",
      "Bolsas ecológicas para retail y supermercados",
      "Ediciones de temporada para campañas de marca",
    ],
    deepFaqs: [
      {
        q: "¿Las bolsas de papel son realmente más ecológicas?",
        a: "El papel es renovable, biodegradable y reciclable; con gramajes desde 120 g logras resistencia comparable al plástico de un solo uso. Además, tu marca gana percepción de responsabilidad ambiental.",
      },
      {
        q: "¿Puedo pedir varios tamaños con el mismo diseño?",
        a: "Sí, adaptamos el arte a cada formato manteniendo la proporción de marca. Es la práctica habitual para líneas de retail con varios tipos de producto.",
      },
    ],
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
    minRun: "500 unidades (orientativo)",
    turnaround: "4 – 8 días hábiles",
    specs: [
      "Papelería corporativa con pantones fijos homologados",
      "Formularios continuos, facturas y documentos de seguridad",
      "Numeración correlativa, troquelado y engrapado",
      "Papeles bond, offset y couché de primera calidad",
      "Control de deriva de color entre tirajes",
    ],
    useCases: [
      "Hojas membretadas, sobres y tarjetas de presentación",
      "Facturas, recibos y formularios operativos",
      "Manuales internos y carpetas corporativas",
    ],
    deepFaqs: [
      {
        q: "¿Por qué importa la “deriva de color” entre tirajes?",
        a: "Si cada pedido sale con un azul distinto, tu marca se percibe descuidada. Con pantones homologados y controles de densidad, tu papelería se ve idéntica hoy, en 6 meses y en 2 años.",
      },
      {
        q: "¿Pueden entregar por departamentos a nivel nacional?",
        a: "Sí. Coordinamos entregas segmentadas a tus sucursales con empaquetado identificado por destino — un solo pedido, distribución nacional.",
      },
    ],
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
    minRun: "300 ejemplares (orientativo)",
    turnaround: "10 – 15 días hábiles",
    specs: [
      "Encuadernación perfecta (tapa rústica) con adhesivo HotMelt o PUR",
      "PUR: páginas que aguantan miles de aperturas sin despegarse",
      "Lomo cuadrado con texto y logos en relieve opcional",
      "Guardas, cabezadas y cintas marcadoras para ediciones premium",
      "Formatos estándar y a medida, papel book bulk o bulk alto",
    ],
    useCases: [
      "Libros de texto y educativos para colegios y universidades",
      "Novelas, poesía y literatura general",
      "Memorias corporativas y libros de aniversario",
    ],
    deepFaqs: [
      {
        q: "¿Qué diferencia hay entre HotMelt y PUR?",
        a: "El HotMelt es un adhesivo termofusible de excelente relación costo-rendimiento. El PUR es un polímero de uretano con adherencia superior: resiste ±60 °C, humedad y miles de aperturas — ideal para libros de uso intenso como los escolares.",
      },
      {
        q: "¿Puedo imprimir primero una edición corta de prueba?",
        a: "Sí. Combinamos tiraje offset con la opción digital bajo demanda para ediciones piloto; luego escalas el volumen cuando el libro despegue.",
      },
    ],
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
    minRun: "500 ejemplares (orientativo)",
    turnaround: "6 – 12 días hábiles",
    specs: [
      "Encuadernación a caballete (grapas) o emblocado según páginas",
      "Papel couché de 90 a 170 g con color calibrado Fogra",
      "Portadas en cartulina de 200 a 300 g con laminado",
      "Corte a sangre y paginación profesional",
      "Distribución por paquetes identificados para puntos de venta",
    ],
    useCases: [
      "Revistas corporativas y de membresía",
      "Catálogos de producto para retail y ferias",
      "Publicaciones periódicas de gremios e instituciones",
    ],
    deepFaqs: [
      {
        q: "¿Qué es el color calibrado Fogra y por qué me importa?",
        a: "Es un estándar internacional que fija cómo debe verse el color en impresión offset. Al calibrar contra Fogra, tu portada se ve igual en pantalla, en la prueba y en el ejemplar final — sin sorpresas.",
      },
      {
        q: "¿Caballete o emblocado: cuál me conviene?",
        a: "El caballete (grapas al centro) es económico y ideal hasta ~64 páginas. El emblocado da lomo cuadrado, más elegante y resistente, y permite más páginas. Te recomendamos según tu proyecto y presupuesto.",
      },
    ],
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
    minRun: "200 unidades (orientativo)",
    turnaround: "5 – 8 días hábiles",
    specs: [
      "Calendarios de pared (tapas + 12 hojas) y de escritorio",
      "Espiral metálico o plástico y colgador reforzado",
      "Fechas personalizadas: días festivos y aniversarios de tu empresa",
      "Cartulina de 200 a 300 g con laminado opcional",
      "Formatos clásicos o a medida (base triangular para escritorio)",
    ],
    useCases: [
      "Regalo corporativo de fin de año para clientes y aliados",
      "Calendarios promocionales con imágenes de campaña",
      "Agendas y planners corporativos de marca",
    ],
    deepFaqs: [
      {
        q: "¿Por qué un calendario es buena inversión publicitaria?",
        a: "Recibe en promedio 6 vistas diarias durante 365 días: cuesta centavos por contacto y mantiene tu marca en el escritorio del decisor de compra todo el año.",
      },
      {
        q: "¿Pueden imprimir mis fechas importantes?",
        a: "Sí. Además del calendario estándar, incorporamos días festivos bolivianos, aniversarios corporativos y fechas de tu industria marcadas a color.",
      },
    ],
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
    minRun: "1 unidad — imprime solo lo que necesitas",
    turnaround: "24 – 72 horas",
    specs: [
      "Tirajes cortos sin chapas ni films: cambios de arte al instante",
      "Impresión digital de calidad offset para 1 a 1.000 unidades",
      "Datos variables: nombres, códigos y numeración única por pieza",
      "Papeles especiales, adhesivos y sintéticos disponibles",
      "Reimpresión exacta bajo pedido: cero stock muerto",
    ],
    useCases: [
      "Prototipos de packaging antes del tiraje grande",
      "Invitaciones, credenciales y material personalizado",
      "Reposición rápida de existencias sin sobre-stock",
    ],
    deepFaqs: [
      {
        q: "¿Cuándo conviene digital y cuándo offset?",
        a: "Regla práctica: digital para tirajes cortos (1 a ~500 según formato) o artes con datos variables; offset para volúmenes grandes, donde el costo unitario baja y los pantones exactos son obligatorios.",
      },
      {
        q: "¿Qué son los “datos variables”?",
        a: "Es la capacidad de imprimir una pieza distinta en cada ejemplar: nombres de destinatarios, códigos QR únicos o numeración de seguridad — imposible con impresión tradicional y clave para personalización y trazabilidad.",
      },
    ],
  },
];

/** ─── GALERÍAS DE PRODUCTO REAL POR SERVICIO ─────────────────────
 *  Fotos de producto de marcas cliente (estuches, libros…) + fotos de
 *  producción con licencia Creative Commons (crédito en `credit`).
 */
const CBN_CREDIT_PACENA = "Foto: Erik Cleves Kristensen · CC BY 2.0 (Wikimedia Commons)";
const CBN_CREDIT_TAQUINA = "Foto: Sasha India · CC BY 2.0 (Wikimedia Commons)";

const SERVICE_GALLERIES: Record<string, GalleryImage[]> = {
  "packaging-alimentos": [
    { src: "/images/products/food-cbn-pacena-botella.jpg", alt: "Cerveza Paceña — botella y etiqueta de marca", brand: "Paceña · CBN", credit: CBN_CREDIT_PACENA },
    { src: "/images/products/food-cbn-pacena-lata.jpg", alt: "Lata de cerveza Paceña Pilsener", brand: "Paceña · CBN" },
    { src: "/images/products/food-cbn-chicha-taquina.jpg", alt: "Chicha de maíz Taquiña — gráfica de lata", brand: "Taquiña · CBN" },
    { src: "/images/products/food-copacabana-papas.jpg", alt: "Caja de papas fritas de grado alimentario", brand: "Pollos Copacabana" },
    { src: "/images/products/food-cbn-huari.jpg", alt: "Cerveza Huari Lager", brand: "Huari · CBN" },
    { src: "/images/products/food-cbn-taquina-botella.jpg", alt: "Cerveza Taquiña servida en mesa boliviana", brand: "Taquiña · CBN", credit: CBN_CREDIT_TAQUINA },
  ],
  "packaging-farmaceutico": [
    { src: "/images/products/pharma-vita-azitrovita.jpg", alt: "Estuche AzitroVITA 500 mg", brand: "Laboratorios Vita" },
    { src: "/images/products/pharma-vita-alcabol.jpg", alt: "Estuche y frasco Alca Bol granulado", brand: "Laboratorios Vita" },
    { src: "/images/products/pharma-vita-jarabe-miel.jpg", alt: "Estuche de jarabe de miel de abejas y eucalipto", brand: "Laboratorios Vita" },
    { src: "/images/products/pharma-vita-alerden.jpg", alt: "Estuche y frasco Alerden VITA", brand: "Laboratorios Vita" },
    { src: "/images/products/pharma-vita-nasal.jpg", alt: "Estuche Nasal Fisiológico VITA", brand: "Laboratorios Vita" },
    { src: "/images/products/pharma-vita-digestan-sobre.jpg", alt: "Sobre Digestan Compuesto efervescente", brand: "Laboratorios Vita" },
    { src: "/images/products/pharma-inti-mentisan.jpg", alt: "Potes de Mentisan en línea de producción", brand: "Droguería Inti" },
    { src: "/images/products/pharma-vita-calmitol.jpg", alt: "Estuche Calmitol-n con blíster", brand: "Laboratorios Vita" },
    { src: "/images/products/pharma-vita-calcio.jpg", alt: "Caja de Calcio Gluconato 10 % inyectable", brand: "Laboratorios Vita" },
    { src: "/images/products/pharma-vita-bicarbonato.jpg", alt: "Caja de Bicarbonato de sodio 8 %", brand: "Laboratorios Vita" },
  ],
  "packaging-comercial": [
    { src: "/images/products/promo-cbn-portafolio.jpg", alt: "Portafolio de marcas CBN: Paceña, Huari, Pepsi, Somos y más", brand: "CBN" },
    { src: "/images/products/promo-inti-caja-regalo.jpg", alt: "Caja regalo corporativa INTI", brand: "Droguería Inti" },
    { src: "/images/products/promo-vita-digestan-linea.jpg", alt: "Línea Digestan: sobres promocionales", brand: "Laboratorios Vita" },
    { src: "/images/products/promo-copacabana-balde.jpg", alt: "Campaña con balde y caja impresos de marca", brand: "Pollos Copacabana" },
  ],
  "paper-bags": [
    { src: "/images/services/paper-bags.jpg", alt: "Bolsas de papel con asas" },
  ],
  "impresos-comerciales": [
    { src: "/images/products/print-inti-muestra-paneles.jpg", alt: "Paneles impresos de la muestra 90 años de INTI", brand: "Droguería Inti" },
    { src: "/images/services/stationery.jpg", alt: "Papelería corporativa homologada" },
  ],
  libros: [
    { src: "/images/products/book-gisbert-historia-bolivia.jpg", alt: "Historia de Bolivia — Editorial Gisbert", brand: "Editorial Gisbert" },
    { src: "/images/products/book-gisbert-madidi.jpg", alt: "Madidi — libro de gran formato", brand: "Editorial Gisbert" },
    { src: "/images/products/book-gisbert-baldor.jpg", alt: "Aritmética de Baldor, 3.ª edición", brand: "Editorial Gisbert" },
    { src: "/images/products/book-gisbert-politicas.jpg", alt: "Breve historia de las políticas públicas en Bolivia", brand: "Editorial Gisbert" },
    { src: "/images/products/book-gisbert-esfera.jpg", alt: "La esfera de cristal — literatura infantil", brand: "Editorial Gisbert" },
    { src: "/images/products/book-gisbert-cuento.jpg", alt: "El cuento que nunca se contó", brand: "Editorial Gisbert" },
  ],
  revistas: [
    { src: "/images/products/mag-lostiempos-oh-nov.jpg", alt: "Revista OH! — portada de noviembre", brand: "Los Tiempos" },
    { src: "/images/products/mag-lostiempos-oh-oct.jpg", alt: "Revista OH! — portada de octubre", brand: "Los Tiempos" },
    { src: "/images/products/mag-lostiempos-portada.jpg", alt: "Portada del diario Los Tiempos", brand: "Los Tiempos" },
  ],
  calendarios: [
    { src: "/images/services/calendars.jpg", alt: "Calendarios corporativos de pared y escritorio" },
  ],
  "impresion-digital": [
    { src: "/images/products/digital-inti-backdrop-evento.jpg", alt: "Backdrop impreso para evento corporativo INTI", brand: "Droguería Inti" },
    { src: "/images/services/digital-print.jpg", alt: "Impresión digital bajo demanda" },
  ],
};

/** Qué marcas cliente imprimen cada línea (ids de CLIENTS) */
const SERVICE_BRANDS: Record<string, string[]> = {
  "packaging-alimentos": ["cbn", "pil-andina", "delicia", "arcor", "coripati"],
  "packaging-farmaceutico": ["vita", "bago", "inti", "terbol"],
  "packaging-comercial": ["arcor", "cbn", "hipermaxi", "copacabana"],
  "paper-bags": ["hipermaxi", "icnorte", "copacabana"],
  "impresos-comerciales": ["bnb", "icnorte", "hipermaxi", "inti"],
  libros: ["gisbert"],
  revistas: ["eldeber", "lostiempos", "gisbert"],
  calendarios: ["bnb", "cbn", "vita", "terbol"],
  "impresion-digital": ["eldeber", "hipermaxi", "bnb"],
};

export const SERVICES: Service[] = SERVICE_DATA.map((s) => ({
  ...s,
  gallery: SERVICE_GALLERIES[s.id] ?? [{ src: s.image, alt: s.title }],
  brands: SERVICE_BRANDS[s.id] ?? [],
}));

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

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
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios", mega: true },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/clientes", label: "Clientes" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** ─── CLIENTES — marcas nacionales que imprimen con SPC ──────────────
 *  Nota: reemplaza `name`/`note` por tu cartera real si cambia.
 *  El monograma usa el color corporativo de cada marca.
 */
export type Client = {
  id: string;
  name: string;
  sector: "Alimentos & Bebidas" | "Farmacéutica" | "Retail & QSR" | "Editorial & Medios" | "Banca & Finanzas";
  initials: string;
  color: string;
  note: string;
  /** Logo oficial (en /public/images/clients). Sin logo → monograma de marca */
  logo?: string;
};

export const CLIENTS: readonly Client[] = [
  { id: "cbn", name: "Cervecería Boliviana Nacional", sector: "Alimentos & Bebidas", initials: "CBN", color: "#d6001c", note: "Cajas y cartones para sus marcas Paceña y Taquiña" },
  { id: "pil-andina", name: "Pil Andina", sector: "Alimentos & Bebidas", initials: "PA", color: "#004b93", note: "Etiquetas y envases para bebidas Pepsico" },
  { id: "delicia", name: "Delicia", sector: "Alimentos & Bebidas", initials: "D", color: "#e30613", note: "Packaging de galletas, chocolates y confitería" },
  { id: "arcor", logo: "/images/clients/arcor.png", name: "Arcor Bolivia", sector: "Alimentos & Bebidas", initials: "A", color: "#e2001a", note: "Estuches y displays para golosinas" },
  { id: "coripati", name: "Fideos Coripati", sector: "Alimentos & Bebidas", initials: "FC", color: "#f5a300", note: "Envases para líneas de pastas alimenticias" },
  { id: "bago", logo: "/images/clients/bago.svg", name: "Laboratorios Bagó", sector: "Farmacéutica", initials: "B", color: "#00539f", note: "Estuches de medicamentos con validación técnica" },
  { id: "inti", logo: "/images/clients/inti.png", name: "Droguería Inti", sector: "Farmacéutica", initials: "DI", color: "#e94e1b", note: "Packaging farmacéutico con trazabilidad de lote" },
  { id: "terbol", logo: "/images/clients/terbol.png", name: "Laboratorios Terbol", sector: "Farmacéutica", initials: "T", color: "#00a5a8", note: "Estuches e insertos para línea médica" },
  { id: "vita", logo: "/images/clients/vita.png", name: "Laboratorios Vita", sector: "Farmacéutica", initials: "V", color: "#009640", note: "Envases y prospectos farmacéuticos" },
  { id: "hipermaxi", logo: "/images/clients/hipermaxi.png", name: "Hipermaxi", sector: "Retail & QSR", initials: "H", color: "#e2001a", note: "Bolsas de papel y material promocional de marca" },
  { id: "icnorte", logo: "/images/clients/icnorte.png", name: "IC Norte", sector: "Retail & QSR", initials: "ICN", color: "#005baa", note: "Impresos corporativos y campañas de temporada" },
  { id: "copacabana", name: "Pollos Copacabana", sector: "Retail & QSR", initials: "PC", color: "#ed1c24", note: "Envases e impresos para puntos de venta" },
  { id: "lostiempos", logo: "/images/clients/lostiempos.png", name: "Los Tiempos", sector: "Editorial & Medios", initials: "LT", color: "#123a86", note: "Diarios, suplementos y ediciones especiales" },
  { id: "eldeber", logo: "/images/clients/eldeber.png", name: "El Deber", sector: "Editorial & Medios", initials: "ED", color: "#c8102e", note: "Publicaciones periódicas y revistas" },
  { id: "gisbert", logo: "/images/clients/gisbert.png", name: "Editorial Gisbert", sector: "Editorial & Medios", initials: "EG", color: "#8a4b2a", note: "Libros de texto emblocados HotMelt/PUR" },
  { id: "bnb", name: "Banco Nacional de Bolivia", sector: "Banca & Finanzas", initials: "BNB", color: "#0033a0", note: "Papelería corporativa homologada y documentos" },
];

export function getClient(id: string): Client | undefined {
  return CLIENTS.find((c) => c.id === id);
}

/** ─── TESTIMONIOS de clientes ──────────────────────────────────────
 *  ⚠️ Contenido representativo: reemplaza por reseñas verificadas
 *  reales de tus clientes antes de publicar.
 */
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  stars: 5;
  quote: string;
  service: string;
};

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Marcela R.",
    role: "Gerente de Marca",
    company: "Cervecería Boliviana Nacional",
    city: "La Paz",
    stars: 5,
    quote:
      "Cada lanzamiento de temporada es una carrera contra el reloj y SPC nunca nos ha fallado. Las cajas llegan impecables, con el color exacto aprobado en prueba. Eso, a nuestra escala, no tiene precio.",
    service: "Packaging de Alimentos",
  },
  {
    id: "t2",
    name: "Rodrigo M.",
    role: "Responsable de Compras Técnicas",
    company: "Droguería Inti",
    city: "La Paz",
    stars: 5,
    quote:
      "En farmacia no hay margen para la improvisación: braille, lotes y validación tienen que salir perfectos. SPC entiende el estándar y lo cumple tiraje tras tiraje. Llevamos años trabajando así.",
    service: "Packaging Farmacéutico",
  },
  {
    id: "t3",
    name: "Carla S.",
    role: "Editora General",
    company: "Editorial Gisbert",
    city: "La Paz",
    stars: 5,
    quote:
      "Los libros escolares pasan por manos de cientos de estudiantes. Con la encuadernación PUR de SPC, en años de uso no se nos ha despegado una sola página. La puntualidad en entregas de inicio de gestión es otro nivel.",
    service: "Libros Emblocados PUR",
  },
  {
    id: "t4",
    name: "Javier T.",
    role: "Gerente de Marketing",
    company: "Hipermaxi",
    city: "Santa Cruz",
    stars: 5,
    quote:
      "Pedimos bolsas de papel para toda la cadena a nivel nacional y la logística de entrega por sucursal funcionó impecable. La calidad del impreso hace que el cliente se lleve la marca puesta en la mano.",
    service: "Paper Bags",
  },
  {
    id: "t5",
    name: "Andrea P.",
    role: "Directora de Arte",
    company: "Agencia de Publicidad",
    city: "Cochabamba",
    stars: 5,
    quote:
      "Como agencia, nuestra reputación se juega en cada pieza que sale a calle. El color calibrado de SPC es nuestro respaldo: lo que aprobamos en pantalla es lo que se imprime. Nuestros clientes ya lo saben.",
    service: "Revistas y Catálogos",
  },
  {
    id: "t6",
    name: "Luis F.",
    role: "Coordinador de Producción Editorial",
    company: "El Deber",
    city: "Santa Cruz",
    stars: 5,
    quote:
      "Imprimimos con ellos ediciones especiales y suplementos con fechas cerradas. La capacidad de planta de SPC nos da la tranquilidad de que, pase lo que pase, el domingo sale el diario.",
    service: "Impresión Comercial",
  },
] as const;

/** ─── FAQ GENERAL (educativa + alimenta a SPC AI) ────────────────── */
export const GENERAL_FAQS = [
  {
    q: "¿Qué servicios ofrece SPC exactamente?",
    a: "Nueve líneas de producto en tres frentes: Packaging (alimentos, farmacéutico, comercial/promocional y paper bags), Impresión Comercial (impresos corporativos, libros emblocados HotMelt/PUR, revistas y catálogos, calendarios) e Impresión Digital bajo demanda para tirajes cortos.",
  },
  {
    q: "¿Cuál es el tiraje mínimo para imprimir?",
    a: "Depende de la línea: en digital bajo demanda puedes imprimir desde 1 unidad; en offset los mínimos orientativos arrancan entre 200 y 5.000 unidades según el producto. La cotización es gratuita y sin compromiso.",
  },
  {
    q: "¿Cuánto tarda un pedido?",
    a: "Orientativamente: digital 24–72 horas, impresos comerciales 4–8 días, packaging 5–15 días según acabados y validaciones. Tu fecha objetivo se define en la cotización y la tratamos como compromiso.",
  },
  {
    q: "¿Cuánto cuesta imprimir mi proyecto?",
    a: "El precio depende de tiraje, formato, papel, tintas y acabados — por eso cotizamos a medida. Escríbenos por WhatsApp con una descripción o foto de referencia y recibirás una propuesta clara, sin letra chica.",
  },
  {
    q: "¿Qué archivos debo enviar para imprimir?",
    a: "Lo ideal: PDF en CMYK a 300 dpi con 3 mm de sangrado y fuentes convertidas a curvas. ¿No sabes qué es eso? No te preocupes: nuestro equipo revisa tu arte gratis y te guía para que salga perfecto.",
  },
  {
    q: "¿Puedo ver una prueba de color antes del tiraje?",
    a: "Sí. En offset trabajamos con pruebas de color certificadas: apruebas cómo se verá tu pieza y solo entonces entra a producción. Lo que ves en la prueba es lo que recibes.",
  },
  {
    q: "¿Entregan en el interior del país?",
    a: "Sí, despachamos a los nueve departamentos de Bolivia. Podemos segmentar la entrega por sucursal o ciudad con empaquetado identificado por destino.",
  },
  {
    q: "¿Dónde están ubicados y cuál es su horario?",
    a: "Nuestra planta y oficinas están en Av. Saavedra N.º 2411 (final), zona Miraflores, La Paz. Horario: lunes a viernes de 8:00 a 18:00. También puedes escribirnos por WhatsApp y te respondemos en minutos.",
  },
  {
    q: "¿Puedo cotizar sin compromiso?",
    a: "Claro. La asesoría y la cotización son gratuitas y sin compromiso. Cuéntanos tu idea por WhatsApp y un asesor especializado te responde con propuesta de papel, acabados, tiempos y precio.",
  },
  {
    q: "¿Trabajan con agencias y diseñadores freelance?",
    a: "Sí, somos aliados de agencias de publicidad, diseñadores y áreas de marketing. Ofrecemos atención prioritaria, pruebas certificadas y producción bajo estándar que puedes prometerle a tu cliente.",
  },
] as const;

/** ─── SPenCer — recepcionista con IA + funnel de ventas ────────────
 *  SPenCer guía al visitante en 5 pasos (servicio → cantidad → fecha →
 *  extras → datos) y cierra entregando el brief completo por WhatsApp.
 */
export const AI_RECEPTIONIST = {
  name: "SPenCer",
  role: "Recepcionista IA de SPC",
  tagline: "Cotiza en 60 segundos, 24/7",
  greeting:
    "¡Hola! 👋 Soy **SPenCer**, el recepcionista con IA de SPC Impresores. En menos de un minuto armo tu solicitud de cotización y te conecto con un asesor por WhatsApp. **¿Qué te gustaría imprimir?**",
  quickQuestions: [
    "¿Qué servicios tienen?",
    "¿Cómo pido una cotización?",
    "¿Qué archivos debo enviar?",
    "¿Hacen envíos al interior del país?",
  ],
  disclaimer: "SPenCer orienta y arma tu brief. Precios y fechas finales los confirma un asesor humano por WhatsApp.",
} as const;

/** Opciones del funnel de SPenCer */
export const FUNNEL = {
  quantities: ["Menos de 500", "500 – 2.000", "2.000 – 10.000", "Más de 10.000", "Aún no lo sé"],
  deadlines: ["Esta semana (urgente)", "En 2 semanas", "Este mes", "Sin fecha fija"],
  extras: ["Necesito diseño", "Muestra / prueba de color", "Acabado premium", "Entrega fuera de La Paz", "Datos variables / numeración"],
  cities: ["La Paz", "El Alto", "Santa Cruz", "Cochabamba", "Oruro", "Potosí", "Sucre", "Tarija", "Beni", "Pando"],
} as const;
