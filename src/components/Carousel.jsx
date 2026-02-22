
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dataService } from '@/services/DataService';
import { getCurrentDateInTimezone, parseISODate } from '@/utils/dateUtils';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [highlights, setHighlights] = useState(null);

  useEffect(() => {
    try {
      const currentEdition = dataService.getCurrentEditionSlug();
      const highlightsData = dataService.getHighlights(currentEdition);
      setHighlights(highlightsData);

      // Determinar slide ativo baseado na data atual
      const currentDate = getCurrentDateInTimezone();
      const startDate = parseISODate(currentEdition.startDate);
      const endDate = parseISODate(currentEdition.endDate);

      let activeSlideIndex = 0;

      if (currentDate < startDate) {
        // Antes do evento - destacar primeiro dia
        activeSlideIndex = 0;
      } else if (currentDate > endDate) {
        // Após o evento - destacar último dia
        activeSlideIndex = highlightsData.days.length - 1;
      } else {
        // Durante o evento - destacar dia atual
        const dayIndex = highlightsData.days.findIndex(day => {
          const dayDate = parseISODate(day.date);
          return dayDate.toDateString() === currentDate.toDateString();
        });
        activeSlideIndex = dayIndex >= 0 ? dayIndex : 0;
      }

      setCurrentSlide(activeSlideIndex);
    } catch (error) {
      console.error('Erro ao carregar destaques:', error);
    }
  }, []);

  const nextSlide = () => {
    if (highlights) {
      setCurrentSlide((prev) => (prev + 1) % highlights.days.length);
    }
  };

  const prevSlide = () => {
    if (highlights) {
      setCurrentSlide((prev) => (prev - 1 + highlights.days.length) % highlights.days.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!highlights || highlights.days.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="p-8 text-center bg-white rounded-lg shadow-lg">
            <p className="text-gray-600">Carregando destaques...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Destaques do Evento
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Acompanhe os principais momentos da Feira do Trabalho e do Campo DF
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-2xl md:max-w-3xl lg:max-w-[900px]">
          {/* Carousel Container */}
          <div className="relative overflow-hidden shadow-xl rounded-xl
                  h-[28rem] md:h-[34rem] lg:h-[40rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  className="object-cover object-center w-full h-full"
                  alt={highlights.days[currentSlide].alt}
                  loading='eager'
                 src={highlights.days[currentSlide].image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute text-white bottom-6 left-6">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {new Date(highlights.days[currentSlide].date + 'T00:00:00').toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute p-2 text-white transition-all duration-200 transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute p-2 text-white transition-all duration-200 transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Day Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {highlights.days.map((day, index) => (
              <button
                key={day.date}
                onClick={() => goToSlide(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentSlide === index
                    ? 'bg-[#3FA637] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {new Date(day.date + 'T00:00:00').toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit'
                })}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
