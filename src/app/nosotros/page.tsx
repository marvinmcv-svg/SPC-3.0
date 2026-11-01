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
        eyebrow={{ es: "Desde 2001 · La Paz, Bolivia", en: "Since 2001 · La Paz, Bolivia" }}
        title={{ es: "Gente, máquinas", en: "People, machines" }}
        accent={{ es: "y oficio gráfico.", en: "and printing craft." }}
        description={{
          es: "Somos SPC Impresores: una planta de gráfica industrial donde la tecnología de punta se encuentra con el factor humano que marca la diferencia.",
          en: "We are SPC Impresores: an industrial printing plant where cutting-edge technology meets the human factor that makes the difference.",
        }}
        image="/images/site/spc-building.jpg"
        crumbs={[{ label: { es: "Nosotros", en: "About" } }]}
      />
      <Manifesto />
      <About />
      <Sectors />
      <Technology />
      <Process />
    </>
  );
}
