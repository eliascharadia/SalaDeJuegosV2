import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  auth = inject(Auth);

  user = this.auth.user;
  loading = signal(false);
  errorMensaje = signal<string | null>(null);

  async cerrarSession(){
    this.loading.set(true);
    const success = await this.auth.logout();
    if (!success) this.errorMensaje.set('Error al cerar sesión');
    this.loading.set(false);
  }
}
