import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Socket }  from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministradorsocketService extends Socket{

  @Output() listadoEnigmaEven: EventEmitter<any> = new EventEmitter();

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
   super({
      url: environment.serverSocket,
      options: {
          query: {
              payload: localStorage.getItem('user')
          }
      }
    });
    this.ioSocket.on('listadoenigmas', (res: any) => this.listadoEnigmaEven.emit(res))
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



}
