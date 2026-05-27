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
}
