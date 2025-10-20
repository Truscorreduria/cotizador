// lib/types.ts
export type UserRole = "administrador" | "colaborador" | "cliente";

export interface User {
  id: number;
  primer_nombre: string;
  segundo_nombre?: string | null;
  primer_apellido: string;
  segundo_apellido?: string | null;
  email: string;
  telefono?: string | null;
  celular?: string | null;
  identificacion?: string | null;
  departamento?: string | null;
  municipio?: string | null;
  direccion?: string | null;
  rol: UserRole;
  activo: boolean;
  fecha_registro?: string;       // ISO
  fecha_actualizacion?: string;  // ISO
}

export interface AuthMeResponse {
  id: number;
  email: string;
  rol: UserRole;
  primer_nombre?: string;
  segundo_nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  telefono?: string | null;
  celular?: string | null;
  identificacion?: string | null;
  departamento?: string | null;
  municipio?: string | null;
  direccion?: string | null;
  activo: boolean;
}

export interface AuthLoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    rol: UserRole;
  };
}

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type ApiErrorPayload = {
  error?: string;
  message?: string;
  details?: string[] | string;
};
