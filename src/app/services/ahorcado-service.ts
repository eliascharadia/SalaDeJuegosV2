import { inject, Injectable, signal } from '@angular/core';
import { PALABRAS } from '../recursos/palabras';
import { PartidaAhorcado } from '../models/partidaAhorcado';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class AhorcadoService {
  private supabase = inject(SupabaseService);

  palabraRandom = signal<string>('');
 
  loading = signal(false);
  error   = signal<string | null>(null);

  datos = signal<any[]>([]);

  obtenerLetraRandom(): void {
    const palabraRandom =
    PALABRAS[Math.floor(Math.random() * PALABRAS.length)]
    this.palabraRandom.set(palabraRandom.toUpperCase());
  }

  async guardarPartida(data: PartidaAhorcado) {

    const { error } = await this.supabase.getClient()
      .from('ahorcadoPartidas')
      .insert({
        usuario_id: data.usuario_id,
        palabra: data.palabra,
        resultado: data.resultado,
        errores: data.errores,
        duracion: data.duracion,
        letras_seleccionadas: data.letras_seleccionadas
      });

    if (error) {
      console.error('Error guardando partida:', error.message);
      return false;
    }

    return true;
}

async getResultados() {

  const { data, error } = await this.supabase.getClient()
    .from('ahorcadoPartidas')
    .select('usuario_id, duracion, usuarios(nombre)')

    console.log(data);
  if (error) {
    console.log(error);
    return;
  }

  this.datos.set(data ?? []);
}
}
