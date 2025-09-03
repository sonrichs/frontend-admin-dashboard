import AxiosInstance from '../axios';
import type { CreateInvestment, Investment } from '../models/Investment';

export const getInvestments = async () => {
  return AxiosInstance.get('/investments')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching investments:', error);
      return [];
    });
};

export const getInvestmentById = async (id: string) => {
  return AxiosInstance.get(`/investments/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching project by ID:', error);
      return null;
    });
};

export const createInvestment = async (investmentData: CreateInvestment) => {
  return AxiosInstance.post('/investments', investmentData)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error creating project:', error);
      return null;
    });
};

export const updateInvestment = async (
  id: string,
  investmentData: Partial<Investment>
) => {
  return AxiosInstance.patch(`/investments/${id}`, investmentData)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error updating investment:', error);
      return null;
    });
};
