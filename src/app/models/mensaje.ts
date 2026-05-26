import { Usuario } from "./usuario";


export interface Mensaje {
  id: number;
  user_id: number;
  contenido: string;
  created_at: string; // Las fechas de Supabase llegan como string ISO
  // Esta parte es clave para el "Join" con la tabla usuarios
  usuarios?: Usuario; 
}