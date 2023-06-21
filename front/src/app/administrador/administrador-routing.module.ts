import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioadministradorComponent } from './pages/inicioadministrador/inicioadministrador.component';
import { EnigmasComponent } from './pages/enigmas/enigmas/enigmas.component';
import { CrearComponent } from './pages/enigmas/crear/crear.component';
import { PartidasComponent } from './pages/partidas/partidas/partidas.component';
import { UsuariosComponent } from './pages/users/usuarios/usuarios.component';
import { ModificarusuariosComponent } from './pages/users/modificarusuarios/modificarusuarios.component';
import { CrearusuariosComponent } from './pages/users/crearusuarios/crearusuarios.component';
import { PartidasjugadorComponent } from './pages/jugador/partidasjugador/partidasjugador.component';
import { RankingjugadorComponent } from './pages/jugador/rankingjugador/rankingjugador.component';
import { ForoComponent } from '../foro/foro/foro.component';
import { ModificarperfilComponent } from '../perfil/modificarperfil/modificarperfil.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'inicio', component: InicioadministradorComponent },
      { path: 'enigmas', component: EnigmasComponent},
      { path: 'enigma/crear', component: CrearComponent},
      { path: 'enigma/editar/:id', component: CrearComponent},
      { path: 'partidas', component: PartidasComponent},
      { path: 'usuarios', component: UsuariosComponent},
      { path: 'usuarios/editar/:id', component: ModificarusuariosComponent},
      { path: 'usuarios/crear', component:CrearusuariosComponent},
      { path: 'ranking/jugadores', component: RankingjugadorComponent},
      { path: 'historial/partida/:id', component: PartidasjugadorComponent},
      { path: 'foro', component: ForoComponent},
      { path: 'modificar/perfil', component: ModificarperfilComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdministradorRoutingModule { }
