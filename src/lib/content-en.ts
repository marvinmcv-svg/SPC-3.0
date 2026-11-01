/**
 * ══════════════════════════════════════════════════════════════════
 *  ENGLISH CONTENT — traducciones de los datos de site-config.ts
 *  Cada bloque se indexa por el mismo id que su versión en español.
 * ══════════════════════════════════════════════════════════════════
 */

import type { Client, ServiceFaq } from "./site-config";

export const WA_MESSAGES_EN = {
  general: "Hi SPC Gráfica Industrial! 👋 I saw your website and I'd like a quote for a printing project.",
  services: "Hi SPC! 👋 I'm exploring your services and would like advice for my project.",
  quote: (service: string) =>
    `Hi SPC! 👋 I'm interested in a quote for *${service}*. Could you share more details on lead times and pricing?`,
  process: "Hi SPC! 👋 I want to start a project with you. How does the quoting process work?",
  packaging: "Hi SPC! 👋 I have a *packaging* project (food / pharma / promotional) and would like technical advice.",
  commercial: "Hi SPC! 👋 I need commercial printing: books, magazines, catalogs or corporate materials. Can you help with a quote?",
  digital: "Hi SPC! 👋 I'm interested in *on-demand digital printing* for short runs. What options do you offer?",
  final: "Hi SPC! 👋 I'm ready to print my next project with you. How do we get started?",
} as const;

export const CATEGORY_EN = {
  Packaging: "Packaging",
  "Impresión Comercial": "Commercial Print",
  Digital: "Digital",
} as const;

type ServiceText = {
  title: string;
  shortTitle: string;
  description: string;
  insight: string;
  minRun: string;
  turnaround: string;
  specs: string[];
  useCases: string[];
  deepFaqs: ServiceFaq[];
};

