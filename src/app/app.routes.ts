import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { QuienSoy } from './components/quien-soy/quien-soy';
import { BienvenidaHome } from './components/bienvenida-home/bienvenida-home';
import { Ahorcado } from './components/ahorcado/ahorcado';
import { authGuard } from  './guards/auth'

export const routes: Routes = [
    { path: '', component: BienvenidaHome },
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        component: BienvenidaHome,
        canActivate: [authGuard], // cuando haga el guard ponerlo aca
    },
    {path: 'ahorcado', component: Ahorcado, canActivate: [authGuard]},
    { path: 'login', component: Login },
    { path: 'register', component: Registro },
    { path: 'quiensoy', component: QuienSoy },
    { path: '**', redirectTo: '' }
];
