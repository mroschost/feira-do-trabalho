(function () {
  const schedule = [
    {
      date: 'terça-feira, 30 de junho de 2026',
      items: [
        ['13h às 15h', 'Oficina de Fuxico — Grupo dos idosos'],
        ['16h às 18h', 'Oficina de Ecobag'],
        ['21h', 'Encerramento'],
        ['Ônibus', '5 ônibus'],
      ],
    },
    {
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

  function renderSchedule() {
    return '<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">' + schedule.map(function (day) {
      return '<div class="flex flex-col overflow-hidden bg-white shadow-lg rounded-xl feira-hotfix-card">'
        + '<div class="bg-[#3FA637] text-white p-6"><div class="flex items-center gap-3">'
        + calendarIcon
        + '<h3 class="text-xl font-bold">' + escapeHtml(day.date) + '</h3>'
        + '</div></div>'
        + '<div class="flex-grow p-6"><div class="overflow-x-auto"><table class="w-full">'
        + '<thead><tr class="border-b border-gray-200"><th class="w-1/3 px-4 py-3 font-semibold text-left text-gray-800">Horário</th><th class="w-2/3 px-4 py-3 font-semibold text-left text-gray-800">Atividade</th></tr></thead>'
        + '<tbody>' + day.items.map(function (item) {
          return '<tr class="transition-colors border-b border-gray-100 hover:bg-gray-50">'
            + '<td class="px-4 py-4 align-top"><div class="flex items-center gap-2 text-[#3FA637] font-medium whitespace-nowrap">'
            + clockIcon + escapeHtml(item[0]) + '</div></td>'
            + '<td class="px-4 py-4"><span class="font-medium text-gray-800">' + escapeHtml(item[1]) + '</span></td>'
            + '</tr>';
        }).join('') + '</tbody></table></div></div></div>';
    }).join('') + '</div>';
  }

  function isPlanoPilotoActive(section) {
    const buttons = Array.from(section.querySelectorAll('button'));
    return buttons.some(function (button) {
      return button.textContent.trim() === 'Plano Piloto 2026' && button.className.indexOf('bg-[#3FA637]') !== -1;
    });
  }

  function patchSchedule() {
    const section = document.querySelector('#cronograma');
    if (!section) return;

    const content = section.querySelector('.mx-auto.max-w-7xl');
    if (!content) return;

    const hasPlaceholder = section.textContent.indexOf('Programação a confirmar') !== -1;
    const isActive = isPlanoPilotoActive(section);

    if (!hasPlaceholder && !isActive) return;
    if (content.dataset.hotfixScheduleApplied === 'true') return;

    content.innerHTML = renderSchedule();
    content.dataset.hotfixScheduleApplied = 'true';
  }

  const observer = new MutationObserver(function () {
    const content = document.querySelector('#cronograma .mx-auto.max-w-7xl');
    if (content) content.dataset.hotfixScheduleApplied = '';
    patchSchedule();
  });

  function start() {
    patchSchedule();
    observer.observe(document.body, { childList: true, subtree: true });
    setInterval(patchSchedule, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
