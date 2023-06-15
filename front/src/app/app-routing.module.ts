import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorModule),
  },
  {
    path: '**',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
