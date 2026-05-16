import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-bienvenida-home',
  imports: [RouterModule],
  templateUrl: './bienvenida-home.html',
  styleUrl: './bienvenida-home.css',
})
export class BienvenidaHome {
  private auth = inject(Auth);
  private router = inject(Router)

  estaLogeado = computed(() => !!this.auth.user());
  showLoginModal = signal(false);

  goToGame(route: string) {

    if (this.estaLogeado()) {

      this.router.navigate([route]);
    } else {

      this.showLoginModal.set(true);
    }
  }
}
