import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida } from '../interfaces/jugador.interface';
import { environment } from './../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPartidasDisponibles():Observable<Partida> {
    return this.http.get<Partida>(`${this.baseUrl}/jugador/partidas`);
  }
}
