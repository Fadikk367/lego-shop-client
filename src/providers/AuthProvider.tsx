import React, { createContext, useEffect, useState } from 'react';
import authApi, { User, UserData } from '../api/Auth';

interface AuthContextValues {
  user: User | undefined;
  isLoading: boolean;
  login(email: string, password: string): Promise<void>;
  register(userData: UserData): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthContextValues | undefined>(undefined);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const serializedUser = localStorage.getItem('user');

    if (serializedUser) {
      try {
        const persistedUser = JSON.parse(serializedUser);
        if ('id' in persistedUser && 'name' in persistedUser && 'email' in persistedUser) {
          setUser(persistedUser);
        }
      } catch (_) {}
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const newUser = await authApi.login({ email, password });
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (_) {}
  }

  const register = async (userData: UserData) => {
    const newUser = await authApi.register(userData);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  const logout = () => {
    setUser(undefined);
    localStorage.setItem('user', '');
  }

  return (
    <AuthContext.Provider value={{user, login, register, logout, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;