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
        eyebrow={{ es: "9 líneas de producto", en: "9 product lines" }}
        title={{ es: "Todo lo que tu marca", en: "Everything your brand" }}
        accent={{ es: "necesita imprimir.", en: "needs to print." }}
        description={{
          es: "Del estuche farmacéutico con braille al libro que se abre plano: explora cada línea, mira producto real de nuestros clientes y cotiza en un clic.",
          en: "From braille pharma cartons to books that open flat: explore each line, see real products from our clients and get a quote in one click.",
        }}
        image="/images/site/packaging-line.jpg"
        crumbs={[{ label: { es: "Servicios", en: "Services" } }]}
      />
      <Services showHeader={false} />
      <Sectors />
      <QuoteBuilder />
    </>
  );
}
