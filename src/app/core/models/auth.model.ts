export interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  telefono?: string;
  fotoPerfil?: string;
  createdAt?: Date;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  rol?: UserRole;
}

export enum UserRole {
  USUARIO = 'USUARIO',
  ANFITRION = 'ANFITRION',
  ADMINISTRADOR = 'ADMINISTRADOR'
}

export interface JwtPayload {
  sub: string; // subject (email o username)
  userId: number;
  rol: UserRole;
  iat: number; // issued at
  exp: number; // expiration
}
