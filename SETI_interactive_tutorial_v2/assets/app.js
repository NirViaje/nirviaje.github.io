/* Shared helpers */
const $ = (sel, el=document)=> el.querySelector(sel);
const $$ = (sel, el=document)=> Array.from(el.querySelectorAll(sel));
const fmt = (n)=> (Math.round(n*100)/100).toString();
function clamp(x,a,b){return Math.max(a, Math.min(b,x));}

function setActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.nav a').forEach(a=>{
    const href = a.getAttribute('href');
    a.classList.toggle('active', href===path);
  });
}
function bindHotkeys(){
  // 1..6 to navigate
  const map = {
    'Digit1':'index.html',
    'Digit2':'flow.html',
    'Digit3':'simulator.html',
    'Digit4':'rules.html',
    'Digit5':'quiz.html',
    'Digit6':'glossary.html'
  };
  window.addEventListener('keydown', (e)=>{
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (map[e.code]) location.href = map[e.code];
    if (e.code==='Escape') closeModal();
  });
}

/* Modal image viewer */
function openModal(src, title){
  const m = $('#modal');
  $('#modalTitle').textContent = title || '查看';
  $('#modalImg').src = src;
  m.classList.add('open');
}
function closeModal(){
  const m = $('#modal');
  if (!m) return;
  m.classList.remove('open');
}
function bindModal(){
  const m = $('#modal');
  if (!m) return;
  m.addEventListener('click', (e)=>{
    if (e.target.id==='modal') closeModal();
  });
  $('#modalClose').addEventListener('click', closeModal);
  $$('.thumb').forEach(t=>{
    t.addEventListener('click', ()=>{
      openModal(t.dataset.src, t.dataset.title);
    });
  });
}

/* Local storage */
const store = {
  get(k, def){ try{ const v=localStorage.getItem(k); return v? JSON.parse(v): def; }catch{ return def; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};

document.addEventListener('DOMContentLoaded', ()=>{
  setActiveNav();
  bindHotkeys();
  bindModal();
});