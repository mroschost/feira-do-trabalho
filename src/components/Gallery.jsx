import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dataService } from '@/services/DataService';

const Gallery = () => {
  const activeSlug = dataService.getCurrentEditionSlug();
  const [activeFilter, setActiveFilter] = useState(activeSlug);
  const [galleryData, setGalleryData] = useState({});
  const [lightbox, setLightbox] = useState({ open: false, index: null });

  const editions = dataService.getEditions();

  const getEditionTabLabel = (edition) => {
    if (edition.slug === 'feira-da-torre-2026') {
      return 'Plano Piloto 2026';
    }

    return edition.name;
  };

  const currentPhotos = React.useMemo(() => galleryData[activeFilter]?.photos ?? [], [galleryData, activeFilter]);

  useEffect(() => {
    // Carregar dados de todas as edições
    const loadGalleryData = () => {
      const data = {};
      editions.forEach(edition => {
        try {
          data[edition.slug] = dataService.getGallery(edition.slug);
        } catch (error) {
          console.error(`Erro ao carregar galeria para ${edition.slug}:`, error);
        }
      });
      setGalleryData(data);
    };

    loadGalleryData();
  }, [editions]);

  // Fechar lightbox com ESC
  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox({ open: false, index: null });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open]);

  // Bloqueia o scroll de fundo quando o lightbox está aberto
  useEffect(() => {
    if (lightbox.open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [lightbox.open]);

  // Navegação no lightbox com setas ←/→
  useEffect(() => {
    if (!lightbox.open) return;
    const len = currentPhotos.length;
    if (len === 0) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightbox((s) => ({ open: true, index: (s.index - 1 + len) % len }));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightbox((s) => ({ open: true, index: (s.index + 1) % len }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, activeFilter, currentPhotos]);

  // Preload da próxima e anterior imagens para navegação mais fluida
  useEffect(() => {
    if (!lightbox.open) return;
    const photos = currentPhotos;
    const len = photos.length;
    if (!len || !Number.isInteger(lightbox.index)) return;
    const nextIndex = (lightbox.index + 1) % len;
    const prevIndex = (lightbox.index - 1 + len) % len;
    [nextIndex, prevIndex].forEach((i) => {
      const url = photos[i]?.url;
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, [lightbox.open, lightbox.index, activeFilter, currentPhotos]);

  return (
    <section id="galeria" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Galeria
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Reviva os melhores momentos das edições da Feira do Trabalho e do Campo DF
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
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
              }`}
            >
              {getEditionTabLabel(edition)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {currentPhotos.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentPhotos.map((photo, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => setLightbox({ open: true, index })}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden transition-all duration-300 shadow-lg group rounded-xl hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3FA637] cursor-zoom-in"
                  aria-label={`Ampliar imagem: ${photo?.alt ?? 'foto da galeria'}`}
                >
                  <div className="bg-gray-200 aspect-w-4 aspect-h-3">
                    <img
                      className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                      alt={photo?.alt ?? 'Foto da galeria'}
                      loading="lazy"
                      src={photo?.url}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:opacity-100">
                    <div className="absolute text-white bottom-4 left-4">
                      <p className="text-lg font-semibold">{photo?.city ?? ''}</p>
                      <p className="text-sm text-gray-200">{photo?.year ?? ''}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="p-8 bg-gray-100 rounded-xl">
                <p className="text-lg text-gray-500">
                  Galeria não disponível para esta edição
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Lightbox modal */}
        {lightbox.open && Number.isInteger(lightbox.index) && currentPhotos[lightbox.index] && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setLightbox({ open: false, index: null })}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navegação: anterior / próximo */}
              <button
                type="button"
                className="absolute z-10 p-2 text-white -translate-y-1/2 rounded-full left-2 top-1/2 bg-black/50 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                onClick={(e) => {
                  e.stopPropagation();
                  const len = currentPhotos.length;
                  if (len) setLightbox((s) => ({ open: true, index: (s.index - 1 + len) % len }));
                }}
                aria-label="Imagem anterior"
                title="Anterior (←)"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute z-10 p-2 text-white -translate-y-1/2 rounded-full right-2 top-1/2 bg-black/50 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                onClick={(e) => {
                  e.stopPropagation();
                  const len = currentPhotos.length;
                  if (len) setLightbox((s) => ({ open: true, index: (s.index + 1) % len }));
                }}
                aria-label="Próxima imagem"
                title="Próximo (→)"
              >
                ›
              </button>
              <button
                type="button"
                className="absolute z-10 p-2 text-white transition rounded-full top-2 right-2 bg-black/50 hover:bg-black/70"
                onClick={() => setLightbox({ open: false, index: null })}
                aria-label="Fechar visualização"
                title="Fechar (Esc)"
              >
                ×
              </button>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={lightbox.index}
                  src={currentPhotos[lightbox.index]?.url}
                  alt={currentPhotos[lightbox.index]?.alt ?? 'Foto ampliada'}
                  className="object-contain w-screen h-screen max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl"
                  loading="eager"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
              <div className="absolute px-2 py-1 text-xs text-white -translate-x-1/2 rounded bottom-2 left-1/2 bg-black/60">
                {(lightbox.index + 1)} / {currentPhotos.length}
              </div>
              {currentPhotos[lightbox.index]?.alt && (
                <p className="mt-3 text-sm text-center text-white/90">
                  {currentPhotos[lightbox.index]?.alt}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
