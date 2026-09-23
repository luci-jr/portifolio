import { Project } from '../core/models/project.model';

/**
 * ==============================================================================
 * BASE DE DADOS DOS PROJETOS (VITRINE DO PORTFÓLIO)
 * ==============================================================================
 * Projetos reais do desenvolvedor Lucivaldo Junior (@luci-jr no GitHub).
 * ==============================================================================
 */

export const PROJECTS_DATA: Project[] = [
  // ----------------------------------------------------------------------------
  // 🌐 PROJETOS FRONT-END
  // ----------------------------------------------------------------------------
  {
    id: 'comunidade-tech',
    title: 'Comunidade Tech',
    description:
      'Plataforma colaborativa concebida para orientar, centralizar e acelerar a jornada de quem está ingressando na área de Tecnologia da Informação.',
    category: 'frontend',
    tag: '🌐 FRONTEND / COMUNIDADE',
    techs: ['Angular 21+', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    imageUrl: 'comunidade-tech-preview.webp',
    liveUrl: 'https://comunidade.tech.lucivaldo.cloud/inicio',
    liveLabel: 'Acessar Plataforma 🌐',
    repoUrl: 'https://github.com/luci-jr/comunidade-tech'
  },

  // ----------------------------------------------------------------------------
  // ☕ PROJETOS BACKEND (APIS & ENGINES)
  // ----------------------------------------------------------------------------
  {
    id: 'api-rest-go-react',
    title: 'API RESTful Go & Synthwave Arcade',
    description:
      'API RESTful robusta em Go 1.22+ com Gorilla Mux, middlewares, CORS e persistência PostgreSQL via GORM, 100% conteinerizada em Docker Compose e integrada a front-end React Retro Arcade.',
    category: 'backend',
    tag: '☕ BACKEND / GO REST',
    techs: ['Go 1.22+', 'GORM', 'PostgreSQL', 'Docker Compose', 'React Retro'],
    imageUrl:
      'https://raw.githubusercontent.com/luci-jr/api-rest_e_frontend_em_react/main/assets/react-app-retro.png',
    repoUrl: 'https://github.com/luci-jr/api-rest_e_frontend_em_react'
  },
  {
    id: 'retro-store',
    title: 'Retro Store (Inventário Arcade)',
    description:
      'Aplicação web de inventário retrô desenvolvida em Go (Golang) com arquitetura MVC, rotas HTTP nativas, banco relacional PostgreSQL e contêiner Docker.',
    category: 'backend',
    tag: '☕ BACKEND / GO MVC',
    techs: ['Go (Golang)', 'PostgreSQL', 'Docker', 'MVC Architecture', 'HTML5/CSS3'],
    imageUrl:
      'https://raw.githubusercontent.com/luci-jr/retro-store/main/images/retro-store-logo.png',
    repoUrl: 'https://github.com/luci-jr/retro-store'
  },
  {
    id: 'retro-bank',
    title: 'Retro Bank (Core Banking CLI)',
    description:
      'Simulador de core banking via terminal desenvolvido em Go. Focado na aplicação de conceitos de Orientação a Objetos, Structs, Interfaces e regras de negócio com concorrência.',
    category: 'backend',
    tag: '☕ BACKEND / GO CORE',
    techs: ['Go (Golang)', 'POO', 'Structs & Interfaces', 'Terminal CLI'],
    repoUrl: 'https://github.com/luci-jr/Retro-Bank'
  },
  {
    id: 'monitor-de-sites',
    title: 'Monitor de Sites & Uptime',
    description:
      'Monitor de resiliência e disponibilidade de serviços HTTP em Go com interface no terminal, requisições periódicas automatizadas, sistema de logs e persistência simples em arquivos.',
    category: 'backend',
    tag: '☕ BACKEND / CONCORRÊNCIA',
    techs: ['Go (Golang)', 'HTTP Client', 'Concurrency', 'File Logging'],
    repoUrl: 'https://github.com/luci-jr/Monitor-de-sites'
  },

  // ----------------------------------------------------------------------------
  // 🕹️ PROJETOS GAMER / GAME DEV
  // ----------------------------------------------------------------------------
  {
    id: 'egua-mano-gamer',
    title: 'Égua Mano Gamer (Go 2D Engine)',
    description:
      'Jogo arcade 2D de plataforma com física customizada (AABB), temática regional de Belém do Pará, arte pixel art 16-bit, arquitetura de game loops e compilação nativa para WebAssembly e Desktop a 60 FPS.',
    category: 'gamer',
    tag: '🕹️ GAME DEV / 2D ENGINE',
    techs: ['Go 1.22+', 'Ebitengine v2', 'Game Loops & Física', 'Multiplataforma (WASM/OS)'],
    imageUrl:
      'https://raw.githubusercontent.com/luci-jr/egua-mano_gamer/main/assets/screenshot_browser_desktop.png',
    liveUrl: 'https://luci-jr.github.io/egua-mano_gamer/',
    liveLabel: 'Jogar Agora 🕹️',
    repoUrl: 'https://github.com/luci-jr/egua-mano_gamer'
  },
  {
    id: 'colecao-retro',
    title: 'Coleção Retro (Arcade Organizer)',
    description:
      'Gerenciador e organizador de jogos clássicos desenvolvido para praticar os recursos modernos do Angular 19 (Signals e Control Flow), com tema retrô dark neon inspirado em fliperamas.',
    category: 'gamer',
    tag: '🕹️ GAMER / ANGULAR 19',
    techs: ['Angular 19', 'Signals', 'Control Flow', 'Arcade Neon UI'],
    imageUrl:
      'https://raw.githubusercontent.com/luci-jr/colecao-retro/main/screenshot.png',
    repoUrl: 'https://github.com/luci-jr/colecao-retro'
  },

  // ----------------------------------------------------------------------------
  // 🐧 PROJETOS SYSOPS / CLOUD
  // ----------------------------------------------------------------------------
  {
    id: 'jarvas-aws-architecture',
    title: "Startup Jarva's (AWS Architecture)",
    description:
      'Solução AWS serverless para armazenamento seguro e escalável de documentos em plataforma SaaS, combinando autenticação, isolamento multi-tenant, acesso temporário e IaC.',
    category: 'sysops',
    tag: '🐧 SYSOPS / AWS CLOUD',
    techs: ['AWS Cloud', 'Serverless', 'S3 & IAM', 'IaC', 'Cloud Architecture'],
    imageUrl:
      'https://github.com/user-attachments/assets/dc2e1360-263c-47af-b3fc-912f140d9fa7',
    repoUrl: 'https://github.com/luci-jr/jarvas-aws-architecture'
  },
  {
    id: 'nexus-swarm-hub',
    title: 'Cluster Nexus Swarm & SysOps Hub',
    description:
      'Próximo projeto de infraestrutura em desenvolvimento: ambiente de orquestração corporativo com Docker Swarm, Traefik v2 (TLS automático), Linux Ubuntu e automações n8n.',
    category: 'sysops',
    tag: '🐧 SYSOPS / EM DESENVOLVIMENTO',
    techs: ['Docker Swarm', 'Traefik v2', 'Linux Ubuntu', 'n8n', 'DevOps'],
    repoUrl: 'https://github.com/luci-jr'
  }
];
