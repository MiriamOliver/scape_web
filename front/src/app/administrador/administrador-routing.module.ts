import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioadministradorComponent } from './pages/inicioadministrador/inicioadministrador.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'inicio', component: InicioadministradorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
