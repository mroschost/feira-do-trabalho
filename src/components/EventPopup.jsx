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
        className={`relative w-full max-w-md transition-all duration-700 ease-out ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <button
          type="button"
          onClick={closePopup}
          className="absolute z-20 flex items-center justify-center w-9 h-9 text-white transition rounded-full right-3 top-3 bg-black/35 hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white/70"
          aria-label="Fechar aviso"
        >
          <X className="w-5 h-5" />
        </button>

        <img
          src="/popup.png"
          alt="A maior e última edição da Feira do Trabalho e do Campo, de 30/06 a 05/07, de 12h às 21h, no Plano Piloto - Eixo Ibero Americano"
          className="w-full h-auto rounded-3xl shadow-2xl"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default EventPopup;
