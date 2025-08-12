import type { Project } from './Project';
import type { User } from './User';

export interface Investment {
  id: string;
  stocksAmount: number;
  investedAt: Date;
  exitedAt: Date;
  isActive: boolean;
  project: Project;
  user: User;
}
