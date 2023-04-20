import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciojugadorComponent } from './pages/iniciojugador/iniciojugador.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'inicio', component: IniciojugadorComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadorRoutingModule { }
