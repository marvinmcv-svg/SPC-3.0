import { Navbar } from "@/components/spc/navbar";
import { Hero } from "@/components/spc/hero";
import { PillarsMarquee } from "@/components/spc/pillars-marquee";
import { About } from "@/components/spc/about";
import { Services } from "@/components/spc/services";
import { Process } from "@/components/spc/process";
import { Technology } from "@/components/spc/technology";
import { Sectors } from "@/components/spc/sectors";
import { FinalCta } from "@/components/spc/final-cta";
import { Footer } from "@/components/spc/footer";
import { WhatsappWidget } from "@/components/spc/whatsapp-widget";
import { MotionProvider } from "@/components/spc/motion-primitives";

export default function Home() {
  return (
    <MotionProvider>
      <div className="flex min-h-svh flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <PillarsMarquee />
          <About />
          <Services />
          <Process />
          <Technology />
          <Sectors />
          <FinalCta />
        </main>
        <Footer />
        <WhatsappWidget />
      </div>
    </MotionProvider>
  );
}
