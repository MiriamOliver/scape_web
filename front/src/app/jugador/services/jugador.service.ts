import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';
import { environment } from './../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getJugadoresConectados() {
    return this.http.get<Jugador>(`${this.baseUrl}/jugador/conectados/`,);
  }

}