export const SERVICES_EN: Record<string, ServiceText> = {
  "packaging-alimentos": {
    title: "Food Packaging",
    shortTitle: "Food",
    description: "Primary boxes and packs printed with food-grade inks, safe for direct food contact and freshness sealing.",
    insight: "Food-grade inks meet migration standards: color never transfers to the product.",
    minRun: "1,000 units (approx.)",
    turnaround: "7 – 12 business days depending on finishes",
    specs: [
      "250 – 450 gsm boards with food-grade barriers",
      "Water-based inks and varnishes approved for direct food contact",
      "Precision die-cutting and creasing for automatic or manual packing",
      "Matte, gloss and soft-touch lamination options",
      "CMYK printing plus brand spot colors",
    ],
    useCases: [
      "Primary boxes for baked goods, cookies and snacks",
      "Packs for dairy, canned goods and beverages",
      "Seasonal promotional sleeves and banners",
    ],
    deepFaqs: [
      {
        q: "What does “food-grade” ink mean?",
        a: "These inks use low-migration pigments and meet international standards guaranteeing that nothing from the print transfers to the food — even in direct contact, at room or refrigerated temperature.",
      },
      {
        q: "Can you produce for my automatic packing line?",
        a: "Yes. Precision die-cutting ensures every box folds and locks without variation, a must for high-speed packing lines. We align with your machine specs before production.",
      },
    ],
  },
  "packaging-farmaceutico": {
    title: "Pharmaceutical Packaging",
    shortTitle: "Pharma",
    description: "Technically validated cartons for the pharmaceutical industry: precision die-cutting, batch codes and optional braille.",
    insight: "Precision die-cutting guarantees every carton folds perfectly, with zero variation on the line.",
    minRun: "5,000 units (approx.)",
    turnaround: "10 – 15 business days including validation",
    specs: [
      "Cartons with technical validation and built-in batch control",
      "Numbering and serial codes for traceability",
      "Optional braille in line with accessibility regulations",
      "High-whiteness boards for medical legibility",
      "Certified color proof before the print run",
    ],
    useCases: [
      "Cartons for OTC and prescription medicines",
      "Packaging for supplements and hospital products",
      "Package inserts and patient leaflets (IFU)",
    ],
    deepFaqs: [
      {
        q: "What is braille on cartons and is it mandatory?",
        a: "Braille printed on the carton lets visually impaired people identify the medicine. Many markets require it by pharmaceutical regulation; we build it into the die at no extra structural cost.",
      },
      {
        q: "How do you guarantee batch traceability?",
        a: "Every run is produced under batch control: the number is printed inline and logged in our quality system, so each carton is traceable end to end.",
      },
    ],
  },
  "packaging-comercial": {
    title: "Retail & Promotional Packaging",
    shortTitle: "Retail",
    description: "Gift boxes, displays and promotional packs that elevate the brand experience in retail and campaigns.",
    insight: "Great unboxing multiplies perceived value: packaging is your brand's first handshake.",
    minRun: "500 units (approx.)",
    turnaround: "5 – 10 business days",
    specs: [
      "Gift boxes with windows, handles or inner compartments",
      "Floor and counter displays for retail",
      "Hot-stamping, spot UV and metallic foil accents",
      "Custom structures designed around your product",
      "Unboxing kits for campaigns and e-commerce",
    ],
    useCases: [
      "Special editions and seasonal launches",
      "Corporate gift boxes for key dates",
      "Promotional displays for points of sale",
    ],
    deepFaqs: [
      {
        q: "Can you design my box structure?",
        a: "Yes. Our technical team develops the die-line and a physical dummy so you can validate volume, strength and look before final production.",
      },
      {
        q: "Which finish do you recommend for premium?",
        a: "Matte lamination plus spot UV or metallic hot-stamping creates the tactile and visual contrast most associated with high-end brands. We'll show you physical samples.",
      },
    ],
  },
  "paper-bags": {
    title: "Paper Bags",
    shortTitle: "Paper Bags",
    description: "Paper bags with handles, in sturdy weights and branded finishes — the eco-friendly, elegant choice for retail.",
    insight: "Kraft paper from 120 gsm can carry up to 8 kg: eco-friendly and strong at the same time.",
    minRun: "1,000 units (approx.)",
    turnaround: "7 – 10 business days",
    specs: [
      "Kraft and coated paper from 120 gsm (carries up to 8 kg)",
      "Twisted paper, ribbon or die-cut integrated handles",
      "1 to 4-color printing with water-based eco inks",
      "Formats from boutique to supermarket bags",
      "Reinforced base option for heavier loads",
    ],
    useCases: [
      "Bags for fashion stores, pharmacies and delivery",
      "Eco bags for retail and supermarkets",
      "Seasonal editions for brand campaigns",
    ],
    deepFaqs: [
      {
        q: "Are paper bags really more eco-friendly?",
        a: "Paper is renewable, biodegradable and recyclable; from 120 gsm you get strength comparable to single-use plastic. Your brand also gains an image of environmental responsibility.",
      },
      {
        q: "Can I order several sizes with the same design?",
        a: "Yes, we adapt the artwork to each format while keeping brand proportions — standard practice for retail lines with several product types.",
      },
    ],
  },
  "impresos-comerciales": {
    title: "Commercial Printing",
    shortTitle: "Stationery",
    description: "Corporate stationery, forms, invoices and all your company's operational materials with total brand consistency.",
    insight: "Standardized stationery (fixed Pantones) keeps your brand identical on every run, with no color drift.",
    minRun: "500 units (approx.)",
    turnaround: "4 – 8 business days",
    specs: [
      "Corporate stationery with approved fixed Pantones",
      "Continuous forms, invoices and security documents",
      "Sequential numbering, die-cutting and stapling",
      "Premium bond, offset and coated papers",
      "Color-drift control between runs",
    ],
    useCases: [
      "Letterheads, envelopes and business cards",
      "Invoices, receipts and operational forms",
      "Internal manuals and corporate folders",
    ],
    deepFaqs: [
      {
        q: "Why does “color drift” between runs matter?",
        a: "If every order comes out a different blue, your brand looks careless. With approved Pantones and density control, your stationery looks identical today, in 6 months and in 2 years.",
      },
      {
        q: "Can you deliver to different departments nationwide?",
        a: "Yes. We coordinate split deliveries to your branches with packages labeled by destination — one order, national distribution.",
      },
    ],
  },
  libros: {
    title: "HotMelt/PUR Perfect-Bound Books",
    shortTitle: "Books",
    description: "Perfect binding with HotMelt and PUR adhesives: books that open flat and whose pages never come loose.",
    insight: "PUR adhesive withstands ±60 °C and humidity: pages survive thousands of openings without coming loose.",
    minRun: "300 copies (approx.)",
    turnaround: "10 – 15 business days",
    specs: [
      "Perfect binding (softcover) with HotMelt or PUR adhesive",
      "PUR: pages that survive thousands of openings",
      "Square spine with optional embossed text and logos",
      "Endpapers, headbands and ribbon markers for premium editions",
      "Standard and custom formats, book bulk or high-bulk paper",
    ],
    useCases: [
      "Textbooks for schools and universities",
      "Novels, poetry and general literature",
      "Corporate memoirs and anniversary books",
    ],
    deepFaqs: [
      {
        q: "What's the difference between HotMelt and PUR?",
        a: "HotMelt is a hot-melt adhesive with an excellent cost-performance ratio. PUR is a urethane polymer with superior adhesion: it withstands ±60 °C, humidity and thousands of openings — ideal for heavy-use books like school texts.",
      },
      {
        q: "Can I print a short trial edition first?",
        a: "Yes. We combine offset runs with on-demand digital for pilot editions; then you scale up once the book takes off.",
      },
    ],
  },
  revistas: {
    title: "Magazines & Catalogs",
    shortTitle: "Magazines",
    description: "Periodicals with saddle-stitch binding, coated paper and calibrated color from front to back cover.",
    insight: "Calibrated color (Fogra) makes your cover look the same on screen, on the proof and at the newsstand.",
    minRun: "500 copies (approx.)",
    turnaround: "6 – 12 business days",
    specs: [
      "Saddle-stitch (staples) or perfect binding depending on page count",
      "90 – 170 gsm coated paper with Fogra-calibrated color",
      "200 – 300 gsm laminated covers",
      "Full-bleed trimming and professional pagination",
      "Labeled bundles for distribution to points of sale",
    ],
    useCases: [
      "Corporate and membership magazines",
      "Product catalogs for retail and trade fairs",
      "Periodicals for associations and institutions",
    ],
    deepFaqs: [
      {
        q: "What is Fogra-calibrated color and why should I care?",
        a: "It's an international standard defining how color should look in offset printing. Calibrating to Fogra means your cover looks the same on screen, on the proof and in the final copy — no surprises.",
      },
      {
        q: "Saddle-stitch or perfect binding: which is right for me?",
        a: "Saddle-stitch (center staples) is economical and ideal up to ~64 pages. Perfect binding gives a square spine, looks more elegant, is sturdier and allows more pages. We'll recommend based on your project and budget.",
      },
    ],
  },
  calendarios: {
    title: "Calendars",
    shortTitle: "Calendars",
    description: "Corporate wall and desk calendars that keep your brand in front of your customer 365 days a year.",
    insight: "A corporate calendar gets around 6 glances a day on average: advertising that never switches off.",
    minRun: "200 units (approx.)",
    turnaround: "5 – 8 business days",
    specs: [
      "Wall (covers + 12 sheets) and desk calendars",
      "Metal or plastic wire-o and reinforced hanger",
      "Custom dates: holidays and your company's anniversaries",
      "200 – 300 gsm board with optional lamination",
      "Classic or custom formats (triangular base for desks)",
    ],
    useCases: [
      "Year-end corporate gift for clients and partners",
      "Promotional calendars featuring campaign imagery",
      "Branded corporate diaries and planners",
    ],
    deepFaqs: [
      {
        q: "Why is a calendar a good advertising investment?",
        a: "It gets about 6 views a day for 365 days: it costs cents per contact and keeps your brand on the buyer's desk all year long.",
      },
      {
        q: "Can you print my important dates?",
        a: "Yes. Beyond the standard calendar, we add Bolivian holidays, corporate anniversaries and your industry's key dates highlighted in color.",
      },
    ],
  },
  "impresion-digital": {
    title: "On-Demand Digital Printing",
    shortTitle: "Digital",
    description: "Short runs and instant printing: print only what you need, when you need it, with no dead stock.",
    insight: "On-demand printing eliminates 100% of obsolete inventory: you print at the pace of your sales.",
    minRun: "1 unit — print only what you need",
    turnaround: "24 – 72 hours",
    specs: [
      "Short runs with no plates or films: instant artwork changes",
      "Offset-quality digital printing for 1 to 1,000 units",
      "Variable data: names, codes and unique numbering per piece",
      "Specialty papers, adhesives and synthetics available",
      "Exact reprints on demand: zero dead stock",
    ],
    useCases: [
      "Packaging prototypes before the big run",
      "Invitations, credentials and personalized materials",
      "Fast restocking without over-stock",
    ],
    deepFaqs: [
      {
        q: "When should I choose digital vs. offset?",
        a: "Rule of thumb: digital for short runs (1 to ~500 depending on format) or variable-data artwork; offset for large volumes, where unit cost drops and exact Pantones are required.",
      },
      {
        q: "What is “variable data”?",
        a: "The ability to print a different piece on every copy: recipient names, unique QR codes or security numbering — impossible with traditional printing and key for personalization and traceability.",
      },
    ],
  },
};

