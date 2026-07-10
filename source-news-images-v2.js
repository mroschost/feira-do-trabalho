(function () {
  const SOURCE_NEWS = {
    aguaQuente: [
      ['Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente', 'https://agenciabrasilia.df.gov.br/w/nova-edicao-da-feira-do-trabalho-e-do-campo-ocorre-em-agua-quente'],
      ['Feira do Trabalho e do Campo ocorre em Água Quente de 12 a 17 de maio', 'https://jornaldebrasilia.com.br/brasilia/feira-do-trabalho-e-do-campo-ocorre-em-agua-quente-de-12-a-17-de-maio/'],
      ['SEDET realiza a 11ª edição da Feira do Trabalho e do Campo', 'https://sedet.df.gov.br/w/sedet-realiza-a-11-edicao-da-feira-do-trabalho-e-do-campo'],
      ['Feira do Trabalho e do Campo chega a Água Quente com atividades gratuitas', 'https://agitabrasilia.com/feira-do-trabalho-e-do-campo-chega-a-agua-quente-nesta-terca-feira-12-com-atividades-gratuitas/'],
      ['Água Quente vira vitrine de negócios com feira gratuita até domingo', 'https://bsbcapital.com.br/agua-quente-vira-vitrine-de-negocios-com-feira-gratuita-ate-domingo/'],
      ['Feira do Trabalho e do Campo em Água Quente oferece serviços gratuitos até domingo', 'https://www.oitoquatronoticias.com.br/distrito-federal/feira-trabalho-campo-agua-quente-ate-domingo-17/'],
      ['Feira de Trabalho e Campo em Água Quente de 12 a 17 de maio', 'https://noticiasdoplanalto.com.br/feira-de-trabalho-e-campo-em-agua-quente-de-12-a-17-de-maio/'],
      ['Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente', 'https://antenados.com.br/nova-edicao-da-feira-do-trabalho-e-do-campo-ocorre-em-agua-quente/?amp=1'],
      ['Feira leva capacitação e renda a Água Quente', 'https://fonteemfoco.com.br/feira-do-campo-agua-quente/'],
      ['Feira de Trabalho e Campo em Água Quente de 12 a 17 de maio', 'https://imprensapublica.com.br/feira-de-trabalho-e-campo-em-agua-quente-de-12-a-17-de-maio/'],
      ['Feira movimenta Água Quente com capacitação e incentivo ao empreendedorismo local', 'https://fatoporfato.com.br/noticias/feira-movimenta-agua-quente-com-capacitacao-e-incentivo-ao-empreendedorismo-local/'],
      ['Feira do Trabalho e do Campo acontece em Água Quente com atividades gratuitas', 'https://dfnamidia.com.br/distrito-federal/feira-do-trabalho-e-do-campo-acontece-em-agua-quente-nesta-terca-feira-12-com-atividades-gratuitas/'],
      ['Feira do Trabalho e do Campo chega a Água Quente com palestras e capacitações', 'https://soubrasilia.com/feira-trabalho-campo-agua-quente-12-17-maio-2026/'],
      ['Feira do Trabalho e do Campo leva capacitação e agricultura familiar para Água Quente', 'https://plenax.com.br/feira-do-trabalho-e-do-campo-leva-capacitacao-empreendedorismo-e-agricultura-familiar-para-agua-quente/'],
      ['Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente', 'https://www.portalradiocandanga.com.br/2026/05/nova-edicao-da-feira-do-trabalho-e-do.html?m=1'],
      ['Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente', 'https://atividadenews.com.br/nova-edicao-da-feira-do-trabalho-e-do-campo-ocorre-em-agua-quente/'],
      ['Feira do Trabalho e do Campo em Água Quente incentiva emprego e qualificação profissional', 'https://conectadoaopoder.com.br/roberio-negreiros-destaca-feira-do-trabalho-e-do-campo-em-agua-quente-como-incentivo-a-geracao-de-emprego-e-qualificacao-profissional/?amp'],
      ['Nova edição da Feira do Trabalho e do Campo será realizada em Água Quente', 'https://reportercapital.com.br/df/nova-edicao-da-feira-do-trabalho-e-do-campo-sera-realizada-em-agua-quente/']
    ],
    cruzeiro: [
      ['Cruzeiro recebe Feira do Trabalho e do Campo voltada a mulheres empreendedoras', 'https://jornaldebrasilia.com.br/brasilia/cruzeiro-recebe-feira-do-trabalho-e-do-campo-voltada-a-mulheres-empreendedoras/'],
      ['Com foco no empreendedorismo feminino, Cruzeiro recebe edição especial da Feira do Trabalho e do Campo', 'https://www.agenciabrasilia.df.gov.br/w/com-foco-no-empreendedorismo-feminino-cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo'],
      ['Cruzeiro recebe Feira do Trabalho e do Campo com foco nas mulheres empreendedoras', 'https://sedet.df.gov.br/w/voltada-para-valorizacao-das-mulheres-empreendedoras-e-com-foco-na-semana-da-economia-nacional-solidaria-cruzeiro-recebe-a-feira-do-trabalho-e-do-campo'],
      ['Aproveite essa semana: edição especial da Feira do Trabalho e do Campo', 'https://agitabrasilia.com/aproveite-essa-semana-edicao-especial-da-feira-do-trabalho-e-do-campo/'],
      ['Feira do Trabalho e do Campo tem foco no protagonismo feminino', 'https://jornaldebrasilia.com.br/brasilia/feira-do-trabalho-e-do-campo-tem-foco-no-protagonismo-feminino/'],
      ['Cruzeiro sedia feira especial para impulsionar empreendedorismo feminino no DF', 'https://edicaobrasilia.com.br/cruzeiro-sedia-feira-especial-para-impulsionar-empreendedorismo-feminino-no-df/'],
      ['RA do Cruzeiro sediará feira destacando o trabalho de mulheres empreendedoras', 'https://www.portalradiocandanga.com.br/2025/12/a-ra-do-cruzeiro-sediara-uma-feira.html'],
      ['Cruzeiro recebe até sábado a Feira do Trabalho e do Campo', 'https://www.diariodebrasilia.net.br/noticia/14240/brasilia/df/o-cruzeiro-recebe-ate-sabado-20-a-feira-do-trabalho-e-do-campo.html'],
      ['Feira no Cruzeiro destaca mulheres empreendedoras do campo e da cidade', 'https://imprensapublica.com.br/feira-no-cruzeiro-destaca-mulheres-empreendedoras-do-campo-e-da-cidade/'],
      ['Cruzeiro recebe a Feira do Trabalho e do Campo', 'https://www.egnews.com.br/noticias.php?id=45333'],
      ['Cruzeiro recebe edição especial da Feira do Trabalho e do Campo com foco no empreendedorismo feminino', 'https://radardigitalbrasilia.com.br/cidades/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino/'],
      ['Cruzeiro recebe edição especial da Feira do Trabalho e do Campo com foco em mulheres empreendedoras', 'https://informatudodf.com.br/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-em-mulheres-empreendedoras/'],
      ['Cruzeiro recebe edição especial com foco no empreendedorismo feminino', 'https://conectadoaopoder.com.br/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino/'],
      ['Aproveite essa semana: edição especial da Feira do Trabalho e do Campo', 'https://visitebrasilia.com.br/noticias/aproveite-essa-semana-edicao-especial-da-feira-do-trabalho-e-do-campo'],
      ['Cruzeiro recebe feira com foco em mulheres empreendedoras e economia solidária', 'https://fatoporfato.com.br/distrito-federal/cruzeiro-recebe-feira-com-foco-em-mulheres-empreendedoras-e-economia-solidaria/'],
      ['Com foco no empreendedorismo feminino, Cruzeiro recebe edição especial da Feira do Trabalho e do Campo', 'https://dfinfoconews.com.br/com-foco-no-empreendedorismo-feminino-cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo/'],
      ['Cruzeiro recebe edição especial da Feira do Trabalho e do Campo com foco no empreendedorismo feminino', 'https://radarsudoeste.com.br/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino/'],
      ['Cruzeiro recebe edição especial com foco no empreendedorismo feminino', 'https://jornalinfocruzeiro.com.br/2025/12/15/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino/'],
      ['Cruzeiro recebe edição especial da Feira do Trabalho e do Campo com foco no empreendedorismo feminino', 'https://sedet.df.gov.br/w/cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo-com-foco-no-empreendedorismo-feminino'],
      ['Com foco no empreendedorismo feminino, Cruzeiro recebe edição especial da Feira do Trabalho e do Campo', 'https://revistaplanob.com.br/com-foco-no-empreendedorismo-feminino-cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo/'],
      ['Feira do Trabalho e do Campo tem foco no protagonismo feminino', 'https://fercalnews.com.br/feira-do-trabalho-e-do-campo-tem-foco-no-protagonismo-feminino/'],
      ['Cruzeiro recebe feira que valoriza mulheres empreendedoras', 'https://fonteemfoco.com.br/cruzeiro-recebe-feira-que-valoriza-mulheres-empreendedoras/'],
      ['Com foco no empreendedorismo feminino, Cruzeiro recebe edição especial da Feira do Trabalho e do Campo', 'https://antenados.com.br/com-foco-no-empreendedorismo-feminino-cruzeiro-recebe-edicao-especial-da-feira-do-trabalho-e-do-campo/?amp=1'],
      ['Cruzeiro recebe feira que destaca mulheres empreendedoras e economia solidária', 'https://midialternativa.com.br/cruzeiro-recebe-feira-que-destaca-mulheres-empreendedoras-e-economia-solidaria/'],
      ['Jornal de Brasília destaca a edição especial no Cruzeiro', 'https://www.instagram.com/reel/DSVg-6JjnlH/'],
      ['Cruzeiro recebe feira com foco no empreendedorismo feminino', 'https://www.instagram.com/p/DSS4loMjSgd/']
    ]
  };

  Object.keys(SOURCE_NEWS).forEach(function (key) {
    SOURCE_NEWS[key] = SOURCE_NEWS[key]
      .map(function (entry) { return { title: entry[0], link: entry[1] }; })
      .reverse();
  });

  const resolvedImages = new Map();
  const pendingImages = new Map();
  let activeEdition = null;
  let generation = 0;
  let mutationQueued = false;

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

  function metadataEndpoint(link) {
    return 'https://api.microlink.io/?url=' + encodeURIComponent(link)
      + '&screenshot=false&video=false&audio=false&palette=false';
  }

  function loadStoredImage(link) {
    if (resolvedImages.has(link)) return resolvedImages.get(link);

    try {
      const stored = localStorage.getItem('source-news-image-v2:' + link);
      if (stored) {
        resolvedImages.set(link, stored);
        return stored;
      }
    } catch (error) {
      // O cache local é opcional.
    }

    return null;
  }

  function storeImage(link, imageUrl) {
    resolvedImages.set(link, imageUrl);
    try {
      localStorage.setItem('source-news-image-v2:' + link, imageUrl);
    } catch (error) {
      // Mantém o cache apenas em memória.
    }
  }

  function resolveSourceImage(link) {
    const stored = loadStoredImage(link);
    if (stored) return Promise.resolve(stored);
    if (pendingImages.has(link)) return pendingImages.get(link);

    const request = fetch(metadataEndpoint(link), {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Metadados indisponíveis: ' + response.status);
        return response.json();
      })
      .then(function (payload) {
        const image = payload && payload.data && payload.data.image;
        const imageUrl = typeof image === 'string' ? image : image && image.url;
        if (!imageUrl) throw new Error('A matéria não informou imagem de capa.');
        storeImage(link, imageUrl);
        return imageUrl;
      })
      .finally(function () {
        pendingImages.delete(link);
      });

    pendingImages.set(link, request);
    return request;
  }

  function applyEntryToCard(card, entry, targetGeneration) {
    const image = card && card.querySelector('img');
    if (!image || !entry) return;

    if (image.dataset.sourceArticle === entry.link && image.dataset.sourceImageApplied === 'true') return;

    image.dataset.sourceArticle = entry.link;
    image.removeAttribute('srcset');
    image.referrerPolicy = 'no-referrer';

    resolveSourceImage(entry.link)
      .then(function (imageUrl) {
        if (targetGeneration !== generation) return;
        if (image.dataset.sourceArticle !== entry.link) return;
        image.src = imageUrl;
        image.dataset.sourceImageApplied = 'true';
      })
      .catch(function () {
        // Nunca usa uma capa genérica no lugar da imagem real da matéria.
      });
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
      if (
        button.getAttribute('aria-selected') === 'true' ||
        button.getAttribute('data-state') === 'active' ||
        className.indexOf('text-white') !== -1 ||
        className.indexOf('bg-[#3FA637]') !== -1
      ) {
        return edition;
      }
    }

    return null;
  }

  function patchNewsPage() {
    const section = findNewsSection();
    if (!section || !activeEdition || !SOURCE_NEWS[activeEdition]) return;

    const cards = Array.from(section.querySelectorAll('article'));
    const entries = SOURCE_NEWS[activeEdition];
    const targetGeneration = generation;

    cards.forEach(function (card, index) {
      applyEntryToCard(card, entries[index], targetGeneration);
    });
  }

  function findEntryByTitle(title, usedLinks) {
    const normalizedTitle = normalizeText(title);
    const entries = SOURCE_NEWS.aguaQuente.concat(SOURCE_NEWS.cruzeiro);

    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      if (usedLinks.has(entry.link)) continue;
      if (normalizeText(entry.title) === normalizedTitle) {
        usedLinks.add(entry.link);
        return entry;
      }
    }

    return null;
  }

  function patchRecentNews() {
    const section = Array.from(document.querySelectorAll('section')).find(function (candidate) {
      const heading = candidate.querySelector('h1, h2');
      return heading && normalizeText(heading.textContent).indexOf('ultimas noticias') !== -1;
    });

    if (!section) return;

    const usedLinks = new Set();
    const targetGeneration = generation;

    section.querySelectorAll('article').forEach(function (card) {
      const heading = card.querySelector('h3');
      const entry = findEntryByTitle(heading ? heading.textContent : '', usedLinks);
      if (entry) applyEntryToCard(card, entry, targetGeneration);
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
    if (mutationQueued) return;
    mutationQueued = true;

    setTimeout(function () {
      mutationQueued = false;
      if (activeEdition) patchNewsPage();
    }, 80);
  });

  function start() {
    observer.observe(document.body, { childList: true, subtree: true });

    const detected = detectActiveEdition(findNewsSection());
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
