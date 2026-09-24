/**
 * ==========================================================================
 * PORTFÓLIO RETRÔ / ENGENHARIA DE SOFTWARE — LUCIVALDO JUNIOR
 * Lógica de Interação: 1. Front-end, 2. Backend, 3. SysOps + Filtro de Projetos
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações das 3 Classes na Ordem Oficial: Front-end -> Backend -> SysOps
  const classConfigs = {
    backend: {
      role: '● DESENVOLVEDOR BACK-END',
      title: 'Construindo Sistemas Distribuídos e Microsserviços com <span class="highlight-tech">Java/Spring Boot</span>, <span class="highlight-tech">Go</span> e <span class="nowrap-end"><span class="highlight-tech">Cloud</span>.</span>',
      desc: `<p class="hero-desc-p">
            Minha trajetória profissional é marcada por uma transição de carreira estratégica para a Tecnologia, fundamentada em <strong class="highlight-tech">mais de 15 anos de liderança em ambientes operacionais de alta pressão como Chef de Cozinha</strong>. Essa vivência consolidou competências essenciais para a engenharia de software de missão crítica: <span class="desc-pill">resiliência sob pressão</span>, <span class="desc-pill">disciplina rigorosa</span>, <span class="desc-pill">gestão ágil de crises</span> e foco obstinado em entregas de qualidade com cumprimento rigoroso de prazos.
          </p>
          <p class="hero-desc-p">
            Atualmente, atuo como <strong class="highlight-tech">Desenvolvedor Back-end &amp; SysOps/DevOps</strong>, unindo o desenvolvimento de microsserviços e sistemas distribuídos de alta concorrência à automação de fluxos e orquestração de infraestruturas em nuvem. Possuo experiência prática com <strong class="highlight-tech">Java 21 (Spring Boot 3)</strong> e <strong class="highlight-tech">Go (Golang)</strong>, conteinerização e clusters com <strong class="highlight-tech">Docker &amp; Swarm</strong>, roteamento seguro com <strong class="highlight-tech">Traefik</strong>, nuvem <strong class="highlight-tech">AWS</strong>, além de persistência transacional com bancos relacionais (<strong class="highlight-tech">PostgreSQL</strong> com isolamento ACID e <strong class="highlight-tech">Oracle DB</strong>).
          </p>`,
      command: 'go run engine/main.go --status',
      defaultOutput: 'ENGINE: ONLINE | RUNTIME: GO 1.26 | ARCH: CLEAN | LATENCY: <5ms'
    },
    frontend: {
      role: '● WEB DEVELOPER & UI BUILDER',
      title: 'Criando Aplicações Web Escaláveis & Interfaces Reativas.',
      desc: `<p class="hero-desc-p">
            Focado na construção de interfaces corporativas reativas e acessíveis utilizando o ecossistema <strong class="highlight-tech">Angular 21+</strong>, <strong class="highlight-tech">TypeScript estrito</strong> e arquitetura de <span class="desc-pill">Standalone Components</span> orientada a eventos.
          </p>
          <p class="hero-desc-p">
            Aplicação prática de gerenciamento moderno de estado com <strong class="highlight-tech">Signals reativos</strong>, integração contínua com serviços em nuvem (Firebase) e estilização de alto impacto com Tailwind CSS e design systems modulares.
          </p>`,
      command: 'ng serve --project=comunidade-tech',
      defaultOutput: 'ANGULAR 21: COMPILED | STANDALONE SIGNALS | FIREBASE: SYNC'
    },
    sysops: {
      role: '● CLOUD & SYSOPS COMMANDER',
      title: 'Orquestrando Clusters Confiáveis & Pipelines CI/CD.',
      desc: `<p class="hero-desc-p">
            Infraestrutura moderna e resiliente orientada a <span class="desc-pill">alta disponibilidade</span>, conteinerização em escala corporativa com <strong class="highlight-tech">Docker Swarm</strong> e orquestração de tráfego com terminação TLS automatizada via <strong class="highlight-tech">Traefik v2</strong>.
          </p>
          <p class="hero-desc-p">
            Provisionamento de ambientes em nuvem <strong class="highlight-tech">AWS (S3, IAM, SQS)</strong>, observabilidade em tempo real, automações de fluxos operacionais com <strong class="highlight-tech">n8n</strong> e pipelines contínuos de deploy sobre servidores Linux Ubuntu.
          </p>`,
      command: 'docker stack ps nexus_cluster',
      defaultOutput: 'SWARM: 6/6 SERVICES RUNNING | TRAEFIK: SSL OK | AWS: HEALTHY'
    },
    gamer: {
      role: '● GAME DEV & ENGINE ARCHITECT',
      title: 'Desenvolvendo Jogos 2D, Engines & Mecânicas Interativas.',
      desc: `<p class="hero-desc-p">
            Desenvolvimento de jogos retrô e simulações gráficas em tempo real utilizando motores 2D nativos em <strong class="highlight-tech">Go (Ebitengine v2)</strong>, Godot e custom engines com física <span class="desc-pill">AABB</span> customizada e game loops determinísticos.
          </p>
          <p class="hero-desc-p">
            Compilação nativa de alta fidelidade para Desktop e execução no navegador via <strong class="highlight-tech">WebAssembly (WASM) a 60 FPS</strong>, integrando arte pixel art regional e design de áudio chiptune interativo.
          </p>`,
      command: 'go run cmd/game/main.go --engine=2d',
      defaultOutput: 'ENGINE: INITIALIZED | GAME LOOP: 60 FPS | PHYSICS: 2D AABB | AUDIO: CHIPTUNE'
    }
  };

  // Suporte a compatibilidade para "devops" apontando para "sysops"
  classConfigs.devops = classConfigs.sysops;

  // Estado Atual (Inicia em Back-end)
  let currentMode = 'backend';

  // Elementos do DOM
  const body = document.body;
  const roleBadge = document.getElementById('heroRoleBadge');
  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');
  const telemetryData = document.getElementById('telemetryData');
  const classButtons = document.querySelectorAll('.class-btn');
  const crtToggle = document.getElementById('crtToggle');
  const crtOverlay = document.getElementById('crtOverlay');
  const crtStatus = document.getElementById('crtStatus');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  /**
   * Filtra os Projetos por Segmento
   */
  function filterProjects(category) {
    // Atualiza botões de filtro
    filterButtons.forEach(btn => {
      if (btn.dataset.filter === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Exibe/Oculta cards de projetos
    projectCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  }

  /**
   * Atualiza o Modo Ativo na Interface
   */
  function setMode(modeKey) {
    if (modeKey === 'devops') modeKey = 'sysops';
    if (!classConfigs[modeKey] || currentMode === modeKey) return;
    currentMode = modeKey;

    // Atualiza classe no body preservando o estado do tema (Dark / Light)
    const isLight = body.classList.contains('theme-light');
    body.className = `mode-${modeKey}${isLight ? ' theme-light' : ''}`;

    // Atualiza botões superiores
    classButtons.forEach(btn => {
      const btnClass = btn.dataset.class === 'devops' ? 'sysops' : btn.dataset.class;
      if (btnClass === modeKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Atualiza conteúdo com micro-animação
    const config = classConfigs[modeKey];
    roleBadge.textContent = config.role;
    heroTitle.innerHTML = config.title;
    heroDesc.innerHTML = config.desc;

    // Atualiza linha de comando do terminal
    const promptCommand = document.querySelector('.terminal-telemetry .term-line');
    if (promptCommand) {
      promptCommand.innerHTML = `<span class="prompt">$</span> ${config.command}`;
    }
    telemetryData.textContent = config.defaultOutput;
  }

  // Event Listeners nos Botões do Menu Superior
  classButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.class);
    });
  });

  // Event Listeners nas Abas de Filtro de Projetos
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterProjects(btn.dataset.filter);
    });
  });

  // Atalhos de Teclado (1: Front-end, 2: Backend, 3: SysOps, 4: Gamer)
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === '1') setMode('frontend');
    if (e.key === '2') setMode('backend');
    if (e.key === '3') setMode('sysops');
    if (e.key === '4') setMode('gamer');
  });

  // Alternador de Scanlines CRT
  const savedCrtState = localStorage.getItem('crt_state');
  if (savedCrtState === 'off') {
    crtOverlay.classList.add('disabled');
    crtStatus.textContent = 'OFF';
  }

  crtToggle.addEventListener('click', () => {
    const isDisabled = crtOverlay.classList.toggle('disabled');
    if (isDisabled) {
      crtStatus.textContent = 'OFF';
      localStorage.setItem('crt_state', 'off');
    } else {
      crtStatus.textContent = 'ON';
      localStorage.setItem('crt_state', 'on');
    }
  });

  // Alternador de Tema: Dark <-> Light
  const themeToggle = document.getElementById('themeToggle');
  const themeStatus = document.getElementById('themeStatus');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('theme_state');

  function applyTheme(isLight) {
    if (isLight) {
      body.classList.add('theme-light');
      if (themeStatus) themeStatus.textContent = 'LIGHT';
      if (themeIcon) themeIcon.textContent = '☀️';
      localStorage.setItem('theme_state', 'light');
    } else {
      body.classList.remove('theme-light');
      if (themeStatus) themeStatus.textContent = 'DARK';
      if (themeIcon) themeIcon.textContent = '🌙';
      localStorage.setItem('theme_state', 'dark');
    }
  }

  // Inicializa tema de acordo com preferência salva
  applyTheme(savedTheme === 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyLight = body.classList.contains('theme-light');
      applyTheme(!isCurrentlyLight);
    });
  }

  /**
   * Integração com a API Serverless Go (/api/status)
   */
  async function fetchServerlessTelemetry() {
    try {
      const startTime = performance.now();
      const response = await fetch('/api/status');
      
      if (response.ok) {
        const data = await response.json();
        const duration = Math.round(performance.now() - startTime);
        telemetryData.innerHTML = `SERVERLESS GO: OK | HOST: ${data.location || 'BELÉM-PA'} | RUNTIME: ${data.runtime || 'GO 1.26'} | PING: ${duration}ms`;
      }
    } catch (err) {
      console.log('Telemetria local: usando fallback de classe.');
    }
  }

  fetchServerlessTelemetry();

  // Inicializa a vitrine filtrada por Front-end (modo padrão inicial)
  filterProjects('frontend');

  /**
   * ==========================================================================
   * Lógica da Barra Lateral Retrátil Estilo iPortfolio Cyberpunk
   * ==========================================================================
   */
  const sidebarDrawer = document.getElementById('sidebarDrawer');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarNavLinks = document.querySelectorAll('.sidebar-nav-link');

  function openSidebar() {
    if (sidebarDrawer) sidebarDrawer.classList.add('is-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('is-open');
  }

  function closeSidebar() {
    if (sidebarDrawer) sidebarDrawer.classList.remove('is-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('is-open');
  }

  function toggleSidebar() {
    if (sidebarDrawer && sidebarDrawer.classList.contains('is-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  // Fecha no pressionamento de ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // Fecha a gaveta e ativa o link correspondente ao clicar
  sidebarNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      sidebarNavLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      closeSidebar();
    });
  });

  // Atualiza dinamicamente o link ativo conforme o scroll da página
  const sectionsToObserve = ['heroSection', 'classeSelector', 'techMarquee', 'projetos', 'sobre', 'contato'];
  window.addEventListener('scroll', () => {
    let currentSection = '';
    sectionsToObserve.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 100) {
          currentSection = secId;
        }
      }
    });

    if (currentSection) {
      sidebarNavLinks.forEach((link) => {
        if (link.getAttribute('data-section') === currentSection) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });
});

