import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserGit } from '../models/userGit';

@Injectable({
  providedIn: 'root',
})
export class QuienSoyService {
  
  private http = inject(HttpClient);
  private apiUrl = "https://api.github.com/users/eliascharadia"
  
  private user = signal<UserGit | null>(null);

  userA = this.user;
  
  loading = signal(false);
  error   = signal<string | null>(null);

  loadUser(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any>(this.apiUrl).subscribe({
        next: (apiUser) => {

        const transformed = {
          name: apiUser.name,
          username: apiUser.login,
          email: apiUser.email,
          avatar: apiUser.avatar_url,
          bio: apiUser.bio
        };
        this.user.set(transformed);
        this.loading.set(false);
      },
      error: (_err) => {
        this.error.set('Error al cargar usuario');
        this.loading.set(false);
      }
    })
  }

}
