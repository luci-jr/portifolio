/**
 * ==========================================================================
 * PORTFÓLIO RETRÔ / DEV TRINDADE — LUCIVALDO JUNIOR
 * Lógica de Interação: 1. Front-end, 2. Backend, 3. SysOps + Filtro de Projetos
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações das 3 Classes na Ordem Oficial: Front-end -> Backend -> SysOps
  const classConfigs = {
    frontend: {
      role: 'CLASSE ATIVA: WEB DEVELOPER & UI BUILDER',
      title: 'Criando Aplicações Web Escaláveis & Interfaces Reativas.',
      desc: 'Ecossistema Angular 21+, TypeScript estrito, componentização standalone, Signals reativos e a plataforma Comunidade Tech.',
      command: 'ng serve --project=comunidade-tech',
      defaultOutput: 'ANGULAR 21: COMPILED | STANDALONE SIGNALS | FIREBASE: SYNC'
    },
    backend: {
      role: 'CLASSE ATIVA: BACKEND ARCHITECT',
      title: 'Construindo Motores Concorrentes & APIs Resilientes.',
      desc: 'Foco em alta performance com Go 1.22+ e Java 21, arquitetura limpa, microsserviços e baixa latência para sistemas de missão crítica.',
      command: 'go run engine/main.go --status',
      defaultOutput: 'ENGINE: ONLINE | RUNTIME: GO 1.26 | ARCH: CLEAN | LATENCY: <5ms'
    },
    sysops: {
      role: 'CLASSE ATIVA: CLOUD & SYSOPS COMMANDER',
      title: 'Orquestrando Clusters Confiáveis & Pipelines CI/CD.',
      desc: 'Infraestrutura como código com Docker Swarm, Traefik v2, instâncias AWS, observabilidade e automações resilientes com n8n.',
      command: 'docker stack ps nexus_cluster',
      defaultOutput: 'SWARM: 6/6 SERVICES RUNNING | TRAEFIK: SSL OK | AWS: HEALTHY'
    },
    gamer: {
      role: 'CLASSE ATIVA: GAME DEV & ENGINE ARCHITECT',
      title: 'Desenvolvendo Jogos 2D, Engines & Mecânicas Interativas.',
      desc: 'Exploração de Game Engines (Ebitengine, Godot e custom engines em Go), arquitetura de game loops, física 2D, matemática vetorial e compilação multiplataforma (Desktop & WebAssembly).',
      command: 'go run cmd/game/main.go --engine=2d',
      defaultOutput: 'ENGINE: INITIALIZED | GAME LOOP: 60 FPS | PHYSICS: 2D AABB | AUDIO: CHIPTUNE'
    }
  };

  // Suporte a compatibilidade para "devops" apontando para "sysops"
  classConfigs.devops = classConfigs.sysops;

  // Estado Atual (Inicia em Front-end)
  let currentMode = 'frontend';

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
    heroTitle.textContent = config.title;
    heroDesc.textContent = config.desc;

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
});
