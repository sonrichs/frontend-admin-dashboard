import AxiosInstance from '../axios';
import type { User } from '../models/User';

export const getUsers = async () => {
  return AxiosInstance.get('/users')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching users:', error);
      return [];
    });
};

export const getUserById = async (id: string) => {
  return AxiosInstance.get(`/users/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching user by ID:', error);
      return null;
    });
};

export const createUser = async (userData: Omit<User, 'id'>) => {
  return AxiosInstance.post('/users', userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error creating user:', error);
      return null;
    });
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  return AxiosInstance.patch(`/users/${id}`, userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error updating user:', error);
      return null;
    });
};
