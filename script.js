/**
 * ==========================================================================
 * PORTFÓLIO RETRÔ / DEV TRINDADE — LUCIVALDO JUNIOR
 * Lógica de Interação, Troca de Modos e Telemetria Go Serverless
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações das 3 Classes
  const classConfigs = {
    backend: {
      role: 'CLASSE ATIVA: BACKEND ARCHITECT',
      title: 'Construindo Motores Concorrentes & APIs Resilientes.',
      desc: 'Foco em alta performance com Go 1.22+ e Java 21, arquitetura limpa, microsserviços e baixa latência para sistemas de missão crítica.',
      command: 'go run engine/main.go --status',
      defaultOutput: 'ENGINE: ONLINE | RUNTIME: GO 1.26 | ARCH: CLEAN | LATENCY: <5ms'
    },
    devops: {
      role: 'CLASSE ATIVA: CLOUD & DEVOPS COMMANDER',
      title: 'Orquestrando Clusters Confiáveis & Pipelines CI/CD.',
      desc: 'Infraestrutura como código com Docker Swarm, Traefik v2, instâncias AWS, observabilidade e automações resilientes com n8n.',
      command: 'docker stack ps nexus_cluster',
      defaultOutput: 'SWARM: 6/6 SERVICES RUNNING | TRAEFIK: SSL OK | AWS: HEALTHY'
    },
    frontend: {
      role: 'CLASSE ATIVA: PIXEL ARTISAN & WEB BUILDER',
      title: 'Criando Experiências Web Vivas & Jogos Retrô em WebAssembly.',
      desc: 'Ecossistema Angular 21+, TypeScript estrito, jogos 2D desenvolvidos em Go (Ebitengine/WASM) e a plataforma Comunidade Tech.',
      command: 'ng serve --project=comunidade-tech',
      defaultOutput: 'ANGULAR 21: COMPILED | WASM: RUNNING (60 FPS) | FIREBASE: SYNC'
    }
  };

  let currentMode = 'backend';

  // Elementos do DOM
  const body = document.body;
  const roleBadge = document.getElementById('heroRoleBadge');
  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');
  const telemetryData = document.getElementById('telemetryData');
  const classButtons = document.querySelectorAll('.class-btn');
  const splitSlices = document.querySelectorAll('.split-slice');
  const crtToggle = document.getElementById('crtToggle');
  const crtOverlay = document.getElementById('crtOverlay');
  const crtStatus = document.getElementById('crtStatus');

  /**
   * Atualiza o Modo Ativo na Interface
   */
  function setMode(modeKey) {
    if (!classConfigs[modeKey]) return;
    currentMode = modeKey;

    // Atualiza classe no body
    body.className = `mode-${modeKey}`;

    // Atualiza botões superiores
    classButtons.forEach(btn => {
      if (btn.dataset.class === modeKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Atualiza fatias do Hero
    splitSlices.forEach(slice => {
      if (slice.dataset.target === modeKey) {
        slice.classList.add('active');
      } else {
        slice.classList.remove('active');
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

  // Event Listeners nas Fatias do Hero (Inspirado no Adham Dannaway)
  splitSlices.forEach(slice => {
    slice.addEventListener('mouseenter', () => {
      setMode(slice.dataset.target);
    });
    slice.addEventListener('click', () => {
      setMode(slice.dataset.target);
    });
  });

  // Atalhos de Teclado (1, 2, 3)
  window.addEventListener('keydown', (e) => {
    // Evita acionar se o usuário estiver digitando em formulário
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === '1') setMode('backend');
    if (e.key === '2') setMode('devops');
    if (e.key === '3') setMode('frontend');
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
      // Caso esteja rodando sem o backend da Vercel (servidor estático local),
      // mantém os status simulados da classe sem quebrar o layout.
      console.log('Telemetria local: usando fallback de classe.');
    }
  }

  fetchServerlessTelemetry();
});
