import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPC Impresores S.A. — Gráfica Industrial | Imprimiendo lo mejor de Bolivia",
  description:
    "Líderes de la industria gráfica en Bolivia desde 2001. Packaging de alimentos, farmacéutico y promocional, impresión comercial, libros HotMelt/PUR, revistas e impresión digital bajo demanda. Cotiza por WhatsApp.",
  keywords: [
    "SPC Impresores",
    "gráfica industrial Bolivia",
    "packaging alimentos",
    "packaging farmacéutico",
    "impresión comercial La Paz",
    "paper bags",
    "libros HotMelt PUR",
    "impresión digital bajo demanda",
    "imprenta La Paz Bolivia",
  ],
  authors: [{ name: "SPC Impresores S.A." }],
  openGraph: {
    title: "SPC Impresores S.A. — Gráfica Industrial",
    description: "Imprimiendo lo mejor de Bolivia desde 2001. Calidad, puntualidad, capacidad y servicio.",
    siteName: "SPC Gráfica Industrial",
    locale: "es_BO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#003c8d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
