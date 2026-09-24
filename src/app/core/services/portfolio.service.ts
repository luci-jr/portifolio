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
  // Signal reativo do modo ativo da Trindade + Gamer (inicia em 'backend')
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
        'Construindo Sistemas Distribuídos e Microsserviços com <span class="highlight-tech">Java/Spring Boot</span>, <span class="highlight-tech">Go</span> e <span class="nowrap-end"><span class="highlight-tech">Cloud</span>.</span>',
      desc: `<p class="hero-desc-p">
            Minha trajetória profissional é marcada por uma transição de carreira estratégica para a Tecnologia, fundamentada em <strong class="highlight-tech">mais de 15 anos de liderança em ambientes operacionais de alta pressão como Chef de Cozinha</strong>. Essa vivência consolidou competências essenciais para a engenharia de software de missão crítica: <span class="desc-pill">resiliência sob pressão</span>, <span class="desc-pill">disciplina rigorosa</span>, <span class="desc-pill">gestão ágil de crises</span> e foco obstinado em entregas de qualidade com cumprimento rigoroso de prazos.
          </p>
          <p class="hero-desc-p">
            Atualmente, atuo como <strong class="highlight-tech">Desenvolvedor Back-end &amp; SysOps/DevOps</strong>, unindo o desenvolvimento de microsserviços e sistemas distribuídos de alta concorrência à automação de fluxos e orquestração de infraestruturas em nuvem. Possuo experiência prática com <strong class="highlight-tech">Java 21 (Spring Boot 3)</strong> e <strong class="highlight-tech">Go (Golang)</strong>, conteinerização e clusters com <strong class="highlight-tech">Docker &amp; Swarm</strong>, roteamento seguro com <strong class="highlight-tech">Traefik</strong>, nuvem <strong class="highlight-tech">AWS</strong>, além de persistência transacional com bancos relacionais (<strong class="highlight-tech">PostgreSQL</strong> com isolamento ACID e <strong class="highlight-tech">Oracle DB</strong>).
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

  // Alterna o modo Claro / Escuro
  toggleTheme(): void {
    this.isLight.update((prev) => !prev);
  }
}
