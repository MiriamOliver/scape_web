import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { JugadorModule } from './jugador/jugador.module';
import { JugadorRoutingModule } from './jugador/jugador-routing.module';
import { SharedModule } from './shared/shared.module';
import { AdministradorModule } from './administrador/administrador.module';
import { AdministradorRoutingModule } from './administrador/administrador-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    AuthRoutingModule,
    AppRoutingModule,
    FormsModule,
    JugadorModule,
    JugadorRoutingModule,
    SharedModule,
    AdministradorModule,
    AdministradorRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
