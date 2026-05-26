import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class Mayormenorservice {
  private supabase = inject(SupabaseService);


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

}
