import type { Metadata } from "next";
import { PageHero } from "@/components/spc/page-hero";
import { Clients } from "@/components/spc/clients";
import { QuoteBuilder } from "@/components/spc/quote-builder";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Las marcas de alimentos, farmacia, retail, editorial y banca que imprimen con SPC Impresores.",
};

export default function ClientesPage() {
  return (
    <>
      <PageHero
        eyebrow="Clientes · toda Bolivia"
        title="Marcas que confían"
        accent="tiraje tras tiraje."
        description="Alimentos, farmacéuticas, retail, editoriales y banca: la industria boliviana imprime su imagen en nuestra planta."
        image="/images/site/qc-human.jpg"
        crumbs={[{ label: "Clientes" }]}
      />
      <Clients showWall />
      <QuoteBuilder />
    </>
  );
}
