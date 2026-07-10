(function(){
  const NEWS = [
    {
      title: 'Nova edição da Feira do Trabalho e do Campo será realizada em Água Quente',
      link: 'https://reportercapital.com.br/df/nova-edicao-da-feira-do-trabalho-e-do-campo-sera-realizada-em-agua-quente/'
    },
    {
      title: 'Feira do Trabalho e do Campo em Água Quente incentiva emprego e qualificação profissional',
      link: 'https://conectadoaopoder.com.br/roberio-negreiros-destaca-feira-do-trabalho-e-do-campo-em-agua-quente-como-incentivo-a-geracao-de-emprego-e-qualificacao-profissional/?amp'
    },
    {
      title: 'Nova edição da Feira do Trabalho e do Campo ocorre em Água Quente',
      link: 'https://atividadenews.com.br/nova-edicao-da-feira-do-trabalho-e-do-campo-ocorre-em-agua-quente/'
    }
  ];

  const cache = new Map();
  const pending = new Map();

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findSection() {
    return Array.from(document.querySelectorAll('section')).find(function(section) {
      const heading = section.querySelector('h1, h2');
      return heading && normalize(heading.textContent).includes('ultimas noticias');
    });
  }

  function wordpressImage(link) {
    const url = new URL(link);
    const slug = url.pathname.split('/').filter(Boolean).pop();
    const endpoint = url.origin + '/wp-json/wp/v2/posts?slug=' + encodeURIComponent(slug) + '&_embed=1';
    return fetch(endpoint).then(function(response) {
      if (!response.ok) throw new Error('wp');
      return response.json();
    }).then(function(posts) {
      const post = posts && posts[0];
      const media = post && post._embedded && post._embedded['wp:featuredmedia'];
      const yoast = post && post.yoast_head_json && post.yoast_head_json.og_image;
      const image = (media && media[0] && media[0].source_url)
        || (post && post.jetpack_featured_media_url)
        || (yoast && yoast[0] && yoast[0].url);
      if (!image) throw new Error('image');
      return image;
    });
  }

  function metadataImage(link) {
    const endpoint = 'https://api.microlink.io/?url=' + encodeURIComponent(link)
      + '&screenshot=false&video=false&audio=false&palette=false';
    return fetch(endpoint).then(function(response) {
      if (!response.ok) throw new Error('meta');
      return response.json();
    }).then(function(payload) {
      const image = payload && payload.data && payload.data.image;
      const url = typeof image === 'string' ? image : image && image.url;
      if (!url) throw new Error('image');
      return url;
    });
  }

  function resolveImage(link) {
    if (cache.has(link)) return Promise.resolve(cache.get(link));
    if (pending.has(link)) return pending.get(link);
    const request = wordpressImage(link)
      .catch(function() { return metadataImage(link); })
      .then(function(image) {
        cache.set(link, image);
        return image;
      })
      .finally(function() { pending.delete(link); });
    pending.set(link, request);
    return request;
  }

  function applyImage(card, item) {
    const image = card.querySelector('img');
    if (!image || !item) return;
    image.removeAttribute('srcset');
    resolveImage(item.link).then(function(url) {
      image.onerror = function() {
        if (this.dataset.proxyApplied === 'true') return;
        this.dataset.proxyApplied = 'true';
        this.src = 'https://images.weserv.nl/?url=' + encodeURIComponent(url)
          + '&w=1200&h=675&fit=cover&output=webp';
      };
      image.src = url;
    }).catch(function() {});
  }

  function patch() {
    const section = findSection();
    if (!section) return;
    const cards = Array.from(section.querySelectorAll('article'));
    cards.forEach(function(card, index) {
      const heading = card.querySelector('h3');
      const title = normalize(heading && heading.textContent);
      const match = NEWS.find(function(item) { return normalize(item.title) === title; }) || NEWS[index];
      applyImage(card, match);
    });
  }

  let queued = false;
  new MutationObserver(function() {
    if (queued) return;
    queued = true;
    setTimeout(function() {
      queued = false;
      patch();
    }, 100);
  }).observe(document.documentElement, { childList: true, subtree: true });

  function start() {
    [50, 200, 600, 1200].forEach(function(delay) { setTimeout(patch, delay); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();