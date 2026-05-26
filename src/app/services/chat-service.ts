import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private supabase = inject(SupabaseService);

  // Usamos un Signal para que el HTML se actualice automáticamente
  public mensajes = signal<Mensaje[]>([]);

  constructor() {
    this.cargarMensajesIniciales();
    this.escucharMensajesEnTiempoReal();
  }

  async cargarMensajesIniciales() {
    const { data } = await this.supabase.getClient()
      .from('mensajes')
      .select('*, usuarios(nombre)')
      .order('created_at', { ascending: true });

    if (data) this.mensajes.set(data as Mensaje[]);
    console.log(data);
  }

  escucharMensajesEnTiempoReal() {
    this.supabase.getClient()
      .channel('sala-publica')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensajes' },
        (payload) => {
          this.cargarMensajesIniciales();
        }
      )
      .subscribe();
  }

  async enviarMensajeConUsuario(contenido: string, username: string, usuarioId:string|undefined) {

    // 4. Mandamos el mensaje
    const { data, error } = await this.supabase.getClient().from('mensajes').insert({
      contenido,
      usuario_id: usuarioId
    });
    console.log(error);

    console.log(`contenido: ${contenido}, usuario: ${username}, id: ${usuarioId}`);
    // alert(`contenido: ${contenido}, usuario: ${username}, id: ${usuarioId}`);
  }
}
