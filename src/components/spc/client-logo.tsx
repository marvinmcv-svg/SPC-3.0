"use client";

/**
 * ══════════════════════════════════════════════════════════════════
 *  CLIENT LOGO — logo oficial de la marca cliente sobre "ficha" glossy.
 *  Si la marca aún no tiene logo cargado, muestra un monograma con su
 *  color corporativo (mismo tamaño → el muro nunca queda desalineado).
 * ══════════════════════════════════════════════════════════════════
 */

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CLIENTS, type Client } from "@/lib/site-config";

export function ClientLogo({
  client,
  size = "md",
  mono = true,
  className,
  bare = false,
}: {
  client: Client;
  /** sin superficie glossy (cuando ya vive dentro de otra tarjeta) */
  bare?: boolean;
  size?: "sm" | "md" | "lg";
  /** monocromo → color al pasar el cursor */
  mono?: boolean;
  className?: string;
}) {
  const box = {
    sm: "h-14 w-32 px-3",
    md: "h-20 w-44 px-5",
    lg: "h-24 w-52 px-6",
  }[size];

  return (
    <div
      title={`${client.name} — ${client.note}`}
      className={cn(
        "group relative flex shrink-0 items-center justify-center rounded-2xl",
        !bare && "glossy-card",
        mono && client.logo && "logo-mono",
        box,
        className
      )}
    >
      {client.logo ? (
        <span className="relative block h-[62%] w-full">
          <Image
            src={client.logo}
            alt={client.name}
            fill
            sizes="200px"
            className="object-contain"
          />
        </span>
      ) : (
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-[12px] font-extrabold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_16px_-6px_rgba(6,15,46,0.35)] transition-transform duration-500 group-hover:scale-110"
            style={{ background: `linear-gradient(140deg, ${client.color}cc, ${client.color})` }}
          >
            {client.initials}
          </span>
          <span className="font-display text-[12.5px] font-bold leading-tight tracking-tight text-spc-900">
            {client.name}
          </span>
        </span>
      )}
    </div>
  );
}

/** Fila infinita de logos (doble contenido para loop perfecto) */
export function LogoMarquee({
  clients = CLIENTS,
  reverse = false,
  fade = "from-white",
}: {
  clients?: readonly Client[];
  reverse?: boolean;
  /** color de las veladuras laterales (clase from-*) */
  fade?: string;
}) {
  const doubled = [...clients, ...clients];
  return (
    <div className="group relative overflow-hidden py-3" role="presentation">
      <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent sm:w-32", fade)} />
      <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent sm:w-32", fade)} />
      <div
        className={cn(
          "flex w-max gap-4 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee-slow"
        )}
      >
        {doubled.map((c, i) => (
          <ClientLogo key={`${c.id}-${i}`} client={c} />
        ))}
      </div>
    </div>
  );
}
