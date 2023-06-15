import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { UsuariosconectadosComponent } from './usuariosconectados/usuariosconectados.component';
import { ForoComponent } from './foro/foro.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChatComponent,
    UsuariosconectadosComponent,
    ForoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ForoComponent,
    ChatComponent,
    UsuariosconectadosComponent
  ]
})
export class ForoModule { }
