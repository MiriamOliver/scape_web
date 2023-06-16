import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil } from '../interfaces/perfil.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {  }

    actualizarPerfil(perfil: Perfil): Observable<Perfil> {
      const formReg = new FormData();
      formReg.append('archivo', perfil.avatar);
      formReg.append('nombre', perfil.nombre);

      return this.http.post<Perfil>(`${ this.baseUrl }/usuarios/modificar/perfil`, formReg);
    }

    actualizarPasswd(datos:any): Observable<any> {

      return this.http.post<Perfil>(`${ this.baseUrl }/usuarios/modificar/passwd`, datos);
    }
}