/** Traducción de los textos alternativos de la galería (por ruta) */
export const GALLERY_ALT_EN: Record<string, string> = {
  "/images/products/food-cbn-pacena-botella.jpg": "Paceña beer — branded bottle and label",
  "/images/products/food-cbn-pacena-lata.jpg": "Paceña Pilsener beer can",
  "/images/products/food-cbn-chicha-taquina.jpg": "Taquiña corn chicha — can artwork",
  "/images/products/food-copacabana-papas.jpg": "Food-grade french fries box",
  "/images/products/food-cbn-huari.jpg": "Huari Lager beer",
  "/images/products/food-cbn-taquina-botella.jpg": "Taquiña beer served on a Bolivian table",
  "/images/products/pharma-vita-azitrovita.jpg": "AzitroVITA 500 mg carton",
  "/images/products/pharma-vita-alcabol.jpg": "Alca Bol granules carton and jar",
  "/images/products/pharma-vita-jarabe-miel.jpg": "Honey & eucalyptus syrup carton",
  "/images/products/pharma-vita-alerden.jpg": "Alerden VITA carton and bottle",
  "/images/products/pharma-vita-nasal.jpg": "VITA saline nasal spray carton",
  "/images/products/pharma-vita-digestan-sobre.jpg": "Digestan Compuesto effervescent sachet",
  "/images/products/pharma-inti-mentisan.jpg": "Mentisan jars on the production line",
  "/images/products/pharma-vita-calmitol.jpg": "Calmitol-n carton with blister",
  "/images/products/pharma-vita-calcio.jpg": "Calcium Gluconate 10% injectable box",
  "/images/products/pharma-vita-bicarbonato.jpg": "Sodium Bicarbonate 8% box",
  "/images/products/promo-cbn-portafolio.jpg": "CBN brand portfolio: Paceña, Huari, Pepsi, Somos and more",
  "/images/products/promo-inti-caja-regalo.jpg": "INTI corporate gift box",
  "/images/products/promo-vita-digestan-linea.jpg": "Digestan line: promotional sachets",
  "/images/products/promo-copacabana-balde.jpg": "Campaign with branded printed bucket and box",
  "/images/services/paper-bags.jpg": "Paper bags with handles",
  "/images/products/print-inti-muestra-paneles.jpg": "Printed panels for INTI's 90th anniversary exhibit",
  "/images/services/stationery.jpg": "Standardized corporate stationery",
  "/images/products/book-gisbert-historia-bolivia.jpg": "Historia de Bolivia — Editorial Gisbert",
  "/images/products/book-gisbert-madidi.jpg": "Madidi — large-format book",
  "/images/products/book-gisbert-baldor.jpg": "Baldor's Arithmetic, 3rd edition",
  "/images/products/book-gisbert-politicas.jpg": "A brief history of public policy in Bolivia",
  "/images/products/book-gisbert-esfera.jpg": "La esfera de cristal — children's literature",
  "/images/products/book-gisbert-cuento.jpg": "El cuento que nunca se contó",
  "/images/products/mag-lostiempos-oh-nov.jpg": "OH! magazine — November cover",
  "/images/products/mag-lostiempos-oh-oct.jpg": "OH! magazine — October cover",
  "/images/products/mag-lostiempos-portada.jpg": "Los Tiempos newspaper front page",
  "/images/services/calendars.jpg": "Corporate wall and desk calendars",
  "/images/products/digital-inti-backdrop-evento.jpg": "Printed backdrop for an INTI corporate event",
  "/images/services/digital-print.jpg": "On-demand digital printing",
};

