import { useState } from 'react';
import { getToken, setToken as storeToken, removeToken } from '../utils/token';

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(getToken());

  const login = (jwt: string) => {
    storeToken(jwt);
    setTokenState(jwt);
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
  };

  return {
    isAuthenticated: !!token,
    token,
    login,
    logout,
  };
}
