import type { Metadata } from "next";
import { PageHero } from "@/components/spc/page-hero";
import { Clients } from "@/components/spc/clients";
import { QuoteBuilder } from "@/components/spc/quote-builder";
import { ProductWall } from "@/components/spc/social-proof";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Las marcas de alimentos, farmacia, retail, editorial y banca que imprimen con SPC Impresores.",
};

export default function ClientesPage() {
  return (
    <>
      <PageHero
        eyebrow={{ es: "Clientes · toda Bolivia", en: "Clients · all of Bolivia" }}
        title={{ es: "Marcas que confían", en: "Brands that trust us" }}
        accent={{ es: "tiraje tras tiraje.", en: "run after run." }}
        description={{
          es: "Alimentos, farmacéuticas, retail, editoriales y banca: la industria boliviana imprime su imagen en nuestra planta.",
          en: "Food, pharma, retail, publishing and banking: Bolivian industry prints its image at our plant.",
        }}
        image="/images/site/qc-human.jpg"
        crumbs={[{ label: { es: "Clientes", en: "Clients" } }]}
      />
      <Clients showWall />
      <ProductWall />
      <QuoteBuilder />
    </>
  );
}
