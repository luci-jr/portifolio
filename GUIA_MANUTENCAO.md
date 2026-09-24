# 🛠️ Manual de Manutenção & Operação — Lucivaldo Junior
> Guia técnico operacional da arquitetura do portfólio (Angular 21+, Vanilla, Serverless Go e esteira Vercel).

---

## 🚀 Comandos Rápidos para Subir o Projeto

```bash
# 1. Instalar dependências (caso seja a primeira execução ou após novos pacotes)
npm install

# 2. Iniciar o servidor de desenvolvimento oficial (Angular)
npm start
# ou diretamente via Angular CLI:
npx ng serve

# 3. Compilar build de produção do Angular
npm run build:ng

# 4. (Alternativa) Executar a versão estática Vanilla (raiz)
python3 -m http.server 3000
# ou via five-server / live-server:
# npx five-server .

# 5. Publicar / Deploy Oficial na Vercel (Produção)
# Via Git CI/CD Automático:
git add .
git commit -m "feat/style: tua mensagem"
git push origin main

# Ou via Vercel CLI direto do terminal:
npx vercel        # Preview isolado
npx vercel --prod # Produção imediata
```

> 🌐 **URLs & Ambientes:**
> - **Aplicação Angular (Principal / Local):** `http://localhost:4200`
> - **Versão Estática (Fallback / Local):** `http://localhost:3000` ou `http://127.0.0.1:5500`
> - **Produção Oficial (Vercel):** `https://portifolio.lucivaldo.cloud` | Painel: `https://vercel.com/dashboard`

---

## 🗺️ Visão Geral da Arquitetura do Projeto

O projeto possui **duas camadas sincronizadas**:
1. **Camada Angular 21/22 (Produção Oficial na Vercel):** Localizada na pasta `src/`, componentizada em Standalone Components com Signals reativos, empacotada pelo Angular Build para `dist/portifolio-ng/browser`.
2. **Camada Vanilla Estática (Fallback / Demonstração Rápida):** Localizada na raiz (`index.html`, `script.js`, `style.css`), executável diretamente em qualquer navegador sem necessidade de Node.js.
3. **Backend Serverless em Go:** Localizado em `api/status.go`, executado como Vercel Serverless Function provendo telemetria em tempo real na rota `/api/status`.
4. **Estrutura de Ativos (Assets / Ícones):**
   - `public/icons/`: Destino oficial de ícones SVG estáticos para o build de produção do Angular/Vercel.
   - `icons/`: Diretório espelho na raiz para compatibilidade direta com servidores estáticos (Live Server, Five Server) e navegação offline.

---

## 📍 Onde Fazer Cada Alteração

### 1. Adicionar ou Editar Projetos na Vitrine

#### Na versão Angular (Oficial de Produção):
- **Arquivo:** `src/app/data/projects.data.ts`
- Para adicionar um novo projeto, basta inserir um novo objeto no array `PROJECTS_DATA`:
```typescript
{
  id: 'desafio-jungle-game',
  title: 'Jungle Gaming — Motor de Apostas Concorrentes & iGaming',
  description: 'Microsserviço financeiro distribuído de alta concorrência em Go 1.26+ com Uber Fx, persistência transacional ACID em PostgreSQL com Row-Level Locking, mensageria assíncrona AWS SQS FIFO e autenticação OIDC via Keycloak.',
  category: 'backend', // Opções válidas: 'frontend' | 'backend' | 'sysops' | 'gamer'
  tag: '☕ BACKEND / GO / FINTECH',
  techs: ['Go 1.26+', 'Uber Fx', 'PostgreSQL', 'AWS SQS FIFO', 'Keycloak', 'Docker'],
  repoUrl: 'https://github.com/luci-jr/desafio-jungle-game',
  liveUrl: '',                                  // Opcional
  liveLabel: ''                                 // Opcional
}
```

#### Na versão Estática da Raiz:
- **Arquivo:** `index.html` (dentro da section `#projetos`, na `<div class="projects-grid">`)
- Adicione uma tag `<article class="project-card" data-category="backend">` com as classes, badges e links correspondentes.

---

### 2. Modos de Classe (1. Front, 2. Back, 3. SysOps, 4. Gamer)

Se quiseres mudar textos da telemetria, títulos de cargo ou comandos simulados do terminal:

- **Angular:** Altere o arquivo `src/app/core/services/portfolio.service.ts` no objeto `configs`.
- **Estático:** Altere o arquivo `script.js` no objeto `classConfigs` e no HTML correspondente do `index.html`.

