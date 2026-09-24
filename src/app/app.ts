import { Component, inject, HostListener, HostBinding } from '@angular/core';
import { PortfolioService } from './core/services/portfolio.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ProjectsComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly portfolio = inject(PortfolioService);

  // Aplica dinamicamente a classe de modo e tema no elemento raiz (:host)
  @HostBinding('class') get currentModeClass(): string {
    const mode = `mode-${this.portfolio.activeMode()}`;
    const theme = this.portfolio.isLight() ? 'theme-light' : '';
    return `${mode} ${theme}`.trim();
  }

  // Atalhos de teclado globais rápidos (1: Front-end, 2: Backend, 3: SysOps, 4: Gamer)
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }

    if (event.key === '1') this.portfolio.setMode('frontend');
    if (event.key === '2') this.portfolio.setMode('backend');
    if (event.key === '3') this.portfolio.setMode('sysops');
    if (event.key === '4') this.portfolio.setMode('gamer');
  }
}
