export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
}

export interface CreateUser {
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
}
