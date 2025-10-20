// lib/api.ts
import { clearToken, getToken } from "./storage";
import type { ApiErrorPayload } from "./types";

const BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  data?: ApiErrorPayload | any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type RequestOptions = {
  headers?: Record<string, string>;
  body?: any;
  // Para GET con query params
  params?: Record<string, string | number | boolean | null | undefined>;
  // Para controlar redirección automática al 401
  skipAuthRedirect?: boolean;
};

function toQuery(params?: RequestOptions["params"]) {
  if (!params) return "";
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === null || v === undefined) return;
    usp.set(k, String(v));
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

async function request<T = any>(
  path: string,
  method: HttpMethod,
  options: RequestOptions = {},
): Promise<T> {
  const token = getToken();

  // Construir URL + query
  const url = `${BASE_URL}${path}${toQuery(options.params)}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  // Solo ponemos Content-Type si el body es JSON
  const isJsonBody =
    options.body &&
    typeof options.body === "object" &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof Blob);

  if (isJsonBody) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (options.body !== undefined) {
    fetchOptions.body = isJsonBody ? JSON.stringify(options.body) : options.body;
  }

  const res = await fetch(url, fetchOptions);

  // Si no es JSON, intentamos texto para debug
  const parse = async () => {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      return res.json().catch(() => ({}));
    }
    return res.text().catch(() => "");
  };

  if (res.status === 401) {
    // Limpia sesión y redirige a /login (evita loop si el path es /auth/login)
    if (!options.skipAuthRedirect && !path.startsWith("/auth/login")) {
      clearToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    const data = await parse();
    throw new ApiError("No autorizado", 401, data);
  }

  const data = await parse();

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Error HTTP ${res.status} en ${method} ${path}`;
    throw new ApiError(msg, res.status, data);
  }

  return data as T;
}

export const api = {
  get: <T = any>(path: string, params?: RequestOptions["params"], options?: RequestOptions) =>
    request<T>(path, "GET", { ...(options || {}), params }),

  post: <T = any>(path: string, body?: any, options?: RequestOptions) =>
    request<T>(path, "POST", { ...(options || {}), body }),

  patch: <T = any>(path: string, body?: any, options?: RequestOptions) =>
    request<T>(path, "PATCH", { ...(options || {}), body }),

  put: <T = any>(path: string, body?: any, options?: RequestOptions) =>
    request<T>(path, "PUT", { ...(options || {}), body }),

  delete: <T = any>(path: string, options?: RequestOptions) =>
    request<T>(path, "DELETE", options),
};

export { BASE_URL };
