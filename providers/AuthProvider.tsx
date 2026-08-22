import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { getRefreshToken, saveToken, removeToken, getAccessToken } from "@/utils/tokenService";
import { setOnAuthFailure } from "@/api/apiClient";
import { useChatSocket } from "@/features/chat/hooks/useChatSocket";

interface AuthContextValue {
  isAuthenticated: boolean;
  isHydrating: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const logout = useCallback(async () => {
    await removeToken();
    setIsAuthenticated(false);
    setToken(null);
  }, []);

  const login = useCallback(async (accessToken: string, refreshToken: string) => {
    await saveToken(accessToken, refreshToken);
    setIsAuthenticated(true);
    setToken(accessToken);
  }, []);

  // apiClient calls this when a refresh attempt fails (refresh token expired/
  // revoked). Without the explicit redirect here, a user mid-session (past the
  // splash screen's one-time routing check) would be left on their current
  // screen with no token at all, silently failing every subsequent request.
  useEffect(() => {
    setOnAuthFailure(() => {
      logout();
      router.replace("/(auth)/Login");
    });
    return () => setOnAuthFailure(null);
  }, [logout]);

  useEffect(() => {
    (async () => {
      const refreshToken = await getRefreshToken();
      const accessToken = await getAccessToken();
      if (refreshToken && accessToken) {
        setIsAuthenticated(true);
        setToken(accessToken);
      }
      setIsHydrating(false);
    })();
  }, []);

  // Initialize chat socket when authenticated
  useChatSocket({
    baseUrl: "http://192.168.0.173:3000",
    token: token || "",
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, isHydrating, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
