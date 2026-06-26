import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import ArtistSignup from '@/components/ArtistSignup';
import Presentation from '@/components/Presentation';
import RecentNews from '@/components/RecentNews';
import HighlightsGrid from '@/components/HighLightsGrid';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Última edição - Feira da Torre | Feira do Trabalho e do Campo DF</title>
        <meta 
          name="description" 
          content="Última edição - Feira da Torre, de 30 de junho a 05 de julho de 2026, em Brasília-DF." 
        />
        <meta property="og:title" content="Última edição - Feira da Torre | Feira do Trabalho e do Campo DF" />
        <meta 
          property="og:description" 
          content="De 30 de junho a 05 de julho de 2026, na Feira da Torre, em Brasília-DF." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feiradotrabalhoedocampodf.com/" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="keywords" content="feira, trabalho, campo, feira da torre, distrito federal, sustentabilidade, agricultura" />
        <meta name="author" content="Feira do Trabalho e do Campo DF" />
        <link rel="canonical" href="https://feiradotrabalhoedocampodf.com/" />
      </Helmet>
      <Hero />
      <ArtistSignup />
      <Presentation />
      <HighlightsGrid />
      <RecentNews />
    </>
  );
};

export default Home;
