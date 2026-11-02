import { Navbar } from "@/components/spc/navbar";
import { Footer } from "@/components/spc/footer";
import { WhatsappWidget } from "@/components/spc/whatsapp-widget";
import { SpcAiWidget } from "@/components/spc/spc-ai-widget";
import { MotionProvider } from "@/components/spc/motion-primitives";
import { SiteRouter } from "@/components/spc/site-router";
import { RouteView } from "@/components/spc/pages";
import { LangProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LangProvider>
      <MotionProvider>
        <SiteRouter>
          <div className="flex min-h-svh flex-col bg-white">
            <Navbar />
            <RouteView />
            <Footer />
            {/* Capa de conversión: widgets flotantes de WhatsApp + SPenCer */}
            <WhatsappWidget />
            <SpcAiWidget />
          </div>
        </SiteRouter>
      </MotionProvider>
    </LangProvider>
  );
}
