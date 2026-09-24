import { Injectable, signal, computed } from '@angular/core';

export type DevClass = 'frontend' | 'backend' | 'sysops' | 'gamer';

export interface ModeConfig {
  role: string;
  title: string;
  desc: string;
  command: string;
  defaultOutput: string;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  // Signal reativo do modo ativo de especialidade técnica (inicia em 'backend')
  readonly activeMode = signal<DevClass>('backend');

  // Signal reativo do efeito de scanlines CRT
  readonly crtEnabled = signal<boolean>(true);

  // Signal reativo do tema (Dark / Light)
  readonly isLight = signal<boolean>(false);

  // Configurações das 4 classes especializadas
  private readonly configs: Record<DevClass, ModeConfig> = {
    backend: {
      role: '● DESENVOLVEDOR BACK-END',
      title:
        'De Chef de cozinha a desenvolvedor: construindo <span class="highlight-tech">sistemas</span>, <span class="highlight-tech">infraestrutura</span> e <span class="nowrap-end"><span class="highlight-tech">IA</span>.</span>',
      desc: `<p class="hero-desc-p">
            Minha história profissional é marcada por uma transição de carreira estratégica para a Tecnologia, fundamentada em <strong class="highlight-tech">mais de 15 anos de liderança em ambientes operacionais de alta pressão como Chef de Cozinha</strong>. Essa vivência consolidou competências essenciais para a engenharia de software de missão crítica: <span class="desc-pill">resiliência sob pressão</span>, <span class="desc-pill">disciplina rigorosa</span>, <span class="desc-pill">gestão ágil de crises</span> e foco obstinado em entregas de qualidade com cumprimento rigoroso de prazos.
          </p>
          <p class="hero-desc-p">
            Atualmente, atuo como <strong class="highlight-tech">Desenvolvedor Back-end &amp; SysOps/DevOps</strong>, unindo o desenvolvimento de microsserviços e sistemas distribuídos de alta concorrência à automação de fluxos, orquestração em nuvem e interfaces web modernas. Possuo experiência prática com <strong class="highlight-tech">Java 21 (Spring Boot 3)</strong> e <strong class="highlight-tech">Go (Golang)</strong>, conteinerização e clusters com <strong class="highlight-tech">Docker &amp; Swarm</strong>, roteamento seguro com <strong class="highlight-tech">Traefik</strong>, nuvem <strong class="highlight-tech">AWS</strong>, persistência com bancos relacionais (<strong class="highlight-tech">PostgreSQL</strong> com isolamento ACID e <strong class="highlight-tech">Oracle DB</strong>), além do desenvolvimento de interfaces reativas com <strong class="highlight-tech">Angular 21+ &amp; TypeScript</strong>.
          </p>`,
      command: 'go run engine/main.go --status',
      defaultOutput: 'ENGINE: ONLINE | RUNTIME: GO 1.26 | ARCH: CLEAN | LATENCY: <5ms',
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
      defaultOutput: 'ANGULAR 21: COMPILED | STANDALONE SIGNALS | FIREBASE: SYNC',
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
      defaultOutput: 'SWARM: 6/6 SERVICES RUNNING | TRAEFIK: SSL OK | AWS: HEALTHY',
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
      defaultOutput: 'ENGINE: INITIALIZED | GAME LOOP: 60 FPS | PHYSICS: 2D AABB | AUDIO: CHIPTUNE',
    },
  };

  // Signal computado para a configuração da classe atual
  readonly currentConfig = computed(() => this.configs[this.activeMode()]);

  // Altera a classe deliberadamente por clique ou atalho de teclado
  setMode(mode: DevClass): void {
    this.activeMode.set(mode);
  }

  // Alterna o efeito de scanlines CRT
  toggleCrt(): void {
    this.crtEnabled.update((prev) => !prev);
  }

  // Signal reativo para a barra lateral retrátil (estilo iPortfolio)
  readonly sidebarOpen = signal<boolean>(false);
  private sidebarCloseTimer: any = null;

  // Alterna o modo Claro / Escuro
  toggleTheme(): void {
    this.isLight.update((prev) => !prev);
  }

  // Alterna abertura da barra lateral
  toggleSidebar(): void {
    this.cancelScheduledClose();
    this.sidebarOpen.update((prev) => !prev);
  }

  // Fecha a barra lateral imediatamente
  closeSidebar(): void {
    this.cancelScheduledClose();
    this.sidebarOpen.set(false);
  }

  // Abre a barra lateral imediatamente
  openSidebar(): void {
    this.cancelScheduledClose();
    this.sidebarOpen.set(true);
  }

  // Agenda fechamento suave ao tirar o mouse
  scheduleCloseSidebar(delay: number = 280): void {
    this.cancelScheduledClose();
    this.sidebarCloseTimer = setTimeout(() => {
      this.sidebarOpen.set(false);
      this.sidebarCloseTimer = null;
    }, delay);
  }

