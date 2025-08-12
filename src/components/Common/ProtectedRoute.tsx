import { Navigate } from 'react-router';
import { getToken } from '../../utils/token';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = getToken();
  // const token_expiry = token ? token.expiry : 0;

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // if (token_expiry < Date.now()) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
}
