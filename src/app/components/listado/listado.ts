import { Component, computed, effect, inject, signal } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado-service';
import { Mayormenorservice } from '../../services/mayormenorservice';
import { PreguntadosService } from '../../services/preguntados-service';
import { SimondiceService } from '../../services/simondice-service';
import { Auth } from '../../services/auth';




@Component({
  selector: 'app-listado',
  imports: [],
  templateUrl: './listado.html',
  styleUrl: './listado.css',
})
export class Listado {
  private ahrocadoService = inject(AhorcadoService);
  private mayorMenorService = inject(Mayormenorservice);
  private preguntadosService = inject(PreguntadosService);
  private simondiceService = inject(SimondiceService);

// Estadisticas de ahorcado
  partidasGanadas = computed(() => {

    return this.ahorcado()
      .filter(partida => partida.resultado === 'ganada')
      .length;

  });

  partidasPerdidas = computed(() => {

  return this.ahorcado()
    .filter(partida => partida.resultado === 'perdida')
    .length;

});


  mejorTiempoAhorcado = computed(() => {

    if (this.ahorcado().length === 0) return 0;

    return Math.min(
      ...this.ahorcado().map(d => d.duracion)
    );

  });


// Estadisticas de mayor o menor
  mejorRacha = computed(() => {

    if (this.mayorMenor().length === 0) return 0;

    return Math.max(
      ...this.mayorMenor().map(p => p.puntaje)
    );

  });

  // Estadisticas de preguntados

  mayorCantidadDeResuestas = computed(() => {

    if (this.preguntados().length === 0) return 0;

    return Math.max(
      ...this.preguntados().map(p => p.puntaje)
    );

  });

// Estadisticas de simon dice
  secuenciaMaxima = computed(() => {

    if (this.simonDice().length === 0) return 0;

    return Math.max(
      ...this.simonDice().map(p => p.record)
    );

  });


  private auth = inject(Auth);

  nombreUsuario = this.auth.user()?.nombre;

  ahorcado = signal<any[]>([]);
  mayorMenor = signal<any[]>([]);
  preguntados = signal<any[]>([]);
  simonDice = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.ahorcado.set(this.ahrocadoService.datos());
      this.mayorMenor.set(this.mayorMenorService.datos());
      this.preguntados.set(this.preguntadosService.datos());
      this.simonDice.set(this.simondiceService.datos());
    })
  }


  ngOnInit() {

    const userId = this.auth.user()?.id;

    if (!userId) return;
    this.ahrocadoService.getResultados(userId);
    this.mayorMenorService.getResultados(userId);
    this.preguntadosService.getResultados(userId);
    this.simondiceService.getResultados(userId);

  }



}
