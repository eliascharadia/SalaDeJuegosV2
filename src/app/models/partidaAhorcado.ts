export interface PartidaAhorcado {
  usuario_id: string;
  palabra: string;
  resultado: 'ganada' | 'perdida';
  errores: number;
  duracion: number;
  letras_seleccionadas: number
}