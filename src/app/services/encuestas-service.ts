import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class EncuestasService {
  private supabase = inject(SupabaseService);

  getEncuestas() {
    return this.supabase.getClient()
      .from('encuestas')
      .select('*')
      .order('created_at', { ascending: false });
  }


  async guardarResultados(usuarioId: string | undefined, valoresFormulario:any, juegos: string[]){


    const { error } = await this.supabase.getClient()
    .from('encuestas')
    .insert({
      usuario_id: usuarioId,
      nombre: valoresFormulario.nombre,
      apellido: valoresFormulario.apellido,
      edad: valoresFormulario.edad,
      numero: valoresFormulario.numero,
      pregunta1: valoresFormulario.pregunta1,
      juegos: juegos,
      pregunta3: valoresFormulario.pregunta3
    });

    if (error) {
      console.log(error);
      alert('Error al guardar la encuesta');
       return false;
    }
    return true;
  }
}
