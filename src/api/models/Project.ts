export interface Project {
  id: string;
  title: string;
  description: string;
  totalStocks: number;
  stockPrice: number;
  currency: number;
  startDate: Date;
  endDate: Date;
  status?: 'active' | 'completed' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}
