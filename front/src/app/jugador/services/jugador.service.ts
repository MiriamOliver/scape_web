import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida, Jugador, InfoPartida, Juego, ResultadoJugador, DatosPartida } from '../interfaces/jugador.interface';
import { environment } from './../../../environments/environment'
import { Estadistica } from 'src/app/administrador/interfaces/administrador.interface';


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

  finalizarPartida(id:number, resultado:string, tiempo:string, id_user:number, llaves:number) {
    return this.http.put<Partida>(`${this.baseUrl}/partidas/resultado/${id}`, {id:id, resultado:resultado, tiempo:tiempo, id_user:id_user, llaves:llaves});
  }

  getResultadoPartida(id:number):Observable<Juego>{
    return this.http.get<Juego>(`${this.baseUrl}/partidas/resultado/partida/${id}`,);
  }

  getResultadoJugadorPartida(id:number){
    return this.http.get<ResultadoJugador>(`${this.baseUrl}/partidas/resultado/jugadores/${id}`,);
  }

  obtenerPartida(id:any):Observable<DatosPartida>{
    return this.http.get<DatosPartida>(`${this.baseUrl}/partidas/mostrar/${id}`,);
  }

  obtenerJugador(id:any):Observable<Estadistica>{
    return this.http.get<Estadistica>(`${this.baseUrl}/usuarios/jugador/estadistica/${id}`,);
  }

  listaPartidasUsuario(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/partidas/jugador/${id}`);
  }
}
