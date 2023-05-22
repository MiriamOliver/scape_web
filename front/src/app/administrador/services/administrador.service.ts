import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador, Enigma, Partida } from '../interfaces/administrador.interface';
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  obtenerEnigma(id:any):Observable<Enigma>{
    return this.http.get<Enigma>(`${this.baseUrl}/enigmas/mostrar/${id}`,);
  }

  obtenerEnigmasCreados(id:any):Observable<Enigma>{
    return this.http.get<Enigma>(`${this.baseUrl}/enigmas/mostrar/creados/${id}`,);
  }

  obtenerPartida(id:any):Observable<Partida>{
    return this.http.get<Partida>(`${this.baseUrl}/partida/mostrar/${id}`,);
  }
}
