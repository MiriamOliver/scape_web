import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface'
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getUsuariosConectados() {
    return this.http.get<Usuario>(`${this.baseUrl}/jugador/conectados/`,);
  }

}
