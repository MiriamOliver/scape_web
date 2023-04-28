import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida, Jugador } from '../interfaces/jugador.interface';
import { environment } from './../../../environments/environment'
import { Socket }  from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class JugadorService  extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
    super({
      url: environment.serverSocket,
      options: {
          query: {
              payload: localStorage.getItem('chat')
          }
      }
    });
    this.ioSocket.on('message', (res: any) => this.outEven.emit(res))
  }

  emitEvent = (event = 'default',payload = {}) => {
    console.log(localStorage.getItem('chat'))
    this.ioSocket.emit('default', {
        cookiePayload:localStorage.getItem('chat'),
        event,
        payload
    });
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

  getJugadoresPartida(id:number):Observable<Jugador>{
    return this.http.get<Jugador>(`${this.baseUrl}/partidas/sala/${id}`,);
  }
}
