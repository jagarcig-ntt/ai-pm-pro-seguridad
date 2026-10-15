  // Progress bar
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progressBar.style.width = (scrolled * 100) + '%';
  });

  // Impacto accordion — solo uno abierto a la vez
  function toggleDato(el) {
    const isOpen = el.classList.contains('open');
    document.querySelectorAll('.dato-card').forEach(c => c.classList.remove('open'));
    if (!isOpen) el.classList.add('open');
  }

  // Familias accordion — solo una abierta a la vez
  function toggleFamily(el) {
    const isOpen = el.classList.contains('fam-open');
    document.querySelectorAll('.fam-card').forEach(c => c.classList.remove('fam-open'));
    if (!isOpen) el.classList.add('fam-open');
  }

  // Reveal
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Nav scroll-spy
  const navLinks = document.querySelectorAll('.nav a');
  const sections = document.querySelectorAll('section');
  const spyObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => spyObs.observe(s));

  // ===== QUIZ =====
  function showFamily(f) {
    document.querySelectorAll('.quiz-tab').forEach(t => t.classList.toggle('active', t.dataset.f === f));
    document.querySelectorAll('.quiz-panel').forEach(p => p.classList.toggle('active', p.id === 'qf' + f.slice(1)));
  }

  function revealAnswer(qId, isDebate) {
    const q = document.getElementById(qId);
    if (!q) return;
    const btn = q.querySelector('.quiz-btn');
    if (btn.classList.contains('done')) return;
    // Marcar correctas e incorrectas
    q.querySelectorAll('.quiz-opt').forEach(opt => {
      if (opt.dataset.correct === 'true') opt.classList.add('correct');
      else opt.classList.add('wrong');
    });
    q.classList.add('revealed-correct');
    const exp = document.getElementById('exp-' + qId);
    if (exp) exp.classList.add('show');
    btn.textContent = 'Revelado';
    btn.classList.add('done');
  }

  function resetQuestion(qId) {
    const q = document.getElementById(qId);
    if (!q) return;
    q.querySelectorAll('.quiz-opt').forEach(opt => {
      opt.classList.remove('correct', 'wrong');
    });
    q.classList.remove('revealed-correct');
    const exp = document.getElementById('exp-' + qId);
    if (exp) exp.classList.remove('show');
    const btn = q.querySelector('.quiz-btn');
    btn.textContent = 'Revelar respuesta';
    btn.classList.remove('done');
  }

  // Acceso: añade ?notas a la URL (ej: index.html?notas)
  const params = new URLSearchParams(window.location.search);
  if (params.has('notas')) {
    document.body.classList.add('show-notes');
  }
  // Atajo de teclado: tecla "N" para activar/desactivar durante la sesión
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'n' || ev.key === 'N') {
      // Evita activarlo si se está escribiendo en un campo
      if (ev.target.tagName === 'INPUT' || ev.target.tagName === 'TEXTAREA') return;
      document.body.classList.toggle('show-notes');
    }
  });
