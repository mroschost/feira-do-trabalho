import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Clock, Calendar } from 'lucide-react';
import { dataService } from '@/services/DataService';
import { formatDateLong } from '@/utils/dateUtils';
import { useToast } from '@/components/ui/use-toast';

const Schedule = () => {
  const activeSlug = dataService.getCurrentEditionSlug();
  const [activeTab, setActiveTab] = useState(activeSlug);
  const [scheduleData, setScheduleData] = useState({});
  const { toast } = useToast();

  const editions = dataService.getEditions();

  const getEditionTabLabel = (edition) => {
    if (edition.slug === 'feira-da-torre-2026') {
      return 'Plano Piloto 2026';
    }

    return edition.name;
  };

  useEffect(() => {
    const loadScheduleData = () => {
      const data = {};
      editions.forEach(edition => {
        try {
          data[edition.slug] = dataService.getSchedule(edition.slug);
        } catch (error) {
          console.error(`Erro ao carregar cronograma para ${edition.slug}:`, error);
        }
      });
      setScheduleData(data);
    };

    loadScheduleData();
  }, []);

  const currentSchedule = scheduleData[activeTab];

  return (
    <section id="cronograma" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Cronograma
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Confira a programação completa de todas as edições da feira
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {editions.map((edition) => (
            <button
              key={edition.slug}
              onClick={() => setActiveTab(edition.slug)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === edition.slug
                  ? 'bg-[#3FA637] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {getEditionTabLabel(edition)}
            </button>
          ))}
        </div>

        {/* Schedule Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-7xl"
        >
          {currentSchedule && currentSchedule.days.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentSchedule.days.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col overflow-hidden bg-white shadow-lg rounded-xl"
                >
                  <div className="bg-[#3FA637] text-white p-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6" />
                      <h3 className="text-xl font-bold">
                        {formatDateLong(day.date)}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex-grow p-6">
                    {day.items.length > 0 ? (
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
                                    <Clock className="flex-shrink-0 w-4 h-4" />
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white shadow-lg rounded-xl">
              <p className="text-gray-500">
                Cronograma não disponível para esta edição
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;
