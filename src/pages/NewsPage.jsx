import React from 'react';
import { Helmet } from 'react-helmet';
import News from '@/components/News';

const NewsPage = () => {
  return (
    <>
      <Helmet>
        <title>Notícias | Feira do Trabalho e do Campo DF 2026</title>
        <meta 
          name="description" 
          content="Fique por dentro das últimas novidades e atualizações sobre a Feira do Trabalho e do Campo DF." 
        />
        <meta property="og:title" content="Notícias | Feira do Trabalho e do Campo DF 2026" />
        <meta property="og:description" content="Últimas novidades sobre a Feira do Trabalho e do Campo DF." />
        <meta property="og:url" content="https://feiradotrabalhoedocampodf.com/noticias" />
        <link rel="canonical" href="https://feiradotrabalhoedocampodf.com/noticias" />
      </Helmet>
      <News />
    </>
  );
};

export default NewsPage;