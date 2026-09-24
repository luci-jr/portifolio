import { Injectable, signal } from '@angular/core';

export interface TelemetryData {
  status: string;
  runtime: string;
  location: string;
  latencyMs: number;
}

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  readonly telemetry = signal<string>('CARREGANDO TELEMETRIA EM GO... [BELÉM-PA: ONLINE]');

  constructor() {
    this.loadTelemetry();
  }

  async loadTelemetry(): Promise<void> {
    try {
      const startTime = performance.now();
      const response = await fetch('/api/status');
      if (response.ok) {
        const data = await response.json();
        const duration = Math.round(performance.now() - startTime);
        this.telemetry.set(
          `SERVERLESS GO: OK | HOST: ${data.location || 'BELÉM-PA'} | RUNTIME: ${data.runtime || 'GO 1.26'} | PING: ${duration}ms`,
        );
      }
    } catch {
      // Fallback gracioso para ambiente de desenvolvimento local
      this.telemetry.set('SERVERLESS GO: LOCAL DEV | AMBIENTE: LINUX UBUNTU | RUNTIME: GO 1.26');
    }
  }
}