export const SECTOR_LABEL_EN: Record<Client["sector"], string> = {
  "Alimentos & Bebidas": "Food & Beverage",
  Farmacéutica: "Pharmaceutical",
  "Retail & QSR": "Retail & QSR",
  "Editorial & Medios": "Publishing & Media",
  "Banca & Finanzas": "Banking & Finance",
};

export const CLIENT_NOTES_EN: Record<string, string> = {
  cbn: "Boxes and cartons for its Paceña and Taquiña brands",
  "pil-andina": "Labels and packs for beverages",
  delicia: "Packaging for cookies, chocolates and confectionery",
  arcor: "Cartons and displays for candy",
  coripati: "Packs for its pasta product lines",
  bago: "Medicine cartons with technical validation",
  inti: "Pharmaceutical packaging with batch traceability",
  terbol: "Cartons and inserts for its medical line",
  vita: "Pharmaceutical packs and leaflets",
  hipermaxi: "Paper bags and branded promotional materials",
  icnorte: "Corporate print and seasonal campaigns",
  copacabana: "Packs and print for points of sale",
  lostiempos: "Newspapers, supplements and special editions",
  eldeber: "Periodicals and magazines",
  gisbert: "HotMelt/PUR perfect-bound textbooks",
  bnb: "Standardized corporate stationery and documents",
};