---

### 3. Hero Section, Tipografia Balanceada & Badge Executivo

O Hero foi calibrado para máximo impacto visual e leitura balanceada:

- **Headline Principal:**
  - Angular: `src/app/components/hero/hero.component.html`
  - Estático: `index.html` (dentro de `#hero .hero-content h1`)
  - **Prevenção de Ponto Órfão (`.nowrap-end`):** A última palavra com o ponto final é envolvida em `<span class="nowrap-end">Cloud.</span>`, evitando quebras de linha estranhas onde o ponto fica isolado. O título também adota `text-wrap: balance` no CSS.
- **Badge Executivo Flutuante (`.badge-role`):**
  - Exibe o indicador de pulso (`.status-dot`) e o cargo (`● DESENVOLVEDOR BACK-END`).
  - Animado via CSS com `animation: role-badge-float 4s ease-in-out infinite;` e padding ampliado para visual executivo.

---

### 4. Carrossel Infinito de Tecnologias (*Tech Marquee Ticker*)

Para adicionar ou alterar ícones e tecnologias na fita contínua horizontal:

- **Angular:** Arquivo `src/app/components/hero/hero.component.html` (dentro da `<div class="tech-marquee-track">`).
- **Estático:** Arquivo `index.html` (dentro da `<div class="tech-marquee-track">` na seção `#hero`).

#### 📐 Padrão Arquitetural de Ícones (Clean & Manutenível):
Evite colar SVGs inline de 50+ linhas diretamente no HTML. Use o padrão externalizado em arquivo:
1. **Ícone Devicon:** `<i class="devicon-spring-original colored"></i>`
2. **Ícone SVG Próprio / Customizado:**
   - Salve o arquivo `.svg` limpo em `icons/nome.svg` e copie para `public/icons/nome.svg`.
   - Adicione no HTML com o fallback de caminho:
   ```html
   <div class="tech-item">
     <span class="tech-icon">
       <img src="icons/nome.svg" onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src='public/icons/nome.svg'}" alt="Nome" class="tech-icon-img">
     </span>
     <span class="tech-name">Nome da Tech</span>
   </div>
   ```
> **Atenção ao Loop Contínuo:** A lista de itens na track é **duplicada intencionalmente** (Bloco 1 e Bloco 2) para permitir o scroll contínuo a 60 FPS sem saltos (`animation: marquee-scroll 55s linear infinite;`). Ao adicionar ou remover uma tech, aplique a alteração em **ambas as metades** do carrossel.

---

### 5. Controles Flutuantes Ergonômicos (Canto Inferior Direito)

Os botões de alternância de tema e efeito retrô CRT agora ficam agrupados no container flutuante fixo `.floating-controls`:
- **Tema Escuro / Claro (`#theme-toggle`):** Alterna as variáveis de cor e o atributo de classe `body.theme-light` ou `:host.theme-light`.
- **Scanlines CRT (`#scanline-toggle`):** Liga ou desliga as linhas de varredura analógica sobre a tela.
- **Estilização:** Definida em `style.css` e `src/styles.css` sob a classe `.floating-controls` e `.floating-btn`.

---

### 6. Barra Lateral Retrátil Estilo iPortfolio Cyberpunk (Offcanvas Drawer)

Inspirada na navegação lateral do tema **iPortfolio**, adaptada fielmente à identidade **Cyberpunk Âmbar / Retro-Terminal** do projeto, sem quebrar o layout horizontal existente:

- **Camada Angular:**
  - Componente: `src/app/components/sidebar/sidebar.component.ts`, `sidebar.component.html`, `sidebar.component.css`.
  - Gerenciamento reativo: Controlado pelo Signal `portfolio.sidebarOpen()` em `src/app/core/services/portfolio.service.ts`.
  - Acionamento no menu: Botão `.nav-menu-btn` dentro de `src/app/components/navbar/navbar.component.html`.
- **Camada Vanilla Estática:**
  - Estrutura: `#sidebarDrawer` e `#sidebarBackdrop` no final de `index.html`.
  - Gatilhos: Botão `#sidebarToggleBtn` na `top-nav` (ao lado das redes sociais).
  - Interação: Funções `openSidebar()`, `closeSidebar()` e `toggleSidebar()` em `script.js`.
