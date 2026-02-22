import React from 'react';
import { Helmet } from 'react-helmet';
import Gallery from '@/components/Gallery';

const GalleryPage = () => {
  return (
    <>
      <Helmet>
        <title>Galeria | Feira do Trabalho e do Campo DF 2026</title>
        <meta 
          name="description" 
          content="Reviva os melhores momentos da Feira do Trabalho e do Campo DF. Fotos das edições de Gama, Planaltina e São Sebastião." 
        />
        <meta property="og:title" content="Galeria | Feira do Trabalho e do Campo DF 2026" />
        <meta property="og:description" content="Fotos e melhores momentos da Feira do Trabalho e do Campo DF." />
        <meta property="og:url" content="https://feiradotrabalhoedocampodf.com/galeria" />
        <link rel="canonical" href="https://feiradotrabalhoedocampodf.com/galeria" />
      </Helmet>
      <Gallery />
    </>
  );
};

export default GalleryPage;