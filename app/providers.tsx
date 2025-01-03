"use client";

import { createContext, useContext, useState, useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  startAuth: () => void;
  completeAuth: (token: string) => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const startAuth = () => {
    setIsLoading(true);
  };

  const completeAuth = (token: string) => {
    setIsAuthenticated(true);
    setIsLoading(false);
    setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, token, startAuth, completeAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
