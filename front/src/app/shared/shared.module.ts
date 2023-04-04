import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuJugadorComponent } from './menu-jugador/menu-jugador.component';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';



@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    MenuJugadorComponent,
    MenuAdministradorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
