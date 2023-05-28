import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador, Enigma, Partida, Perfil, Usuario } from '../interfaces/administrador.interface';
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
    return this.http.get<Partida>(`${this.baseUrl}/partidas/mostrar/${id}`,);
  }

  obtenerUsuario(id:any):Observable<Perfil>{
    return this.http.get<Perfil>(`${this.baseUrl}/usuarios/mostrar/${id}`,);
  }

  actualizarPerfil(perfil:Perfil):Observable<any>{
    const formReg = new FormData();
      formReg.append('id', perfil.id)
      formReg.append('archivo', perfil.avatar);
      formReg.append('nombre', perfil.nombre);
      formReg.append('rol', perfil.rol);

    return this.http.put<any>(`${this.baseUrl}/usuarios/actualizar`, formReg);
  }

  crearUsuario(usuario:Usuario):Observable<Usuario>{
    const formReg = new FormData();
      formReg.append('archivo', usuario.avatar);
      formReg.append('nombre', usuario.nombre);
      formReg.append('email',  usuario.email);
      formReg.append('password', usuario.password);
      formReg.append('verificado',  usuario.verificado);
      formReg.append('rol', usuario.rol);

    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/crear`, formReg);
  }

  generarUsuarios(datos:any):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/generar`, datos);
  }
}
