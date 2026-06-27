import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '@/services/supabaseClient';
import type { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email || '',
            role: 'admin',
          });
        }
      } catch (error) {
        console.error('Failed to get current user:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { session } = await authService.login(email, password);
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email || '',
        role: 'admin',
      });
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const signup = async (email: string, password: string) => {
    const { user: newUser } = await authService.signUp(email, password);
    if (newUser) {
      setUser({
        id: newUser.id,
        email: newUser.email || '',
        role: 'admin',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
