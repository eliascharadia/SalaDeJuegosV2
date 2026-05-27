import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { QuienSoy } from './components/quien-soy/quien-soy';
import { BienvenidaHome } from './components/bienvenida-home/bienvenida-home';
import { Ahorcado } from './components/ahorcado/ahorcado';
import { authGuard } from  './guards/auth'
import { Mayormenor } from './components/mayormenor/mayormenor';
import { Chat } from './components/chat/chat';
import { Preguntados } from './components/preguntados/preguntados';
import { Simondice } from './components/simondice/simondice';
import { Listado } from './components/listado/listado';
import { Encuesta } from './components/encuesta/encuesta';
import { adminGuard } from './guards/admin-guard';
import { Resultadosencuestas } from './components/resultadosencuestas/resultadosencuestas';

export const routes: Routes = [
    { path: '', component: BienvenidaHome },
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        component: BienvenidaHome,
        canActivate: [authGuard], // cuando haga el guard ponerlo aca
    },
    {
        path: 'resultados',
        component: Resultadosencuestas,
        canActivate: [adminGuard]
    },
    {
    path: 'ahorcado',
    loadComponent: () =>
      import('./components/ahorcado/ahorcado')
        .then(m => m.Ahorcado),
    canActivate: [authGuard]
  },
  {
    path: 'mayormenor',
    loadComponent: () =>
      import('./components/mayormenor/mayormenor')
        .then(m => m.Mayormenor),
    canActivate: [authGuard]
  },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('./components/preguntados/preguntados')
        .then(m => m.Preguntados),
    canActivate: [authGuard]
  },
  {
    path: 'simondice',
    loadComponent: () =>
      import('./components/simondice/simondice')
        .then(m => m.Simondice),
    canActivate: [authGuard]
  },
  {
    path: 'simondice',
    loadComponent: () =>
      import('./components/simondice/simondice')
        .then(m => m.Simondice),
    canActivate: [authGuard]
  },
    {path: 'chat', component: Chat, canActivate: [authGuard]},
    {path: 'encuesta', component: Encuesta, canActivate: [authGuard]},
    {path: 'listado', component: Listado, canActivate: [authGuard]},
    { path: 'login', component: Login },
    { path: 'register', component: Registro },
    { path: 'quiensoy', component: QuienSoy },
    { path: '**', redirectTo: '' }
];
