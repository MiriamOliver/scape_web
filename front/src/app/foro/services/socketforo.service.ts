import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Socket }  from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketforoService  extends Socket{

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() connectUserEven: EventEmitter<any> = new EventEmitter();

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {

    super({
       url: environment.serverSocket,
       options: {
           query: {
               payload: localStorage.getItem('foro')
           }
       }
     });
    this.ioSocket.on('mensaje-foro', (res: any) => this.outEven.emit(res));

    this.ioSocket.on('conectados-foro', (res:any) => this.connectUserEven.emit(res))
   }

   emitEvent = (event = 'mensaje-foro',payload = {}) => {
    this.ioSocket.emit('mensaje-foro', {
        event,
        payload
    });
  }

  emitFileEvent = (event = 'archivo-foro',payload = {}) => {
    this.ioSocket.emit('archivo-foro', {
        event,
        payload
    });
  }

  userConectadosEvent = (event = 'conectados-foro',payload = {}) => {
    this.ioSocket.emit('conectados-foro', {
        event,
        payload
    });
  }

  userDesconectadoEvent = (event = 'desconectado-foro',payload = {}) => {
    this.ioSocket.emit('desconectado-foro', {
        event,
        payload
    });
  }

  recargarMensajes = (event = 'recargar-foro',payload = {}) => {
    this.ioSocket.emit('recargar-foro', {
        event,
        payload
    });
  }
}
