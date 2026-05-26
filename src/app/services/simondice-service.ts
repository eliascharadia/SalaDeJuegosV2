import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class SimondiceService {
  private supabase = inject(SupabaseService);
  private auth = inject(Auth);

  datos = signal<any[]>([]);

  async guardarPatida(record: number){
    const user = this.auth.user();
    if(!user) return;


    const { error } = await this.supabase.getClient()
      .from('partidas_simondice')
      .insert({
        usuario_id: user.id,
        record: record
      });

      if (error) {
      console.error('Error guardando partida:', error.message);
      return false;
    }

    return true;
  }

  async getResultados(userId: string) {

    const { data, error } = await this.supabase.getClient()
      .from('partidas_simondice')
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
