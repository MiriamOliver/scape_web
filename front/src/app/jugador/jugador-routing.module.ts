import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciojugadorComponent } from './pages/iniciojugador/iniciojugador.component';
import { PartidasComponent } from './pages/partidas/partidas.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'inicio', component: IniciojugadorComponent },
      { path: 'partida', component: PartidasComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadorRoutingModule { }
