import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciojugadorComponent } from './pages/iniciojugador/iniciojugador.component';
import { JugadorRoutingModule } from './jugador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PartidasComponent } from './pages/partidas/partidas/partidas.component';
import { AgregarComponent } from './pages/partidas/agregar/agregar.component';
import { SalaComponent } from './pages/partidas/sala/sala.component';
import { ChatComponent } from './pages/partidas/chat/chat.component';
import { JuegoComponent } from './pages/partidas/juego/juego.component';
import { JugadoresconectadosComponent } from './pages/partidas/jugadoresconectados/jugadoresconectados.component';
import { JugadoressalaComponent } from './pages/partidas/jugadoressala/jugadoressala.component';
import { EnigmasComponent } from './pages/partidas/enigmas/enigmas.component';


@NgModule({
  declarations: [
    IniciojugadorComponent,
    PartidasComponent,
    AgregarComponent,
    SalaComponent,
    ChatComponent,
    JuegoComponent,
    JugadoresconectadosComponent,
    JugadoressalaComponent,
    EnigmasComponent,
  ],
  imports: [
    CommonModule,
    JugadorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class JugadorModule { }
