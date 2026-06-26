import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import ArtistSignup from '@/components/ArtistSignup';
import Presentation from '@/components/Presentation';
import RecentNews from '@/components/RecentNews';
import HighlightsGrid from '@/components/HighLightsGrid';
import EventPopup from '@/components/EventPopup';

const Home = () => {
  const previewImage = 'https://feiradotrabalhoedocampodf.com/assets/images/feira.webp';

  return (
    <>
      <Helmet>
        <title>Última edição - Plano Piloto 2026 | Feira do Trabalho e do Campo DF</title>
        <meta 
          name="description" 
          content="Última edição da Feira do Trabalho e do Campo DF: Plano Piloto 2026, de 30 de junho a 05 de julho, no Eixo Ibero Americano." 
        />
        <meta property="og:title" content="Última edição - Plano Piloto 2026 | Feira do Trabalho e do Campo DF" />
        <meta 
          property="og:description" 
          content="Última edição da Feira do Trabalho e do Campo DF, de 30 de junho a 05 de julho de 2026, no Plano Piloto - Eixo Ibero Americano." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feiradotrabalhoedocampodf.com/" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:image" content={previewImage} />
        <meta property="og:image:secure_url" content={previewImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Logo da Feira do Trabalho e do Campo DF" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Última edição - Plano Piloto 2026 | Feira do Trabalho e do Campo DF" />
        <meta name="twitter:description" content="De 30 de junho a 05 de julho de 2026, no Plano Piloto - Eixo Ibero Americano." />
        <meta name="twitter:image" content={previewImage} />
        <meta name="keywords" content="feira, trabalho, campo, plano piloto, eixo ibero americano, última edição, distrito federal, sustentabilidade, agricultura" />
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
