import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RecuperacionPasswdComponent } from './pages/recuperacion-passwd/recuperacion-passwd.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: MainAuthComponent},
      { path: 'registro', component: MainAuthComponent },
      { path: '', component: InicioComponent },
      { path: 'recpasswd', component: MainAuthComponent },
      { path: 'genpasswd', component: MainAuthComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
