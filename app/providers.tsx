"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  startAuth: () => void;
  completeAuth: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with true to check local storage

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('notion_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const startAuth = () => {
    setIsLoading(true);
  };

  const completeAuth = () => {
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, startAuth, completeAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};