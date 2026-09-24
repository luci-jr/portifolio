import { Component, inject } from '@angular/core';
import { PortfolioService, DevClass } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly portfolio = inject(PortfolioService);

  setMode(mode: DevClass): void {
    this.portfolio.setMode(mode);
  }

  toggleCrt(): void {
    this.portfolio.toggleCrt();
  }

  toggleTheme(): void {
    this.portfolio.toggleTheme();
  }
}
