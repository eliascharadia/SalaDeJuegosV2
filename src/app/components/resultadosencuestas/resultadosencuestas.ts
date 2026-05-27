import { Component, inject, signal } from '@angular/core';
import { EncuestasService } from '../../services/encuestas-service';


@Component({
  selector: 'app-resultadosencuestas',
  imports: [],
  templateUrl: './resultadosencuestas.html',
  styleUrl: './resultadosencuestas.css',
})
export class Resultadosencuestas {
  private encuestasService = inject(EncuestasService);


  encuestas = signal<any[]>([]);

  async ngOnInit() {

    const { data, error } = await this.encuestasService.getEncuestas();

    if (data) {
      this.encuestas.set(data);
    }
  }

}
