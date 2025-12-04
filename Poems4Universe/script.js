/*
 * 脚本负责处理专辑的交互逻辑：
 *  - 导航项点击时切换对应的章节展示
 *  - 在切换章节时暂停其他正在播放的音频/视频，避免同时播放
 */

document.addEventListener('DOMContentLoaded', () => {
  const parts = Array.from(document.querySelectorAll('.part'));
  const sectionOrder = parts.map(part => part.id);
  const getActiveIndex = () => sectionOrder.findIndex(id => document.getElementById(id).classList.contains('active'));

  buildSidebarFromChapters();

  // 键盘快捷键：方向键左右/上下切换章节；数字键1-4直接跳转章节
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    const cur = getActiveIndex();
    let newIndex = cur;
    if (key === 'ArrowRight' || key === 'ArrowDown') newIndex = (cur + 1) % sectionOrder.length;
    else if (key === 'ArrowLeft' || key === 'ArrowUp') newIndex = (cur - 1 + sectionOrder.length) % sectionOrder.length;
    else if (/^[1-4]$/.test(key)) newIndex = parseInt(key, 10) - 1;
    else return;
    if (newIndex !== cur) {
      const targetId = sectionOrder[newIndex];
      switchPart(targetId);
      const groupIndex = newIndex + 1;
      document.querySelectorAll('.nav-group').forEach(g => {
        const text = g.querySelector('.nav-part')?.textContent || '';
        g.open = text.startsWith(groupIndex + '.');
      });
    }
  });

  // 触摸滑动：横向滑动切换章节
  let touchStartX = 0, touchEndX = 0; const threshold = 30;
  document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX; const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > threshold) {
      const cur = getActiveIndex();
      let newIndex = cur;
      newIndex = deltaX < 0 ? (cur + 1) % sectionOrder.length : (cur - 1 + sectionOrder.length) % sectionOrder.length;
      if (newIndex !== cur) { const targetId = sectionOrder[newIndex]; switchPart(targetId); }
    }
  });

  // 内容已静态写入 HTML；仅绑定折叠与媒体暂停
  wireChapterMediaGuards();
});

function switchPart(targetId) {
  const parts = document.querySelectorAll('.part');
  parts.forEach(part => {
    part.querySelectorAll('audio,video').forEach(m => { try { m.pause(); m.currentTime = 0; } catch {} });
    part.classList.remove('active');
  });
  const targetSection = document.getElementById(targetId);
  if (targetSection) targetSection.classList.add('active');
}

