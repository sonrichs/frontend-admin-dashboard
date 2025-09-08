export interface User {
  id: number;
  name: string;
  nationalId: string;
  type: UserTypes;
  email: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
}

export interface CreateUser {
  email: string;
  name: string;
  nationalId: string;
  type: UserTypes;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
}

export const USER_TYPES = ['natural', 'juridica'] as const;
export type UserTypes = (typeof USER_TYPES)[number];
