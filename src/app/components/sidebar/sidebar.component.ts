import { Component, inject, HostListener } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly portfolio = inject(PortfolioService);

  // Fecha no ESC
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.portfolio.sidebarOpen()) {
      this.portfolio.closeSidebar();
    }
  }

  close(): void {
    this.portfolio.closeSidebar();
  }

  toggle(): void {
    this.portfolio.toggleSidebar();
  }
}
