import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciojugadorComponent } from './pages/iniciojugador/iniciojugador.component';
import { JugadorRoutingModule } from './jugador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PartidasComponent } from './pages/partidas/partidas.component';


@NgModule({
  declarations: [
    IniciojugadorComponent,
    PartidasComponent,
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
