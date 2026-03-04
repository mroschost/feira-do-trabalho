import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import ArtistSignup from '../components/artistSignup';
import Presentation from '@/components/Presentation';
import RecentNews from '@/components/RecentNews';
import HighlightsGrid from '@/components/HighLightsGrid';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Feira do Trabalho e do Campo DF 2026 | Cultivando o Futuro</title>
        <meta 
          name="description" 
          content="A maior feira de agronegócio do Distrito Federal. De 6 a 11 de outubro de 2025 em Gama/DF. Sustentabilidade, inovação e oportunidades no campo." 
        />
        <meta property="og:title" content="Feira do Trabalho e do Campo DF 2025" />
        <meta 
          property="og:description" 
          content="Cultivando o Futuro: Juntos pela Prosperidade no Campo. A maior feira de agronegócio do DF." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feiradotrabalhoedocampodf.com/" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="keywords" content="feira, agronegócio, campo, distrito federal, gama, sustentabilidade, agricultura" />
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