- **Recursos e Comportamentos:**
  - **Abertura & Fechamento Suave:** Desliza suavemente a 60 FPS (`transform: translateX(0)`) com efeito glassmorphism translúcido fosco e borda neon âmbar.
  - **Auto-fechamento:** Fecha automaticamente ao clicar em qualquer link (rolando suavemente para a seção), ao clicar fora no backdrop ou ao pressionar a tecla `ESC`.
  - **Destaque Dinâmico:** Rastreia a rolagem da página e acende o link ativo correspondente à seção visível.
  - **Ícones Inclusos:** Home (Início), About (Sobre Mim), Resume (Trajetória), Portfolio (Projetos), Services (Stacks), Dropdown (Especialidades Técnicas) e Contact (Contato Direto).

---

### 7. Sistema de Cores e Identidade Âmbar Gold Unificada

O portfólio adota uma paleta industrial inspirada em monitores CRT fósforo âmbar e cyberpunk moderno:
- **Cor Primária:** Âmbar Gold (`#f59e0b` / `#fbbf24`), consistente tanto no Dark Mode quanto no Light Mode.
- **Glassmorphism Paritário:**
  - Dark Mode: `background: rgba(255, 255, 255, 0.03)` com `backdrop-filter: blur(6px)`.
  - Light Mode: `background: rgba(255, 255, 255, 0.58)` com `backdrop-filter: blur(12px)` e reflexo superior `inset 0 1px 0 rgba(255, 255, 255, 0.95)`.
  - Ambos acendem bordas luminosas no `:hover` com intensidade calibrada por `--accent-glow`.

---

### 7. Minha História ("Sobre Mim")

A seção exibe a trajetória profissional de transição de carreira (Chef de Cozinha → Engenharia de Software), experiências e formação.

- **Angular:** Arquivo `src/app/components/about/about.component.html`.
- **Estático:** Arquivo `index.html` na section `#sobre`.

---

### 7.1 Trilha Sonora Ambiente (ImmersiveAmbientAudioEngine)

A engine de áudio está implementada em dois arquivos com paridade:
- **Estático:** `script.js` → classe `ImmersiveAmbientAudioEngine`.
- **Angular:** `src/app/core/services/portfolio.service.ts` → método `initAudio()`.

**Características:**
- Progressão harmônica: Cmaj9 → Am9 → Fmaj9 → Gadd9 (intervalo de 3.8s).
- Sinos suaves (`playWarmBell`) a cada 1.6s.
- Ataque imediato de 120ms e fade rápido (500ms ao parar).
- Delay espacial de 140ms com feedback 0.20 e filtro de 950 Hz.

**Botão de Controle (Markup SVG):**
- O botão `#audioToggle` usa o SVG `#audio-note-svg` com uma linha diagonal `#audio-slash-line` que aparece/desaparece via classe CSS `.is-playing`.
- Não utilizar tags de texto (`🎵`/`🔇`) — apenas o SVG nativo.

---

### 8. Links de Contato & Redes Sociais

- **Angular:** Arquivo `src/app/components/contact/contact.component.html` e `src/app/components/navbar/navbar.component.html`.
- **Estático:** Arquivo `index.html` na barra superior `<header class="top-nav">` e na section `#contato`.

---

### 9. Endpoint de Telemetria Serverless (Go)

- **Arquivo:** `api/status.go`
- Responde na rota `/api/status`. Retorna status de integridade, latência em tempo real, versão do runtime Go e localização regional (Belém-PA).

---

## 🛡️ Fluxo Seguro para Não Perder o Projeto

Para evitar qualquer perda acidental de código, sobrescrita indevida ou falhas de deploy:

### 1. Checar Tipagem & Integridade do Angular
Antes de commitar qualquer alteração no código TypeScript/Angular, valide os tipos:
```bash
npx tsc --noEmit
```
> Se o comando retornar sem erros (código de saída 0), a compilação do TypeScript está 100% íntegra.

### 2. Checar o Status do Git
```bash
git status
```
> Sempre verifique se os arquivos listados correspondem exatamente ao que tu alteraste.

### 3. Criar Commit Semântico
```bash
git add .
git commit -m "docs: atualiza documentação e manuais operacionais"
```

### 4. Enviar para o GitHub & Disparar Deploy Automático
```bash
git push origin main
```
> Assim que o push é recebido pelo GitHub, o webhook oficial da Vercel intercepta a nova revisão na branch `main` e inicializa o pipeline de compilação e publicação em escala global.

### 5. Rotina Oficial de Backup do Ecossistema Nexus
Sempre que finalizar uma leva importante de alterações, execute o script mestre de resiliência:
```bash
~/Documentos/nexus/backup_nexus.sh
```
> Esse script sincroniza teus repositórios e a base de inteligência diretamente para o repositório remoto e para o Google Drive (`GD-Lucivaldo:Nexus`).

