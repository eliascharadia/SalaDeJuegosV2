import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { UsuarioRegistro } from '../../models/usuario';


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private auth = inject(Auth);
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    name: ['',[Validators.required,Validators.required]],
    lastname: ['',[Validators.required,Validators.required]],
    age: [0,[Validators.required,Validators.max(100), Validators.min(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  })

  usuarioData: UsuarioRegistro = {
      nombre: this.registerForm.value.name?? '',
      apellido: this.registerForm.value.lastname?? '',
      edad: this.registerForm.value.age?? 0,
      email: this.registerForm.value.email?? '',
      password: this.registerForm.value.password?? ''
  }
  
  loading = signal(false);
  errorMensaje = signal<string | null>(null);
  
  async onSubmit(){
    this.usuarioData = {
      nombre: this.registerForm.value.name?? '',
      apellido: this.registerForm.value.lastname?? '',
      edad: this.registerForm.value.age?? 0,
      email: this.registerForm.value.email?? '',
      password: this.registerForm.value.password?? ''
    };
    
    this.loading.set(true);
    const res = await this.auth.register(this.usuarioData);
    if (res !== null){
      this.errorMensaje.set(res)
    }
    this.auth.userRecienRegistrado.set(true);
    this.loading.set(false);
  }
}
