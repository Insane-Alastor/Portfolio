'use strict';

const FALLBACK_PROJECTS = [
  {
    name: 'Joseettan-s-Vayanashala',
    description: 'Library Management System - Python CLI',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 0,
    forks: 0,
    homepage: null,
    html_url: 'https://github.com/Insane-Alastor/Joseettan-s-Vayanashala',
  },
  {
    name: 'Portfolio',
    description: 'Portfolio Website',
    language: 'HTML',
    languageColor: '#E34C26',
    stars: 0,
    forks: 0,
    homepage: 'https://jps-port.vercel.app',
    html_url: 'https://github.com/Insane-Alastor/Portfolio',
  },
];

const LANG_COLORS = {
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python:     '#3572A5',
  HTML:       '#E34C26',
  CSS:        '#563D7C',
  'C++':      '#F34B7D',
  C:          '#555555',
  Java:       '#B07219',
  Go:         '#00ADD8',
  Rust:       '#DEA584',
  Ruby:       '#701516',
  Shell:      '#89E051',
  Vue:        '#41B883',
  Svelte:     '#FF3E00',
  Markdown:   '#083FA1',
  MySQL:      '#00758F',
};

(function updateAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const academicStartYear = (month >= 5) ? year : (year - 1);
  const yearNumber = Math.max(1, (academicStartYear - 2026) + 1);

  const titleForms = {
    1: 'First-Year',
    2: 'Second-Year',
    3: 'Third-Year',
    4: 'Fourth-Year',
    5: 'Graduate'
  };

  const lowerForms = {
    1: 'first-year',
    2: 'second-year',
    3: 'third-year',
    4: 'fourth-year',
    5: 'graduated'
  };

  const badgeForms = {
    1: '1st Year',
    2: '2nd Year',
    3: '3rd Year',
    4: '4th Year',
    5: 'Alumni'
  };

  const currentYearNum = Math.min(5, yearNumber);

  const heroYearEl = document.getElementById('hero-study-year');
  if (heroYearEl) {
    heroYearEl.textContent = `${titleForms[currentYearNum] || 'First-Year'} Computer Science Student`;
  }

  const aboutTextEl = document.getElementById('about-study-year-text');
  if (aboutTextEl) {
    aboutTextEl.textContent = lowerForms[currentYearNum] || 'first-year';
  }

  const aboutBadgeEl = document.getElementById('about-study-year-badge');
  if (aboutBadgeEl) {
    aboutBadgeEl.textContent = badgeForms[currentYearNum] || '1st Year';
  }
})();

(function initMatrixBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, rafId, hidden = false;
  let lastTime = 0;
  const FPS = 33;
  const INTERVAL = 1000 / FPS;

  const KATAKANA = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
  const CODE_SYMBOLS = '01{}[]()<>/;=+*#$|&~_?%!';
  const CHARS = (KATAKANA + CODE_SYMBOLS + '0123456789ABCDEF').split('');

  const fontSize = 15;
  let columns = 0;
  let drops = [];
  let speeds = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    columns = Math.max(1, Math.floor(W / fontSize));
    drops = [];
    speeds = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -60);
      speeds[i] = 0.75 + Math.random() * 0.65;
    }
    ctx.fillStyle = '#18100B';
    ctx.fillRect(0, 0, W, H);
  }

  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('visibilitychange', () => {
    hidden = document.hidden;
    if (!hidden && !rafId) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(loop);
    }
  });

  function loop(currentTime) {
    if (hidden) {
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(loop);

    const elapsed = currentTime - lastTime;
    if (elapsed < INTERVAL) return;
    lastTime = currentTime - (elapsed % INTERVAL);

    ctx.fillStyle = 'rgba(24, 16, 11, 0.085)';
    ctx.fillRect(0, 0, W, H);

    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < columns; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (y > 0 && y < H + fontSize) {
        ctx.shadowColor = '#E0A050';
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#F5E6CC';
        ctx.fillText(char, x, y);

        ctx.shadowBlur = 0;
        const prevChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = (Math.random() > 0.4) ? '#E0A050' : '#C99662';
        ctx.fillText(prevChar, x, y - fontSize);
      }

      if (y > H && Math.random() > 0.982) {
        drops[i] = 0;
        speeds[i] = 0.75 + Math.random() * 0.65;
      }

      drops[i] += speeds[i];
    }
  }

  lastTime = performance.now();
  rafId = requestAnimationFrame(loop);
})();

