import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth); 
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  loading = signal(false);
  errorMensaje = signal<string | null>(null);
  
  async onSumbit(){
    this.loading.set(true);
    const success = await this.auth.login(this.loginForm.value.email?? '', this.loginForm.value.password?? '');
    if(!success)this.errorMensaje.set('Error de credenciales');
    this.loading.set(false);
  }

  quickLogin(usuario: string) {

    switch(usuario) {

      case 'user1':
        this.loginForm.setValue({
          email: 'user1@gmail.com',
          password: '123456'
        })
        break;

      case 'user2':
        this.loginForm.setValue({
          email: 'user2@gmail.com',
          password: '123456'
        })
        break;

      case 'user3':
        this.loginForm.setValue({
          email: 'user3@gmail.com',
          password: '123456'
        })
        break;
    }
}
}
