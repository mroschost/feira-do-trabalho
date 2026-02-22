import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import { dataService } from '@/services/DataService';

const News = () => {
  const activeSlug = dataService.getCurrentEditionSlug();
  const [activeFilter, setActiveFilter] = useState(activeSlug);
  const [newsData, setNewsData] = useState({});

  const editions = dataService.getEditions();

  useEffect(() => {
    const loadNewsData = () => {
      const data = {};
      editions.forEach(edition => {
        try {
          data[edition.slug] = dataService.getNews(edition.slug);
        } catch (error) {
          console.error(`Erro ao carregar notícias para ${edition.slug}:`, error);
        }
      });
      setNewsData(data);
    };

    loadNewsData();
  }, [editions]);

  const currentNews = newsData[activeFilter];

  const handleNewsClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="noticias" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Notícias
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Fique por dentro das últimas novidades e atualizações sobre a feira
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {editions.map((edition) => (
            <button
              key={edition.slug}
              onClick={() => setActiveFilter(edition.slug)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeFilter === edition.slug
                  ? 'bg-[#3FA637] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {edition.name}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {currentNews && currentNews.items.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentNews.items.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="overflow-hidden transition-all duration-300 bg-white shadow-lg cursor-pointer rounded-xl hover:shadow-xl group"
                  onClick={() => handleNewsClick(item.link)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={`Imagem da notícia: ${item.title}`}
                     src={item.image} />
                    <div className="absolute p-2 rounded-full top-4 right-4 bg-white/90 backdrop-blur-sm">
                      <ExternalLink className="h-4 w-4 text-[#3FA637]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#3FA637] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-gray-600 line-clamp-3">
                      {item.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Publicado recentemente</span>
                      </div>
                      <span className="text-[#3FA637] font-medium text-sm group-hover:underline">
                        Leia mais
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="p-8 bg-white shadow-lg rounded-xl">
                <p className="text-lg text-gray-500">
                  Nenhuma notícia disponível para esta edição
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default News;