export const SECTORS_EN: Record<string, { label: string; detail: string }> = {
  alimentos: { label: "Food & Beverage", detail: "Packs with food-grade certification" },
  farmaceutica: { label: "Pharmaceutical", detail: "Cartons with technical validation and braille" },
  editorial: { label: "Publishing", detail: "Large-run books, magazines and catalogs" },
  retail: { label: "Retail & Promotional", detail: "Bags, gift boxes and brand campaigns" },
  corporativo: { label: "Corporate", detail: "Standardized stationery and operational materials" },
  agencias: { label: "Advertising Agencies", detail: "Full-color production with on-time delivery" },
};

export const PROCESS_STEPS_EN: Record<string, { title: string; detail: string; tip: string }> = {
  p1: {
    title: "Tell us your idea",
    detail:
      "Message us on WhatsApp with your project: product type, approximate quantity and target date. You don't need to know anything about printing — our team will guide you.",
    tip: "The more context you share (use, reference image, run size), the more accurate your quote.",
  },
  p2: {
    title: "Tailored advice and quote",
    detail:
      "A specialist reviews your case and sends a proposal with paper, finishes, lead time and price. Everything clear, no fine print.",
    tip: "First time printing? We explain every term (gsm, Pantone, die-cut) in plain words.",
  },
  p3: {
    title: "Production to the SPC standard",
    detail:
      "Your project enters the plant with quality control at every stage: color proof, press supervision and final check before dispatch.",
    tip: "We work with cutting-edge technology and premium supplies — the highest standards in the industry.",
  },
  p4: {
    title: "On-time delivery, wherever you need it",
    detail:
      "You receive your order on time and as agreed. And if you need reprints or tweaks, your advisor is just one message away.",
    tip: "Punctuality is one of our 4 pillars: your target date is a commitment, not a hope.",
  },
};

export const STATS_EN = [
  { label: "Years in business", detail: "Since 2001 in La Paz" },
  { label: "Product lines", detail: "From packaging to digital" },
  { label: "Guarantee pillars", detail: "Quality · Punctuality · Capacity · Service" },
  { label: "Commitment", detail: "The human factor makes the difference" },
] as const;

export const NAV_LABELS_EN: Record<string, string> = {
  "/": "Home",
  "/servicios": "Services",
  "/nosotros": "About",
  "/clientes": "Clients",
  "/contacto": "Contact",
};

export const TESTIMONIALS_EN: Record<string, { role: string; quote: string; service: string }> = {
  t1: {
    role: "Brand Manager",
    quote:
      "Every seasonal launch is a race against the clock and SPC has never let us down. The boxes arrive flawless, in the exact color approved on the proof. At our scale, that's priceless.",
    service: "Food Packaging",
  },
  t2: {
    role: "Technical Procurement Lead",
    quote:
      "In pharma there's no room for improvisation: braille, batches and validation have to be perfect. SPC understands the standard and meets it run after run. We've worked this way for years.",
    service: "Pharmaceutical Packaging",
  },
  t3: {
    role: "Editor-in-Chief",
    quote:
      "School books pass through hundreds of students' hands. With SPC's PUR binding, not a single page has come loose in years of use. Their punctuality for back-to-school deliveries is next level.",
    service: "PUR Perfect-Bound Books",
  },
  t4: {
    role: "Marketing Manager",
    quote:
      "We ordered paper bags for the whole chain nationwide and the branch-by-branch delivery logistics worked flawlessly. The print quality means customers walk out carrying our brand.",
    service: "Paper Bags",
  },
  t5: {
    role: "Art Director",
    quote:
      "As an agency, our reputation is on the line with every piece that hits the street. SPC's calibrated color is our safety net: what we approve on screen is what gets printed. Our clients know it.",
    service: "Magazines & Catalogs",
  },
  t6: {
    role: "Editorial Production Coordinator",
    quote:
      "We print special editions and supplements with them on tight deadlines. SPC's plant capacity gives us peace of mind that, no matter what, Sunday's paper goes out.",
    service: "Commercial Printing",
  },
};