(function initTerminalFeed() {
  const feed = document.getElementById('terminal-feed');
  if (!feed) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lines = [
    '$ brew --beans dark',
    '> compiling ideas...',
    '>>> import coffee',
    '>>> while True: code()',
    '$ git commit -m "another late night"',
    '> pip install creativity',
    '$ sudo make coffee',
    '>>> def solve(problem): pass',
    '$ python3 main.py --debug',
    '> loading dependencies...',
    '>>> import antigravity',
    '$ echo "Hello, World!"',
    '> compilation successful',
    '$ cat /dev/urandom | strings',
    '>>> print("coffee = life")',
    '$ make -j4 everything',
    '>>> x = coffee * code',
    '$ ssh root@production.server',
    '> connection established ✓',
    '$ tail -f /var/log/ideas.log',
    '>>> import os; os.system("think")',
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentEl = null;
  const MAX_LINES = 14;

  function addNewLine() {
    const el = document.createElement('div');
    el.style.cssText = 'white-space:nowrap;overflow:hidden;line-height:1.8;';
    feed.appendChild(el);
    currentEl = el;
    charIndex = 0;
    while (feed.children.length > MAX_LINES) {
      feed.removeChild(feed.firstChild);
    }
  }

  function typeChar() {
    if (!currentEl) addNewLine();
    const line = lines[lineIndex % lines.length];
    if (charIndex < line.length) {
      currentEl.textContent += line[charIndex];
      charIndex++;
      setTimeout(typeChar, 35 + Math.random() * 45);
    } else {
      lineIndex++;
      setTimeout(() => {
        addNewLine();
        typeChar();
      }, 900 + Math.random() * 600);
    }
  }

  setTimeout(() => {
    addNewLine();
    typeChar();
  }, 1000);
})();

(function initNav() {
  const header   = document.querySelector('.site-header');
  const toggle   = document.getElementById('nav-toggle');
  const menu     = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

(function initTypedMotto() {
  const el     = document.getElementById('typed-motto');
  const output = document.getElementById('motto-output');
  if (!el) return;

  const motto = 'I turn coffee into code';
  el.textContent = '';

  let i = 0;
  setTimeout(() => {
    function type() {
      if (i <= motto.length) {
        el.textContent = motto.slice(0, i);
        i++;
        setTimeout(type, 65 + Math.random() * 35);
      } else if (output) {
        output.classList.add('show');
      }
    }
    type();
  }, 200);
})();

function typeTermCmd(el) {
  if (!el || el.dataset.typed) return;
  el.dataset.typed = '1';
  const text = el.dataset.typetext || '';
  let i = 0;

  function type() {
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) {
      setTimeout(type, 35 + Math.random() * 30);
    }
  }
  setTimeout(type, 200);
}

(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        const win = entry.target.querySelector('[data-typetext]');
        if (win) typeTermCmd(win);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('.terminal-window').forEach(win => {
    const cmdEl = win.querySelector('[data-typetext]');
    if (!cmdEl) return;
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          obs2.unobserve(entry.target);
          typeTermCmd(cmdEl);
        }
      });
    }, { threshold: 0.2 });
    obs2.observe(win);
  });
})();

