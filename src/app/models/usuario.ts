export interface UsuarioRegistro {
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  password: string;
}

export interface Usuario {
  id: string;
  nombre?: string;
  apellido?: string;
  edad?: number;
  email: string;
}