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
        <title>Feira do Trabalho e do Campo - DF</title>
        <meta 
          name="description" 
          content="Feira do Trabalho e do Campo - DF, de 12 a 17 de maio de 2026, em Água Quente-DF." 
        />
        <meta property="og:title" content="Feira do Trabalho e do Campo - DF" />
        <meta 
          property="og:description" 
          content="De 12 a 17 de maio de 2026, em Água Quente-DF." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feiradotrabalhoedocampodf.com/" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="keywords" content="feira, trabalho, campo, água quente, distrito federal, sustentabilidade, agricultura" />
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
