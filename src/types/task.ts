export type PriorityLevel = 'Baixa' | 'Média' | 'Alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: PriorityLevel;
  completed: boolean;
}