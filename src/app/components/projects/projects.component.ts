import { Component, inject, signal, computed, effect } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Project, ProjectCategory } from '../../core/models/project.model';
import { PROJECTS_DATA } from '../../data/projects.data';

export type FilterOption = ProjectCategory | 'all';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  readonly portfolio = inject(PortfolioService);

  // Lista mestre de projetos importada do arquivo central
  readonly allProjects = signal<Project[]>(PROJECTS_DATA);

  // Filtro de exibição ativo (inicia com o modo ativo do portfolio)
  readonly activeFilter = signal<FilterOption>('frontend');

  // Sincroniza o filtro automaticamente quando a classe do Hero muda
  constructor() {
    effect(() => {
      const mode = this.portfolio.activeMode();
      this.activeFilter.set(mode);
    });
  }

  // Lista computada e reativa baseada no filtro selecionado
  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.allProjects();
    }
    return this.allProjects().filter(p => p.category === filter);
  });

  // Altera o filtro manualmente via clique nas abas
  setFilter(filter: FilterOption): void {
    this.activeFilter.set(filter);
  }
}
