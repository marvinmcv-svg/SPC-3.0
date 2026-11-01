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
        eyebrow="Contacto · WhatsApp +591 77165787"
        title="Hablemos de"
        accent="tu próximo proyecto."
        description="Arma tu brief abajo y continúa por WhatsApp, pregúntale a SPenCer o visítanos en planta. Respondemos en minutos en horario laboral."
        image="/images/site/tech-rollers.jpg"
        crumbs={[{ label: "Contacto" }]}
      />
      <QuoteBuilder compactHeading />
      <ContactInfo />
      <Faq />
    </>
  );
}
