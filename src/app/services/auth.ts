import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase';
import { UsuarioRegistro, Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private router = inject(Router);
  private supabase = inject(SupabaseService);

  user = signal<Usuario | null>(null);
  isAutheticated = computed(() => this.user() !== null);

  constructor(){
    this.getSession();
  }

  async getSession(){
    const {data: {session}} = await this.supabase.getClient().auth.getSession();

    if (!session?.user) {
    this.user.set(null);
    return;
    }

    const { data: profile } = await this.supabase.getClient()
    .from('usuarios')
    .select('*')
    .eq('id', session.user.id)
    .single();

     this.user.set({
      id: session.user.id,
      email: session.user.email ?? '',
      nombre: profile?.nombre
    });
  }

  async register(usuarioData: UsuarioRegistro): Promise<string | null> {

    const { data, error } = await this.supabase.getClient().auth.signUp({
      email: usuarioData.email,
      password: usuarioData.password
    });

    if (error) {

      if (error.message.includes('already registered')) {
        return 'El usuario ya está registrado';
      }

      return 'Error al registrar usuario';
    }

    if (!data.user) {
      return 'No se pudo crear el usuario';
    }

    const { error: dbError } = await this.supabase.getClient()
      .from('usuarios')
      .insert({
        id: data.user.id,
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        edad: usuarioData.edad,
        email: usuarioData.email
      });

    if (dbError) {
      return 'Error al guardar datos del usuario';
    }

    // Login automático
    await this.login(usuarioData.email, usuarioData.password);

    // Navegar
    this.router.navigate(['/home']);

    return null;
}

async login(email: string, password: string) {
  const {data, error} = await this.supabase.getClient().auth.signInWithPassword({email, password});
  if(error) return false;

  const { data: profile, error: profileError } =
    await this.supabase.getClient()
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single();

  if (profileError) {
      return false;
  }

  this.user.set({
    id: data.user.id,
    email: data.user.email ?? '',
    nombre: profile.nombre,
    apellido: profile.apellido,
    edad: profile.edad
  });

  this.router.navigate(['/home']);
  return true;

}

async logout() {

  await this.supabase.getClient().auth.signOut();
  this.user.set(null);
  this.router.navigate(['/home']);
  return true;
}

}
