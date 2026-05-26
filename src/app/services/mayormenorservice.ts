import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class Mayormenorservice {
  private supabase = inject(SupabaseService);
  datos = signal<any[]>([]);

  async guardarPartida(data: any) {

    const { error } = await this.supabase.getClient()
      .from('partidas_mayor_menor')
      .insert({
        usuario_id: data.usuario_id,
        puntaje: data.puntaje
      });

    if (error) {
      console.error('Error guardando partida:', error.message);
      return false;
    }

    return true;
  }

  async getResultados(userId: string) {

    const { data, error } = await this.supabase.getClient()
      .from('partidas_mayor_menor')
      .select('*')
      .eq('usuario_id', userId);

    console.log(data)
    if (error) {
      console.log(error);
      return;
    }

    this.datos.set(data ?? []);
  }

}
