import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import ArtistSignup from '@/components/ArtistSignup';
import Presentation from '@/components/Presentation';
import RecentNews from '@/components/RecentNews';
import HighlightsGrid from '@/components/HighLightsGrid';
import EventPopup from '@/components/EventPopup';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Plano Piloto 2026 | Feira do Trabalho e do Campo DF</title>
        <meta 
          name="description" 
          content="Plano Piloto 2026 da Feira do Trabalho e do Campo DF, de 30 de junho a 05 de julho de 2026, no Eixo Ibero Americano." 
        />
        <meta property="og:title" content="Plano Piloto 2026 | Feira do Trabalho e do Campo DF" />
        <meta 
          property="og:description" 
          content="De 30 de junho a 05 de julho de 2026, no Plano Piloto - Eixo Ibero Americano." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feiradotrabalhoedocampodf.com/" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="keywords" content="feira, trabalho, campo, plano piloto, eixo ibero americano, distrito federal, sustentabilidade, agricultura" />
        <meta name="author" content="Feira do Trabalho e do Campo DF" />
        <link rel="canonical" href="https://feiradotrabalhoedocampodf.com/" />
      </Helmet>
      <EventPopup />
      <Hero />
      <ArtistSignup />
      <Presentation />
      <HighlightsGrid />
      <RecentNews />
    </>
  );
};

export default Home;
