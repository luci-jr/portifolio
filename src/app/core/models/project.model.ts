export type ProjectCategory = 'frontend' | 'backend' | 'sysops' | 'gamer';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tag: string;
  techs: string[];
  imageUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
}
