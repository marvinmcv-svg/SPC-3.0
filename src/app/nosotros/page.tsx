import type { Metadata } from "next";
import { PageHero } from "@/components/spc/page-hero";
import { About } from "@/components/spc/about";
import { Technology } from "@/components/spc/technology";
import { Process } from "@/components/spc/process";
import { Manifesto } from "@/components/spc/manifesto";
import { Sectors } from "@/components/spc/sectors";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Más de dos décadas imprimiendo lo mejor de Bolivia: historia, tecnología de planta y la forma en que trabajamos.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Desde 2001 · La Paz, Bolivia"
        title="Gente, máquinas"
        accent="y oficio gráfico."
        description="Somos SPC Impresores: una planta de gráfica industrial donde la tecnología de punta se encuentra con el factor humano que marca la diferencia."
        image="/images/site/spc-building.jpg"
        crumbs={[{ label: "Nosotros" }]}
      />
      <Manifesto />
      <About />
      <Sectors />
      <Technology />
      <Process />
    </>
  );
}
