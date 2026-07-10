(function () {
  'use strict';

  var active = false;
  var queued = false;

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isPlanoPiloto(value) {
    var text = normalize(value);
    return text.indexOf('plano piloto') !== -1 || text.indexOf('feira da torre') !== -1;
  }

  function findContent() {
    var section = document.querySelector('#noticias');
    return section ? section.querySelector('.max-w-6xl.mx-auto') : null;
  }

  function renderFinalState() {
    if (!active) return;

    var content = findContent();
    if (!content) return;
    if (content.querySelector('[data-planopiloto-news-empty]')) return;

    content.innerHTML =
      '<div data-planopiloto-news-empty class="p-8 text-center bg-white shadow-lg rounded-xl">' +
        '<p class="mb-2 text-lg font-semibold text-gray-700">Notícias do Plano Piloto em atualização</p>' +
        '<p class="max-w-2xl mx-auto text-gray-500">Ainda não foram localizadas matérias públicas verificadas sobre a edição realizada de 30 de junho a 5 de julho de 2026. Os cards serão adicionados somente com links e imagens confirmados das fontes.</p>' +
      '</div>';
  }

  function activate() {
    active = true;
    [0, 50, 180, 500, 1000].forEach(function (delay) {
      setTimeout(renderFinalState, delay);
    });
  }

  function deactivate() {
    active = false;
  }

  document.addEventListener('click', function (event) {
    var button = event.target && event.target.closest ? event.target.closest('button') : null;
    var section = document.querySelector('#noticias');
    if (!button || !section || !section.contains(button)) return;

    if (isPlanoPiloto(button.textContent)) activate();
    else deactivate();
  }, true);

  var observer = new MutationObserver(function () {
    if (!active || queued) return;
    queued = true;
    setTimeout(function () {
      queued = false;
      renderFinalState();
    }, 80);
  });

  function start() {
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (key.indexOf('planopiloto-news:') === 0) localStorage.removeItem(key);
      });
    } catch (error) {}

    observer.observe(document.documentElement, { childList: true, subtree: true });

    var section = document.querySelector('#noticias');
    if (!section) return;

    Array.from(section.querySelectorAll('button')).some(function (button) {
      if (!isPlanoPiloto(button.textContent)) return false;
      var className = button.getAttribute('class') || '';
      if (className.indexOf('text-white') !== -1 || className.indexOf('bg-[#3FA637]') !== -1) {
        activate();
        return true;
      }
      return false;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();