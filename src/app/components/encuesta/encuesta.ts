import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { EncuestasService } from '../../services/encuestas-service';

@Component({
  selector: 'app-encuesta',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.css',
})
export class Encuesta {
  private fb = inject(FormBuilder);
  private encuestaService = inject(EncuestasService);
  private auth = inject(Auth);


  encuestaForm = this.fb.group({

    nombre: ['', [Validators.required]],

    apellido: ['', [Validators.required]],

    edad: ['', [
      Validators.required,
      Validators.min(18),
      Validators.max(99)
    ]],

    numero: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]],

    pregunta1: ['', Validators.required],

    ahorcado: [false],
    mayorMenor: [false],
    preguntados: [false],
    simonDice: [false],

    pregunta3: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });


  loading = signal(false);
  errorMensaje = signal<string | null>(null);
  mostrarModal = signal(false);
  router = inject(Router);

  async onSubmit() {
    this.loading.set(true);
    const valoresFormulario = this.encuestaForm.value;
    const usuarioId = this.auth.user()?.id;
  
    const juegos = [];
  
    if (valoresFormulario.ahorcado) juegos.push('ahorcado');
    if (valoresFormulario.mayorMenor) juegos.push('mayorMenor');
    if (valoresFormulario.preguntados) juegos.push('preguntados');
    if (valoresFormulario.simonDice) juegos.push('simonDice');

    this.encuestaService.guardarResultados(usuarioId, valoresFormulario, juegos);

    this.encuestaForm.reset();

    // this.router.navigate(['/resultados']);
    this.mostrarModal.set(true);

    this.loading.set(false);
  }

  irInicio() {
    this.router.navigate(['/']);
  }

}
