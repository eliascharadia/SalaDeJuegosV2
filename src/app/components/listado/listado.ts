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


  ahorcado = signal<any[]>([]);
  mayorMenor = signal<any[]>([]);
  preguntados = signal<any[]>([]);
  simonDice = signal<any[]>([]);


  constructor() {
    effect(() => {
      this.hacerRankingAhrocado();
      console.log(this.ahorcado())
      this.hacerRankingMayoromenor();
      this.hacerRankingPreguntados();
      this.hacerRankingSimondice();
    })
  }


  ngOnInit() {
    this.ahrocadoService.getResultados();
    this.mayorMenorService.getResultados();
    this.preguntadosService.getResultados();
    this.simondiceService.getResultados();
  }

  hacerRankingAhrocado() {
    const ranking = new Map<string, number>();

    this.ahrocadoService.datos().forEach(d => {

      const nombre = d.usuarios?.nombre ?? 'Desconocido';

      const actual = ranking.get(nombre);

      if (actual === undefined || d.duracion < actual) {
        ranking.set(nombre, d.duracion);
      }

    });

    const top5 = Array.from(ranking.entries())
      .sort((a, b) => a[1] - b[1]) // MENOR a MAYOR
      .slice(0, 5)
      .map(([nombre, duracion]) => ({
        nombre,
        duracion
      }));

    this.ahorcado.set(top5);

  }


  hacerRankingMayoromenor() {
    const ranking = new Map<string, number>();

    this.mayorMenorService.datos().forEach(p => {

      const nombre = p.usuarios?.nombre ?? 'Desconocido';

      const actual = ranking.get(nombre) ?? 0;

      ranking.set(nombre, actual + p.puntaje);

    });

    const top5 = Array.from(ranking.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nombre, puntaje]) => ({
        nombre,
        puntaje
      }));

    this.mayorMenor.set(top5);

  }

  hacerRankingPreguntados() {
    const ranking = new Map<string, number>();

    this.preguntadosService.datos().forEach(p => {

      const nombre = p.usuarios?.nombre ?? 'Desconocido';

      const actual = ranking.get(nombre) ?? 0;

      ranking.set(nombre, actual + p.puntaje);

    });

    const top5 = Array.from(ranking.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nombre, puntaje]) => ({
        nombre,
        puntaje
      }));

    this.preguntados.set(top5);

  }

  hacerRankingSimondice() {
    const ranking = new Map<string, number>();

    this.simondiceService.datos().forEach(p => {

      const nombre = p.usuarios?.nombre ?? 'Desconocido';

      const actual = ranking.get(nombre) ?? 0;

      ranking.set(nombre, actual + p.record);

    });

    const top5 = Array.from(ranking.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nombre, record]) => ({
        nombre,
        record
      }));

    this.simonDice.set(top5);

  }



}
