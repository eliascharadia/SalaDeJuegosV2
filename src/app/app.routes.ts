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

export const routes: Routes = [
    { path: '', component: BienvenidaHome },
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        component: BienvenidaHome,
        canActivate: [authGuard], // cuando haga el guard ponerlo aca
    },
    {path: 'ahorcado', component: Ahorcado, canActivate: [authGuard]},
    {path: 'mayormenor', component: Mayormenor, canActivate: [authGuard]},
    {path: 'preguntados', component: Preguntados, canActivate: [authGuard]},
    {path: 'simondice', component: Simondice, canActivate: [authGuard]},
    {path: 'chat', component: Chat, canActivate: [authGuard]},
    {path: 'listado', component: Listado, canActivate: [authGuard]},
    { path: 'login', component: Login },
    { path: 'register', component: Registro },
    { path: 'quiensoy', component: QuienSoy },
    { path: '**', redirectTo: '' }
];
