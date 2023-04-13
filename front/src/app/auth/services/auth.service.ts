import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro, RespRegistro, Login, Auth } from '../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private usuario: Registro[];
  private auth: Auth | undefined;

  constructor(
    private http: HttpClient
  ) {
    this.usuario = [];
  }

    registro(usuario: Registro): Observable<RespRegistro> {
      const formReg = new FormData();
      formReg.append('archivo', usuario.avatar);
      formReg.append('nombre', usuario.nombre);
      formReg.append('email',  usuario.email);
      formReg.append('password', usuario.password);

      return this.http.post<RespRegistro>(`${ this.baseUrl }/registro`, formReg);
    }

    login(usuario:Login): Observable<Auth>  {

      return this.http.post<Auth>(`${ this.baseUrl }/login`, usuario)
        .pipe(tap(auths => this.auth = auths));
    }
}
