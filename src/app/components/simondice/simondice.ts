import { Component, inject, signal } from '@angular/core';
import { SimondiceService } from '../../services/simondice-service';


@Component({
  selector: 'app-simondice',
  imports: [],
  templateUrl: './simondice.html',
  styleUrl: './simondice.css',
})
export class Simondice {
  colores = ['rojo', 'azul', 'verde', 'amarillo'];

  private simondiceService = inject(SimondiceService);

  secuencia = signal<string[]>([]);

  secuenciaDelUsuario = signal<string[]>([]);

  nivel = signal(0);

  partidaFinalizada = signal(false);

  estaMostrandoSecuencia = signal(false);

  colorActivo = signal<string | null>(null);

 ngOnInit() {
    this.empezarPartida()
  }
  empezarPartida() {

    this.secuencia.set([]);

    this.secuenciaDelUsuario.set([]);

    this.nivel.set(0);

    this.partidaFinalizada.set(false);

    this.estaMostrandoSecuencia.set(true);

    this.sigueinteSecuencia();
  }

  sigueinteSecuencia() {

    const colorRandom =
      this.colores[
      Math.floor(Math.random() * this.colores.length)
      ];

    this.secuencia.update(sec => [...sec, colorRandom]);

    this.nivel.update(n => n + 1);

    this.secuenciaDelUsuario.set([]);

    this.mostrarSecuencia();
  }

  mostrarSecuencia() {

    this.estaMostrandoSecuencia.set(true);

    this.secuencia().forEach((color, i) => {

      setTimeout(() => {

        this.flashColor(color);

        // al final habilitar juego
        if (i === this.secuencia().length - 1) {

          setTimeout(() => {
            this.estaMostrandoSecuencia.set(false);
          }, 500);
        }

      }, i * 700);
    });
  }

  flashColor(color: string) {

    this.colorActivo.set(color);

    setTimeout(() => {
      this.colorActivo.set(null);
    }, 400);
  }


  seleccionarColor(color: string) {

    if (this.estaMostrandoSecuencia()) return; // bloquea los botones cuando se reproduce la secuencia

    if (this.partidaFinalizada()) return;

    this.secuenciaDelUsuario.update(sec => [...sec, color]);// construyo la secuencia del usuario

    const index = this.secuenciaDelUsuario().length - 1;// guardo el el utlimo indice de la secuancia del usuario

    if (this.secuencia()[index] !== color) {

      this.partidaFinalizada.set(true);
      this.simondiceService.guardarPatida(this.nivel());
      return;
    }

    if (this.secuenciaDelUsuario().length === this.secuencia().length) {

      setTimeout(() => this.sigueinteSecuencia(), 800);
    }
  }

}
