import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VisitasComponent } from './components/visitas/visitas.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'visitas', component: VisitasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' } 
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
