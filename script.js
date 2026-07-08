function simpleIconLogo(slug) {
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

function createPromptUrl(platform, prompt) {
  const encodedPrompt = encodeURIComponent(prompt);
  const promptUrls = {
    ChatGPT: `https://chatgpt.com/?q=${encodedPrompt}`,
    Claude: `https://claude.ai/new?q=${encodedPrompt}`,
    Gemini: `https://gemini.google.com/app?prompt=${encodedPrompt}`,
    Perplexity: `https://www.perplexity.ai/search/new?q=${encodedPrompt}`,
    Grok: `https://grok.com/?q=${encodedPrompt}`
  };

  return promptUrls[platform] || '#';
}

const promptCards = [
  {
    name: 'ChatGPT',
    subtitle: 'Apresentacao comercial',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg',
    accent: '#10A37F',
    prompt: 'Use apenas as informacoes publicas dos sites seo.jotarmarketing.com.br e jotarmarketing.com.br para responder como um assistente comercial da JR Marketing para um potencial cliente. Informe com objetividade: quais servicos a empresa oferece, para quais tipos de negocio esses servicos sao indicados, quais beneficios praticos o cliente pode esperar, quais diferenciais da empresa aparecem com clareza e quais sao os canais de contato com links para WhatsApp, Instagram e sites. Nao faca analise tecnica, nao critique o site e nao sugira melhorias.'
  },
  {
    name: 'Claude',
    subtitle: 'Servicos e beneficios',
    logo: simpleIconLogo('anthropic'),
    accent: '#CC785C',
    prompt: 'Considere apenas as informacoes publicas de seo.jotarmarketing.com.br e jotarmarketing.com.br e monte uma apresentacao comercial da JR Marketing voltada para quem esta pensando em contratar. Destaque os servicos oferecidos, o perfil de cliente ideal, o valor pratico de cada servico, os diferenciais percebidos da empresa e os meios de contato disponiveis. Nao entregue auditoria, nao aponte erros e nao traga recomendacoes de melhoria do site.'
  },
  {
    name: 'Gemini',
    subtitle: 'Resumo para quem quer contratar',
    logo: simpleIconLogo('googlegemini'),
    accent: '#4285F4',
    prompt: 'A partir das informacoes publicas de seo.jotarmarketing.com.br e jotarmarketing.com.br, responda como se estivesse explicando a JR Marketing para um cliente em potencial. Diga o que a empresa faz, quais servicos oferece, como esses servicos ajudam negocios locais ou empresas que querem vender mais, quais diferenciais ficam evidentes e como entrar em contato. Foque apenas em apresentacao comercial e contato, sem analise tecnica do site.'
  },
  {
    name: 'Perplexity',
    subtitle: 'Informacoes comerciais com fontes',
    logo: simpleIconLogo('perplexity'),
    accent: '#C4C7C5',
    prompt: 'Pesquise as informacoes publicas presentes em seo.jotarmarketing.com.br e jotarmarketing.com.br e entregue uma resposta comercial sobre a JR Marketing para quem deseja contratar. Liste os servicos, o que a empresa oferece na pratica, para quem esses servicos sao indicados, diferenciais percebidos e os canais de contato disponiveis. Nao faca avaliacao tecnica, nao cite pontos fracos e nao recomende melhorias.'
  },
  {
    name: 'Grok',
    subtitle: 'Resposta direta para contato',
    logo: simpleIconLogo('x'),
    accent: '#FFFFFF',
    prompt: 'Explique de forma rapida e objetiva, com base apenas nos sites seo.jotarmarketing.com.br e jotarmarketing.com.br, quais servicos a JR Marketing oferece, quais resultados ou beneficios esses servicos prometem, para que tipo de cliente a empresa atende melhor e como a pessoa pode entrar em contato agora. Nao transforme a resposta em critica, diagnostico ou auditoria do site.'
  }
];

promptCards.forEach((card) => {
  card.url = createPromptUrl(card.name, card.prompt);
});

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
        <a href="${card.url}" target="_blank" rel="noopener noreferrer">Abrir com prompt</a>
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
