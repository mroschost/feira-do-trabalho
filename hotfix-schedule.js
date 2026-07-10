(function () {
  const schedule = [
    {
      iso: '2026-06-30',
      date: 'terça-feira, 30 de junho de 2026',
      items: [
        ['13h às 15h', 'Oficina de Fuxico — Grupo dos idosos'],
        ['16h às 18h', 'Oficina de Ecobag'],
        ['21h', 'Encerramento'],
        ['Ônibus', '5 ônibus'],
      ],
    },
    {
      iso: '2026-07-01',
      date: 'quarta-feira, 1 de julho de 2026',
      items: [
        ['13h às 15h', 'Oficina de Pintura em Tecido — Grupo de mulheres em tratamento de câncer / Associações de Mulheres do Bandeirante'],
        ['16h às 18h', 'Oficina de Biojoias'],
        ['19h às 20h', 'Palestra — Como usar as redes sociais'],
        ['21h', 'Encerramento'],
        ['Ônibus', '6 ônibus'],
      ],
    },
    {
      iso: '2026-07-02',
      date: 'quinta-feira, 2 de julho de 2026',
      items: [
        ['13h às 15h', 'Oficina de Cama Pet — Grupo de idosos'],
        ['16h às 18h', 'Oficina de Bordado'],
        ['19h às 20h', 'Palestra — Prevenção de acidentes no trabalho'],
        ['21h', 'Encerramento'],
        ['Ônibus', '6 ônibus'],
      ],
    },
    {
      iso: '2026-07-03',
      date: 'sexta-feira, 3 de julho de 2026',
      items: [
        ['13h às 15h', 'Oficina de Biojoias — Escolas'],
        ['15h às 16h', 'Apresentação Infantil'],
        ['18h às 20h', 'Workshop — Plano de Negócios para Empreendedores da Economia Solidária'],
        ['21h', 'Encerramento'],
        ['Ônibus', '6 ônibus'],
      ],
    },
    {
      iso: '2026-07-04',
      date: 'sábado, 4 de julho de 2026',
      items: [
        ['10h', 'Feira Livre, Exposição e Comercialização'],
        ['10h30 às 11h30', 'Entrega de Certificados'],
        ['11h40 às 12h40', 'Apresentação Artística 1 — Banda local'],
        ['16h às 17h', 'Apresentação Artística 2 — Banda local'],
        ['17h30 às 18h30', 'Apresentação Artística — Banda regional'],
        ['19h', 'Encerramento das atividades do dia'],
      ],
    },
    {
      iso: '2026-07-05',
      date: 'domingo, 5 de julho de 2026',
      items: [
        ['10h às 19h', 'Feira Livre, Exposição e Comercialização'],
        ['16h às 17h', 'Apresentação Artística — Nacional'],
        ['17h às 18h', 'Apresentação Artística — Nacional'],
        ['18h às 19h', 'Apresentação Artística — Nacional'],
        ['19h', 'Encerramento oficial da feira, visitação e comercialização'],
      ],
    },
  ];

  const calendarIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>';
  const clockIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderRows(items) {
    return items.map(function (item) {
      return '<tr class="transition-colors border-b border-gray-100 hover:bg-gray-50">'
        + '<td class="px-4 py-4 align-top"><div class="flex items-center gap-2 text-[#3FA637] font-medium whitespace-nowrap">'
        + clockIcon + escapeHtml(item[0]) + '</div></td>'
        + '<td class="px-4 py-4"><span class="font-medium text-gray-800">' + escapeHtml(item[1]) + '</span></td>'
        + '</tr>';
    }).join('');
  }

  function renderCard(day, extraClass) {
    return '<article class="overflow-hidden bg-white shadow-xl rounded-xl ring-1 ring-black/5 ' + (extraClass || '') + '">'
      + '<div class="bg-[#3FA637] text-white p-6"><div class="flex items-center gap-3">'
      + calendarIcon
      + '<h3 class="text-xl font-bold">' + escapeHtml(day.date) + '</h3>'
      + '</div></div>'
      + '<div class="p-6"><div class="overflow-x-auto"><table class="w-full">'
      + '<thead><tr class="border-b border-gray-200"><th class="w-1/3 px-4 py-3 font-semibold text-left text-gray-800">Horário</th><th class="w-2/3 px-4 py-3 font-semibold text-left text-gray-800">Atividade</th></tr></thead>'
      + '<tbody>' + renderRows(day.items) + '</tbody></table></div></div></article>';
  }

  function renderFullSchedule() {
    return '<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" data-schedule-hotfix="full-plano-piloto-2026">'
      + schedule.map(function (day) {
        return renderCard(day, 'feira-hotfix-card');
      }).join('')
      + '</div>';
  }

  function getInitialHomeDayIndex() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = year + '-' + month + '-' + day;

    if (today <= schedule[0].iso) return 0;
    if (today >= schedule[schedule.length - 1].iso) return schedule.length - 1;

    const index = schedule.findIndex(function (entry) {
      return entry.iso === today;
    });

    return index >= 0 ? index : 0;
  }

  function renderHomeSchedule(index) {
    const safeIndex = Math.min(Math.max(index, 0), schedule.length - 1);
    const day = schedule[safeIndex];

    return '<div class="relative max-w-3xl mx-auto" data-schedule-hotfix="home-plano-piloto-2026" data-day-index="' + safeIndex + '">'
      + renderCard(day, '')
      + '<div class="grid items-center w-full grid-cols-1 mt-6 gap-y-4 gap-x-3 sm:grid-cols-3 sm:gap-y-0">'
      + '<div class="flex items-center justify-start gap-3"><span class="text-xs text-gray-500">Dia ' + (safeIndex + 1) + ' de ' + schedule.length + '</span></div>'
      + '<div class="flex items-center justify-center gap-2">'
      + '<button type="button" data-schedule-action="previous" class="px-3 py-2 text-sm font-medium bg-white rounded-lg shadow hover:bg-gray-100">← Anterior</button>'
      + '<button type="button" data-schedule-action="next" class="px-3 py-2 text-sm font-medium text-white rounded-lg shadow bg-[#3FA637] hover:bg-green-700">Próximo →</button>'
      + '</div><div></div></div></div>';
  }

  function findSectionByTitle(titleFragment) {
    return Array.from(document.querySelectorAll('section')).find(function (section) {
      const headings = Array.from(section.querySelectorAll('h1, h2'));
      return headings.some(function (heading) {
        return (heading.textContent || '').indexOf(titleFragment) !== -1;
      });
    }) || null;
  }

  function patchFullSchedule() {
    const section = document.querySelector('#cronograma') || findSectionByTitle('Cronograma');
    if (!section) return false;
    if (section.querySelector('[data-schedule-hotfix="full-plano-piloto-2026"]')) return true;

    const content = section.querySelector('.mx-auto.max-w-7xl');
    if (!content) return false;

    content.innerHTML = renderFullSchedule();
    return true;
  }

  function patchHomeSchedule() {
    const section = findSectionByTitle('Programação da Feira do Trabalho e do Campo');
    if (!section) return false;
    if (section.querySelector('[data-schedule-hotfix="home-plano-piloto-2026"]')) return true;

    const content = section.querySelector('.mx-auto.max-w-7xl');
    if (!content) return false;

    const subtitle = section.querySelector('h2');
    if (subtitle) subtitle.textContent = 'Última edição - Feira da Torre';

    content.innerHTML = renderHomeSchedule(getInitialHomeDayIndex());
    return true;
  }

  function changeHomeDay(delta) {
    const wrapper = document.querySelector('[data-schedule-hotfix="home-plano-piloto-2026"]');
    if (!wrapper) return;

    const current = Number(wrapper.getAttribute('data-day-index') || 0);
    const next = (current + delta + schedule.length) % schedule.length;
    wrapper.outerHTML = renderHomeSchedule(next);
  }

  function patchAll() {
    patchFullSchedule();
    patchHomeSchedule();
  }

  document.addEventListener('click', function (event) {
    const actionButton = event.target && event.target.closest
      ? event.target.closest('[data-schedule-action]')
      : null;

    if (actionButton) {
      event.preventDefault();
      changeHomeDay(actionButton.getAttribute('data-schedule-action') === 'next' ? 1 : -1);
      return;
    }

    const navigationTarget = event.target && event.target.closest
      ? event.target.closest('a, button')
      : null;

    if (navigationTarget) {
      setTimeout(patchAll, 100);
      setTimeout(patchAll, 500);
    }
  });

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
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
