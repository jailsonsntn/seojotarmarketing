function simpleIconLogo(slug) {
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

const promptCards = [
  {
    name: 'ChatGPT',
    subtitle: 'Pesquisa estratégica',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg',
    accent: '#10A37F',
    url: 'https://chatgpt.com/',
    prompt: 'Analise os sites seo.jotarmarketing.com.br e jotarmarketing.com.br como um consultor sênior de SEO e conversão. Traga: 1) resumo executivo; 2) pontos fortes; 3) pontos fracos; 4) oportunidades imediatas; 5) CTAs mais fortes; 6) como destacar WhatsApp, Instagram e prova social para gerar mais leads.'
  },
  {
    name: 'Claude',
    subtitle: 'Diagnóstico detalhado',
    logo: simpleIconLogo('anthropic'),
    accent: '#CC785C',
    url: 'https://claude.ai/',
    prompt: 'Faça uma auditoria profunda dos sites seo.jotarmarketing.com.br e jotarmarketing.com.br. Quero uma análise clara de arquitetura, posicionamento, linguagem de conversão, confiança e objeções de compra. Termine com um plano de ação curto para melhorar leads.'
  },
  {
    name: 'Gemini',
    subtitle: 'Resumo orientado a busca',
    logo: simpleIconLogo('googlegemini'),
    accent: '#4285F4',
    url: 'https://gemini.google.com/',
    prompt: 'Estude seo.jotarmarketing.com.br e jotarmarketing.com.br e me entregue um resumo focado em busca local, intenção comercial e sinais que ajudam a aparecer em respostas de IA. Priorize conversão, presença no Google e links de contato.'
  },
  {
    name: 'Perplexity',
    subtitle: 'Pesquisa com fontes',
    logo: simpleIconLogo('perplexity'),
    accent: '#C4C7C5',
    url: 'https://www.perplexity.ai/',
    prompt: 'Pesquise e compare seo.jotarmarketing.com.br e jotarmarketing.com.br. Quero fontes, diferenciais competitivos, possíveis lacunas e recomendações práticas para aumentar conversão. Liste também quais links e redes sociais devem ficar em destaque.'
  },
  {
    name: 'Grok',
    subtitle: 'Leitura rápida e crítica',
    logo: simpleIconLogo('x'),
    accent: '#FFFFFF',
    url: 'https://grok.com/',
    prompt: 'Analise rapidamente os sites seo.jotarmarketing.com.br e jotarmarketing.com.br. Quero uma leitura objetiva com pontos fortes, fraquezas, e três mudanças de alto impacto para aumentar conversão e deixar os contatos mais visíveis.'
  }
];

const promptGrid = document.querySelector('#promptGrid');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildPromptCard(card) {
  return `
    <article class="prompt-card" style="--accent:${card.accent}">
      <div class="prompt-card-head">
        <img class="prompt-logo" src="${card.logo}" alt="Logo ${escapeHtml(card.name)}" loading="lazy">
        <div class="prompt-meta">
          <h3>${escapeHtml(card.name)}</h3>
          <p>${escapeHtml(card.subtitle)}</p>
        </div>
      </div>
      <div class="prompt-text">${escapeHtml(card.prompt)}</div>
      <div class="prompt-actions">
        <a href="${card.url}" target="_blank" rel="noopener noreferrer">Abrir IA</a>
        <button type="button" data-copy-prompt="${encodeURIComponent(card.prompt)}">Copiar prompt</button>
      </div>
    </article>
  `;
}

if (promptGrid) {
  promptGrid.innerHTML = promptCards.map(buildPromptCard).join('');

  promptGrid.addEventListener('click', async (event) => {
    const copyButton = event.target.closest('[data-copy-prompt]');
    if (!copyButton) {
      return;
    }

    const prompt = decodeURIComponent(copyButton.getAttribute('data-copy-prompt') || '');

    try {
      await navigator.clipboard.writeText(prompt);
      const originalText = copyButton.textContent;
      copyButton.textContent = 'Copiado';
      window.setTimeout(() => {
        copyButton.textContent = originalText;
      }, 1500);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = prompt;
      temp.setAttribute('readonly', 'true');
      temp.style.position = 'absolute';
      temp.style.left = '-9999px';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }
  });
}