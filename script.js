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
      title: 'De Chef de cozinha a desenvolvedor: construindo <span class="highlight-tech">sistemas</span>, <span class="highlight-tech">infraestrutura</span> e <span class="nowrap-end"><span class="highlight-tech">IA</span>.</span>',
      desc: `<p class="hero-desc-p">
            Minha história profissional é marcada por uma transição de carreira estratégica para a Tecnologia, fundamentada em <strong class="highlight-tech">mais de 15 anos de liderança em ambientes operacionais de alta pressão como Chef de Cozinha</strong>. Essa vivência consolidou competências essenciais para a engenharia de software de missão crítica: <span class="desc-pill">resiliência sob pressão</span>, <span class="desc-pill">disciplina rigorosa</span>, <span class="desc-pill">gestão ágil de crises</span> e foco obstinado em entregas de qualidade com cumprimento rigoroso de prazos.
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
    if (roleBadge) roleBadge.textContent = config.role;
    if (heroTitle) heroTitle.innerHTML = config.title;
    if (heroDesc) heroDesc.innerHTML = config.desc;

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

  // ==========================================================================
  // Controle de Scanlines CRT (Ativado por Padrão ao Entrar na Página)
  // ==========================================================================
  // Garante que o efeito CRT inicie ativado (ON) para qualquer visitante
  crtOverlay.classList.remove('disabled');
  if (crtStatus) crtStatus.textContent = 'ON';
  localStorage.removeItem('crt_state'); // Reseta qualquer estado antigo residual

  if (crtToggle) {
    crtToggle.addEventListener('click', () => {
      const isDisabled = crtOverlay.classList.toggle('disabled');
      if (crtStatus) {
        crtStatus.textContent = isDisabled ? 'OFF' : 'ON';
      }
    });
  }

  // ==========================================================================
  // Controle de Tema: Modo Dark por Padrão ao Entrar na Página
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeStatus = document.getElementById('themeStatus');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(isLight) {
    if (isLight) {
      body.classList.add('theme-light');
      if (themeStatus) themeStatus.textContent = 'LIGHT';
      if (themeIcon) themeIcon.textContent = '☀️';
    } else {
      body.classList.remove('theme-light');
      if (themeStatus) themeStatus.textContent = 'DARK';
      if (themeIcon) themeIcon.textContent = '🌙';
    }
  }

  // Garante que o Modo Dark inicie ativado para qualquer visitante
  applyTheme(false);
  localStorage.removeItem('theme_state'); // Reseta qualquer estado antigo residual

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyLight = body.classList.contains('theme-light');
      applyTheme(!isCurrentlyLight);
    });
  }

  // ==========================================================================
  // Trilha Sonora Imersiva Convidativa (Warm Ambient Pad & Cozy Focus)
  // ==========================================================================
  const audioToggle = document.getElementById('audioToggle');

  class ImmersiveAmbientAudioEngine {
    constructor() {
      this.isPlaying = false;
      this.audioCtx = null;
      this.audioMasterGain = null;
      this.mainFilter = null;
      this.delayNode = null;
      this.lfoOsc = null;
      this.chordTimer = null;
      this.bellTimer = null;
      this.activeChords = [];
      this.chordIndex = 0;

      // Progressão acolhedora, reconfortante e convidativa (Cmaj9 -> Am9 -> Fmaj9 -> Gadd9)
      this.chords = [
        {
          name: 'Cmaj9',
          bass: [65.41, 130.81],
          notes: [196.00, 246.94, 293.66, 329.63, 392.00], // G3, B3, D4, E4, G4
          bellNotes: [392.00, 493.88, 587.33, 659.25],    // G4, B4, D5, E5
        },
        {
          name: 'Am9',
          bass: [55.00, 110.00],
          notes: [164.81, 196.00, 246.94, 261.63, 329.63], // E3, G3, B3, C4, E4
          bellNotes: [329.63, 440.00, 493.88, 523.25],    // E4, A4, B4, C5
        },
        {
          name: 'Fmaj9',
          bass: [43.65, 87.31],
          notes: [174.61, 220.00, 261.63, 329.63, 392.00], // F3, A3, C4, E4, G4
          bellNotes: [349.23, 440.00, 523.25, 659.25],    // F4, A4, C5, E5
        },
        {
          name: 'Gadd9',
          bass: [49.00, 98.00],
          notes: [146.83, 196.00, 246.94, 293.66, 440.00], // D3, G3, B3, D4, A4
          bellNotes: [392.00, 440.00, 587.33, 783.99],    // G4, A4, D5, G5
        },
      ];
    }

    init() {
      if (!this.audioCtx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.audioCtx = new AudioCtx();

          // Master Gain geral
          this.audioMasterGain = this.audioCtx.createGain();
          this.audioMasterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
          this.audioMasterGain.connect(this.audioCtx.destination);

          // Filtro geral aveludado com leve respiração
          this.mainFilter = this.audioCtx.createBiquadFilter();
          this.mainFilter.type = 'lowpass';
          this.mainFilter.frequency.setValueAtTime(620, this.audioCtx.currentTime);
          this.mainFilter.Q.setValueAtTime(1.1, this.audioCtx.currentTime);
          this.mainFilter.connect(this.audioMasterGain);

          // LFO lento para criar sensação orgânica de respiração sonora (0.09Hz)
          const lfo = this.audioCtx.createOscillator();
          const lfoGain = this.audioCtx.createGain();
          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(0.09, this.audioCtx.currentTime);
          lfoGain.gain.setValueAtTime(140, this.audioCtx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(this.mainFilter.frequency);
          lfo.start();
          this.lfoOsc = lfo;

          // Delay Sutil e Imediato (Espacialidade leve sem atraso perceptível)
          this.delayNode = this.audioCtx.createDelay();
          this.delayNode.delayTime.setValueAtTime(0.14, this.audioCtx.currentTime);

          const delayFeedback = this.audioCtx.createGain();
          delayFeedback.gain.setValueAtTime(0.20, this.audioCtx.currentTime);

          const delayFilter = this.audioCtx.createBiquadFilter();
          delayFilter.type = 'lowpass';
          delayFilter.frequency.setValueAtTime(950, this.audioCtx.currentTime);

          this.delayNode.connect(delayFilter);
          delayFilter.connect(delayFeedback);
          delayFeedback.connect(this.delayNode);
          this.delayNode.connect(this.mainFilter);
        }
      }
    }

    start() {
      this.init();
      if (!this.audioCtx || !this.audioMasterGain) return;

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isPlaying = true;
      const now = this.audioCtx.currentTime;
      this.audioMasterGain.gain.cancelScheduledValues(now);
      this.audioMasterGain.gain.setValueAtTime(Math.max(0.001, this.audioMasterGain.gain.value), now);
      // Resposta imediata ao clique (sem delay perceptível)
      this.audioMasterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.12);

      this.startAmbientProgression();
      this.startGentleBells();
    }

    stop() {
      this.isPlaying = false;
      if (!this.audioCtx || !this.audioMasterGain) return;

      const now = this.audioCtx.currentTime;
      this.audioMasterGain.gain.cancelScheduledValues(now);
      this.audioMasterGain.gain.setValueAtTime(this.audioMasterGain.gain.value, now);
      this.audioMasterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      if (this.chordTimer) {
        clearInterval(this.chordTimer);
        this.chordTimer = null;
      }
      if (this.bellTimer) {
        clearInterval(this.bellTimer);
        this.bellTimer = null;
      }

      setTimeout(() => {
        this.fadeAllChords(0.5);
      }, 520);
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.start();
      }
      return this.isPlaying;
    }

    startAmbientProgression() {
      if (this.chordTimer) clearInterval(this.chordTimer);

      // Toca o primeiro acorde instantaneamente
      this.playChordCrossfade(this.chords[this.chordIndex]);

      // Intervalo dinâmico e envolvente a cada 3.8 segundos
      this.chordTimer = setInterval(() => {
        if (!this.isPlaying) return;
        this.chordIndex = (this.chordIndex + 1) % this.chords.length;
        this.playChordCrossfade(this.chords[this.chordIndex]);
      }, 3800);
    }

    playChordCrossfade(chordData) {
      if (!this.audioCtx || !this.mainFilter || !this.isPlaying) return;

      // Transição ágil entre acordes
      this.fadeAllChords(0.9);

      const now = this.audioCtx.currentTime;
      const currentChordNodes = [];

      // Une notas de baixo e harmonias
      const allFrequencies = [...chordData.bass, ...chordData.notes];

      allFrequencies.forEach((freq, idx) => {
        if (!this.audioCtx || !this.mainFilter) return;

        // Oscilador Principal (senoidal pura e aveludada)
        const osc1 = this.audioCtx.createOscillator();
        const gain1 = this.audioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);

        // Oscilador Secundário com leve detune (+3.5 cents)
        const osc2 = this.audioCtx.createOscillator();
        const gain2 = this.audioCtx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq, now);
        osc2.detune.setValueAtTime(idx % 2 === 0 ? 3.5 : -3.5, now);

        // Nível suave por voz
        const isBass = idx < chordData.bass.length;
        const targetVol1 = isBass ? 0.045 : 0.028;
        const targetVol2 = isBass ? 0.015 : 0.012;

        // Ataque direto e acolhedor (0.35s)
        gain1.gain.setValueAtTime(0.0001, now);
        gain1.gain.exponentialRampToValueAtTime(targetVol1, now + 0.35);

        gain2.gain.setValueAtTime(0.0001, now);
        gain2.gain.exponentialRampToValueAtTime(targetVol2, now + 0.35);

        osc1.connect(gain1);
        osc2.connect(gain2);

        gain1.connect(this.mainFilter);
        gain2.connect(this.mainFilter);

        // Leve reverberação espacial imediata
        if (this.delayNode && !isBass) {
          const delaySend = this.audioCtx.createGain();
          delaySend.gain.setValueAtTime(0.015, now);
          gain1.connect(delaySend);
          delaySend.connect(this.delayNode);
        }

        osc1.start(now);
        osc2.start(now);

        currentChordNodes.push({ osc: osc1, gain: gain1 }, { osc: osc2, gain: gain2 });
      });

      this.activeChords.push({ nodes: currentChordNodes });
    }

    fadeAllChords(fadeDuration) {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;

      this.activeChords.forEach(chord => {
        chord.nodes.forEach(({ osc, gain }) => {
          try {
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), now);
            gain.gain.exponentialRampToValueAtTime(0.00001, now + fadeDuration);
            osc.stop(now + fadeDuration + 0.05);
          } catch (e) {}
        });
      });

      this.activeChords = [];
    }

    startGentleBells() {
      if (this.bellTimer) clearInterval(this.bellTimer);

      // Intervalo mais presente e constante a cada 1.6s
      this.bellTimer = setInterval(() => {
        if (!this.isPlaying || !this.audioCtx) return;
        const currentChord = this.chords[this.chordIndex];
        const bellNotes = currentChord.bellNotes;
        const randomFreq = bellNotes[Math.floor(Math.random() * bellNotes.length)];
        this.playWarmBell(randomFreq);
      }, 1600);
    }

    playWarmBell(freq) {
      if (!this.audioCtx || !this.mainFilter || !this.isPlaying) return;
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);

        // Ataque rápido e suave (0.05s) e cauda ágil (1.1s)
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 1.1);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.mainFilter);

        if (this.delayNode) {
          const delaySend = this.audioCtx.createGain();
          delaySend.gain.setValueAtTime(0.022, now);
          gain.connect(delaySend);
          delaySend.connect(this.delayNode);
        }

        osc.start(now);
        osc.stop(now + 1.15);
      } catch (e) {}
    }
  }

  const bgmPlayer = new ImmersiveAmbientAudioEngine();

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      const playing = bgmPlayer.toggle();
      if (playing) {
        audioToggle.classList.add('is-playing');
        audioToggle.setAttribute('title', 'Pausar Trilha Acolhedora');
      } else {
        audioToggle.classList.remove('is-playing');
        audioToggle.setAttribute('title', 'Tocar Trilha Acolhedora (Áudio Bloqueado)');
      }
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

  // Inicializa a vitrine de projetos com a aba "TODOS" ativa por padrão
  filterProjects('all');

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

  let sidebarCloseTimeout = null;

  function cancelScheduledClose() {
    if (sidebarCloseTimeout) {
      clearTimeout(sidebarCloseTimeout);
      sidebarCloseTimeout = null;
    }
  }

  function openSidebar() {
    cancelScheduledClose();
    if (sidebarDrawer) sidebarDrawer.classList.add('is-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('is-open');
  }

  function closeSidebar() {
    cancelScheduledClose();
    if (sidebarDrawer) sidebarDrawer.classList.remove('is-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('is-open');
  }

  function scheduleCloseSidebar(delay = 280) {
    cancelScheduledClose();
    sidebarCloseTimeout = setTimeout(() => {
      closeSidebar();
    }, delay);
  }

  function toggleSidebar() {
    if (sidebarDrawer && sidebarDrawer.classList.contains('is-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  if (sidebarToggleBtn) {
    // 1. Clicar no botão: alterna (ativa ou desativa o menu)
    sidebarToggleBtn.addEventListener('click', toggleSidebar);

    // 2. Passar o mouse no botão: ativa o menu
    sidebarToggleBtn.addEventListener('mouseenter', () => {
      openSidebar();
    });

    // 3. Tirar o mouse do botão: agenda o fechamento se não entrar na sidebar
    sidebarToggleBtn.addEventListener('mouseleave', () => {
      scheduleCloseSidebar(280);
    });
  }

  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  // Fecha no pressionamento de ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // Ativa o link correspondente ao clicar SEM fechar a gaveta (mantém aberta para o usuário ver/navegar)
  sidebarNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      sidebarNavLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Interações de mouse na gaveta lateral
  if (sidebarDrawer) {
    // Se o mouse entrar na gaveta, cancela o fechamento e mantém o menu aberto
    sidebarDrawer.addEventListener('mouseenter', () => {
      cancelScheduledClose();
    });

    // Ao tirar o mouse de cima da gaveta lateral, fecha automaticamente
    sidebarDrawer.addEventListener('mouseleave', () => {
      scheduleCloseSidebar(200);
    });
  }

  // Atualiza dinamicamente o link ativo conforme o scroll da página
  const sectionsToObserve = ['heroSection', 'sobre', 'projetos', 'stacks', 'experiencias', 'formacoes', 'contato'];
  window.addEventListener('scroll', () => {
    let currentSection = '';
    sectionsToObserve.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 250 && rect.bottom >= 100) {
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

  // Botão Início e links que levam ao início: rolagem 100% alinhada ao topo absoluto (Y = 0)
  const navHomeBtn = document.getElementById('navHomeBtn');
  if (navHomeBtn) {
    navHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      if (window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      }
    });
  }

  document.querySelectorAll('a[href="#heroSection"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      if (window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      }
    });
  });
});

