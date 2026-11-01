"use client";

/**
 * Compatibilidad: el antiguo "SPC AI" ahora es SPenCer.
 * Todos los botones que llaman a openSpcAi() abren SPenCer.
 */
export { SpencerWidget as SpcAiWidget, openSpencer as openSpcAi } from "./spencer";
