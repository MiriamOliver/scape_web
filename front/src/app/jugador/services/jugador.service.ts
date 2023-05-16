import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida, Jugador, InfoPartida, Juego, ResultadoJugador } from '../interfaces/jugador.interface';
import { environment } from './../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class JugadorService  {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getPartidasDisponibles(id:number) {
    return this.http.get<Partida>(`${this.baseUrl}/partidas/disponibles/${id}`);
  }

  getPartidasCreadas(id:number) {
    return this.http.get<Partida>(`${this.baseUrl}/partidas/creadas/${id}`);
  }
  getPartidasEnCurso(id:number) {
    return this.http.get<Partida>(`${this.baseUrl}/partidas/curso/${id}`);
  }

  crearPartida(id:number):Observable<Partida>{
    return this.http.post<Partida>(`${this.baseUrl}/partidas/crear`, {anfitrion: id});
  }

  getPartida(id:number):Observable<InfoPartida>{
    return this.http.get<InfoPartida>(`${this.baseUrl}/partidas/sala/${id}`,);
  }

  unirsePartida(iduser:number, id:any):Observable<Partida>{
    return this.http.post<Partida>(`${this.baseUrl}/partidas/unirse`, {id_partida: id, id_jugador: iduser});
  }

  finalizarPartida(id:number, resultado:string, tiempo:string) {
    console.log(tiempo)
    return this.http.put<Partida>(`${this.baseUrl}/partidas/resultado/${id}`, {id:id, resultado:resultado, tiempo:tiempo});
  }

  getResultadoPartida(id:number):Observable<Juego>{
    return this.http.get<Juego>(`${this.baseUrl}/partidas/resultado/partida/${id}`,);
  }

  getResultadoJugadorPartida(id:number){
    return this.http.get<ResultadoJugador>(`${this.baseUrl}/partidas/resultado/jugadores/${id}`,);
  }
}
