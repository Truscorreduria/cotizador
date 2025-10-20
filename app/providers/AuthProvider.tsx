"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/lib/api";
import { clearToken, getToken, setToken } from "@/lib/storage";
import type { AuthLoginResponse, AuthMeResponse, UserRole } from "@/lib/types";

type AuthUser = AuthMeResponse | null;

type AuthContextType = {
  user: AuthUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
  hasRole: (role: UserRole | UserRole[]) => boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  // providers/AuthProvider.tsx
  const refreshMe = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return; // <- evita llamar /auth/me sin token
    }
    try {
      setIsLoading(true);
      const me = await api.get<AuthMeResponse>("/auth/me", undefined, {
        skipAuthRedirect: true,
      });
      setUser(me);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Cargar sesión al montar
    refreshMe();
  }, [refreshMe]);

  // 🔹 Mejora 1: Propagar error claro desde el login
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await api.post<AuthLoginResponse>(
          "/auth/login",
          { email, password },
          { skipAuthRedirect: true }
        );
        if (!res?.token) {
          throw new Error("Respuesta inválida del servidor");
        }
        setToken(res.token);
        await refreshMe();
      } catch (err: any) {
        // Intenta capturar mensaje del backend; si no, usa genérico
        const msg =
          err?.response?.data?.error ||
          err?.message ||
          "No se pudo iniciar sesión. Verifica tus credenciales e inténtalo nuevamente.";
        throw new Error(msg);
      }
    },
    [refreshMe]
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, []);

  // 🔹 Mejora 2: Helper de roles para UI/guardas
  const hasRole = useCallback(
    (role: UserRole | UserRole[]) => {
      if (!user?.rol) return false;
      return Array.isArray(role)
        ? role.includes(user.rol as UserRole)
        : user.rol === role;
    },
    [user?.rol]
  );

  // 🔹 Mejora 3 (opcional útil): sincronización entre pestañas
  useEffect(() => {
    const onStorage = () => {
      // Si cambió el storage en otra pestaña, decide según existencia del token
      const token = getToken();
      if (!token) {
        setUser(null);
      } else {
        // Si hay token, refresca los datos del usuario
        refreshMe();
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
    return;
  }, [refreshMe]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      refreshMe,
      hasRole,
    }),
    [user, isLoading, login, logout, refreshMe, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
