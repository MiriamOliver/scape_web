import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface'
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUsuariosConectados(rol:string):Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/conectados/${rol}/${JSON.parse(localStorage.getItem('user')!).id}`);
  }
}
