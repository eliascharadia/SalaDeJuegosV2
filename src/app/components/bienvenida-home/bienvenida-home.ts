import { Component, inject, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-bienvenida-home',
  imports: [RouterModule],
  templateUrl: './bienvenida-home.html',
  styleUrl: './bienvenida-home.css',
})
export class BienvenidaHome {
  private auth = inject(Auth);
  private router = inject(Router)

  estaLogeado = this.auth.isAutheticated();
  showLoginModal = signal(false);

  goToGame(route: string) {

    if (this.estaLogeado) {

      this.router.navigate([route]);
    } else {

      this.showLoginModal.set(true);
    }
  }
}
