import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida, Jugador } from '../interfaces/jugador.interface';
import { environment } from './../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPartidasDisponibles():Observable<Partida> {
    return this.http.get<Partida>(`${this.baseUrl}/partidas/disponibles`);
  }

  crearPartida(id:number):Observable<Partida>{
    return this.http.post<Partida>(`${this.baseUrl}/partidas/crear`, {anfitrion: id});
  }

  getJugadoresPartida(id:number):Observable<Jugador>{
    return this.http.get<Jugador>(`${this.baseUrl}/partidas/sala/${id}`,);
  }
}
