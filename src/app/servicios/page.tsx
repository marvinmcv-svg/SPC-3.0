import type { Metadata } from "next";
import { PageHero } from "@/components/spc/page-hero";
import { Services } from "@/components/spc/services";
import { Sectors } from "@/components/spc/sectors";
import { QuoteBuilder } from "@/components/spc/quote-builder";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Packaging de alimentos, farmacéutico y promocional, paper bags, impresos comerciales, libros HotMelt/PUR, revistas, calendarios e impresión digital bajo demanda.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="9 líneas de producto"
        title="Todo lo que tu marca"
        accent="necesita imprimir."
        description="Del estuche farmacéutico con braille al libro que se abre plano: explora cada línea, mira producto real de nuestros clientes y cotiza en un clic."
        image="/images/site/packaging-line.jpg"
        crumbs={[{ label: "Servicios" }]}
      />
      <Services showHeader={false} />
      <Sectors />
      <QuoteBuilder />
    </>
  );
}
