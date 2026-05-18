import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroMb1 from "@/assets/images/hero_mb_1.jpeg";
import heroMb2 from "@/assets/images/hero_mb_2.jpeg";
import heroDesktop from "@/assets/images/hero_desktop.webp";
import { dataService } from "@/services/DataService";

const Hero = () => {
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 30 },
    animate: shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
  });

  const currentEdition = dataService.getCurrentEdition();

  const LOCALIZATION = currentEdition?.location ?? "";

  const splitLocation = (value) => {
    if (!value) return { place: "", city: "" };

    // Prefer en dash separator used in content: " ... – Cidade "
    const enDash = value.split(" – ");
    if (enDash.length >= 2) {
      const [place, ...rest] = enDash;
      return { place: place.trim(), city: rest.join(" – ").trim() };
    }

    // Fallback to hyphen separator " ... - Cidade "
    const hyphen = value.split(" - ");
    if (hyphen.length >= 2) {
      const [place, ...rest] = hyphen;
      return { place: place.trim(), city: rest.join(" - ").trim() };
    }

    // No separator found
    return { place: value.trim(), city: "" };
  };

  const { place: LOCATION_PLACE, city: LOCATION_CITY } = splitLocation(LOCALIZATION);

  const formatHeroDate = (start, end) => {
    if (!start || !end) return "";

    const startDate = new Date(`${start}T00:00:00-03:00`);
    const endDate = new Date(`${end}T00:00:00-03:00`);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return "";

    const sameMonth =
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear();

    const startDay = String(startDate.getDate()).padStart(2, "0");
    const endDay = String(endDate.getDate()).padStart(2, "0");

    const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
      sameMonth ? startDate : endDate
    );
    const monthTitle = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    if (sameMonth) {
      return `${startDay} a ${endDay} de ${monthTitle} de ${startDate.getFullYear()}`;
    }

    const startLabel = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(startDate);

    const endLabel = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(endDate);

    return `${startLabel} a ${endLabel}`;
  };

  const DATE = formatHeroDate(currentEdition?.startDate, currentEdition?.endDate);
  const TIME = "13h às 21h";



  return (
    <section
      id="inicio"
      aria-label="Seção principal: Feira do Trabalho e do Campo DF"
      className="relative flex items-center justify-center overflow-hidden md:min-h-screen"
    >
      {/* Desktop View */}
      <div
        className="absolute inset-0 items-center justify-center hidden text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] bg-center bg-cover md:flex"
        style={{ backgroundImage: `url(${heroDesktop})` }}
      >
        {/* overlay com opacidade válida */}
        {/* era bg-gray-900/40 */}
        <div className="absolute inset-0 bg-white/20"></div>

        <div className="container relative z-10 px-4 py-20 mx-auto text-center">
          <motion.div
            {...fadeUp(0)}
            className="relative max-w-4xl mx-auto inline-block px-4
               before:content-[''] before:absolute before:inset-[-1.25rem]
               before:rounded-2xl before:bg-gradient-to-b
               before:from-white/5 before:via-white/5 before:to-transparent
               before:blur-[2px] before:-z-10"
          >
            <motion.h1
              {...fadeUp(0.2)}
              className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight
             text-gray-900 bg-gradient-to-b from-gray-700 to-gray-500 bg-clip-text text-transparent
             drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]"
            >
              Feira do Trabalho e do Campo
              <br />
              <span className="text-[#3FA637] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                11ª edição Água Quente
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.4)}
              className="mb-8 text-xl md:text-2xl lg:text-3xl font-light
             text-gray-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]"
            >
              Abrindo caminhos para a agricultura familiar e negócios locais
              sustentáveis.
            </motion.p>

            <motion.div
              className="flex flex-col flex-wrap items-center justify-center gap-6 mb-10 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Data */}
              <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-full shadow-sm bg-white/70 backdrop-blur-sm ring-1 ring-black/5 w-full sm:w-[520px]">
                <Calendar
                  className="w-6 h-6 text-[#3FA637]"
                  aria-hidden="true"
                />
                <span
                  className="text-lg font-medium text-gray-900
                     drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]"
                >
                  {DATE}
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-full shadow-sm bg-white/70 backdrop-blur-sm ring-1 ring-black/5 w-full sm:w-[520px]">
                <Clock
                  className="w-6 h-6 text-[#3FA637]"
                  aria-hidden="true"
                />
                <span
                  className="text-lg font-medium text-gray-900
                     drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]"
                >
                  {TIME}
                </span>
              </div>

              {/* Local */}
              <div className="flex items-start justify-center gap-3 px-6 py-3 rounded-full shadow-sm bg-white/70 backdrop-blur-sm ring-1 ring-black/5 w-full sm:w-[520px]">
                <MapPin className="w-6 h-6 text-[#3FA637]" aria-hidden="true" />
                <div
                  className="text-lg font-medium text-gray-900 text-center leading-snug whitespace-normal break-words
                     drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]"
                >
                  <div>{LOCATION_PLACE}</div>
                  {LOCATION_CITY ? <div>{LOCATION_CITY}</div> : null}
                </div>
              </div>
            </motion.div>

            {/* CTA como Link semântico */}
            <motion.div {...fadeUp(0.8)}>
              <Link
                to="/cronograma"
                className="inline-block bg-white text-[#3FA637] px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
                aria-label="Ver programação completa"
              >
                Veja a programação
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* scroll cue decorativo */}
        <motion.div
          aria-hidden="true"
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/50">
            <motion.div
              className="w-1 h-3 mt-2 bg-white rounded-full"
              animate={shouldReduce ? {} : { y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="w-full bg-white md:hidden">
        <div className="w-full h-64 sm:h-80">
          <img
            className="object-cover object-top w-full h-full"
            alt="Agricultor sorrindo em um campo verdejante"
            src={heroMb1}
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </div>

        <div
          className="container px-4 py-6 mx-auto text-center text-gray-800"
          style={{ backgroundImage: `url(${heroMb2})` }}
        >
          <motion.h1
            {...fadeUp(0)}
            className="mb-4 text-3xl font-bold leading-tight"
          >
            Feira do Trabalho e do Campo
            <br />
            <span className="text-[#3FA637]">11ª edição Água Quente</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mb-6 text-lg text-gray-600">
            Abrindo caminhos para a agricultura familiar e negócios locais
            sustentáveis.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col items-center justify-center gap-4 mb-8"
          >
            {/* Data (chip) */}
            <div className="flex items-center justify-center gap-3 px-5 py-3 rounded-full shadow-sm bg-white/70 backdrop-blur-sm ring-1 ring-black/5 w-full max-w-[520px]">
              <Calendar className="h-5 w-5 text-[#3FA637]" aria-hidden="true" />
              <span className="font-medium text-gray-900">{DATE}</span>
            </div>

            <div className="flex items-center justify-center gap-3 px-5 py-3 rounded-full shadow-sm bg-white/70 backdrop-blur-sm ring-1 ring-black/5 w-full max-w-[520px]">
              <Clock className="h-5 w-5 text-[#3FA637]" aria-hidden="true" />
              <span className="font-medium text-gray-900">{TIME}</span>
            </div>

            {/* Local (chip) */}
            <div className="flex items-start justify-center gap-3 px-5 py-3 rounded-full shadow-sm bg-white/70 backdrop-blur-sm ring-1 ring-black/5 w-full max-w-[520px]">
              <MapPin className="h-5 w-5 text-[#3FA637] mt-0.5" aria-hidden="true" />
              <div className="font-medium leading-snug text-center text-gray-900 break-words whitespace-normal">
                <div>{LOCATION_PLACE}</div>
                {LOCATION_CITY ? <div>{LOCATION_CITY}</div> : null}
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.6)}>
            <Link
              to="/cronograma"
              className="inline-block bg-[#3FA637] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
              aria-label="Ver programação completa"
            >
              Veja a programação
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