  // Cancela fechamento agendado quando o mouse entra no menu ou botão
  cancelScheduledClose(): void {
    if (this.sidebarCloseTimer) {
      clearTimeout(this.sidebarCloseTimer);
      this.sidebarCloseTimer = null;
    }
  }

  // ==========================================================================
  // Trilha Sonora Imersiva Convidativa (Warm Lo-Fi Ambient & Chill Keys)
  // ==========================================================================
  readonly audioPlaying = signal<boolean>(false);

  private audioCtx: AudioContext | null = null;
  private audioMasterGain: GainNode | null = null;
  private mainFilter: BiquadFilterNode | null = null;
  private delayNode: DelayNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private chordTimer: any = null;
  private bellTimer: any = null;
  private activeChords: { nodes: { osc: OscillatorNode; gain: GainNode }[] }[] = [];
  private chordIndex = 0;

  // Progressão acolhedora, reconfortante e convidativa (Cmaj9 -> Am9 -> Fmaj9 -> Gadd9)
  private readonly chords = [
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

  toggleAudio(): void {
    if (this.audioPlaying()) {
      this.stopAudio();
    } else {
      this.startAudio();
    }
  }

  private initAudio(): void {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();

        // Master Gain geral
        this.audioMasterGain = this.audioCtx.createGain();
        this.audioMasterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
        this.audioMasterGain.connect(this.audioCtx.destination);

        // Filtro geral aveludado com leve respiração
        this.mainFilter = this.audioCtx.createBiquadFilter();
        this.mainFilter.type = 'lowpass';
        this.mainFilter.frequency.setValueAtTime(750, this.audioCtx.currentTime);
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

  private startAudio(): void {
    this.initAudio();
    if (!this.audioCtx || !this.audioMasterGain) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.audioPlaying.set(true);

    const now = this.audioCtx.currentTime;
    this.audioMasterGain.gain.cancelScheduledValues(now);
    this.audioMasterGain.gain.setValueAtTime(Math.max(0.001, this.audioMasterGain.gain.value), now);
    // Resposta imediata ao clique (volume envolvente e presente)
    this.audioMasterGain.gain.exponentialRampToValueAtTime(0.65, now + 0.12);

    this.startAmbientProgression();
    this.startGentleBells();
  }

  private stopAudio(): void {
    this.audioPlaying.set(false);
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

  private startAmbientProgression(): void {
    if (this.chordTimer) clearInterval(this.chordTimer);

    // Toca o primeiro acorde instantaneamente
    this.playChordCrossfade(this.chords[this.chordIndex]);

    // Intervalo dinâmico e envolvente a cada 3.8 segundos
    this.chordTimer = setInterval(() => {
      if (!this.audioPlaying()) return;
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
      this.playChordCrossfade(this.chords[this.chordIndex]);
    }, 3800);
  }

  private playChordCrossfade(chordData: { name: string; bass: number[]; notes: number[]; bellNotes: number[] }): void {
    if (!this.audioCtx || !this.mainFilter || !this.audioPlaying()) return;

    // Transição ágil entre acordes
    this.fadeAllChords(0.9);

    const now = this.audioCtx.currentTime;
    const currentChordNodes: { osc: OscillatorNode; gain: GainNode }[] = [];

    // Une notas de baixo e harmonias
    const allFrequencies = [...chordData.bass, ...chordData.notes];

    allFrequencies.forEach((freq, idx) => {
      if (!this.audioCtx || !this.mainFilter) return;

      // Oscilador Principal (senoidal pura e aveludada)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Oscilador Secundário sutil com detune (+3.5 cents) para textura de sintetizador quente
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq, now);
      osc2.detune.setValueAtTime(idx % 2 === 0 ? 3.5 : -3.5, now);

      // Nível por voz com presença acústica equilibrada
      const isBass = idx < chordData.bass.length;
      const targetVol1 = isBass ? 0.055 : 0.035;
      const targetVol2 = isBass ? 0.020 : 0.015;

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

  private fadeAllChords(fadeDuration: number): void {
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

  private startGentleBells(): void {
    if (this.bellTimer) clearInterval(this.bellTimer);

    // Intervalo mais presente e constante a cada 1.6s
    this.bellTimer = setInterval(() => {
      if (!this.audioPlaying() || !this.audioCtx) return;
      const currentChord = this.chords[this.chordIndex];
      const bellNotes = currentChord.bellNotes;
      const randomFreq = bellNotes[Math.floor(Math.random() * bellNotes.length)];
      this.playWarmBell(randomFreq);
    }, 1600);
  }

  private playWarmBell(freq: number): void {
    if (!this.audioCtx || !this.mainFilter || !this.audioPlaying()) return;
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
      gain.gain.exponentialRampToValueAtTime(0.050, now + 0.05);
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