function buildSidebarFromChapters() {
  const navRoot = document.getElementById('nav-groups');
  if (!navRoot) return;
  navRoot.innerHTML = '';
  const parts = Array.from(document.querySelectorAll('.part'));
  parts.forEach((part, idx) => {
    const partId = part.id;
    const title = part.querySelector('h2')?.textContent || `Part ${idx+1}`;
    const group = document.createElement('details');
    group.className = 'nav-group';
    if (part.classList.contains('active')) group.open = true;
    const summary = document.createElement('summary');
    summary.className = 'nav-part';
    summary.textContent = `${idx+1}. ${title}`;
    summary.addEventListener('click', (e) => {
      // 切换到该 Part，但保留折叠行为
      switchPart(partId);
      // 滚动到 Part 顶部
      document.getElementById(partId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    const ul = document.createElement('ul');
    ul.className = 'nav-sub';
    const chapters = Array.from(part.querySelectorAll('.chapter'));
    chapters.forEach((ch) => {
      const id = ch.id;
      const t = ch.querySelector('summary')?.textContent || id;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = t;
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        switchPart(partId);
        // 展开目标小节
        ch.open = true;
        // 高亮当前链接
        navRoot.querySelectorAll('.nav-sub a').forEach(x => x.classList.remove('active'));
        a.classList.add('active');
        // 平滑滚动
        ch.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      li.appendChild(a);
      ul.appendChild(li);
    });
    group.append(summary, ul);
    navRoot.appendChild(group);
  });
}

// 将 content.md 构建为 { partNo: {title, chapters:[{title, blocks:[...]}] } }
async function buildFromMarkdown() {
  try {
    // 优先尝试 content.md，不行再尝试 content.html（Jekyll 可能已编译）
    let res = await fetch('./content.md', { cache: 'no-store' });
    if (!res.ok) {
      res = await fetch('./content.html', { cache: 'no-store' });
      if (!res.ok) throw new Error('无法加载 content.md 或 content.html');
    }
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    const text = await res.text();
    let structure;
    if (contentType.includes('text/html') || /^\s*<!doctype|<html/i.test(text)) {
      structure = parseHTMLStructure(text);
    } else {
      structure = parseMarkdownStructure(text);
    }
    renderStructure(structure);
    wireChapterMediaGuards();
  } catch (e) {
    console.error(e);
  }
}

function parseHTMLStructure(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const parts = {};
  const h1s = Array.from(doc.querySelectorAll('h1'));
  const allHeadings = Array.from(doc.body.querySelectorAll('h1, h2'));

  const getIndex = (el) => allHeadings.indexOf(el);
  const between = (start, end) => {
    const nodes = [];
    for (let n = start.nextSibling; n && n !== end; n = n.nextSibling) nodes.push(n);
    return nodes;
  };

  // 辅助：将一组节点解析为 blocks
  const parseNodesToBlocks = (nodes) => {
    const blocks = [];
    nodes.forEach((node) => {
      if (!node || !node.tagName) return;
      const tag = node.tagName.toLowerCase();
      if (tag === 'p') {
        const txt = node.textContent.trim(); if (txt) blocks.push({ type: 'paragraph', text: txt });
        node.querySelectorAll('a[href^="http"]').forEach(a => {
          const href = a.getAttribute('href');
          if (href) blocks.push({ type: 'link', href, label: a.textContent.trim() || href });
        });
        node.querySelectorAll('img[src]').forEach(img => {
          const src = img.getAttribute('src');
          blocks.push({ type: 'image', src: resolveMedia(src), alt: img.getAttribute('alt') || '' });
        });
      } else if (tag === 'img') {
        const src = node.getAttribute('src');
        blocks.push({ type: 'image', src: resolveMedia(src), alt: node.getAttribute('alt') || '' });
      } else if (tag === 'figure') {
        const img = node.querySelector('img');
        if (img) blocks.push({ type: 'image', src: resolveMedia(img.getAttribute('src')), alt: img.getAttribute('alt') || '' });
      } else if (tag === 'video') {
        const src = node.getAttribute('src') || (node.querySelector('source') && node.querySelector('source').getAttribute('src'));
        if (src) blocks.push({ type: 'video', src: resolveMedia(src) });
      } else if (tag === 'a') {
        const href = node.getAttribute('href');
        if (/^https?:\/\//i.test(href)) blocks.push({ type: 'link', href, label: node.textContent.trim() || href });
      }
    });
    return blocks;
  };

  // 引言：第一个 h1 与第一个“数字开头的 h1”之间的内容
  if (h1s.length) {
    const first = h1s[0];
    const nextNumberedH1 = allHeadings.find(h => h.tagName.toLowerCase() === 'h1' && /^\d+\./.test((h.textContent||'').trim()));
    const nodes = nextNumberedH1 ? between(first, nextNumberedH1) : [];
    const blocks = parseNodesToBlocks(nodes);
    if (blocks.length) parts.intro = { blocks };
  }

  // 遍历所有 h1，挑出形如“1. …”的作为 Part
  h1s.forEach((h1) => {
    const t = (h1.textContent || '').trim();
    const m = /^(\d+)\./.exec(t);
    if (!m) return; // 跳过“献给宇宙的散文诗”这一总标题
    const partNo = parseInt(m[1], 10);
    const startIdx = getIndex(h1);
    // 找到下一个 h1 作为结束界限
    let endH1 = null;
    for (let i = startIdx + 1; i < allHeadings.length; i++) { if (allHeadings[i].tagName.toLowerCase() === 'h1') { endH1 = allHeadings[i]; break; } }
    parts[partNo] = parts[partNo] || { title: t.replace(/^[\d.]+\s*/, ''), chapters: [] };

    // 在 h1 与下一个 h1 之间，按 h2 拆分小节
    const h2s = allHeadings.filter(h => h.tagName.toLowerCase() === 'h2');
    const segmentH2s = h2s.filter(h2 => getIndex(h2) > startIdx && (!endH1 || getIndex(h2) < getIndex(endH1)));
    segmentH2s.forEach((h2, idx) => {
      const h2Text = (h2.textContent || '').trim();
      const mm = /^(\d+\.\d+)\s*(.*)$/.exec(h2Text);
      if (!mm) return;
      const nextBoundary = segmentH2s[idx + 1] || endH1 || null;
      const nodes = between(h2, nextBoundary);
      const blocks = parseNodesToBlocks(nodes);
      parts[partNo].chapters.push({ id: `c-${mm[1].replace('.', '-')}`, title: h2Text, blocks });
    });
  });
  return parts;
}

function parseMarkdownStructure(md) {
  const lines = md.split(/\r?\n/);
  const parts = {}; // {intro:{blocks:[]}, 1:{title, chapters:[]}, ...}
  let currentPart = null; let currentChapter = null;
  let buffer = [];
  const introBlocks = [];
  const flushBuffer = () => {
    if (currentChapter && buffer.length) {
      currentChapter.blocks.push({ type: 'paragraph', text: buffer.join('\n').trim() });
      buffer = [];
    }
  };
  for (let raw of lines) {
    const line = raw.trim();
    // 引言：在遇到第一个“# 数字.”之前的内容
    if (currentPart == null && !/^#\s+\d+\./.test(line) && !/^##\s+\d+\.\d+/.test(line)) {
      const mediaMatchIntro = /^!\[([^\]]*)\]\(([^)]+)\)/.exec(line);
      if (mediaMatchIntro) {
        const alt = mediaMatchIntro[1].toLowerCase();
        let url = decodeURIComponent(mediaMatchIntro[2]);
        const resolved = resolveMedia(url);
        const ext = (resolved.split('?')[0].split('#')[0].split('.').pop() || '').toLowerCase();
        if (/(mp4|webm|mov)$/.test(ext) || alt.includes('video')) introBlocks.push({ type: 'video', src: resolved });
        else if (/(mp3|m4a|ogg|wav)$/.test(ext) || alt.includes('music') || alt.includes('audio')) introBlocks.push({ type: 'audio', src: resolved });
        else if (/^https?:\/\//i.test(resolved)) introBlocks.push({ type: 'link', href: resolved, label: '外部链接' });
        else introBlocks.push({ type: 'image', src: resolved, alt: alt || '' });
        continue;
      }
      if (/^https?:\/\//i.test(line)) { introBlocks.push({ type: 'link', href: line, label: line }); continue; }
      if (line !== '') introBlocks.push({ type: 'paragraph', text: raw });
      continue;
    }
    if (/^#\s+\d+\./.test(line)) {
      flushBuffer(); currentChapter = null;
      const m = /^#\s+(\d+)\.\s*(.*)$/.exec(line);
      if (m) {
        currentPart = parseInt(m[1], 10);
        parts[currentPart] = parts[currentPart] || { title: m[2] || '', chapters: [] };
      }
      continue;
    }
    if (/^##\s+\d+\.\d+/.test(line)) {
      flushBuffer();
      const m = /^##\s+([\d.]+)\s*(.*)$/.exec(line);
      if (m && currentPart != null) {
        currentChapter = { id: `c-${m[1].replace('.', '-')}`, title: m[0].replace(/^##\s+/, ''), blocks: [] };
        parts[currentPart].chapters.push(currentChapter);
      }
      continue;
    }
    // 媒体：![]()
    const mediaMatch = /^!\[([^\]]*)\]\(([^)]+)\)/.exec(line);
    if (mediaMatch && currentChapter) {
      flushBuffer();
      const alt = mediaMatch[1].toLowerCase();
      let url = decodeURIComponent(mediaMatch[2]);
      const resolved = resolveMedia(url);
      const ext = (resolved.split('?')[0].split('#')[0].split('.').pop() || '').toLowerCase();
      if (/(mp4|webm|mov)$/.test(ext) || alt.includes('video')) {
        currentChapter.blocks.push({ type: 'video', src: resolved });
      } else if (/(mp3|m4a|ogg|wav)$/.test(ext) || alt.includes('music') || alt.includes('audio')) {
        currentChapter.blocks.push({ type: 'audio', src: resolved });
      } else if (/^https?:\/\//i.test(resolved)) {
        currentChapter.blocks.push({ type: 'link', href: resolved, label: '外部链接' });
      } else {
        currentChapter.blocks.push({ type: 'image', src: resolved, alt: alt || '' });
      }
      continue;
    }
    // 纯链接行
    if (/^https?:\/\//i.test(line) && currentChapter) {
      currentChapter.blocks.push({ type: 'link', href: line, label: line });
      continue;
    }
    // 文本
    if (currentChapter) {
      if (line === '') { flushBuffer(); } else { buffer.push(raw); }
    }
  }
  flushBuffer();
  if (introBlocks.length) parts.intro = { blocks: introBlocks };
  return parts;
}

// 将解析结构渲染到页面
function renderStructure(struct) {
  // 渲染引言
  if (struct.intro && Array.isArray(struct.intro.blocks)) {
    const intro = document.getElementById('intro-content');
    if (intro) {
      intro.innerHTML = '';
      const wrap = document.createElement('div');
      const mediaWrap = document.createElement('div'); mediaWrap.className = 'media';
      struct.intro.blocks.forEach(b => {
        if (b.type === 'paragraph' && b.text) { const p = document.createElement('p'); p.textContent = b.text; wrap.appendChild(p); }
        else if (b.type === 'image') { const img = document.createElement('img'); img.src = b.src; if (b.alt) img.alt = b.alt; img.onerror = () => img.remove(); mediaWrap.appendChild(img); }
        else if (b.type === 'video') { const v = document.createElement('video'); v.controls = true; v.preload = 'none'; v.src = b.src; v.onerror = () => v.remove(); mediaWrap.appendChild(v); }
        else if (b.type === 'audio') { const a = document.createElement('audio'); a.controls = true; a.preload = 'none'; a.src = b.src; a.onerror = () => a.remove(); mediaWrap.appendChild(a); }
        else if (b.type === 'link') { const a = document.createElement('a'); a.href = b.href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = b.label || b.href; wrap.appendChild(a); }
      });
      if (mediaWrap.children.length) wrap.appendChild(mediaWrap);
      intro.appendChild(wrap);
    }
  }

  Object.entries(struct).forEach(([partNo, part]) => {
    if (partNo === 'intro') return;
    const container = document.getElementById(`part${partNo}-content`);
    if (!container) return;
    container.innerHTML = '';
    part.chapters.forEach(ch => {
      const details = document.createElement('details');
      details.className = 'chapter';
      details.id = ch.id;
      const summary = document.createElement('summary');
      summary.textContent = ch.title;
      const content = document.createElement('div');
      content.className = 'content';
      const mediaWrap = document.createElement('div');
      mediaWrap.className = 'media';
      ch.blocks.forEach(b => {
        if (b.type === 'paragraph' && b.text) {
          const ps = b.text.split(/\n\n+/).filter(Boolean);
          ps.forEach(t => { const p = document.createElement('p'); p.textContent = t.replace(/^\s+|\s+$/g, ''); content.appendChild(p); });
        } else if (b.type === 'image') {
          const img = document.createElement('img'); img.src = b.src; if (b.alt) img.alt = b.alt; img.onerror = () => img.remove(); mediaWrap.appendChild(img);
        } else if (b.type === 'video') {
          const v = document.createElement('video'); v.controls = true; v.preload = 'none'; v.src = b.src; v.onerror = () => v.remove(); mediaWrap.appendChild(v);
        } else if (b.type === 'audio') {
          // 音乐未提供则留空：如果资源加载失败，移除播放器
          const a = document.createElement('audio'); a.controls = true; a.preload = 'none'; a.src = b.src; a.onerror = () => a.remove(); mediaWrap.appendChild(a);
        } else if (b.type === 'link') {
          const a = document.createElement('a'); a.href = b.href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = b.label || b.href; content.appendChild(a);
        }
      });
      if (mediaWrap.children.length) content.appendChild(mediaWrap);
      details.append(summary, content);
      container.appendChild(details);
    });
  });
}

// 资源路径解析：将 ./xxx 映射到 assets/ 子目录，同时处理别名映射
function resolveMedia(url) {
  // 仅处理相对路径；绝对链接直接返回
  if (/^https?:\/\//i.test(url)) return url;
  const decoded = url.replace(/^\.\//, '');
  const base = decoded.split('/').pop();
  const mapped = MEDIA_ALIAS[base] || base;
  const ext = (mapped.split('.').pop() || '').toLowerCase();
  if (/(jpg|jpeg|png|gif)$/i.test(ext)) return `assets/images/${mapped}`;
  if (/(mp4|webm|mov|mp3|m4a|ogg|wav)$/i.test(ext)) return `assets/audio/${mapped}`;
  return mapped;
}

// 已知媒资别名映射（MD中的中文文件名 -> 实际英文文件名）
const MEDIA_ALIAS = {
  '《星流之泪》.mp4': 'star_stream_tears.mp4',
  '%E3%80%8A%E6%98%9F%E6%B5%81%E4%B9%8B%E6%B3%AA%E3%80%8B.mp4': 'star_stream_tears.mp4',
  '吞噬双星的协奏.mp3': 'double_star_concerto.mp3'
};

// 展开/折叠章节时，确保暂停其它正在播放的媒体
function wireChapterMediaGuards() {
  document.querySelectorAll('.chapter').forEach(ch => {
    ch.addEventListener('toggle', () => {
      if (ch.open) {
        // 关闭其他展开项并暂停媒体
        document.querySelectorAll('.chapter').forEach(other => {
          if (other !== ch && other.open) other.open = false;
          other.querySelectorAll('audio,video').forEach(m => { try { m.pause(); } catch {} });
        });
      } else {
        ch.querySelectorAll('audio,video').forEach(m => { try { m.pause(); } catch {} });
      }
    });
  });
}
