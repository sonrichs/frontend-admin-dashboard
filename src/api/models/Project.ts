export interface Project {
  id: string;
  title: string;
  description: string;
  totalStocks: number;
  stockPrice: number;
  phase: number;
  currency: string;
  startDate: string;
  endDate: string;
  status?: 'active' | 'completed' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProject {
  title: string;
  description: string;
  totalStocks: number;
  stockPrice: number;
  phase: number;
  currency: string;
  startDate: string;
  endDate: string;
}
