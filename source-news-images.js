(function () {
  const SOURCE_NEWS = {
    aguaQuente: [
      { title: 'Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente', link: 'https://agenciabrasilia.df.gov.br/w/nova-edicao-da-feira-do-trabalho-e-do-campo-ocorre-em-agua-quente' },
      { title: 'Feira do Trabalho e do Campo ocorre em Água Quente de 12 a 17 de maio', link: 'https://jornaldebrasilia.com.br/brasilia/feira-do-trabalho-e-do-campo-ocorre-em-agua-quente-de-12-a-17-de-maio/' },
      { title: 'SEDET realiza a 11ª edição da Feira do Trabalho e do Campo', link: 'https://sedet.df.gov.br/w/sedet-realiza-a-11-edicao-da-feira-do-trabalho-e-do-campo' },
      { title: 'Feira do Trabalho e do Campo chega a Água Quente com atividades gratuitas', link: 'https://agitabrasilia.com/feira-do-trabalho-e-do-campo-chega-a-agua-quente-nesta-terca-feira-12-com-atividades-gratuitas/' },
      { title: 'Água Quente vira vitrine de negócios com feira gratuita até domingo', link: 'https://bsbcapital.com.br/agua-quente-vira-vitrine-de-negocios-com-feira-gratuita-ate-domingo/' },
      { title: 'Feira do Trabalho e do Campo em Água Quente oferece serviços gratuitos até domingo', link: 'https://www.oitoquatronoticias.com.br/distrito-federal/feira-trabalho-campo-agua-quente-ate-domingo-17/' },
      { title: 'Feira de Trabalho e Campo em Água Quente de 12 a 17 de maio', link: 'https://noticiasdoplanalto.com.br/feira-de-trabalho-e-campo-em-agua-quente-de-12-a-17-de-maio/' },
      { title: 'Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente', link: 'https://antenados.com.br/nova-edicao-da-feira-do-trabalho-e-do-campo-ocorre-em-agua-quente/?amp=1' },
      { title: 'Feira leva capacitação e renda a Água Quente', link: 'https://fonteemfoco.com.br/feira-do-campo-agua-quente/' },
      { title: 'Feira de Trabalho e Campo em Água Quente de 12 a 17 de maio', link: 'https://imprensapublica.com.br/feira-de-trabalho-e-campo-em-agua-quente-de-12-a-17-de-maio/' },
      { title: 'Feira movimenta Água Quente com capacitação e incentivo ao empreendedorismo local', link: 'https://fatoporfato.com.br/noticias/feira-movimenta-agua-quente-com-capacitacao-e-incentivo-ao-empreendedorismo-local/' },
      { title: 'Feira do Trabalho e do Campo acontece em Água Quente com atividades gratuitas', link: 'https://dfnamidia.com.br/distrito-federal/feira-do-trabalho-e-do-campo-acontece-em-agua-quente-nesta-terca-feira-12-com-atividades-gratuitas/' },
      { title: 'Feira do Trabalho e do Campo chega a Água Quente com palestras e capacitações', link: 'https://soubrasilia.com/feira-trabalho-campo-agua-quente-12-17-maio-2026/' },
      { title: 'Feira do Trabalho e do Campo leva capacitação e agricultura familiar para Água Quente', link: 'https://plenax.com.br/feira-do-trabalho-e-do-campo-leva-capacitacao-empreendedorismo-e-agricultura-familiar-para-agua-quente/' },
      { title: 'Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente', link: 'https://www.portalradiocandanga.com.br/2026/05/nova-edicao-da-feira-do-trabalho-e-do.html?m=1' },
      { title: 'Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente', link: 'https://atividadenews.com.br/nova-edicao-da-feira-do-trabalho-e-do-campo-ocorre-em-agua-quente/' },
      { title: 'Feira do Trabalho e do Campo em Água Quente incentiva emprego e qualificação profissional', link: 'https://conectadoaopoder.com.br/roberio-negreiros-destaca-feira-do-trabalho-e-do-campo-em-agua-quente-como-incentivo-a-geracao-de-emprego-e-qualificacao-profissional/?amp' },
      { title: 'Nova edição da Feira do Trabalho e do Campo será realizada em Água Quente', link: 'https://reportercapital.com.br/df/nova-edicao-da-feira-do-trabalho-e-do-campo-sera-realizada-em-agua-quente/' }
    ],
    cruzeiro: [
      { title: 'Cruzeiro recebe Feira do Trabalho e do Campo voltada a mulheres empreendedoras', link: 'https://jornaldebrasilia.com.br/brasilia/cruzeiro-recebe-feira-do-trabalho-e-do-campo-voltada-a-mulheres-empreendedoras/' },
      { title: 'Com foco no empreendedorismo feminino, Cruzeiro recebe edição especial da Feira do Trabalho e do Campo', link: 'https://www.agenciabrasilia.df.gov.br/w/com-foco-no-empreendedorismo-feminino-cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo' },
      { title: 'Cruzeiro recebe Feira do Trabalho e do Campo com foco nas mulheres empreendedoras', link: 'https://sedet.df.gov.br/w/voltada-para-valorizacao-das-mulheres-empreendedoras-e-com-foco-na-semana-da-economia-nacional-solidaria-cruzeiro-recebe-a-feira-do-trabalho-e-do-campo' },
      { title: 'Aproveite essa semana: edição especial da Feira do Trabalho e do Campo', link: 'https://agitabrasilia.com/aproveite-essa-semana-edicao-especial-da-feira-do-trabalho-e-do-campo/' },
      { title: 'Feira do Trabalho e do Campo tem foco no protagonismo feminino', link: 'https://jornaldebrasilia.com.br/brasilia/feira-do-trabalho-e-do-campo-tem-foco-no-protagonismo-feminino/' },
      { title: 'Cruzeiro sedia feira especial para impulsionar empreendedorismo feminino no DF', link: 'https://edicaobrasilia.com.br/cruzeiro-sedia-feira-especial-para-impulsionar-empreendedorismo-feminino-no-df/' },
      { title: 'RA do Cruzeiro sediará feira destacando o trabalho de mulheres empreendedoras', link: 'https://www.portalradiocandanga.com.br/2025/12/a-ra-do-cruzeiro-sediara-uma-feira.html' },
      { title: 'Cruzeiro recebe até sábado a Feira do Trabalho e do Campo', link: 'https://www.diariodebrasilia.net.br/noticia/14240/brasilia/df/o-cruzeiro-recebe-ate-sabado-20-a-feira-do-trabalho-e-do-campo.html' },
      { title: 'Feira no Cruzeiro destaca mulheres empreendedoras do campo e da cidade', link: 'https://imprensapublica.com.br/feira-no-cruzeiro-destaca-mulheres-empreendedoras-do-campo-e-da-cidade/' },
      { title: 'Cruzeiro recebe a Feira do Trabalho e do Campo', link: 'https://www.egnews.com.br/noticias.php?id=45333' },
      { title: 'Cruzeiro recebe edição especial da Feira do Trabalho e do Campo com foco no empreendedorismo feminino', link: 'https://radardigitalbrasilia.com.br/cidades/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino/' },
      { title: 'Cruzeiro recebe edição especial da Feira do Trabalho e do Campo com foco em mulheres empreendedoras', link: 'https://informatudodf.com.br/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-em-mulheres-empreendedoras/' },
      { title: 'Cruzeiro recebe edição especial com foco no empreendedorismo feminino', link: 'https://conectadoaopoder.com.br/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino/' },
      { title: 'Aproveite essa semana: edição especial da Feira do Trabalho e do Campo', link: 'https://visitebrasilia.com.br/noticias/aproveite-essa-semana-edicao-especial-da-feira-do-trabalho-e-do-campo' },
      { title: 'Cruzeiro recebe feira com foco em mulheres empreendedoras e economia solidária', link: 'https://fatoporfato.com.br/distrito-federal/cruzeiro-recebe-feira-com-foco-em-mulheres-empreendedoras-e-economia-solidaria/' },
      { title: 'Com foco no empreendedorismo feminino, Cruzeiro recebe edição especial da Feira do Trabalho e do Campo', link: 'https://dfinfoconews.com.br/com-foco-no-empreendedorismo-feminino-cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo/' },
      { title: 'Cruzeiro recebe edição especial da Feira do Trabalho e do Campo com foco no empreendedorismo feminino', link: 'https://radarsudoeste.com.br/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino/' },
      { title: 'Cruzeiro recebe edição especial com foco no empreendedorismo feminino', link: 'https://jornalinfocruzeiro.com.br/2025/12/15/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino/' },
      { title: 'Cruzeiro recebe edição especial da Feira do Trabalho e do Campo com foco no empreendedorismo feminino', link: 'https://sedet.df.gov.br/w/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino' },
      { title: 'Com foco no empreendedorismo feminino, Cruzeiro recebe edição especial da Feira do Trabalho e do Campo', link: 'https://revistaplanob.com.br/com-foco-no-empreendedorismo-feminino-cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo/' },
      { title: 'Feira do Trabalho e do Campo tem foco no protagonismo feminino', link: 'https://fercalnews.com.br/feira-do-trabalho-e-do-campo-tem-foco-no-protagonismo-feminino/' },
      { title: 'Cruzeiro recebe feira que valoriza mulheres empreendedoras', link: 'https://fonteemfoco.com.br/cruzeiro-recebe-feira-que-valoriza-mulheres-empreendedoras/' },
      { title: 'Com foco no empreendedorismo feminino, Cruzeiro recebe edição especial da Feira do Trabalho e do Campo', link: 'https://antenados.com.br/com-foco-no-empreendedorismo-feminino-cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo/?amp=1' },
      { title: 'Cruzeiro recebe feira que destaca mulheres empreendedoras e economia solidária', link: 'https://midialternativa.com.br/cruzeiro-recebe-feira-que-destaca-mulheres-empreendedoras-e-economia-solidaria/' },
      { title: 'Jornal de Brasília destaca a edição especial no Cruzeiro', link: 'https://www.instagram.com/reel/DSVg-6JjnlH/' },
      { title: 'Cruzeiro recebe feira com foco no empreendedorismo feminino', link: 'https://www.instagram.com/p/DSS4loMjSgd/' }
    ]
  };

  Object.keys(SOURCE_NEWS).forEach(function (key) {
    SOURCE_NEWS[key] = SOURCE_NEWS[key].slice().reverse();
  });

  const imageCache = new Map();
  let activeEdition = null;
  let generation = 0;

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function editionFromText(value) {
    const text = normalizeText(value);
    if (text.indexOf('agua quente') !== -1) return 'aguaQuente';
    if (text.indexOf('cruzeiro') !== -1) return 'cruzeiro';
    return null;
  }

  function findNewsSection() {
    return document.querySelector('#noticias');
  }

  function detectActiveEdition(section) {
    if (!section) return null;
    const buttons = Array.from(section.querySelectorAll('button'));

    for (let index = 0; index < buttons.length; index += 1) {
      const button = buttons[index];
      const edition = editionFromText(button.textContent);
      if (!edition) continue;

      const className = button.getAttribute('class') || '';
      const isActive =
        button.getAttribute('aria-selected') === 'true' ||
        button.getAttribute('data-state') === 'active' ||
        className.indexOf('text-white') !== -1 ||
        className.indexOf('bg-[#3FA637]') !== -1;

      if (isActive) return edition;
    }

    return null;
  }

  function metadataEndpoint(link) {
    return 'https://api.microlink.io/?url=' + encodeURIComponent(link) + '&meta=false&screenshot=false&video=false&audio=false&palette=false';
  }

  function getCachedImage(link) {
    if (imageCache.has(link)) return imageCache.get(link);

    try {
      const value = localStorage.getItem('source-news-image:' + link);
      if (value) {
        imageCache.set(link, value);
        return value;
      }
    } catch (error) {
      // localStorage pode estar indisponível em navegação privada restrita.
    }

    return null;
  }

  function saveCachedImage(link, imageUrl) {
    imageCache.set(link, imageUrl);
    try {
      localStorage.setItem('source-news-image:' + link, imageUrl);
    } catch (error) {
      // Mantém somente o cache em memória.
    }
  }

  async function resolveSourceImage(link) {
    const cached = getCachedImage(link);
    if (cached) return cached;

    const response = await fetch(metadataEndpoint(link), {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) throw new Error('Falha ao consultar metadados: ' + response.status);

    const payload = await response.json();
    const image = payload && payload.data && payload.data.image;
    const imageUrl = typeof image === 'string' ? image : image && image.url;

    if (!imageUrl) throw new Error('A fonte não informou imagem de capa.');

    saveCachedImage(link, imageUrl);
    return imageUrl;
  }

  function setCardImage(card, entry, currentGeneration) {
    const image = card && card.querySelector('img');
    if (!image || !entry) return;

    image.dataset.sourceArticle = entry.link;
    image.removeAttribute('srcset');
    image.referrerPolicy = 'no-referrer';

    resolveSourceImage(entry.link)
      .then(function (imageUrl) {
        if (currentGeneration !== generation) return;
        if (image.dataset.sourceArticle !== entry.link) return;

        image.src = imageUrl;
        image.dataset.sourceImageApplied = 'true';
      })
      .catch(function () {
        // Não substitui por uma imagem genérica: preserva o card até a fonte responder.
      });
  }

  function patchNewsPage() {
    const section = findNewsSection();
    if (!section || !activeEdition || !SOURCE_NEWS[activeEdition]) return;

    const entries = SOURCE_NEWS[activeEdition];
    const cards = Array.from(section.querySelectorAll('article'));
    const currentGeneration = generation;

    cards.forEach(function (card, index) {
      setCardImage(card, entries[index], currentGeneration);
    });
  }

  function findEntryByTitle(title, usedLinks) {
    const normalized = normalizeText(title);
    const allEntries = SOURCE_NEWS.aguaQuente.concat(SOURCE_NEWS.cruzeiro);

    for (let index = 0; index < allEntries.length; index += 1) {
      const entry = allEntries[index];
      if (usedLinks.has(entry.link)) continue;
      if (normalizeText(entry.title) === normalized) {
        usedLinks.add(entry.link);
        return entry;
      }
    }

    return null;
  }

  function patchRecentNews() {
    const sections = Array.from(document.querySelectorAll('section'));
    const section = sections.find(function (candidate) {
      const heading = candidate.querySelector('h1, h2');
      return heading && normalizeText(heading.textContent).indexOf('ultimas noticias') !== -1;
    });

    if (!section) return;

    const usedLinks = new Set();
    const currentGeneration = generation;

    section.querySelectorAll('article').forEach(function (card) {
      const heading = card.querySelector('h3');
      const entry = findEntryByTitle(heading ? heading.textContent : '', usedLinks);
      if (entry) setCardImage(card, entry, currentGeneration);
    });
  }

  function activateEdition(edition) {
    activeEdition = edition;
    generation += 1;

    if (!edition) return;

    setTimeout(patchNewsPage, 60);
    setTimeout(patchNewsPage, 180);
    setTimeout(patchNewsPage, 450);
    setTimeout(patchNewsPage, 900);
  }

  document.addEventListener('click', function (event) {
    const button = event.target && event.target.closest ? event.target.closest('button') : null;
    const section = findNewsSection();

    if (!button || !section || !section.contains(button)) return;

    activateEdition(editionFromText(button.textContent));
  }, true);

  const observer = new MutationObserver(function () {
    if (activeEdition) patchNewsPage();
  });

  function start() {
    observer.observe(document.body, { childList: true, subtree: true });

    const section = findNewsSection();
    const detected = detectActiveEdition(section);
    if (detected) activateEdition(detected);

    setTimeout(patchRecentNews, 300);
    setTimeout(patchRecentNews, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
