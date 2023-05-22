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
  }

  borrarEnigmaEvent = (event = 'borrarenigma',payload = {}) => {
    this.ioSocket.emit('borrarenigma', {
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
}
