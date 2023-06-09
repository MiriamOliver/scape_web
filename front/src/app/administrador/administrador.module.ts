import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioadministradorComponent } from './pages/inicioadministrador/inicioadministrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListadoEnigmasComponent } from './pages/enigmas/listadoenigmas/listadoenigmas.component';
import { EnigmasComponent } from './pages/enigmas/enigmas/enigmas.component';
import { CrearComponent } from './pages/enigmas/crear/crear.component';
import { PartidasComponent } from './pages/partidas/partidas/partidas.component';
import { ListadopartidasComponent } from './pages/partidas/listadopartidas/listadopartidas.component';
import { UsuariosComponent } from './pages/users/usuarios/usuarios.component';
import { ListadousuariosComponent } from './pages/users/listadousuarios/listadousuarios.component';
import { CrearusuariosComponent } from './pages/users/crearusuarios/crearusuarios.component';
import { ModificarusuariosComponent } from './pages/users/modificarusuarios/modificarusuarios.component';
import { RankingjugadorComponent } from './pages/jugador/rankingjugador/rankingjugador.component';
import { PartidasjugadorComponent } from './pages/jugador/partidasjugador/partidasjugador.component';


@NgModule({
  declarations: [
    InicioadministradorComponent,
    EnigmasComponent,
    ListadoEnigmasComponent,
    CrearComponent,
    PartidasComponent,
    ListadopartidasComponent,
    UsuariosComponent,
    ListadousuariosComponent,
    CrearusuariosComponent,
    ModificarusuariosComponent,
    RankingjugadorComponent,
    PartidasjugadorComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class AdministradorModule { }
