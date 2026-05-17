import { Component, computed, inject, signal } from '@angular/core';
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

  estaLogeado = computed(() => !!this.auth.user());
  userRecien = computed(() => this.auth.userRecienRegistrado());
  showLoginModal = signal(false);
  showModalRegistradoReciente = signal(false);
  
  constructor(){
    if(this.userRecien()){
      this.showModalRegistradoReciente.set(true)
    }
  }

  goToGame(route: string) {

    if (this.estaLogeado()) {

      this.router.navigate([route]);
    } else {

      this.showLoginModal.set(true);
    }
  }
}