(function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const USERNAME   = 'Insane-Alastor';
  const CACHE_KEY  = 'jps_pinned_repos_v6';
  const TIMEOUT_MS = 7000;

  function showSkeletons(n = 2) {
    grid.innerHTML = '';
    for (let i = 0; i < n; i++) {
      grid.innerHTML += `
        <div class="skeleton" aria-hidden="true" style="height:160px;">
          <div class="skel-bar w60"></div>
          <div class="skel-bar w80"></div>
          <div class="skel-bar w40"></div>
        </div>`;
    }
  }

  function fetchWithTimeout(url, ms) {
    const ctrl = new AbortController();
    const id   = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { signal: ctrl.signal })
      .finally(() => clearTimeout(id));
  }

  async function fetchPinnedRepos() {
    const proxyUrl = `https://gh-pinned-repos.egoist.dev/?username=${USERNAME}`;
    const resp     = await fetchWithTimeout(proxyUrl, TIMEOUT_MS);
    if (!resp.ok) throw new Error(`proxy ${resp.status}`);
    const pinned   = await resp.json();
    if (!Array.isArray(pinned) || pinned.length === 0) throw new Error('no pinned repos');

    const enriched = await Promise.all(pinned.map(async (p) => {
      try {
        const rr = await fetchWithTimeout(
          `https://api.github.com/repos/${USERNAME}/${p.repo}`, 3000
        );
        if (rr.ok) {
          const data = await rr.json();
          return {
            name:          data.name,
            description:   data.description || p.description || 'No description provided.',
            language:      data.language    || p.language,
            languageColor: LANG_COLORS[data.language] || LANG_COLORS[p.language] || '#C99662',
            stars:         data.stargazers_count,
            forks:         data.forks_count,
            homepage:      data.homepage    || null,
            html_url:      data.html_url,
          };
        }
      } catch (_) {}
      return {
        name:          p.repo,
        description:   p.description || 'No description provided.',
        language:      p.language,
        languageColor: LANG_COLORS[p.language] || '#C99662',
        stars:         p.stars   || 0,
        forks:         p.forks   || 0,
        homepage:      null,
        html_url:      `https://github.com/${USERNAME}/${p.repo}`,
      };
    }));
    return enriched;
  }

  function renderProjects(projects) {
    grid.innerHTML = '';

    if (!projects || projects.length === 0) {
      grid.innerHTML = `
        <div class="proj-empty" role="status">
          <p>$ ls ~/repos/ &rarr; No pinned repositories found.</p>
        </div>`;
      return;
    }

    projects.forEach((proj, idx) => {
      const color   = proj.languageColor || '#C99662';
      const delay   = idx * 80;
      const liveBtn = proj.homepage
        ? `<a href="${escHtml(proj.homepage)}" target="_blank" rel="noopener noreferrer"
              class="proj-btn btn-live" aria-label="Live demo of ${escHtml(proj.name)}">
             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
               <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7
                        M7 1h4m0 0v4M11 1 5.5 6.5"
                     stroke="currentColor" stroke-width="1.2"
                     stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
             Live
           </a>`
        : '';

      const card = document.createElement('article');
      card.className = 'proj-card';
      card.setAttribute('aria-label', `Repository: ${proj.name}`);
      card.style.animationDelay = `${delay}ms`;
      card.innerHTML = `
        <div class="proj-card-header">
          <span class="proj-dot"></span>
          <span class="proj-dot"></span>
          <span class="proj-dot"></span>
          <span class="proj-filename">${escHtml(proj.name)}.git</span>
        </div>
        <div class="proj-body">
          <h3 class="proj-name">${escHtml(proj.name)}</h3>
          <p class="proj-desc">${escHtml(proj.description || 'No description provided.')}</p>
          <div class="proj-meta">
            ${proj.language ? `
            <span class="proj-lang">
              <span class="lang-dot" style="background:${color}" aria-hidden="true"></span>
              ${escHtml(proj.language)}
            </span>` : ''}
            <span class="proj-stat" aria-label="${proj.stars} stars">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1l1.26 3.09H11L8.37 6.07l.97 3.09L6 7.4l-3.34 1.76.97-3.09L1 4.09h3.74z"
                      stroke="currentColor" stroke-width=".8"/>
              </svg>
              ${proj.stars}
            </span>
            <span class="proj-stat" aria-label="${proj.forks} forks">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 2a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm4 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0zM4 3v2.5a1.5 1.5 0 0 0 1.5 1.5h1A1.5 1.5 0 0 0 8 5.5V3M6 7v3m0 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
                      stroke="currentColor" stroke-width=".9" stroke-linecap="round"/>
              </svg>
              ${proj.forks}
            </span>
          </div>
        </div>
        <div class="proj-actions">
          <a href="${escHtml(proj.html_url)}" target="_blank" rel="noopener noreferrer"
             class="proj-btn" aria-label="View code for ${escHtml(proj.name)} on GitHub">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504
                       .5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703
                       -2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                       -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032
                       .892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338
                       -2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                       -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026
                       A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337
                       c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
                       .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943
                       .359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747
                       0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
            </svg>
            Code
          </a>
          ${liveBtn}
        </div>`;
      grid.appendChild(card);
    });
  }

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function loadProjects() {
    showSkeletons(2);

    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        renderProjects(JSON.parse(cached));
        return;
      }
    } catch (_) {}

    try {
      const projects = await fetchPinnedRepos();
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(projects)); } catch (_) {}
      renderProjects(projects);
    } catch (err) {
      renderProjects(FALLBACK_PROJECTS);
    }
  }

  loadProjects();
})();

(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const menu   = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');
    if (menu?.classList.contains('open')) {
      menu.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.focus();
    }
  }
});

(function initCursorHeartbeat() {
  let isVisible = true;
  setInterval(() => {
    isVisible = !isVisible;
    const cursors = document.querySelectorAll('.term-cursor, .p-cursor');
    cursors.forEach(cursor => {
      cursor.style.visibility = isVisible ? 'visible' : 'hidden';
    });
  }, 700);
})();

document.querySelectorAll('.term-dot').forEach(dot => {
  dot.addEventListener('click', (e) => {
    const win = e.target.closest('.terminal-window');
    if (!win) return;
    if (dot.classList.contains('dot-red')) {
      win.style.transform = 'scale(0.96)';
      setTimeout(() => { win.style.transform = ''; }, 200);
    } else if (dot.classList.contains('dot-yellow')) {
      win.style.transform = 'translateY(8px)';
      setTimeout(() => { win.style.transform = ''; }, 200);
    } else if (dot.classList.contains('dot-green')) {
      win.style.borderColor = '#96B464';
      win.style.boxShadow = '0 0 35px rgba(150, 180, 100, 0.35)';
      setTimeout(() => {
        win.style.borderColor = '';
        win.style.boxShadow = '';
      }, 500);
    }
  });
});
