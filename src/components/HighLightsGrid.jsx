import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { dataService } from '@/services/DataService';
import { getCurrentDateInTimezone } from '@/utils/dateUtils';

const TZ = 'America/Sao_Paulo';

const fmtDateLong = new Intl.DateTimeFormat('pt-BR', {
  timeZone: TZ,
  weekday: 'long',
  day: 'numeric',
  month: 'long'
});

function toLocalYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function pickActiveDayIndex(days, todayStr) {
  if (!days?.length) return 0;
  const first = 0;
  const last = days.length - 1;
  const startStr = days[0].date;
  const endStr = days[last].date;

  if (todayStr <= startStr) return first;
  if (todayStr > endStr) return last;

  const idx = days.findIndex(d => d.date === todayStr);
  return idx >= 0 ? idx : first;
}

const HighlightsGrid = () => {
  const [currentEdition, setCurrentEdition] = useState(null);
  const [highlights, setHighlights] = useState({ days: [] });
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [autoSelect, setAutoSelect] = useState(true);

  const prefersReducedMotion = useReducedMotion();
  const activeCardRef = useRef(null);

  // Carrega apenas a edição atual e seus destaques (ordenados)
  useEffect(() => {
    try {
      const edition = dataService.getCurrentEdition?.();
      if (edition) {
        setCurrentEdition(edition);
        const h = dataService.getSchedule(edition.slug);
        const sortedDays = Array.isArray(h?.days)
          ? [...h.days].sort((a, b) => a.date.localeCompare(b.date))
          : [];
        const loadedHighlights = h ? { ...h, days: sortedDays } : { days: [] };
        setHighlights(loadedHighlights);

        // Define o dia ativo inicial conforme regra (antes=1º, durante=hoje, depois=último)
        const now = getCurrentDateInTimezone(TZ);
        const todayStr = toLocalYYYYMMDD(now);
        setActiveDayIndex(pickActiveDayIndex(sortedDays, todayStr));
      }
    } catch (err) {
      console.error('Erro ao carregar destaques da edição atual:', err);
      setHighlights({ days: [] });
    }
  }, []);

  // Recalcula o dia ativo quando o destaque automático estiver ligado
  useEffect(() => {
    if (!autoSelect) return;
    if (!highlights?.days?.length) {
      setActiveDayIndex(0);
      return;
    }
    const now = getCurrentDateInTimezone(TZ);
    const todayStr = toLocalYYYYMMDD(now);
    setActiveDayIndex(pickActiveDayIndex(highlights.days, todayStr));
  }, [autoSelect, highlights?.days]);

  // Atalhos de teclado: ← e → para navegar
  useEffect(() => {
    const handler = (e) => {
      const len = highlights?.days?.length ?? 0;
      if (len === 0) return;
      if (e.key === 'ArrowLeft') {
        if (autoSelect) setAutoSelect(false);
        setActiveDayIndex((prev) => (prev - 1 + len) % len);
      } else if (e.key === 'ArrowRight') {
        if (autoSelect) setAutoSelect(false);
        setActiveDayIndex((prev) => (prev + 1) % len);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [autoSelect, highlights?.days?.length]);


  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Programação da Feira do Trabalho e do Campo
          </h1>
          <h2 className="max-w-2xl mx-auto text-lg text-gray-600">
            {currentEdition?.name ?? 'Carregando…'}
          </h2>
        </motion.div>

        {/* Grade de cards */}
        <motion.div
          key={currentEdition?.slug}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-7xl"
        >
          {highlights?.days?.length ? (
            <div className="relative max-w-3xl mx-auto">
              {(() => {
                const i = Math.min(Math.max(activeDayIndex, 0), highlights.days.length - 1);
                const day = highlights.days[i];
                const isActive = true;
                return (
                  <motion.article
                    key={day.date}
                    ref={activeCardRef}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden bg-white shadow-xl rounded-xl ring-1 ring-black/5"
                    aria-current="true"
                  >
                    {/* Cabeçalho com data (estilo Schedule) */}
                    <div className="bg-[#3FA637] text-white p-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-6 h-6" />
                        <h3 className="text-xl font-bold">
                          {fmtDateLong.format(new Date(`${day.date}T00:00:00`))}
                        </h3>
                      </div>
                    </div>
  
                    {/* Conteúdo do dia: tabela de horários */}
                    <div className="p-6">
                      {Array.isArray(day.items) && day.items.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="w-1/3 px-4 py-3 font-semibold text-left text-gray-800">Horário</th>
                                <th className="w-2/3 px-4 py-3 font-semibold text-left text-gray-800">Atividade</th>
                              </tr>
                            </thead>
                            <tbody>
                              {day.items.map((item, itemIndex) => (
                                <tr key={itemIndex} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                                  <td className="px-4 py-4 align-top">
                                    <div className="flex items-center gap-2 text-[#3FA637] font-medium whitespace-nowrap">
                                      {item.time}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <span className="font-medium text-gray-800">{item.title}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="py-8 text-center text-gray-500">
                          Programação em breve
                        </p>
                      )}
                    </div>
                  </motion.article>
                );
              })()}
              {/* Navegação e controles */}
              <div className="grid items-center w-full grid-cols-1 mt-6 gap-y-4 gap-x-3 sm:grid-cols-3 sm:gap-y-0">
                {/* Coluna esquerda: texto (nome da edição + posição) */}
                <div className="flex items-center justify-start gap-3">
                  <span className="text-xs text-gray-500">
                    Dia {Math.min(Math.max(activeDayIndex, 0), highlights.days.length - 1) + 1} de {highlights.days.length}
                  </span>
                </div>
                {/* Coluna central: botões centralizados */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (autoSelect) setAutoSelect(false);
                      setActiveDayIndex((prev) => (prev - 1 + highlights.days.length) % highlights.days.length);
                    }}
                    className="px-3 py-2 text-sm font-medium bg-white rounded-lg shadow hover:bg-gray-100"
                    aria-label="Dia anterior"
                    title="Use as setas do teclado ou clique para voltar um dia"
                  >
                    ← Anterior
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (autoSelect) setAutoSelect(false);
                      setActiveDayIndex((prev) => (prev + 1) % highlights.days.length);
                    }}
                    className="px-3 py-2 text-sm font-medium text-white rounded-lg shadow bg-[#3FA637] hover:bg-green-700"
                    aria-label="Próximo dia"
                    title="Use as setas do teclado ou clique para avançar um dia"
                  >
                    Próximo →
                  </button>
                </div>
                {/* Coluna direita: placeholder para manter centralização (pode ser usada depois) */}
                <div />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white shadow-lg rounded-xl">
              <p className="text-gray-500">Destaques não disponíveis para esta edição</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HighlightsGrid;