export const TESTIMONIAL_COMPANY_EN: Record<string, string> = {
  "Agencia de Publicidad": "Advertising Agency",
};

export const GENERAL_FAQS_EN = [
  {
    q: "What services does SPC offer exactly?",
    a: "Nine product lines across three fronts: Packaging (food, pharmaceutical, retail/promotional and paper bags), Commercial Printing (corporate print, HotMelt/PUR perfect-bound books, magazines and catalogs, calendars) and on-demand Digital Printing for short runs.",
  },
  {
    q: "What's the minimum print run?",
    a: "It depends on the line: with on-demand digital you can print from 1 unit; for offset, indicative minimums start between 200 and 5,000 units depending on the product. Quotes are free and with no obligation.",
  },
  {
    q: "How long does an order take?",
    a: "As a guide: digital 24–72 hours, commercial print 4–8 days, packaging 5–15 days depending on finishes and validations. Your target date is set in the quote and we treat it as a commitment.",
  },
  {
    q: "How much does it cost to print my project?",
    a: "Price depends on run size, format, paper, inks and finishes — that's why we quote to measure. Message us on WhatsApp with a description or reference photo and you'll get a clear proposal, no fine print.",
  },
  {
    q: "What files should I send for printing?",
    a: "Ideally: a CMYK PDF at 300 dpi with 3 mm bleed and fonts converted to outlines. Not sure what that means? Don't worry: our team reviews your artwork for free and guides you so it comes out perfect.",
  },
  {
    q: "Can I see a color proof before the run?",
    a: "Yes. For offset we work with certified color proofs: you approve how your piece will look and only then does it go into production. What you see on the proof is what you get.",
  },
  {
    q: "Do you deliver outside La Paz?",
    a: "Yes, we ship to all nine departments of Bolivia. We can split deliveries by branch or city with packages labeled by destination.",
  },
  {
    q: "Where are you located and what are your hours?",
    a: "Our plant and offices are at Av. Saavedra N.º 2411 (end), Miraflores, La Paz. Hours: Monday to Friday, 8:00 to 18:00. You can also message us on WhatsApp and we'll reply within minutes.",
  },
  {
    q: "Can I get a quote with no obligation?",
    a: "Of course. Advice and quotes are free with no obligation. Tell us your idea on WhatsApp and a specialist will reply with a proposal for paper, finishes, lead time and price.",
  },
  {
    q: "Do you work with agencies and freelance designers?",
    a: "Yes, we partner with advertising agencies, designers and marketing teams. We offer priority service, certified proofs and production to a standard you can promise your client.",
  },
] as const;

export const AI_RECEPTIONIST_EN = {
  role: "SPC's AI receptionist",
  tagline: "Get a quote in 60 seconds, 24/7",
  greeting:
    "Hi! 👋 I'm **SPenCer**, SPC Impresores' AI receptionist. In under a minute I'll put together your quote request and connect you with an advisor on WhatsApp. **What would you like to print?**",
  quickQuestions: [
    "What services do you offer?",
    "How do I request a quote?",
    "What files should I send?",
    "Do you ship outside La Paz?",
  ],
  disclaimer: "SPenCer guides you and builds your brief. Final prices and dates are confirmed by a human advisor on WhatsApp.",
} as const;

export const FUNNEL_EN = {
  quantities: ["Fewer than 500", "500 – 2,000", "2,000 – 10,000", "More than 10,000", "Not sure yet"],
  deadlines: ["This week (urgent)", "Within 2 weeks", "This month", "No fixed date"],
  extras: ["I need design", "Sample / color proof", "Premium finish", "Delivery outside La Paz", "Variable data / numbering"],
} as const;

export const BRAND_EN = {
  tagline: "Industrial Printing",
  slogan: "Printing the best of Bolivia",
  pillars: ["Quality", "Punctuality", "Capacity", "Service"],
} as const;

export const CONTACT_EN = {
  hours: "Mon – Fri · 8:00 to 18:00",
} as const;
