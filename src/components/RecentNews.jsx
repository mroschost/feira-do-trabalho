import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { dataService } from '@/services/DataService';
import { getEditionNewsFallbackImage, getNewsImageSrc, handleNewsImageError } from '@/utils/newsImageUtils';

const RecentNews = () => {
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    try {
      const editions = dataService
        .getEditions()
        .filter((edition) => edition.slug)
        .sort((a, b) => {
          const dateA = new Date(`${a.endDate || a.startDate}T00:00:00-03:00`).getTime();
          const dateB = new Date(`${b.endDate || b.startDate}T00:00:00-03:00`).getTime();

          if (Number.isNaN(dateA) && Number.isNaN(dateB)) return 0;
          if (Number.isNaN(dateA)) return 1;
          if (Number.isNaN(dateB)) return -1;

          return dateB - dateA;
        });

      const latestNews = editions.flatMap((edition) => {
        const newsData = dataService.getNews(edition.slug);
        return newsData.items.map((item) => ({
          ...item,
          editionSlug: edition.slug,
          editionName: edition.slug === 'feira-da-torre-2026' ? 'Plano Piloto 2026' : edition.name,
        }));
      });

      setRecentNews(latestNews.slice(0, 3));
    } catch (error) {
      console.error('Erro ao carregar notícias recentes:', error);
    }
  }, []);

  const handleNewsClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  if (recentNews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Últimas Notícias
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Acompanhe as principais atualizações e repercussões das edições da Feira do Trabalho e do Campo DF.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentNews.map((item, index) => (
              <motion.article
                key={`${item.link}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden transition-all duration-300 bg-white shadow-lg cursor-pointer rounded-xl hover:shadow-xl group"
                onClick={() => handleNewsClick(item.link)}
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={`Imagem da notícia: ${item.title}`}
                    src={getNewsImageSrc(item.image, item.editionSlug)}
                    data-fallback-src={getEditionNewsFallbackImage(item.editionSlug)}
                    onError={handleNewsImageError}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute p-2 rounded-full top-4 right-4 bg-white/90 backdrop-blur-sm">
                    <ExternalLink className="h-4 w-4 text-[#3FA637]" />
                  </div>
                </div>
                <div className="p-6">
                  {item.editionName ? (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-[#3FA637] mb-3">
                      {item.editionName}
                    </span>
                  ) : null}
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
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 bg-[#3FA637] text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
          >
            Ver mais notícias
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
