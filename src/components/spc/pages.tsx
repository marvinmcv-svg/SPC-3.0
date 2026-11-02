"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  PÁGINAS DEL SITIO — composición de cada ruta del hash-router
 *
 *  Home · Nosotros · Servicios · Servicio [id] · Proceso ·
 *  Clientes · FAQ · Contacto
 *  + PageHeader compartido (banda oscura con breadcrumb y halos)
 *  + PageCta compartido (cierre de funnel hacia WhatsApp/contacto)
 * ══════════════════════════════════════════════════════════════════
 */

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { waLink } from "@/lib/site-config";
import { useSiteData, useT, L } from "@/lib/i18n";
import { Reveal, WordsReveal, Eyebrow, Counter } from "./motion-primitives";
import { SiteLink, Breadcrumb, useRoute, PageTransition, type Route } from "./site-router";
import { Hero } from "./hero";
import { PillarsMarquee } from "./pillars-marquee";
import { About } from "./about";
import { Services } from "./services";
import { Process } from "./process";
import { Technology } from "./technology";
import { Sectors } from "./sectors";
import { Clients } from "./clients";
import { Faq } from "./faq";
import { QuoteFunnel } from "./quote-funnel";
import { FinalCta } from "./final-cta";
import { ServicePage } from "./service-detail";
import { WhatsAppIcon } from "./whatsapp-cta";

/* ════════════════════════════════════════════════════════════════
   PAGE HEADER — banda oscura premium para páginas internas
   ════════════════════════════════════════════════════════════════ */

function PageHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  breadcrumb: { label: string; to?: string }[];
}) {
  const reduce = useReducedMotion();
  return (
    <header className="grain relative overflow-hidden bg-spc-950 pb-16 pt-36 sm:pb-20 sm:pt-44">
      {/* halos animados */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { x: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-0 h-[380px] w-[380px] rounded-full bg-spc-600/25 blur-[110px]"
      />
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { x: [0, -36, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 bottom-0 h-[340px] w-[340px] rounded-full bg-gold-500/20 blur-[110px]"
      />
      {/* línea de luz inferior */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumb items={breadcrumb} />
        <div className="mt-6 max-w-3xl">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="font-display mt-5 text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.04] tracking-tight text-white">
            <WordsReveal text={title} />{" "}
            {highlight && (
              <WordsReveal text={highlight} wordClassName="text-gradient-gold" delay={0.14} />
            )}
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/70">{subtitle}</p>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE CTA — cierre de funnel compartido por páginas internas
   ════════════════════════════════════════════════════════════════ */

function PageCta() {
  const t = useT();
  const { WA_MESSAGES } = useSiteData();
  return (
    <section className="relative bg-white py-20 sm:py-24" aria-label={t(L("Llamado a la acción", "Call to action"))}>
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal y={40}>
          <div className="grain relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-spc-900 via-spc-800 to-spc-950 p-8 text-center shadow-[0_50px_110px_-45px_rgba(6,15,46,0.7)] sm:p-14">
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-600/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-spc-500/25 blur-3xl" />

            <h2 className="font-display relative text-[clamp(1.7rem,3.6vw,2.6rem)] font-extrabold leading-tight tracking-tight text-white">
              {t(L("¿Imprimimos algo juntos?", "Shall we print something together?"))}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
              {t(L("Cuéntanos tu proyecto: la asesoría es gratuita y la cotización llega el mismo día.", "Tell us about your project: advice is free and the quote arrives the same day."))}
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <motion.a
                href={waLink(WA_MESSAGES.final)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="shine inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2fe076] via-wa to-[#1da851] px-7 py-4 text-[15px] font-bold text-white shadow-[0_16px_44px_-12px_rgba(37,211,102,0.7)]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t(L("Cotizar por WhatsApp", "Quote via WhatsApp"))}
              </motion.a>
              <SiteLink
                to="contacto"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-[15px] font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <Sparkles className="h-4.5 w-4.5 text-gold-300" aria-hidden />
                {t(L("Llenar el formulario", "Fill in the form"))}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </SiteLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   STATS BAND — cifras con contadores animados
   ════════════════════════════════════════════════════════════════ */

function StatsBand() {
  const { STATS } = useSiteData();
  return (
    <section className="relative overflow-hidden bg-spc-50 py-16 sm:py-20" aria-label="Cifras de la empresa">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.09} y={26}>
              <div className="glossy-card h-full rounded-[1.4rem] p-6 text-center">
                <p className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-none text-spc-900">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-spc-600">
                  {s.label}
                </p>
                <p className="mt-1.5 text-[12px] font-medium text-spc-900/50">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   HOME
   ════════════════════════════════════════════════════════════════ */

export function HomePage() {
  return (
    <>
      <Hero />
      <PillarsMarquee />
      <About />
      <Services variant="teaser" />
      <Process />
      <Clients compact />
      <Faq limit={5} />
      <QuoteFunnel />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   NOSOTROS
   ════════════════════════════════════════════════════════════════ */

export function NosotrosPage() {
  const t = useT();
  const { BRAND } = useSiteData();
  return (
    <>
      <PageHeader
        eyebrow={t(L("Nosotros · desde 2001", "About us · since 2001"))}
        title={t(L("La empresa que", "The company that"))}
        highlight={t(L("imprime Bolivia.", "prints Bolivia."))}
        subtitle={t(L(
          `${BRAND.name} — líder de la industria gráfica nacional. Conoce nuestra historia, la tecnología de nuestra planta y el equipo humano detrás de cada tiraje.`,
          `${BRAND.name} — leader of the national printing industry. Discover our story, our plant's technology and the human team behind every print run.`,
        ))}
        breadcrumb={[{ label: t(L("Inicio", "Home")), to: "/" }, { label: t(L("Nosotros", "About us")) }]}
      />
      <About />
      <StatsBand />
      <Technology />
      <Sectors />
      <PageCta />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   SERVICIOS (índice)
   ════════════════════════════════════════════════════════════════ */

export function ServiciosPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow={t(L("Servicios · 9 líneas de producto", "Services · 9 product lines"))}
        title={t(L("Todo lo que", "Everything we"))}
        highlight={t(L("sabemos imprimir.", "know how to print."))}
        subtitle={t(L("Packaging, impresión comercial y digital bajo demanda. Cada línea con sus especificaciones, tiempos y respuestas — y cotización por WhatsApp en un clic.", "Packaging, commercial print and on-demand digital. Every line with its specs, timelines and answers — plus a WhatsApp quote in one click."))}
        breadcrumb={[{ label: t(L("Inicio", "Home")), to: "/" }, { label: t(L("Servicios", "Services")) }]}
      />
      <Services variant="full" />
      <Sectors />
      <PageCta />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROCESO
   ════════════════════════════════════════════════════════════════ */

export function ProcesoPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow={t(L("Proceso · de la idea a tu puerta", "Process · from idea to your door"))}
        title={t(L("Así imprimimos", "This is how we print"))}
        highlight={t(L("tu proyecto.", "your project."))}
        subtitle={t(L("Cuatro pasos, cero sorpresas: cuéntanos tu idea, recibe una cotización a medida, sigue tu producción con estándar SPC y recibe la entrega donde la necesites.", "Four steps, zero surprises: tell us your idea, receive a tailored quote, follow your production with the SPC standard and get the delivery wherever you need it."))}
        breadcrumb={[{ label: t(L("Inicio", "Home")), to: "/" }, { label: t(L("Proceso", "Process")) }]}
      />
      <Process />
      <Technology />
      <PageCta />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   CLIENTES
   ════════════════════════════════════════════════════════════════ */

export function ClientesPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow={t(L("Clientes · toda Bolivia", "Clients · all of Bolivia"))}
        title={t(L("Las marcas que el país", "The brands the country"))}
        highlight={t(L("consume, imprimen con SPC.", "consumes, print with SPC."))}
        subtitle={t(L("Del snack del kiosco al medicamento de tu farmacia: empresas de alimentos, farmacéutica, retail, editorial y banca confían su imagen a nuestra planta.", "From the kiosk snack to the pharmacy medicine: food, pharma, retail, publishing and banking companies trust their image to our plant."))}
        breadcrumb={[{ label: t(L("Inicio", "Home")), to: "/" }, { label: t(L("Clientes", "Clients")) }]}
      />
      <Clients />
      <PageCta />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════════════════════ */

export function FaqPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow={t(L("Preguntas frecuentes", "Frequently asked questions"))}
        title={t(L("Todo lo que necesitas saber", "Everything you need to know"))}
        highlight={t(L("antes de imprimir.", "before you print."))}
        subtitle={t(L("Tirajes, archivos, pruebas de color, plazos y entregas: respuestas claras para imprimir por primera vez — o para expertos que quieren el detalle fino.", "Run sizes, files, color proofs, deadlines and deliveries: clear answers for first-time printers — or experts who want the fine detail."))}
        breadcrumb={[{ label: t(L("Inicio", "Home")), to: "/" }, { label: t(L("Preguntas", "FAQ")) }]}
      />
      <Faq />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   CONTACTO
   ════════════════════════════════════════════════════════════════ */

export function ContactoPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow={t(L("Contacto · respuesta el mismo día", "Contact · same-day reply"))}
        title={t(L("Hablemos de", "Let's talk about"))}
        highlight={t(L("tu proyecto.", "your project."))}
        subtitle={t(L("Completa el formulario y mira en vivo el mensaje que recibirá nuestro equipo por WhatsApp — o usa los canales directos de la planta.", "Fill in the form and watch live the message our team will receive on WhatsApp — or use the plant's direct channels."))}
        breadcrumb={[{ label: t(L("Inicio", "Home")), to: "/" }, { label: t(L("Contacto", "Contact")) }]}
      />
      <QuoteFunnel compact />
      <FinalCta />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   ROUTE VIEW — renderiza la página según la ruta activa
   ════════════════════════════════════════════════════════════════ */

export function RouteView() {
  const route: Route = useRoute();

  return (
    <PageTransition routeKey={route.key}>
      {route.page === "home" && <HomePage />}
      {route.page === "nosotros" && <NosotrosPage />}
      {route.page === "servicios" && <ServiciosPage />}
      {route.page === "servicio" && <ServicePage serviceId={route.serviceId ?? ""} />}
      {route.page === "proceso" && <ProcesoPage />}
      {route.page === "clientes" && <ClientesPage />}
      {route.page === "faq" && <FaqPage />}
      {route.page === "contacto" && <ContactoPage />}
    </PageTransition>
  );
}
