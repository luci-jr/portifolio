import { Component, inject } from '@angular/core';
import { PortfolioService, DevClass } from '../../core/services/portfolio.service';
import { TelemetryService } from '../../core/services/telemetry.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  readonly portfolio = inject(PortfolioService);
  readonly telemetryService = inject(TelemetryService);

  // Troca deliberada exclusivamente por clique
  setMode(mode: DevClass): void {
    this.portfolio.setMode(mode);
  }
}
