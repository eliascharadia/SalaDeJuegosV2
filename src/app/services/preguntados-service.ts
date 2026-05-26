import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pregunta } from '../models/pregunta';
import { Auth } from './auth';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  private http = inject(HttpClient);
  private apiUrl = "https://opentdb.com/api.php?amount=20&category=11&difficulty=easy&type=multiple";
  private auth = inject(Auth);
  private supabase = inject(SupabaseService);

  resultados = signal<Pregunta[]>([])

  error = signal('');
  loading = signal(false);

  datos = signal<any[]>([]);

  obtenerPreguntas(): void {
    this.loading.set(true);

    this.http.get<any>(this.apiUrl).subscribe({
        next: (data) => {
          const resultados = data.results;
          this.resultados.set(resultados);
          this.loading.set(false);
      },
      error: (_err) => {
        console.log(_err);
        this.error.set('Error al obtener preguntas');
        this.loading.set(false);
      }
    })
  }

  async guardarPartida(puntaje: number) {

    const user = this.auth.user();

    if (!user) return;

    const { error } = await this.supabase.getClient()
      .from('partidas_preguntados')
      .insert({
        usuario_id: user.id,
        puntaje: puntaje
      });

      if (error) {
      console.error('Error guardando partida:', error.message);
      return false;
    }

    return true;
  }

  async getResultados(userId: string) {

    const { data, error } = await this.supabase.getClient()
      .from('partidas_preguntados')
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
