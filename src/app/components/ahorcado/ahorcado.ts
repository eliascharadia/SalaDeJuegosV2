import { Component, inject, signal } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado-service';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-ahorcado',
  imports: [],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css',
})
export class Ahorcado {
  private ahorcado = inject(AhorcadoService);
  private auth = inject(Auth);

  letras = signal<string[]>([]);

  palabra = signal<string>('');

  palabraOculta = signal<string[]>([]);

  letrasSeleccionadas = signal<string[]>([]);

  errores = signal(0);

  maxerrores = 6;

  tiempoInicio = signal<number>(0);

  tiempoPartida = signal<number>(0);

  gameOver = signal(false);

  win = signal(false);

  ngOnInit() {

    this.letras.set(
      'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')
    );

    this.startGame();
  }

  startGame() {
    this.tiempoInicio.set(Date.now());
    this.ahorcado.obtenerLetraRandom();
    this.palabra.set(this.ahorcado.palabraRandom());
    // alert(this.word());
    console.log(this.palabra());
    const hidden = Array(
      this.palabra().length
    ).fill('_');

    this.tiempoPartida.set(0);

    this.palabraOculta.set(hidden);

    this.letrasSeleccionadas.set([]);

    this.errores.set(0);

    this.gameOver.set(false);

    this.win.set(false);
  }

  letraSeleccionada(letter: string) {

    if (this.gameOver()) return;

    // evitar repetir letras
    if (this.letrasSeleccionadas().includes(letter)) {
      return;
    }

    this.letrasSeleccionadas.update(prev => [
      ...prev,
      letter
    ]);

    if (this.palabra().includes(letter)) {

      this.revelarLetra(letter);

    } else {

      this.errores.update(e => e + 1);
    }

    this.verificarEstadoDePartida();
  }

  revelarLetra(letra: string) {

    const palabraActualizada = [...this.palabraOculta()];

    for (let i = 0; i < this.palabra().length; i++) {

      if (this.palabra()[i] === letra) {
        // alert('la letra es ' + letra)
        palabraActualizada[i] = letra;
      }
    }

    this.palabraOculta.set(palabraActualizada);
  }

  async verificarEstadoDePartida() {

    // lose
    if (this.errores() >= this.maxerrores) {

      this.gameOver.set(true);
      this.win.set(false);

      await this.registrarResultados();

      return;
    }

    // win
    if (!this.palabraOculta().includes('_')) {

      this.gameOver.set(true);
      this.win.set(true);

      await this.registrarResultados();
    }
  }


  async registrarResultados() {

    const user = this.auth.user();
    const duracion = Date.now() - this.tiempoInicio()

    if (!user) return;

    await this.ahorcado.guardarPartida({
      usuario_id: user.id,
      palabra: this.palabra(),
      resultado: this.win() ? 'ganada' : 'perdida',
      errores: this.errores(),
      duracion: duracion,
      letras_seleccionadas: this.letrasSeleccionadas().length
    });

    this.tiempoPartida.set(duracion);

    // alert(`tiempo jugado ${(Date.now() - this.tiempoInicio())/1000}`);
  }
}
