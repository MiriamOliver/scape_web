import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Socket }  from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministradorsocketService extends Socket{

  @Output() listadoEnigmaEven: EventEmitter<any> = new EventEmitter();
  @Output() listaPartidasEven: EventEmitter<any> = new EventEmitter();
  @Output() listaUsuariosEven: EventEmitter<any> = new EventEmitter();
  @Output() listaJugadoresEven: EventEmitter<any> = new EventEmitter();

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
   super({
      url: environment.serverSocket,
      options: {
          query: {
              payload: localStorage.getItem('datosAdmin')
          }
      }
    });
    this.ioSocket.on('listadoenigmas', (res: any) => this.listadoEnigmaEven.emit(res))

    this.ioSocket.on('listadopartidas', (res: any) => this.listaPartidasEven.emit(res))

    this.ioSocket.on('listadousuarios', (res: any) => this.listaUsuariosEven.emit(res))

    this.ioSocket.on('listadojugadores', (res:any) => this.listaJugadoresEven.emit(res))
  }

  borrarEnigmaEvent = (event = 'borrarenigma',payload = {}) => {
    this.ioSocket.emit('borrarenigma', {
        event,
        payload
    });
  }

  deshabilitarUsuarioEvent = (event = 'habilitarusuarios',payload = {}) => {
    this.ioSocket.emit('habilitarusuarios', {
        event,
        payload
    });
  }

  actualizarPerfil = (event = 'actualizarusuario', payload:any) => {
    console.log(payload);
    this.ioSocket.emit('actualizarusuario', {
        event,
        payload
    });
  }

  listadoEnigmasEvent = (event = 'listadoenigmas',payload = {}) => {
    this.ioSocket.emit('listadoenigmas', {
        event,
        payload
    });
  }

  listadoPartidasEvent = (event = 'listadopartidas',payload = {}) => {
    this.ioSocket.emit('listadopartidas', {
        event,
        payload
    });
  }

  listadoUsuariosEvent = (event = 'listadousuarios',payload = {}) => {
    this.ioSocket.emit('listadousuarios', {
        event,
        payload
    });
  }

  actualizarEnigma = (event = 'actualizarenigmas',payload = {}) => {
    this.ioSocket.emit('actualizarenigmas', {
        event,
        payload
    });
  }

  crearEnigma = (event = 'crearenigmas',payload = {}) => {
    this.ioSocket.emit('crearenigmas', {
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
