import React from 'react';
import { Helmet } from 'react-helmet';
import Schedule from '@/components/Schedule';

const SchedulePage = () => {
  return (
    <>
      <Helmet>
        <title>Cronograma | Feira do Trabalho e do Campo DF 2026</title>
        <meta 
          name="description" 
          content="Confira a programação completa da Feira do Trabalho e do Campo DF. Atividades, palestras e workshops para todas as edições." 
        />
        <meta property="og:title" content="Cronograma | Feira do Trabalho e do Campo DF 2026" />
        <meta property="og:description" content="Programação completa da Feira do Trabalho e do Campo DF." />
        <meta property="og:url" content="https://feiradotrabalhoedocampodf.com/cronograma" />
        <link rel="canonical" href="https://feiradotrabalhoedocampodf.com/cronograma" />
      </Helmet>
      <Schedule />
    </>
  );
};

export default SchedulePage;