import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/pages/register/register.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'jugador',
    loadChildren: () => import('./jugador/jugador.module').then( m => m.JugadorModule),
  },
  {
    path: '**',
    redirectTo: ''
    //loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
