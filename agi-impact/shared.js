(() => {
  // Fallback list; will be replaced by items parsed from index.html when available
  let PAGES = [
    { href: './index.html', title: 'AGI Impact · Index', emoji: '🏠' },
    { href: './personality-agi-impact.html', title: 'Personality Diversity × AGI', emoji: '🧬' },
    { href: './deepmind-responsibility-safety-timeline.html', title: 'DeepMind Responsibility & Safety', emoji: '🏢' },
    { href: './four-frameworks.html', title: 'MBTI × Big Five × RIASEC × O*NET', emoji: '🧩' },
    { href: './lesswrong-in-ai-risk.html', title: 'LessWrong in AI Safety Timeline', emoji: '📚' },
    { href: './lw_ai_safety_causal_graph.html', title: 'LessWrong → AI Safety → Governance', emoji: '🔗' },
    { href: './Planecrash×Rationality×AI-aligment.html', title: 'Planecrash × Rationality × AI Alignment', emoji: '🛫' },
    { href: './board_game_prototype.html', title: 'AI Risk Board Game Prototype', emoji: '🎲' },
  ];

  // Feature flag: show/hide theme toggle button
  const ENABLE_THEME_BTN = false;

  const normalizePath = (p) => {
    try {
      const url = new URL(p, location.href);
      return url.pathname.split('/').pop() || 'index.html';
    } catch { return p; }
  };

  const currentFile = normalizePath(location.pathname);

  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (k === 'aria') Object.entries(v).forEach(([ak, av]) => node.setAttribute(`aria-${ak}`, av));
      else if (v != null) node.setAttribute(k, v);
    });
    children.forEach((c) => node.append(c instanceof Node ? c : document.createTextNode(String(c))));
    return node;
  }

  function buildTopbar() {
    const homeIcon = el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      el('path', { d: 'M3 10.5L12 3l9 7.5' }),
      el('path', { d: 'M5 12v8a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-8' })
    ]);

    const home = el('a', { href: './index.html', class: 'agi-home', aria: { label: 'Back to AGI Impact home' } }, [homeIcon, el('span', {}, ['Home'])]);
    if (currentFile === 'index.html') {
      home.setAttribute('aria-current', 'page');
    }

    const burger = el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round' }, [
      el('path', { d: 'M4 7h16' }),
      el('path', { d: 'M4 12h16' }),
      el('path', { d: 'M4 17h16' }),
    ]);
    const menuBtn = el('button', { class: 'agi-menu-btn', aria: { label: 'Open menu', expanded: 'false', controls: 'agi-sidebar' } }, [burger, el('span', { class: 'agi-menu-label' }, ['Menu'])]);
    menuBtn.addEventListener('click', () => toggleSidebar(true));

    // Theme toggle button (conditionally rendered)
    let themeBtn = null;
    if (ENABLE_THEME_BTN) {
      const sun = el('svg', { class: 'sun', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
        el('circle', { cx: '12', cy: '12', r: '4' }),
        el('path', { d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41' })
      ]);
      const moon = el('svg', { class: 'moon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
        el('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })
      ]);
      themeBtn = el('button', { class: 'agi-theme-btn', aria: { label: 'Toggle theme', pressed: isLightTheme() ? 'true' : 'false' } }, [sun, moon, el('span', { class: 'agi-menu-label' }, ['Theme'])]);
      themeBtn.addEventListener('click', () => {
        const nowLight = toggleTheme();
        themeBtn.setAttribute('aria-pressed', String(nowLight));
      });
    }

    // Place Home and Menu next to each other, then page title
    const titleText = (document.title || '').trim() || 'AGI Impact';
    const topTitle = el('div', { class: 'agi-top-title', role: 'heading', 'aria-level': '1', title: titleText }, [titleText]);
    // Show group badge for current page
    const self = PAGES.find(p => normalizePath(p.href) === currentFile) || { href: location.pathname, title: document.title };
    const groupName = categorize(self);
    const badge = el('span', { class: 'agi-top-badge' }, [groupName]);
    const controls = [home, menuBtn];
    if (ENABLE_THEME_BTN && themeBtn) controls.push(themeBtn);
    const topbar = el('nav', { class: 'agi-topbar', role: 'navigation' }, [...controls, topTitle, badge]);

    const body = document.body;
    body.insertBefore(topbar, body.firstChild);
  }

  function buildSidebar() {
    const overlay = el('div', { class: 'agi-overlay', id: 'agi-overlay' });
    overlay.addEventListener('click', () => toggleSidebar(false));

    const closeBtn = el('button', { class: 'agi-close', aria: { label: 'Close menu' } }, ['Close']);
    closeBtn.addEventListener('click', () => toggleSidebar(false));

    const head = el('div', { class: 'agi-side-head' }, [
      el('div', { class: 'agi-side-title' }, ['AGI Impact']),
      closeBtn,
    ]);

    const searchInput = el('input', { type: 'search', placeholder: 'Search pages…', autocomplete: 'off' });
    const search = el('div', { class: 'agi-search' }, [searchInput]);

    const list = el('div', { class: 'agi-menu-list', id: 'agi-menu-list' });
    renderMenuList(list);

    const aside = el('aside', { class: 'agi-sidebar', id: 'agi-sidebar', role: 'navigation' }, [head, search, list]);

    document.body.append(overlay, aside);

    // Search filter across groups
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      const groups = aside.querySelectorAll('.agi-group');
      groups.forEach((group) => {
        let visibleCount = 0;
        group.querySelectorAll('li').forEach((li) => {
          const text = li.textContent.toLowerCase();
          const show = text.includes(q);
          li.style.display = show ? '' : 'none';
          if (show) visibleCount++;
        });
        group.style.display = visibleCount ? '' : 'none';
      });
    });
  }

  function toggleSidebar(open) {
    const aside = document.getElementById('agi-sidebar');
    const overlay = document.getElementById('agi-overlay');
    const btn = document.querySelector('.agi-menu-btn');
    const willOpen = open != null ? open : !aside.classList.contains('open');
    aside.classList.toggle('open', willOpen);
    overlay.classList.toggle('open', willOpen);
    if (btn) btn.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) {
      document.addEventListener('keydown', escClose, { once: true });
    }
  }

  function escClose(e) {
    if (e.key === 'Escape') toggleSidebar(false);
  }

  function prefetchPages() {
    if (!('requestIdleCallback' in window)) {
      setTimeout(() => prefetchPages(), 1200);
      return;
    }
    window.requestIdleCallback(() => {
      const head = document.head;
      for (const p of PAGES) {
        if (normalizePath(p.href) === currentFile) continue;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = p.href;
        head.appendChild(link);
      }
    }, { timeout: 2000 });
  }

  function removeLegacyHomeLinks() {
    document.querySelectorAll('.agi-home-link').forEach((n) => n.remove());
  }

  // Theme helpers
  function isLightTheme() {
    return document.documentElement.classList.contains('agi-theme-light');
  }

  function applyTheme(mode) {
    const light = mode === 'light';
    document.documentElement.classList.toggle('agi-theme-light', light);
  }

  function initTheme() {
    const stored = localStorage.getItem('agiTheme');
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored);
    } else {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      applyTheme(prefersLight ? 'light' : 'dark');
    }
    // React to OS changes only if user hasn’t set a preference
    if (!stored && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: light)');
      mq.addEventListener('change', (e) => {
        applyTheme(e.matches ? 'light' : 'dark');
      });
    }
  }

  function toggleTheme() {
    const toLight = !isLightTheme();
    applyTheme(toLight ? 'light' : 'dark');
    localStorage.setItem('agiTheme', toLight ? 'light' : 'dark');
    return toLight;
  }

  function renderMenuList(listEl) {
    listEl.innerHTML = '';
    const groups = groupPages(PAGES);
    const order = [
      'Overview',
      'LW/AF & Safety',
      'Personality & Careers',
      'Labs & Timelines',
      'Narratives & Cross-Models',
      'Prototypes',
      'Other',
    ];
    const groupNames = [...new Set(order.concat(Array.from(groups.keys())))];

    for (const g of groupNames) {
      const items = groups.get(g);
      if (!items || !items.length) continue;
      const wrap = el('div', { class: 'agi-group' });
      wrap.append(el('div', { class: 'agi-group-title' }, [g]));
      const ul = el('ul', {});
      for (const p of items) {
        const isActive = normalizePath(p.href) === currentFile;
        const a = el('a', { href: p.href, ...(isActive ? { 'aria-current': 'page' } : {}) }, [
          el('span', { class: 'agi-menu-emoji' }, [p.emoji || '•']),
          el('span', {}, [p.title])
        ]);
        ul.append(el('li', {}, [a]));
      }
      wrap.append(ul);
      listEl.append(wrap);
    }
  }

  function groupPages(pages) {
    const map = new Map();
    for (const p of pages) {
      const g = categorize(p);
      if (!map.has(g)) map.set(g, []);
      map.get(g).push(p);
    }
    return map;
  }

  function categorize(p) {
    const t = (p.title || '') + ' ' + (p.href || '');
    const s = t.toLowerCase();
    if (/index\.html/.test(p.href)) return 'Overview';
    if (/lesswrong|causal|ai 安全|ai safety/.test(s)) return 'LW/AF & Safety';
    if (/mbti|big five|riasec|o\*?net|personality/.test(s)) return 'Personality & Careers';
    if (/deepmind|timeline/.test(s)) return 'Labs & Timelines';
    if (/planecrash|rationality|alignment|对齐/.test(s)) return 'Narratives & Cross-Models';
    if (/game|prototype/.test(s)) return 'Prototypes';
    return 'Other';
  }

  async function loadPagesFromIndex() {
    try {
      const res = await fetch('./index.html', { credentials: 'same-origin' });
      if (!res.ok) throw new Error('index fetch failed');
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const cards = Array.from(doc.querySelectorAll('a.card[href]'));
      const items = cards.map((a) => {
        const href = a.getAttribute('href');
        const titleEl = a.querySelector('.card-title');
        const emojiEl = titleEl ? titleEl.querySelector('.emoji') : null;
        const emoji = emojiEl ? emojiEl.textContent.trim() : '•';
        let title = titleEl ? titleEl.textContent.trim() : href;
        if (emoji) title = title.replace(emoji, '').trim();
        return { href: './' + href.replace(/^\.\//, ''), title, emoji };
      });
      // Ensure index at the top
      PAGES = [{ href: './index.html', title: 'AGI Impact · Index', emoji: '🏠' }, ...items];
    } catch (e) {
      // Fallback to built-in PAGES; no-op
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    // Ensure shared.css link present if someone forgot to add it.
    if (!document.querySelector('link[href$="shared.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = './shared.css';
      document.head.appendChild(link);
    }
    removeLegacyHomeLinks();
    await loadPagesFromIndex();
    initTheme();
    buildTopbar();
    buildSidebar();
    prefetchPages();
  });
})();