---

## 🌐 Guia Completo de Interação & Deploy na Vercel

### 1. Arquitetura do Deploy na Vercel (`vercel.json`)
O portfólio adota uma arquitetura de entrega contínua híbrida de altíssima performance:
- **Camada Estática Ultra-Rápida:** O arquivo `vercel.json` define `"buildCommand": null` e `"outputDirectory": "."`. Isso significa que os arquivos HTML/CSS/JS e assets são distribuídos imediatamente na Edge Network da Vercel sem tempo de espera de compilação.
- **Serverless Function Nativa em Go (`api/status.go`):** Ao detectar arquivos dentro da pasta `api/`, a Vercel provisiona automaticamente o runtime do Golang e publica o endpoint serverless em `/api/status`.
- **Roteamento SPA:** Qualquer rota acessada que não seja um asset físico ou chamada `/api/*` é reescrita para `/index.html`, evitando erros de página não encontrada (404).

---

### 2. Fluxo Principal: Deploy Contínuo via GitHub (Recomendado)
É o fluxo padrão do teu dia a dia:

1. **Faça as alterações** nos arquivos desejados (HTML, CSS, TypeScript, etc.).
2. **Valide a integridade do código**:
   ```bash
   npx tsc --noEmit
   ```
3. **Commit e Push**:
   ```bash
   git add .
   git commit -m "feat: descrição clara da alteração"
   git push origin main
   ```
4. **Deploy Automático:** A Vercel detecta o push na branch `main`, compila o endpoint Go, distribui os arquivos estáticos e atualiza o domínio de produção em menos de 30 segundos.

---

### 3. Fluxo Alternativo: Deploy & Homologação via Vercel CLI

Caso queiras gerar uma URL de pré-visualização (Preview) antes de mandar para a `main`, ou disparar deploy direto do terminal sem comitar:

#### A. Autenticação e Vinculação Inicial (Feito apenas 1 vez):
```bash
# 1. Fazer login na conta da Vercel pelo navegador
npx vercel login

# 2. Conectar a pasta local ao projeto existente na Vercel
npx vercel link
```
> Responda `Y` para vincular ao projeto existente e selecione o escopo da tua conta.

#### B. Deploy de Preview (Homologação / Teste Isolado):
```bash
npx vercel
```
> Gera um link exclusivo de pré-visualização (ex: `meu-portifolio-git-fork-lucivaldo.vercel.app`) para testares o visual e a API sem afetar o domínio principal de produção.

#### C. Deploy Forçado Direto para Produção:
```bash
npx vercel --prod
```
> Publica imediatamente a versão da pasta local diretamente no domínio oficial de produção.

---

### 4. Monitoramento em Tempo Real & Verificação Pós-Deploy

Após disparar o deploy (seja via Git ou via CLI):

1. **Acompanhar pelo Dashboard:**
   - Acesse: [vercel.com/dashboard](https://vercel.com/dashboard)
   - Clique no projeto do portfólio.
   - Na aba **Deployments**, verifique o status do build mais recente:
     - 🟡 *Building* (Em processo)
     - 🟢 *Ready* (Concluído e no ar)
     - 🔴 *Error* (Falha — clique para inspecionar os logs)

2. **Acompanhar Logs via Terminal:**
   ```bash
   # Ver status das últimas execuções
   npx vercel status
   
   # Acompanhar stream de logs em tempo real
   npx vercel logs <url-do-deployment>
   ```

3. **Verificar a Saúde da API Serverless em Produção:**
   Teste se o backend em Go subiu perfeitamente:
   ```bash
   curl -i https://<teu-dominio-ou-link-vercel>/api/status
   ```
   > Deve retornar HTTP 200 com o JSON contendo status `UP`, versão do Go e telemetria regional.

---

### 5. Rollback Instantâneo de Emergência (Instant Rollback)

Se uma alteração quebrar algo em produção e tu precisares restaurar o site imediatamente sem esperar um novo commit:
1. Entre no painel do projeto em [vercel.com/dashboard](https://vercel.com/dashboard).
2. Vá na aba **Deployments**.
3. Localize o último deployment estável que funcionava perfeitamente.
4. Clique no menu de três pontinhos (`...`) à direita do deployment.
5. Selecione **"Instant Rollback"** (ou **"Promote to Production"**).
6. A Vercel redireciona o tráfego do domínio principal para essa versão anterior em menos de 2 segundos.

