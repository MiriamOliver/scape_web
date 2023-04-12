import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro } from '../interfaces/auth.interface';
import { RespRegistro } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private usuario: Registro[];

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
}
