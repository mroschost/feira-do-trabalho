import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const DISPLAY_TIME_MS = 15000;
const FADE_TIME_MS = 700;

const EventPopup = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setShouldRender(true);
      window.requestAnimationFrame(() => setIsVisible(true));
    }, 350);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, DISPLAY_TIME_MS + 350);

    const removeTimer = window.setTimeout(() => {
      setShouldRender(false);
    }, DISPLAY_TIME_MS + FADE_TIME_MS + 350);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    window.setTimeout(() => setShouldRender(false), FADE_TIME_MS);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center px-4 py-6 transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Última edição - Feira da Torre"
    >
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/20 bg-emerald-950/85 text-white shadow-2xl backdrop-blur-md transition-all duration-700 ease-out ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <button
          type="button"
          onClick={closePopup}
          className="absolute z-20 flex items-center justify-center w-9 h-9 text-white transition rounded-full right-4 top-4 bg-black/25 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/70"
          aria-label="Fechar aviso"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.28),transparent_40%)]" />
        <div className="absolute -left-20 top-8 h-44 w-44 rounded-full bg-lime-400/10 blur-2xl" />
        <div className="absolute -right-16 bottom-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-2xl" />

        <div className="relative px-7 pb-8 pt-12 text-center">
          <div className="mx-auto mb-5 h-1 w-32 rounded-full bg-lime-400 shadow-[0_0_18px_rgba(163,230,53,0.75)]" />

          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">
            Feira do Trabalho e do Campo
          </p>

          <h2 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">
            A maior
            <span className="block text-5xl font-semibold italic text-lime-300 sm:text-6xl">
              e última
            </span>
            edição.
          </h2>

          <div className="mt-7 rounded-2xl border border-lime-300/30 bg-white/15 px-5 py-4 shadow-lg">
            <p className="text-lg font-semibold tracking-wide sm:text-xl">
              De 30/06 a 05/07
            </p>
            <p className="mt-1 text-base text-white/90">de 12h às 21h</p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-extrabold uppercase tracking-[0.18em] text-lime-300">
              Plano Piloto
            </p>
            <p className="mt-1 text-lg text-white">Eixo Ibero Americano</p>
          </div>

          <a
            href="/cronograma"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-lime-400 px-7 py-3 text-sm font-bold uppercase tracking-wide text-emerald-950 shadow-lg transition hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-100"
          >
            Ver programação
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
