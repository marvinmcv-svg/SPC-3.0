"use client";

/**
 * Estructura común de todas las páginas: navbar, footer y la capa de
 * conversión (SPenCer + WhatsApp) que acompaña al visitante en todo el sitio.
 */

import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { WhatsappWidget } from "./whatsapp-widget";
import { SpencerWidget } from "./spencer";
import { MotionProvider } from "./motion-primitives";
import { I18nProvider } from "@/lib/i18n";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
    <MotionProvider>
      <div className="flex min-h-svh flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappWidget />
        <SpencerWidget />
      </div>
    </MotionProvider>
    </I18nProvider>
  );
}
