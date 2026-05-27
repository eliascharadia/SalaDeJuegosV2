import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-encuesta',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.css',
})
export class Encuesta {
  private fb = inject(FormBuilder);
  private supabase = inject(SupabaseService);
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
  router: any;


  async onSubmit() {
    this.loading.set(true);
    const formValue = this.encuestaForm.value;
    const usuarioId = this.auth.user()?.id;
  
    const juegos = [];
  
    if (formValue.ahorcado) juegos.push('ahorcado');
    if (formValue.mayorMenor) juegos.push('mayorMenor');
    if (formValue.preguntados) juegos.push('preguntados');
    if (formValue.simonDice) juegos.push('simonDice');

    const { error } = await this.supabase.getClient()
    .from('encuestas')
    .insert({
      usuario_id: usuarioId,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      edad: formValue.edad,
      numero: formValue.numero,
      pregunta1: formValue.pregunta1,
      juegos: juegos,
      pregunta3: formValue.pregunta3
    });

    if (error) {
      console.log(error);
      alert('Error al guardar la encuesta');
      return;
    }

    this.encuestaForm.reset();

    this.router.navigate(['/resultados']);

    this.loading.set(false);
  }

}
