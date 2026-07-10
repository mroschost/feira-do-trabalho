(function () {
  const DATA_URL = 'https://raw.githubusercontent.com/mroschost/feira-do-trabalho/main/src/data/news-overrides.json';
  const SUPPORTED_EDITIONS = {
    aguaQuente: 'agua-quente-2026',
    cruzeiro: 'cruzeiro-2025'
  };

  let newsDataPromise = null;
  let activeEditionKey = null;
  let generation = 0;
  let mutationQueued = false;

  const resolvedImages = new Map();
  const pendingImages = new Map();

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

  function getNewsSection() {
    return document.querySelector('#noticias');
  }

  function loadNewsData() {
    if (newsDataPromise) return newsDataPromise;

    newsDataPromise = fetch(DATA_URL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store'
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Falha ao carregar dados das notícias: ' + response.status);
        return response.json();
      });

    return newsDataPromise;
  }

  function getEntries(data, editionKey) {
    const slug = SUPPORTED_EDITIONS[editionKey];
    const items = slug && data && Array.isArray(data[slug]) ? data[slug] : [];
    return items
      .filter(function (item) {
        return item && typeof item.title === 'string' && typeof item.link === 'string' && item.link.trim();
      })
      .slice()
      .reverse();
  }

  function getStoredImage(link) {
    if (resolvedImages.has(link)) return resolvedImages.get(link);

    try {
      const stored = localStorage.getItem('source-news-image-v3:' + link);
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
      localStorage.setItem('source-news-image-v3:' + link, imageUrl);
    } catch (error) {
      // Mantém apenas o cache em memória.
    }
  }

  function normalizeImageValue(image) {
    if (typeof image === 'string') return image;
    if (image && typeof image.url === 'string') return image.url;
    return '';
  }

  function createImageProxy(imageUrl) {
    if (!/^https?:\/\//i.test(imageUrl)) return imageUrl;
    if (imageUrl.indexOf('images.weserv.nl') !== -1) return imageUrl;

    return 'https://images.weserv.nl/?url=' + encodeURIComponent(imageUrl)
      + '&w=1200&h=675&fit=cover&output=webp';
  }

  function resolveWordPressFeaturedImage(link) {
    let parsed;
    try {
      parsed = new URL(link);
    } catch (error) {
      return Promise.reject(error);
    }

    const segments = parsed.pathname.split('/').filter(Boolean);
    const slug = segments[segments.length - 1];
    if (!slug) return Promise.reject(new Error('Slug da matéria não encontrado.'));

    const endpoint = parsed.origin
      + '/wp-json/wp/v2/posts?slug=' + encodeURIComponent(slug)
      + '&_embed=1';

    return fetch(endpoint, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    })
      .then(function (response) {
        if (!response.ok) throw new Error('WordPress REST indisponível: ' + response.status);
        return response.json();
      })
      .then(function (posts) {
        const post = Array.isArray(posts) ? posts[0] : null;
        if (!post) throw new Error('Post não encontrado no WordPress REST.');

        const embedded = post._embedded && post._embedded['wp:featuredmedia'];
        const media = Array.isArray(embedded) ? embedded[0] : null;
        const yoastImage = post.yoast_head_json
          && Array.isArray(post.yoast_head_json.og_image)
          ? post.yoast_head_json.og_image[0]
          : null;

        const imageUrl = (media && media.source_url)
          || post.jetpack_featured_media_url
          || post.featured_media_src_url
          || (yoastImage && yoastImage.url)
          || '';

        if (!imageUrl) throw new Error('Imagem destacada não encontrada no WordPress REST.');
        return imageUrl;
      });
  }

  function microlinkEndpoint(link, selector) {
    const params = new URLSearchParams();
    params.set('url', link);
    params.set('screenshot', 'false');
    params.set('video', 'false');
    params.set('audio', 'false');
    params.set('palette', 'false');

    if (selector) {
      params.set('data.image.selector', selector);
      params.set('data.image.type', 'image');
    }

    return 'https://api.microlink.io/?' + params.toString();
  }

  function resolveWithMicrolink(link, selector) {
    return fetch(microlinkEndpoint(link, selector), {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Microlink indisponível: ' + response.status);
        return response.json();
      })
      .then(function (payload) {
        const imageUrl = normalizeImageValue(payload && payload.data && payload.data.image);
        if (!imageUrl) throw new Error('A fonte não informou imagem de capa.');
        return imageUrl;
      });
  }

  function resolveFromSource(link) {
    const isReporterCapital = link.indexOf('reportercapital.com.br') !== -1;
    const attempts = [];

    if (isReporterCapital) attempts.push(function () { return resolveWordPressFeaturedImage(link); });
    attempts.push(function () { return resolveWithMicrolink(link, ''); });
    attempts.push(function () { return resolveWithMicrolink(link, '.wp-post-image'); });
    attempts.push(function () { return resolveWithMicrolink(link, 'article img'); });
    attempts.push(function () { return resolveWithMicrolink(link, 'main img'); });

    let chain = Promise.reject(new Error('Início das tentativas.'));
    attempts.forEach(function (attempt) {
      chain = chain.catch(attempt);
    });

    return chain;
  }

  function resolveSourceImage(entry) {
    const directImage = typeof entry.image === 'string' ? entry.image.trim() : '';
    const isGenericImage = !directImage
      || directImage.indexOf('/assets/images/feira.webp') !== -1
      || directImage.indexOf('/assets/news/agua-quente-2026.jpg') !== -1
      || directImage.indexOf('/assets/news/cruzeiro-2025.jpg') !== -1;

    if (!isGenericImage && /^https?:\/\//i.test(directImage)) {
      return Promise.resolve(createImageProxy(directImage));
    }

    const link = entry.link;
    const stored = getStoredImage(link);
    if (stored) return Promise.resolve(stored);
    if (pendingImages.has(link)) return pendingImages.get(link);

    const request = resolveFromSource(link)
      .then(function (imageUrl) {
        const proxied = createImageProxy(imageUrl);
        storeImage(link, proxied);
        return proxied;
      })
      .finally(function () {
        pendingImages.delete(link);
      });

    pendingImages.set(link, request);
    return request;
  }

  function buildEntryBuckets(entries) {
    const buckets = new Map();

    entries.forEach(function (entry) {
      const key = normalizeText(entry.title);
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(entry);
    });

    return buckets;
  }

  function matchCardsByTitle(cards, entries) {
    const buckets = buildEntryBuckets(entries);

    return cards.map(function (card) {
      const heading = card.querySelector('h3');
      const key = normalizeText(heading ? heading.textContent : '');
      const matches = buckets.get(key) || [];
      const entry = matches.shift() || null;
      return { card: card, entry: entry };
    });
  }

  function applyEntryToCard(card, entry, targetGeneration) {
    const image = card && card.querySelector('img');
    if (!image || !entry) return;

    image.dataset.sourceArticle = entry.link;
    image.removeAttribute('srcset');
    image.referrerPolicy = 'no-referrer';

    resolveSourceImage(entry)
      .then(function (imageUrl) {
        if (targetGeneration !== generation) return;
        if (image.dataset.sourceArticle !== entry.link) return;

        if (!image.dataset.originalNewsSrc) {
          image.dataset.originalNewsSrc = image.getAttribute('src') || '';
        }

        image.onerror = function () {
          const original = this.dataset.originalNewsSrc;
          this.onerror = null;
          if (original) this.src = original;
        };

        image.src = imageUrl;
        image.dataset.sourceImageApplied = 'true';
      })
      .catch(function () {
        // Mantém o card atual quando a fonte não expõe a imagem.
      });
  }

  function patchNewsPage() {
    if (!activeEditionKey) return;

    const section = getNewsSection();
    if (!section) return;

    const targetGeneration = generation;

    loadNewsData()
      .then(function (data) {
        if (targetGeneration !== generation || !activeEditionKey) return;

        const entries = getEntries(data, activeEditionKey);
        const cards = Array.from(section.querySelectorAll('article'));
        const matches = matchCardsByTitle(cards, entries);

        matches.forEach(function (match) {
          applyEntryToCard(match.card, match.entry, targetGeneration);
        });
      })
      .catch(function () {
        // Não interfere no restante da página.
      });
  }

  function patchRecentNews() {
    const targetGeneration = generation;

    loadNewsData()
      .then(function (data) {
        const entries = getEntries(data, 'aguaQuente').concat(getEntries(data, 'cruzeiro'));
        const section = Array.from(document.querySelectorAll('section')).find(function (candidate) {
          const heading = candidate.querySelector('h1, h2');
          return heading && normalizeText(heading.textContent).indexOf('ultimas noticias') !== -1;
        });

        if (!section) return;

        const cards = Array.from(section.querySelectorAll('article'));
        const matches = matchCardsByTitle(cards, entries);
        matches.forEach(function (match) {
          applyEntryToCard(match.card, match.entry, targetGeneration);
        });
      })
      .catch(function () {
        // Não interfere no restante da página.
      });
  }

  function activateEdition(editionKey) {
    activeEditionKey = editionKey;
    generation += 1;

    if (!editionKey) return;

    setTimeout(patchNewsPage, 50);
    setTimeout(patchNewsPage, 180);
    setTimeout(patchNewsPage, 450);
    setTimeout(patchNewsPage, 900);
    setTimeout(patchNewsPage, 1800);
  }

  function detectActiveEdition(section) {
    if (!section) return null;

    const buttons = Array.from(section.querySelectorAll('button'));
    for (let index = 0; index < buttons.length; index += 1) {
      const button = buttons[index];
      const editionKey = editionFromText(button.textContent);
      if (!editionKey) continue;

      const className = button.getAttribute('class') || '';
      const isActive = button.getAttribute('aria-selected') === 'true'
        || button.getAttribute('data-state') === 'active'
        || className.indexOf('text-white') !== -1
        || className.indexOf('bg-[#3FA637]') !== -1;

      if (isActive) return editionKey;
    }

    return null;
  }

  document.addEventListener('click', function (event) {
    const button = event.target && event.target.closest ? event.target.closest('button') : null;
    const section = getNewsSection();

    if (!button || !section || !section.contains(button)) return;
    activateEdition(editionFromText(button.textContent));
  }, true);

  const observer = new MutationObserver(function () {
    if (mutationQueued) return;
    mutationQueued = true;

    setTimeout(function () {
      mutationQueued = false;
      if (activeEditionKey) patchNewsPage();
    }, 80);
  });

  function start() {
    observer.observe(document.body, { childList: true, subtree: true });

    const detected = detectActiveEdition(getNewsSection());
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
