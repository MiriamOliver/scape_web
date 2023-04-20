import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioadministradorComponent } from './pages/inicioadministrador/inicioadministrador.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InicioadministradorComponent
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
