/**
 * ══════════════════════════════════════════════════════════════════
 *  SPC IMPRESORES S.A. — Site configuration (ENGLISH)
 * ══════════════════════════════════════════════════════════════════
 *  English mirror of SITE_ES (same SiteData interface).
 *  Service IDs, images and structure are identical — only copy changes.
 * ══════════════════════════════════════════════════════════════════
 */

import type { SiteData } from "./site-config";

export const SITE_EN: SiteData = {
  BRAND: {
    name: "SPC Impresores S.A.",
    shortName: "SPC",
    tagline: "Industrial Printing",
    slogan: "Printing the best of Bolivia",
    pillars: ["Quality", "On-time delivery", "Capacity", "Service"],
    foundedYear: 2001,
    city: "La Paz, Bolivia",
  },

  CONTACT: {
    phone: "+591 77165787",
    phoneHref: "tel:+59177165787",
    whatsapp: "+591 77165787",
    email: "graficaindustrial@spc.com.bo",
    address: "Av. Saavedra N.º 2411 (End), Miraflores",
    addressFull: "SPC Building, Av. Saavedra N.º 2411, Miraflores, La Paz — Bolivia",
    hours: "Mon – Fri · 8:00 am to 6:00 pm",
    website: "www.spc.net.bo",
  },

  WA_MESSAGES: {
    general:
      "Hi SPC Industrial Printing! 👋 I saw your website and I'd like a quote for a printing project.",
    services:
      "Hi SPC! 👋 I'm exploring your services and would like guidance for my project.",
    quote: (service: string) =>
      `Hi SPC! 👋 I'd like a quote for *${service}*. Could you share turnaround times and pricing?`,
    process:
      "Hi SPC! 👋 I'd like to start a project with you. Could you walk me through the quoting process?",
    packaging:
      "Hi SPC! 👋 I have a *packaging* project (food / pharmaceutical / promotional) and need technical advice.",
    commercial:
      "Hi SPC! 👋 I need commercial printing: books, magazines, catalogs or corporate materials. Can you help me with a quote?",
    digital:
      "Hi SPC! 👋 I'm interested in *on-demand digital printing* for short runs. What options do you offer?",
    final:
      "Hi SPC! 👋 I'm ready to print my next project with you. How do we start?",
  },

  SERVICES: [
    {
      id: "packaging-alimentos",
      title: "Food Packaging",
      shortTitle: "Food",
      category: "packaging",
      categoryLabel: "Packaging",
      description:
        "Primary cartons and containers with food-grade inks, safe for direct food contact and freshness sealing.",
      insight: "Food-grade inks comply with migration standards: color never transfers to the product.",
      image: "/images/services/food-packaging.jpg",
      waMessage: "",
      featured: true,
      gallery: [
        "/images/services/gallery-food.jpg",
        "/images/services/gallery-food-2.jpg",
        "/images/services/gallery-food-3.jpg",
        "/images/services/gallery-cartons.jpg",
      ],
      minRun: "1,000 units (approx.)",
      turnaround: "7 – 12 business days depending on finishes",
      specs: [
        "250 to 450 gsm board with food-grade barriers",
        "Water-based inks and coatings safe for direct food contact",
        "Precision die-cutting and creasing for manual or automatic filling lines",
        "Matte, gloss and soft-touch lamination options",
        "CMYK printing + flat brand Pantones",
      ],
      useCases: [
        "Primary cartons for baked goods, cookies and snacks",
        "Containers for dairy, canned goods and beverages",
        "Sleeves and seasonal promotional bands",
      ],
      deepFaqs: [
        {
          q: "What does “food-grade” ink mean?",
          a: "These are inks formulated with low-migration pigments: they meet international standards that guarantee nothing from the print transfers to the food — even in direct contact, at room temperature or refrigerated.",
        },
        {
          q: "Can you produce for my automatic filling line?",
          a: "Yes. Precision die-cutting guarantees every carton folds and locks without variation — a requirement for high-speed filling lines. We match your machine's specifications before production.",
        },
      ],
    },
    {
      id: "packaging-farmaceutico",
      title: "Pharmaceutical Packaging",
      shortTitle: "Pharma",
      category: "packaging",
      categoryLabel: "Packaging",
      description:
        "Cartons with technical validation for the pharmaceutical industry: precision die-cutting, lot codes and optional braille.",
      insight: "Precision die-cutting guarantees every carton folds perfectly, with zero variation on the line.",
      image: "/images/services/pharma-packaging.jpg",
      waMessage: "",
      gallery: ["/images/services/gallery-pharma.jpg", "/images/services/stationery.jpg"],
      minRun: "5,000 units (approx.)",
      turnaround: "10 – 15 business days with validation",
      specs: [
        "Cartons with technical validation and built-in lot control",
        "Numbering and serial codes for traceability",
        "Optional braille per accessibility regulations",
        "High-whiteness board for medical-grade legibility",
        "Certified color proof before the print run",
      ],
      useCases: [
        "Cartons for OTC and prescription medications",
        "Packaging for supplements and hospital products",
        "Inserts and patient information leaflets (IFU)",
      ],
      deepFaqs: [
        {
          q: "What is braille on cartons — and is it mandatory?",
          a: "Braille printed on the carton lets people with visual impairment identify the medication. Many markets require it under pharmaceutical regulation; we integrate it into the die with no additional structural cost.",
        },
        {
          q: "How do you guarantee lot traceability?",
          a: "Every run is produced under lot control: the number is printed inline and logged in our quality system, so every carton is traceable from start to finish.",
        },
      ],
    },
    {
      id: "packaging-comercial",
      title: "Commercial & Promotional Packaging",
      shortTitle: "Promotional",
      category: "packaging",
      categoryLabel: "Packaging",
      description:
        "Gift boxes, displays and promotional containers that elevate the brand experience in retail and campaigns.",
      insight: "Great unboxing multiplies perceived value: packaging is your brand's first handshake.",
      image: "/images/services/promo-packaging.jpg",
      waMessage: "",
      minRun: "500 units (approx.)",
      turnaround: "5 – 10 business days",
      specs: [
        "Gift boxes with windows, handles or internal compartments",
        "Floor and counter displays for retail",
        "Hot stamping, spot UV and metallic foil accents",
        "Custom engineered structures built around your product",
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
          a: "Yes. Our technical team develops the die and a physical dummy so you can validate volume, strength and aesthetics before the final production run.",
        },
        {
          q: "Which finish do you recommend for a premium look?",
          a: "The combination of matte lamination + spot UV or metallic hot stamping creates the tactile and visual contrast most associated with high-end brands. We'll show you physical samples during consulting.",
        },
      ],
    },
    {
      id: "paper-bags",
      title: "Paper Bags",
      shortTitle: "Paper Bags",
      category: "packaging",
      categoryLabel: "Packaging",
      description:
        "Paper bags with handles, in heavy-weight stocks with branded finishes — the elegant, eco-friendly choice for retail.",
      insight: "Kraft paper from 120 gsm holds up to 8 kg: eco and strength are not enemies.",
      image: "/images/services/paper-bags.jpg",
      waMessage: "",
      minRun: "1,000 units (approx.)",
      turnaround: "7 – 10 business days",
      specs: [
        "Kraft and sulfate paper from 120 gsm (holds up to 8 kg)",
        "Twisted paper handles, ribbon or integrated die-cut handles",
        "1 to 4 color printing with water-based eco-solvent inks",
        "Formats from boutique to supermarket bag",
        "Reinforced bottom option for heavier loads",
      ],
      useCases: [
        "Bags for fashion stores, pharmacies and delivery",
        "Eco bags for retail and supermarkets",
        "Seasonal editions for brand campaigns",
      ],
      deepFaqs: [
        {
          q: "Are paper bags really more eco-friendly?",
          a: "Paper is renewable, biodegradable and recyclable; from 120 gsm you get strength comparable to single-use plastic. Plus, your brand gains perceived environmental responsibility.",
        },
        {
          q: "Can I order several sizes with the same design?",
          a: "Yes, we adapt the artwork to each format while keeping brand proportions — standard practice for retail lines with multiple product types.",
        },
      ],
    },
    {
      id: "impresos-comerciales",
      title: "Commercial Print",
      shortTitle: "Print",
      category: "commercial",
      categoryLabel: "Commercial Print",
      description:
        "Corporate stationery, forms, invoices and all the operational materials your company needs — with total brand consistency.",
      insight: "Color-matched stationery (fixed Pantones) keeps your brand identical on every run — no color drift.",
      image: "/images/services/stationery.jpg",
      waMessage: "",
      featured: true,
      minRun: "500 units (approx.)",
      turnaround: "4 – 8 business days",
      specs: [
        "Corporate stationery with homologated fixed Pantones",
        "Continuous forms, invoices and security documents",
        "Sequential numbering, die-cutting and stapling",
        "Premium bond, offset and coated papers",
        "Color-drift control across runs",
      ],
      useCases: [
        "Letterheads, envelopes and business cards",
        "Invoices, receipts and operational forms",
        "Internal manuals and corporate folders",
      ],
      deepFaqs: [
        {
          q: "Why does “color drift” between runs matter?",
          a: "If every order comes out a slightly different blue, your brand looks careless. With homologated Pantones and density controls, your stationery looks identical today, in 6 months and in 2 years.",
        },
        {
          q: "Can you deliver by department, nationwide?",
          a: "Yes. We coordinate segmented deliveries to your branches with packaging labeled by destination — one order, national distribution.",
        },
      ],
    },
    {
      id: "libros",
      title: "Perfect-Bound Books (HotMelt/PUR)",
      shortTitle: "Books",
      category: "commercial",
      categoryLabel: "Commercial Print",
      description:
        "Perfect binding with HotMelt and PUR adhesives: books that open flat and whose pages never come loose.",
      insight: "PUR adhesive withstands ±60 °C and humidity: pages survive thousands of openings without detaching.",
      image: "/images/services/books.jpg",
      waMessage: "",
      gallery: ["/images/services/gallery-books.jpg", "/images/services/magazines.jpg"],
      minRun: "300 copies (approx.)",
      turnaround: "10 – 15 business days",
      specs: [
        "Perfect binding (paperback) with HotMelt or PUR adhesive",
        "PUR: pages that survive thousands of openings",
        "Square spine with optional embossed text and logos",
        "Endpapers, headbands and markers for premium editions",
        "Standard and custom formats, book bulk or high-bulk paper",
      ],
      useCases: [
        "Textbooks and educational books for schools and universities",
        "Novels, poetry and general literature",
        "Corporate memoirs and anniversary books",
      ],
      deepFaqs: [
        {
          q: "What's the difference between HotMelt and PUR?",
          a: "HotMelt is a hot-melt adhesive with an excellent cost-performance ratio. PUR is a urethane polymer with superior adhesion: it withstands ±60 °C, humidity and thousands of openings — ideal for heavily used books like school textbooks.",
        },
        {
          q: "Can I print a short pilot edition first?",
          a: "Yes. We combine offset runs with on-demand digital for pilot editions; then you scale volume once the book takes off.",
        },
      ],
    },
    {
      id: "revistas",
      title: "Magazines & Catalogs",
      shortTitle: "Magazines",
      category: "commercial",
      categoryLabel: "Commercial Print",
      description:
        "Periodical publications with saddle-stitch binding, coated paper and calibrated color from cover to cover.",
      insight: "Calibrated color (Fogra) means your cover looks identical on screen, on proof and at the newsstand.",
      image: "/images/services/magazines.jpg",
      waMessage: "",
      minRun: "500 copies (approx.)",
      turnaround: "6 – 12 business days",
      specs: [
        "Saddle-stitch (stapled) or perfect binding depending on page count",
        "Coated paper from 90 to 170 gsm with Fogra-calibrated color",
        "Covers on 200–300 gsm board with lamination",
        "Full-bleed trimming and professional pagination",
        "Distribution in labeled packages for points of sale",
      ],
      useCases: [
        "Corporate and membership magazines",
        "Product catalogs for retail and trade shows",
        "Periodical publications for guilds and institutions",
      ],
      deepFaqs: [
        {
          q: "What is Fogra-calibrated color and why should I care?",
          a: "It's an international standard that defines how color should look in offset printing. Calibrating against Fogra means your cover looks the same on screen, on the proof and on the final copy — no surprises.",
        },
        {
          q: "Saddle-stitch or perfect binding: which suits me?",
          a: "Saddle-stitch (center staples) is economical and ideal up to ~64 pages. Perfect binding gives a square spine — more elegant and durable — and allows more pages. We recommend based on your project and budget.",
        },
      ],
    },
    {
      id: "calendarios",
      title: "Calendars",
      shortTitle: "Calendars",
      category: "commercial",
      categoryLabel: "Commercial Print",
      description:
        "Corporate wall and desk calendars that keep your brand in front of your client 365 days a year.",
      insight: "A corporate calendar gets about 6 visual hits a day: advertising that never turns off.",
      image: "/images/services/calendars.jpg",
      waMessage: "",
      minRun: "200 units (approx.)",
      turnaround: "5 – 8 business days",
      specs: [
        "Wall calendars (cover + 12 sheets) and desk formats",
        "Metal or plastic spiral binding and reinforced hanger",
        "Custom dates: holidays and your company's anniversaries",
        "200–300 gsm board with optional lamination",
        "Classic or custom formats (triangular desk base)",
      ],
      useCases: [
        "Year-end corporate gift for clients and partners",
        "Promotional calendars with campaign imagery",
        "Branded corporate agendas and planners",
      ],
      deepFaqs: [
        {
          q: "Why is a calendar a good advertising investment?",
          a: "It gets about 6 views a day for 365 days: it costs pennies per contact and keeps your brand on the buyer's desk all year long.",
        },
        {
          q: "Can you print my important dates?",
          a: "Yes. Beyond the standard calendar, we add Bolivian holidays, corporate anniversaries and your industry's key dates — highlighted in color.",
        },
      ],
    },
    {
      id: "impresion-digital",
      title: "On-Demand Digital Printing",
      shortTitle: "Digital",
      category: "digital",
      categoryLabel: "Digital",
      description:
        "Short runs and instant printing: print only what you need, when you need it — no dead stock.",
      insight: "On-demand printing eliminates 100% of obsolete inventory: you print at the pace of your sales.",
      image: "/images/services/digital-print.jpg",
      waMessage: "",
      featured: true,
      minRun: "1 unit — print only what you need",
      turnaround: "24 – 72 hours",
      specs: [
        "Short runs with no plates or films: artwork changes on the fly",
        "Offset-quality digital printing for 1 to 1,000 units",
        "Variable data: names, codes and unique numbering per piece",
        "Special papers, adhesives and synthetics available",
        "Exact reprint on demand: zero dead stock",
      ],
      useCases: [
        "Packaging prototypes before the big run",
        "Invitations, credentials and personalized materials",
        "Fast restocking without overstock",
      ],
      deepFaqs: [
        {
          q: "When does digital make sense vs. offset?",
          a: "Rule of thumb: digital for short runs (1 to ~500 depending on format) or variable-data artwork; offset for large volumes, where unit cost drops and exact Pantones are mandatory.",
        },
        {
          q: "What is “variable data”?",
          a: "It's the ability to print a different piece on every copy: recipient names, unique QR codes or security numbering — impossible with traditional printing, and key for personalization and traceability.",
        },
      ],
    },
  ],

  SECTORS: [
    { id: "alimentos", label: "Food & Beverage", detail: "Containers with food-grade certification" },
    { id: "farmaceutica", label: "Pharmaceutical", detail: "Cartons with technical validation and braille" },
    { id: "editorial", label: "Publishing", detail: "High-volume books, magazines and catalogs" },
    { id: "retail", label: "Retail & Promotional", detail: "Bags, gift boxes and brand campaigns" },
    { id: "corporativo", label: "Corporate", detail: "Homologated stationery and operational materials" },
    { id: "agencias", label: "Ad Agencies", detail: "Full-color production with on-time delivery" },
  ],

  PROCESS_STEPS: [
    {
      id: "p1",
      title: "Tell us your idea",
      detail:
        "Message us on WhatsApp with your project: product type, approximate quantity and target date. You don't need to know anything about printing — our team guides you.",
      tip: "The more context you share (use, reference image, run size), the more precise your quote will be.",
    },
    {
      id: "p2",
      title: "Advice and a tailored quote",
      detail:
        "A specialized advisor reviews your case and sends a proposal with paper, finishes, timeline and price. Everything clear, no fine print.",
      tip: "First time printing? We explain every term (grammage, Pantone, die-cut) in plain words.",
    },
    {
      id: "p3",
      title: "Production with the SPC standard",
      detail:
        "Your project enters the plant with quality control at every stage: color proof, machine supervision and final verification before dispatch.",
      tip: "We work with cutting-edge technology and first-class supplies — the industry's highest standards.",
    },
    {
      id: "p4",
      title: "On-time delivery, wherever you need it",
      detail:
        "You receive your production on time and in full. And if you need reprints or adjustments, your advisor is one message away.",
      tip: "On-time delivery is one of our 4 pillars: your target date is a commitment, not a hope.",
    },
  ],

  STATS: [
    { value: 24, suffix: "", label: "Years of track record", detail: "Since 2001 in La Paz" },
    { value: 9, suffix: "", label: "Product lines", detail: "From packaging to digital" },
    { value: 16, suffix: "", label: "Leading brands trust us", detail: "CBN, PIL, Arcor, BNB and more" },
    { value: 100, suffix: "%", label: "Commitment", detail: "The human factor makes the difference" },
  ],

  NAV_LINKS: [
    { href: "#/", label: "Home", page: "home" },
    { href: "#/nosotros", label: "About", page: "nosotros" },
    { href: "#/servicios", label: "Services", page: "servicios" },
    { href: "#/proceso", label: "Process", page: "proceso" },
    { href: "#/clientes", label: "Clients", page: "clientes" },
    { href: "#/faq", label: "FAQ", page: "faq" },
    { href: "#/contacto", label: "Contact", page: "contacto" },
  ],

  CLIENTS: [
    { id: "cbn", name: "Cervecería Boliviana Nacional", sector: "Food & Beverage", initials: "CBN", color: "#d6001c", note: "Cartons and cases for their Paceña and Taquiña brands", logo: "/images/clients/cbn.png" },
    { id: "pil-andina", name: "Pil Andina", sector: "Food & Beverage", initials: "PA", color: "#004b93", note: "Labels and containers for Pepsico beverages", logo: "/images/clients/pil-andina.png" },
    { id: "delicia", name: "Delicia", sector: "Food & Beverage", initials: "D", color: "#e30613", note: "Packaging for cookies, chocolates and confectionery", logo: "/images/clients/delicia.png" },
    { id: "arcor", name: "Arcor Bolivia", sector: "Food & Beverage", initials: "A", color: "#e2001a", note: "Cartons and displays for candy", logo: "/images/clients/arcor.png" },
    { id: "coripati", name: "Fideos Coripati", sector: "Food & Beverage", initials: "FC", color: "#f5a300", note: "Containers for pasta product lines" },
    { id: "bago", name: "Laboratorios Bagó", sector: "Pharmaceutical", initials: "B", color: "#00539f", note: "Medicine cartons with technical validation", logo: "/images/clients/bago.png" },
    { id: "inti", name: "Droguería Inti", sector: "Pharmaceutical", initials: "DI", color: "#e94e1b", note: "Pharma packaging with lot traceability", logo: "/images/clients/inti.png" },
    { id: "terbol", name: "Laboratorios Terbol", sector: "Pharmaceutical", initials: "T", color: "#00a5a8", note: "Cartons and inserts for the medical line", logo: "/images/clients/terbol.png" },
    { id: "vita", name: "Laboratorios Vita", sector: "Pharmaceutical", initials: "V", color: "#009640", note: "Pharma containers and leaflets" },
    { id: "hipermaxi", name: "Hipermaxi", sector: "Retail & QSR", initials: "H", color: "#e2001a", note: "Paper bags and branded promotional materials", logo: "/images/clients/hipermaxi.png" },
    { id: "icnorte", name: "IC Norte", sector: "Retail & QSR", initials: "ICN", color: "#005baa", note: "Corporate print and seasonal campaigns", logo: "/images/clients/icnorte.png" },
    { id: "copacabana", name: "Pollos Copacabana", sector: "Retail & QSR", initials: "PC", color: "#ed1c24", note: "Containers and print for points of sale", logo: "/images/clients/copacabana.png" },
    { id: "lostiempos", name: "Los Tiempos", sector: "Publishing & Media", initials: "LT", color: "#123a86", note: "Newspapers, supplements and special editions", logo: "/images/clients/lostiempos.png" },
    { id: "eldeber", name: "El Deber", sector: "Publishing & Media", initials: "ED", color: "#c8102e", note: "Periodicals and magazines", logo: "/images/clients/eldeber.png" },
    { id: "gisbert", name: "Editorial Gisbert", sector: "Publishing & Media", initials: "EG", color: "#8a4b2a", note: "Perfect-bound textbooks (HotMelt/PUR)" },
    { id: "bnb", name: "Banco Nacional de Bolivia", sector: "Banking & Finance", initials: "BNB", color: "#0033a0", note: "Homologated corporate stationery and documents", logo: "/images/clients/bnb.png" },
  ],

  TESTIMONIALS: [
    {
      id: "t1",
      name: "Marcela R.",
      role: "Brand Manager",
      company: "Cervecería Boliviana Nacional",
      city: "La Paz",
      stars: 5,
      quote:
        "Every seasonal launch is a race against the clock and SPC has never let us down. The cartons arrive flawless, with the exact color approved on the proof. At our scale, that is priceless.",
      service: "Food Packaging",
    },
    {
      id: "t2",
      name: "Rodrigo M.",
      role: "Technical Purchasing Lead",
      company: "Droguería Inti",
      city: "La Paz",
      stars: 5,
      quote:
        "In pharma there is no room for improvisation: braille, lots and validation must come out perfect. SPC understands the standard and delivers run after run. We've worked this way for years.",
      service: "Pharmaceutical Packaging",
    },
    {
      id: "t3",
      name: "Carla S.",
      role: "Editor-in-Chief",
      company: "Editorial Gisbert",
      city: "La Paz",
      stars: 5,
      quote:
        "School books pass through hundreds of students' hands. With SPC's PUR binding, not a single page has come loose in years of use. Their punctuality on back-to-school deliveries is next level.",
      service: "PUR Perfect-Bound Books",
    },
    {
      id: "t4",
      name: "Javier T.",
      role: "Marketing Manager",
      company: "Hipermaxi",
      city: "Santa Cruz",
      stars: 5,
      quote:
        "We ordered paper bags for the entire national chain and the per-branch delivery logistics worked flawlessly. The print quality means customers carry our brand in their hands.",
      service: "Paper Bags",
    },
    {
      id: "t5",
      name: "Andrea P.",
      role: "Art Director",
      company: "Advertising Agency",
      city: "Cochabamba",
      stars: 5,
      quote:
        "As an agency, our reputation rides on every piece that hits the street. SPC's calibrated color is our safety net: what we approve on screen is what gets printed. Our clients know it.",
      service: "Magazines & Catalogs",
    },
    {
      id: "t6",
      name: "Luis F.",
      role: "Editorial Production Coordinator",
      company: "El Deber",
      city: "Santa Cruz",
      stars: 5,
      quote:
        "We print special editions and supplements with hard deadlines with them. SPC's plant capacity gives us peace of mind that, come what may, the Sunday paper goes out.",
      service: "Commercial Print",
    },
  ],

  GENERAL_FAQS: [
    {
      q: "What services does SPC offer exactly?",
      a: "Nine product lines across three fronts: Packaging (food, pharmaceutical, commercial/promotional and paper bags), Commercial Print (corporate stationery, HotMelt/PUR perfect-bound books, magazines and catalogs, calendars) and On-Demand Digital Printing for short runs.",
    },
    {
      q: "What's the minimum print run?",
      a: "It depends on the line: on-demand digital starts at 1 unit; offset minimums range from 200 to 5,000 units depending on the product. Quoting is free and commitment-free.",
    },
    {
      q: "How long does an order take?",
      a: "As a guideline: digital 24–72 hours, commercial print 4–8 days, packaging 5–15 days depending on finishes and validations. Your target date is set in the quote and treated as a commitment.",
    },
    {
      q: "How much will my project cost?",
      a: "Price depends on run size, format, paper, inks and finishes — that's why we quote per project. Message us on WhatsApp with a description or reference photo and you'll get a clear proposal, no fine print.",
    },
    {
      q: "What files should I send for printing?",
      a: "Ideally: CMYK PDF at 300 dpi with 3 mm bleed and fonts converted to curves. Don't know what that means? Don't worry: our team reviews your artwork for free and guides you so it comes out perfect.",
    },
    {
      q: "Can I see a color proof before the run?",
      a: "Yes. For offset we work with certified color proofs: you approve exactly how your piece will look, and only then does it go into production. What you see on the proof is what you receive.",
    },
    {
      q: "Do you deliver outside the main cities?",
      a: "Yes, we ship to all nine departments of Bolivia. We can segment delivery by branch or city with packaging labeled by destination.",
    },
    {
      q: "Where are you located and what are your hours?",
      a: "Our plant and offices are at Av. Saavedra N.º 2411 (end), Miraflores, La Paz. Hours: Monday to Friday, 8:00 am to 6:00 pm. You can also message us on WhatsApp and we'll reply within minutes.",
    },
    {
      q: "Can I get a quote with no commitment?",
      a: "Of course. Advice and quoting are free and commitment-free. Tell us your idea on WhatsApp and a specialized advisor will reply with a proposal for paper, finishes, timeline and price.",
    },
    {
      q: "Do you work with agencies and freelance designers?",
      a: "Yes, we're partners to ad agencies, designers and marketing teams. We offer priority attention, certified proofs and production standards you can promise your client.",
    },
  ],

  AI_RECEPTIONIST: {
    name: "SPenCer",
    role: "Smart receptionist",
    tagline: "From idea to WhatsApp, 24/7",
    greeting:
      "Hi! 👋 I'm **SPenCer**, the smart receptionist at SPC Impresores. I'll help you find the perfect service for your project and connect you with an advisor on WhatsApp. To start: **what do you need to print?**",
    quickQuestions: [
      "I want a packaging quote",
      "I need to print books",
      "Short run / urgent job",
      "What files should I send?",
    ],
    disclaimer: "SPenCer guides and educates. For exact figures and to close your order, a human advisor awaits you on WhatsApp.",
  },
};

/* Pre-fill each service's WhatsApp message (quote is language-dependent) */
for (const s of SITE_EN.SERVICES) s.waMessage = SITE_EN.WA_MESSAGES.quote(s.title);
