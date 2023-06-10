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
               payload: localStorage.getItem('chat')
           }
       }
     });
    this.ioSocket.on('mensaje-foro', (res: any) => this.outEven.emit(res));

    this.ioSocket.on('conectados', (res:any) => this.connectUserEven.emit(res))
   }

   emitEvent = (event = 'foro',payload = {}) => {
    this.ioSocket.emit('foro', {
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
}
