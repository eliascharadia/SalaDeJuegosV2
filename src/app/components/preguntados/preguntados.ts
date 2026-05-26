import { Component, computed, effect, inject, signal } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados-service';
import { Pregunta } from '../../models/pregunta';

@Component({
  selector: 'app-preguntados',
  imports: [],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css',
})
export class Preguntados {
  preguntadosService = inject(PreguntadosService);

  preguntas = signal<Pregunta[]>([]);

  currentIndex = signal(0);

  puntaje = signal(0);

  partidaFinalizada = signal(false);

  respuestas = signal<string[]>([]);

  constructor() {

    effect(() => {

      const data = this.preguntadosService.resultados();

      if (data.length > 0) {

        this.preguntas.set(data);

        this.currentIndex.set(0);

        this.puntaje.set(0);

        this.partidaFinalizada.set(false);
      }
    });

  }


  ngOnInit() {
    this.empezarPartida()
  }
  
  empezarPartida() {
    this.preguntadosService.obtenerPreguntas();
  }

  traerRespuestas(pregunta: Pregunta) {

    if (!pregunta) return [];

    const all = [
      pregunta.correct_answer,
      ...pregunta.incorrect_answers
    ];

    return all.sort(() => Math.random() - 0.5);
  }

  responder(respuestaElegida: string) {

    const pregunta = this.preguntas()[this.currentIndex()];

    if (respuestaElegida === pregunta.correct_answer) {
      this.puntaje.update(p => p + 1);
    }

    if (this.currentIndex() + 1 >= this.preguntas().length) {

      this.partidaFinalizada.set(true);

      this.preguntadosService.guardarPartida(this.puntaje());

    } else {

      this.currentIndex.update(i => i + 1);
    }
  }


}
