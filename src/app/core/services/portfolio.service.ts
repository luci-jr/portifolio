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
  providedIn: 'root'
})
export class PortfolioService {
  // Signal reativo do modo ativo da Trindade + Gamer (inicia em 'frontend')
  readonly activeMode = signal<DevClass>('frontend');

  // Signal reativo do efeito de scanlines CRT
  readonly crtEnabled = signal<boolean>(true);

  // Signal reativo do tema (Dark / Light)
  readonly isLight = signal<boolean>(false);

  // Configurações das 4 classes especializadas
  private readonly configs: Record<DevClass, ModeConfig> = {
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

  // Signal computado para a configuração da classe atual
  readonly currentConfig = computed(() => this.configs[this.activeMode()]);

  // Altera a classe deliberadamente por clique ou atalho de teclado
  setMode(mode: DevClass): void {
    this.activeMode.set(mode);
  }

  // Alterna o efeito de scanlines CRT
  toggleCrt(): void {
    this.crtEnabled.update(prev => !prev);
  }

  // Alterna o modo Claro / Escuro
  toggleTheme(): void {
    this.isLight.update(prev => !prev);
  }
}
