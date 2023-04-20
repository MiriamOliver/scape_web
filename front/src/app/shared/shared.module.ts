import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuJugadorComponent } from './menu-jugador/menu-jugador.component';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';
import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    MenuJugadorComponent,
    MenuAdministradorComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    MenuComponent,
    MenuAdministradorComponent,
    MenuJugadorComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
