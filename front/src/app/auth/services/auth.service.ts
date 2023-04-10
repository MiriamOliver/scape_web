import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Registro } from '../interfaces/auth.interface';
import { RespRegistro } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Registro | undefined;

  constructor(
    private http: HttpClient
  ) {}

    registro(usuario: Registro) {
      console.log(usuario);
      return this.http.post<RespRegistro>(`${ this.baseUrl }/registro`, usuario);

    }
}
