import { Hero } from "@/components/spc/hero";
import { PillarsMarquee } from "@/components/spc/pillars-marquee";
import { About } from "@/components/spc/about";
import { Services } from "@/components/spc/services";
import { Process } from "@/components/spc/process";
import { Clients } from "@/components/spc/clients";
import { Faq } from "@/components/spc/faq";
import { SpencerSection } from "@/components/spc/spencer-section";
import { QuoteBuilder } from "@/components/spc/quote-builder";
import { Manifesto } from "@/components/spc/manifesto";

export default function Home() {
  return (
    <>
      <Hero />
      <PillarsMarquee />
      <Manifesto />
      <Services limit={6} />
      <SpencerSection />
      <About />
      <Clients />
      <Process />
      <QuoteBuilder />
      <Faq />
    </>
  );
}
