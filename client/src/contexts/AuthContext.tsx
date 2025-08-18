import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  username: string;
  email?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { username?: string; email?: string; password?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Token management
  const getStoredToken = () => localStorage.getItem('authToken');
  const setStoredToken = (token: string) => localStorage.setItem('authToken', token);
  const removeStoredToken = () => localStorage.removeItem('authToken');

  // API request helper with auth
  const apiRequestWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getStoredToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `Request failed: ${response.status}`);
    }

    return response.json();
  };

  // Check if user is authenticated on mount
  const { data: userData, error: authError } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: () => apiRequestWithAuth('/api/auth/me'),
    retry: false,
    enabled: !!getStoredToken(),
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Login failed' }));
        throw new Error(error.error || 'Login failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setStoredToken(data.token);
      setUser(data.user);
      queryClient.setQueryData(['/api/auth/me'], data.user);
      toast({
        title: "Success",
        description: "Login successful",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive",
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { username?: string; email?: string; password?: string }) => {
      return apiRequestWithAuth('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(['/api/auth/me'], data.user);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Profile update failed",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else if (authError) {
      // Token might be invalid
      removeStoredToken();
      setUser(null);
    }
    setIsLoading(false);
  }, [userData, authError]);

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const logout = () => {
    removeStoredToken();
    setUser(null);
    queryClient.setQueryData(['/api/auth/me'], null);
    queryClient.clear();
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  const updateProfile = async (data: { username?: string; email?: string; password?: string }) => {
    await updateProfileMutation.mutateAsync(data);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};