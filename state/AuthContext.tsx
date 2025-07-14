import { useAuthMutation } from '@/hooks';
import { registerUser } from '@/services';
import { createContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
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
