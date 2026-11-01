import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/lib/site-config";
import { ServicePage } from "@/components/spc/service-page";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = getService(id);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    openGraph: { title: `${service.title} · SPC Impresores`, description: service.description, images: [service.image] },
  };
}

export default async function ServicioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getService(id);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
