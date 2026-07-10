(function () {
  const editionImages = {
    aguaQuente: '/assets/news/agua-quente-2026.jpg?v=20260710',
    cruzeiro: '/assets/news/cruzeiro-2025.jpg?v=20260710',
  };

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

  function setImage(image, editionKey) {
    if (!image || !editionKey || !editionImages[editionKey]) return false;

    const expected = editionImages[editionKey];
    const current = image.getAttribute('src') || '';

    if (current.indexOf(expected.split('?')[0]) !== -1) return false;

    image.dataset.newsEditionImage = editionKey;
    image.src = expected;
    image.removeAttribute('srcset');
    return true;
  }

  function getActiveNewsEdition(section) {
    if (!section) return null;

    const buttons = Array.from(section.querySelectorAll('button'));
    const activeButton = buttons.find(function (button) {
      const className = button.getAttribute('class') || '';
      return className.indexOf('bg-[#3FA637]') !== -1
        || button.getAttribute('aria-selected') === 'true'
        || button.getAttribute('data-state') === 'active';
    });

    return editionFromText(activeButton ? activeButton.textContent : '');
  }

  function patchNewsPage() {
    const section = document.querySelector('#noticias');
    if (!section) return false;

    const editionKey = getActiveNewsEdition(section);
    if (!editionKey) return false;

    let changed = false;
    section.querySelectorAll('article img').forEach(function (image) {
      changed = setImage(image, editionKey) || changed;
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

    section.querySelectorAll('article').forEach(function (article) {
      const editionKey = editionFromText(article.textContent);
      const image = article.querySelector('img');
      changed = setImage(image, editionKey) || changed;
    });

    return changed;
  }

  function patchBrokenImages() {
    document.querySelectorAll('img').forEach(function (image) {
      if (image.complete && image.naturalWidth === 0) {
        const article = image.closest('article');
        const section = image.closest('#noticias');
        const editionKey = editionFromText(article ? article.textContent : '') || getActiveNewsEdition(section);
        setImage(image, editionKey);
      }
    });
  }

  function patchAll() {
    patchNewsPage();
    patchRecentNews();
    patchBrokenImages();
  }

  document.addEventListener('click', function (event) {
    const target = event.target && event.target.closest
      ? event.target.closest('button, a')
      : null;

    if (!target) return;

    const editionKey = editionFromText(target.textContent);
    if (editionKey || normalizeText(target.textContent).indexOf('noticias') !== -1) {
      setTimeout(patchAll, 50);
      setTimeout(patchAll, 200);
      setTimeout(patchAll, 600);
    }
  });

  document.addEventListener('error', function (event) {
    const image = event.target;
    if (!image || image.tagName !== 'IMG') return;

    const article = image.closest('article');
    const section = image.closest('#noticias');
    const editionKey = editionFromText(article ? article.textContent : '') || getActiveNewsEdition(section);
    setImage(image, editionKey);
  }, true);

  let queued = false;
  const observer = new MutationObserver(function () {
    if (queued) return;
    queued = true;

    setTimeout(function () {
      queued = false;
      patchAll();
    }, 80);
  });

  function start() {
    patchAll();
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(patchAll, 250);
    setTimeout(patchAll, 750);
    setTimeout(patchAll, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
