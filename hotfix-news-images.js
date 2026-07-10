(function () {
  const EDITIONS = {
    aguaQuente: {
      labels: ['agua quente'],
      image: 'https://raw.githubusercontent.com/mroschost/feira-do-trabalho/master/assets/news/agua-quente-2026.jpg'
    },
    cruzeiro: {
      labels: ['cruzeiro'],
      image: 'https://raw.githubusercontent.com/mroschost/feira-do-trabalho/master/assets/news/cruzeiro-2025.jpg'
    }
  };

  let selectedEdition = null;
  let patchUntil = 0;

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
    return document.querySelector('#noticias') || Array.from(document.querySelectorAll('section')).find(function (section) {
      const heading = section.querySelector('h1, h2');
      return heading && normalizeText(heading.textContent) === 'noticias';
    }) || null;
  }

  function detectSelectedEdition(section) {
    if (selectedEdition) return selectedEdition;
    if (!section) return null;

    const buttons = Array.from(section.querySelectorAll('button'));

    for (let index = 0; index < buttons.length; index += 1) {
      const button = buttons[index];
      const edition = editionFromText(button.textContent);
      if (!edition) continue;

      const className = button.getAttribute('class') || '';
      const style = window.getComputedStyle ? window.getComputedStyle(button) : null;
      const isActive =
        button.getAttribute('aria-selected') === 'true' ||
        button.getAttribute('data-state') === 'active' ||
        className.indexOf('text-white') !== -1 ||
        className.indexOf('bg-[#3FA637]') !== -1 ||
        (style && style.color === 'rgb(255, 255, 255)');

      if (isActive) return edition;
    }

    return null;
  }

  function applyImage(image, editionKey) {
    const edition = EDITIONS[editionKey];
    if (!image || !edition) return false;

    const expected = edition.image;
    const current = image.getAttribute('src') || '';

    image.setAttribute('data-news-edition-image', editionKey);
    image.setAttribute('data-fallback-src', expected);
    image.removeAttribute('srcset');
    image.setAttribute('loading', 'eager');

    image.onerror = function () {
      if (this.src !== expected) this.src = expected;
    };

    if (current !== expected) {
      image.src = expected;
      return true;
    }

    return false;
  }

  function patchNewsCards() {
    const section = findNewsSection();
    if (!section) return false;

    const editionKey = detectSelectedEdition(section);
    if (!editionKey) return false;

    let changed = false;
    section.querySelectorAll('img').forEach(function (image) {
      changed = applyImage(image, editionKey) || changed;
    });

    return changed;
  }

  function patchRecentNews() {
    const sections = Array.from(document.querySelectorAll('section'));
    const section = sections.find(function (candidate) {
      const heading = candidate.querySelector('h1, h2');
      return heading && normalizeText(heading.textContent).indexOf('ultimas noticias') !== -1;
    });

    if (!section) return false;

    let changed = false;

    section.querySelectorAll('article, .group').forEach(function (card) {
      const editionKey = editionFromText(card.textContent);
      if (!editionKey) return;

      const image = card.querySelector('img');
      changed = applyImage(image, editionKey) || changed;
    });

    return changed;
  }

  function patchAll() {
    patchNewsCards();
    patchRecentNews();
  }

  function startAggressivePatch(editionKey) {
    if (editionKey) selectedEdition = editionKey;
    patchUntil = Date.now() + 10000;

    patchAll();
    setTimeout(patchAll, 50);
    setTimeout(patchAll, 150);
    setTimeout(patchAll, 350);
    setTimeout(patchAll, 700);
    setTimeout(patchAll, 1200);
    setTimeout(patchAll, 2500);
  }

  document.addEventListener('click', function (event) {
    const target = event.target && event.target.closest
      ? event.target.closest('button, a')
      : null;

    if (!target) return;

    const editionKey = editionFromText(target.textContent);
    if (editionKey) {
      startAggressivePatch(editionKey);
      return;
    }

    if (normalizeText(target.textContent).indexOf('noticias') !== -1) {
      selectedEdition = null;
      startAggressivePatch(null);
    }
  }, true);

  document.addEventListener('error', function (event) {
    const image = event.target;
    if (!image || image.tagName !== 'IMG') return;

    const section = image.closest('#noticias');
    const card = image.closest('article, .group');
    const editionKey =
      editionFromText(card ? card.textContent : '') ||
      detectSelectedEdition(section) ||
      selectedEdition;

    if (editionKey) applyImage(image, editionKey);
  }, true);

  let queued = false;
  const observer = new MutationObserver(function () {
    if (queued) return;
    queued = true;

    setTimeout(function () {
      queued = false;
      if (Date.now() <= patchUntil || selectedEdition) patchAll();
    }, 40);
  });

  function start() {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'srcset']
    });

    startAggressivePatch(null);

    const interval = setInterval(function () {
      if (Date.now() > patchUntil && !selectedEdition) return;
      patchAll();
    }, 250);

    window.addEventListener('beforeunload', function () {
      clearInterval(interval);
      observer.disconnect();
    }, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
