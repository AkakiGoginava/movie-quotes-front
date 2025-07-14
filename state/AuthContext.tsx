import { createContext } from 'react';

import { useAuthMutation } from '@/hooks';
import { registerUser } from '@/services';

import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const handleRegister = useAuthMutation(registerUser);

  return (
    <AuthContext.Provider
      value={{
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
