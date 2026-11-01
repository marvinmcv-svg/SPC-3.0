import type { Metadata } from "next";
import { PageHero } from "@/components/spc/page-hero";
import { QuoteBuilder } from "@/components/spc/quote-builder";
import { ContactInfo } from "@/components/spc/contact-info";
import { Faq } from "@/components/spc/faq";

export const metadata: Metadata = {
  title: "Contacto y cotización",
  description: "Cotiza tu proyecto por WhatsApp al +591 77165787 o visítanos en Av. Saavedra N.º 2411, Miraflores, La Paz.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow={{ es: "Contacto · WhatsApp +591 77165787", en: "Contact · WhatsApp +591 77165787" }}
        title={{ es: "Hablemos de", en: "Let's talk about" }}
        accent={{ es: "tu próximo proyecto.", en: "your next project." }}
        description={{
          es: "Arma tu brief abajo y continúa por WhatsApp, pregúntale a SPenCer o visítanos en planta. Respondemos en minutos en horario laboral.",
          en: "Build your brief below and continue on WhatsApp, ask SPenCer or visit our plant. We reply within minutes during business hours.",
        }}
        image="/images/site/tech-rollers.jpg"
        crumbs={[{ label: { es: "Contacto", en: "Contact" } }]}
      />
      <QuoteBuilder compactHeading />
      <ContactInfo />
      <Faq />
    </>
  );
}
