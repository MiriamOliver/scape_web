import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Socket }  from 'ngx-socket-io';
import { Enigma, Juego } from '../interfaces/jugador.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketpartidaService extends Socket{

  @Output() listaPartidas: EventEmitter<any> = new EventEmitter();
  @Output() listaJugadoresEven: EventEmitter<any> = new EventEmitter();


  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
   super({
      url: environment.serverSocket,
      options: {
          query: {
              payload: localStorage.getItem('datosJugador')
          }
      }
    });

    this.ioSocket.on('listadodisponibles', (res:any) => this.listaPartidas.emit(res))

    this.ioSocket.on('listadojugadores', (res:any) => this.listaJugadoresEven.emit(res))
  }

  listarPartidas = (event = 'listadodisponibles', payload = {}) => {
    this.ioSocket.emit('listadodisponibles', {
      event,
      payload
    });
  }

  listadoJugadoresEvent = (event = 'listadojugadores', payload = {}) => {
    this.ioSocket.emit('listadojugadores', {
      event,
      payload
    });
  }

}
