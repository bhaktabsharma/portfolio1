const rOverlay = document.getElementById('rOverlay');
  const rModal   = document.getElementById('rModal');
  const rBody    = document.getElementById('rModalBody');

  function openRepo(card) {
    const id = card.dataset.repo;
    const d  = repoData[id];
    if (!d) return;

    document.getElementById('rModalDot').style.background = d.dot;
    document.getElementById('rModalName').textContent = d.name;
    document.getElementById('rModalLang').textContent = d.lang;

    const features = d.features.map(f =>
      `<div class="rmodal-feature"><span style="font-size:1rem;flex-shrink:0;margin-top:1px">${f.icon}</span><span>${f.text}</span></div>`
    ).join('');
    const tags = d.tags.map(t => `<span class="tag">${t}</span>`).join('');

    rBody.innerHTML = `
      <p class="rmodal-desc">${d.desc}</p>

      <span class="rmodal-section-title">▸ What It Does</span>
      <div class="rmodal-features" style="margin-bottom:1.8rem">${features}</div>

      <span class="rmodal-section-title">▸ Example Output</span>
      <div class="rmodal-code">
        <div class="rmodal-code-header">
          <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
          <span>${d.code.label}</span>
        </div>
        <pre>${d.code.body}</pre>
      </div>

      <span class="rmodal-section-title">▸ Stats</span>
      <div class="rmodal-stats">
        <div class="rmodal-stat"><span class="rmodal-stat-val">⭐ ${d.stars}</span><span class="rmodal-stat-label">Stars</span></div>
        <div class="rmodal-stat"><span class="rmodal-stat-val">🍴 ${d.forks}</span><span class="rmodal-stat-label">Forks</span></div>
        <div class="rmodal-stat"><span class="rmodal-stat-val" style="color:#3dffa0;font-size:1rem">● ${d.status}</span><span class="rmodal-stat-label">Status</span></div>
      </div>

      <span class="rmodal-section-title">▸ Tags</span>
      <div class="rmodal-tags">${tags}</div>

      <a href="${d.github}" target="_blank" class="rmodal-gh-btn">
        🐙 &nbsp; View on GitHub
      </a>
    `;

    rOverlay.classList.add('open');
    rModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    rModal.scrollTop = 0;
  }

  function closeRepo() {
    rOverlay.classList.remove('open');
    rModal.classList.remove('open');
    document.body.style.overflow = '';
  }


  // Nav scroll
  const navEl = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    navEl.style.background = window.scrollY > 40 ? 'rgba(6,14,31,0.98)' : 'rgba(6,14,31,0.95)';
  });

  // Hamburger menu
  function toggleMenu() {
    document.getElementById('hamburger').classList.toggle('open');
    document.getElementById('mobileMenu').classList.toggle('open');
  }
  function closeMenu() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
  }
  document.addEventListener('click', e => {
    const h=document.getElementById('hamburger');
    const m=document.getElementById('mobileMenu');
    if(!h.contains(e.target)&&!m.contains(e.target)){h.classList.remove('open');m.classList.remove('open');}
  });

  // Contact form
  function handleContact(e) {
    e.preventDefault();
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value;
    const message = document.getElementById('cf-message').value.trim();
    const btn     = document.getElementById('cf-btn');
    if (!name || !email || !message) return;
    const body = encodeURIComponent('From: '+name+'\nEmail: '+email+'\n\n'+message);
    const sub  = encodeURIComponent('[Portfolio] '+subject+' — from '+name);
    window.location.href = 'mailto:bhaktabsharma@gmail.com?subject='+sub+'&body='+body;
    btn.textContent = 'Opening Email Client... ✓';
    btn.style.background = '#3dffa0';
    btn.style.color = '#060e1f';
    setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background=''; btn.style.color=''; }, 3000);
  }


  // Certificate download
  function downloadCert() {
    const a = document.createElement('a');
    a.href = 'assets/certificate.pdf';
    a.download = 'Bhakta-Sharma-NVH-Digital-Forensic-Certificate.pdf';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

    // Resume download
  function downloadResume() {
    const a = document.createElement('a');
    a.href = 'resume.html';
    a.download = 'Bhakta-Sharma-Resume.html';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  // Fade-in observer with fallback
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
  setTimeout(() => {
    document.querySelectorAll('.fade-in:not(.visible)').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  }, 800);

  // Escape closes all modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeTool(); closeWriteup(); closeRepo(); closeProject(); document.body.style.overflow = ''; }
  });


  // ════════════════════════════════════════
  //  CARD HOVER LIFT (lightweight, CSS-driven — replaces the old
  //  per-frame JS 3D tilt + ambient float system. Cards get a simple,
  //  cheap hover lift; no continuous animation runs while idle, which
  //  is also why scroll feels smoother now. See :hover rules in style.css.
  // ════════════════════════════════════════


  // ════════════════════════════════════════
  //  ANIMATED SKILL / PATH BARS (grow on scroll-in)
  // ════════════════════════════════════════
  (function() {
    const bars = document.querySelectorAll('.skill-fill, .thm-path-fill');
    bars.forEach(bar => {
      const target = bar.style.width || '0%';
      bar.dataset.target = target;
      bar.style.width = '0%';
      bar.style.transition = 'width 1.1s cubic-bezier(.2,.7,.3,1)';
    });
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => { entry.target.style.width = entry.target.dataset.target; }, i * 60);
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(bar => barObserver.observe(bar));
    setTimeout(() => {
      bars.forEach(bar => { if (bar.style.width === '0%') bar.style.width = bar.dataset.target; });
    }, 2500);
  })();


  // ════════════════════════════════════════
  //  TECH STACK SPOTLIGHT (grid hover glow)
  // ════════════════════════════════════════
  (function () {
    const wrap = document.getElementById('stackWrap');
    const spot = document.getElementById('stackSpotlight');
    if (!wrap || !spot) return;

    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      spot.style.left = (e.clientX - r.left) + 'px';
      spot.style.top  = (e.clientY - r.top) + 'px';
    });

    wrap.addEventListener('touchstart', (e) => {
      const r = wrap.getBoundingClientRect();
      const t = e.touches[0];
      spot.style.left = (t.clientX - r.left) + 'px';
      spot.style.top  = (t.clientY - r.top) + 'px';
      wrap.classList.add('touch-active');
      clearTimeout(wrap._touchTimer);
      wrap._touchTimer = setTimeout(() => wrap.classList.remove('touch-active'), 1200);
    }, { passive: true });
  })();


  // ════════════════════════════════════════
  //  SCROLL PROGRESS INDICATOR (fill % + active section dot)
  // ════════════════════════════════════════
  (function () {
    const fill = document.getElementById('scrollFill');
    const dots = document.querySelectorAll('.scroll-dot');
    if (!fill && !dots.length) return;

    let _scrollProgRAF = null;
    function updateFill() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(Math.max(scrollTop / max, 0), 1) * 100;
      if (fill) fill.style.height = pct + '%';
    }
    window.addEventListener('scroll', () => {
      if (_scrollProgRAF) return;
      _scrollProgRAF = requestAnimationFrame(() => { updateFill(); _scrollProgRAF = null; });
    }, { passive: true });
    updateFill();

    if (dots.length) {
      const sectionMap = {};
      dots.forEach(d => { sectionMap[d.dataset.section] = d; });

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            dots.forEach(d => d.classList.remove('active'));
            if (sectionMap[id]) sectionMap[id].classList.add('active');
          }
        });
      }, { threshold: 0.4, rootMargin: '-10% 0px -10% 0px' });

      Object.keys(sectionMap).forEach(id => {
        const sec = document.getElementById(id);
        if (sec) sectionObserver.observe(sec);
      });
    }
  })();


  // ════════════════════════════════════════
  //  HERO TERMINAL WIDGET (click-to-run fake commands)
  // ════════════════════════════════════════
  (function () {
    const body = document.getElementById('termBody');
    const btns = document.querySelectorAll('.term-cmd-btn');
    if (!body || !btns.length) return;

    const PROMPT = 'bhakta@security:~$';

    const OUTPUTS = {
      whoami: [
        'bhakta_sharma',
        'role&nbsp;&nbsp;&nbsp;: cybersecurity researcher &middot; ethical hacker',
        'focus&nbsp;&nbsp;: web app security, bug bounty, reconnaissance',
        'status : pursuing CEH (EC-Council)'
      ],
      skills: [
        'web application security&nbsp;&nbsp;████████░░ 80%',
        'network security&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;████████░░ 82%',
        'python&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;████████░░ 85%',
        'bash&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;███████░░░ 78%',
        'digital forensics (DFIR) █████████░ 90%'
      ],
      projects: [
        'Bug-Bounty-Recon-Tool&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&mdash; 10-phase Bash recon engine (main project)',
        'SQL-INJECTION-LAB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&mdash; 53 SQLi labs, full-stack TS',
        'Web-Hacking-Lab-local&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&mdash; 36 web vuln labs, local-only',
        'Dorking-Recon-Search-Engine &mdash; 91 recon dork queries',
        'Automated-Recon-Enum-Toolkit &mdash; v2.0 modular recon framework',
        'XSS-Bugs-Lab&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&mdash; 72 XSS labs, 3 frameworks',
        '&rarr; scroll down to Projects &amp; GitHub for details'
      ],
      help: [
        'available commands:',
        'whoami &middot; skills &middot; projects &middot; contact &middot; help &middot; clear'
      ]
    };

    const CONTACT_ROWS = [
      { label: 'email',    value: 'bhaktabsharma@gmail.com', href: 'mailto:bhaktabsharma@gmail.com' },
      { label: 'github',   value: 'github.com/bhaktabsharma', href: 'https://github.com/bhaktabsharma' },
      { label: 'linkedin', value: 'linkedin.com/in/bhaktabsharma', href: 'https://www.linkedin.com/in/bhaktabsharma/' },
      { label: 'thm',      value: 'tryhackme.com/p/bhaktabsharma', href: 'https://tryhackme.com/p/bhaktabsharma' }
    ];

    function scrollToBottom() { body.scrollTop = body.scrollHeight; }

    function printCmd(cmd) {
      const line = document.createElement('div');
      line.className = 'term-line';
      line.innerHTML = `<span class="term-prompt">${PROMPT}</span> ${cmd}`;
      body.appendChild(line);
    }

    function printOut(html) {
      const out = document.createElement('div');
      out.className = 'term-out';
      out.innerHTML = html;
      body.appendChild(out);
    }

    function runCommand(cmd) {
      if (cmd === 'clear') {
        body.innerHTML = '';
        return;
      }
      printCmd(cmd);
      if (cmd === 'contact') {
        CONTACT_ROWS.forEach(row => {
          printOut(`${row.label}&nbsp;: <a href="${row.href}" target="_blank" rel="noopener">${row.value}</a>`);
        });
      } else if (OUTPUTS[cmd]) {
        OUTPUTS[cmd].forEach(l => printOut(l));
      }
      scrollToBottom();
    }

    btns.forEach(btn => {
      btn.addEventListener('click', () => runCommand(btn.dataset.cmd));
    });

    // Terminal starts empty — nothing runs until a command button is clicked
    printCmd('');
  })();
