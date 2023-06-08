import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciojugadorComponent } from './pages/iniciojugador/iniciojugador.component';
import { PartidasComponent } from './pages/partidas/partidas/partidas.component';
import { SalaComponent } from './pages/partidas/sala/sala.component';
import { JuegoComponent } from './pages/partidas/juego/juego.component';
import { ResultadoComponent } from './pages/partidas/resultado/resultado.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { RankingComponent } from './pages/jugadores/ranking/ranking.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'inicio', component: IniciojugadorComponent },
      { path: 'partida', component: PartidasComponent},
      { path: 'partida/sala/:id', component: SalaComponent},
      { path: 'partida/juego/:id', component: JuegoComponent},
      { path: 'partida/resultado/:id', component: ResultadoComponent},
      { path: 'historial', component: HistorialComponent},
      { path: 'ranking', component: RankingComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadorRoutingModule { }
