import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Socket }  from 'ngx-socket-io';
import { Enigma, Juego } from '../interfaces/jugador.interface';


@Injectable({
  providedIn: 'root'
})
export class JugadorsocketService extends Socket{

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() connectUserEven: EventEmitter<any> = new EventEmitter();
  @Output() desconnectUserEven: EventEmitter<any> = new EventEmitter();
  @Output() estadoPartidaEven: EventEmitter<any> = new EventEmitter();
  @Output() enigmaEven: EventEmitter<any> = new EventEmitter();
  @Output() estadoJuegoEven: EventEmitter<any> = new EventEmitter();
  @Output() usuarioActivo: EventEmitter<any> = new EventEmitter();
  @Output() listaPartidas: EventEmitter<any> = new EventEmitter();


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

    this.ioSocket.on('desconectado', (res:any) => this.connectUserEven.emit(res))

    this.ioSocket.on('conectados', (res:any) => this.connectUserEven.emit(res))

    this.ioSocket.on('juego', (res:any) => this.estadoPartidaEven.emit(res))

    this.ioSocket.on('enigmas', (res:Enigma) => this.enigmaEven.emit(res))

    this.ioSocket.on('actualizarpartida', (res:Juego) => this.estadoJuegoEven.emit(res))

    this.ioSocket.on('contestarenigma', (res:any) => this.usuarioActivo.emit(res))

    this.ioSocket.on('listadodisponibles', (res:any) => this.listaPartidas.emit(res))
  }

  emitEvent = (event = 'default',payload = {}) => {
    console.log(localStorage.getItem('chat'))
    this.ioSocket.emit('default', {
        cookiePayload:localStorage.getItem('chat'),
        event,
        payload
    });
  }

  userConectadosEvent = (event = 'conectados',payload = {}) => {
    this.ioSocket.emit('conectados', {
        event,
        payload
    });
  }

  userDesconectadoEvent = (event = 'desconectado',payload = {}) => {
    this.ioSocket.emit('desconectado', {
        event,
        payload
    });
  }

  empezarPartidaEvent = (event = 'juego',payload = {}) => {
    this.ioSocket.emit('juego', {
        event,
        payload
    });
  }

  enigmasEvent = (event = 'enigmas', payload = {}) => {
    this.ioSocket.emit('enigmas', {
      event,
      payload
    });
  }

  actualizarJuegoEvent =  (event = 'actualizarpartida', payload = {}) => {
    this.ioSocket.emit('actualizarpartida', {
      event,
      payload
    });
  }

  actualizarJugadorEvent =  (event = 'actualizarjugador', payload = {}) => {
    this.ioSocket.emit('actualizarjugador', {
      event,
      payload
    });
  }

  activarJugadorEvent =  (event = 'activarjugador', payload = {}) => {
    this.ioSocket.emit('activarjugador', {
      event,
      payload
    });
  }

  contestarEnigmaEvent = (event = 'contestarenigma', payload = {}) => {
    this.ioSocket.emit('activarjugador', {
      event,
      payload
    });
  }

  listarPartidas = (event = 'listadodisponibles', payload = {}) => {
    this.ioSocket.emit('listadodisponibles', {
      event,
      payload
    });
  }

}
