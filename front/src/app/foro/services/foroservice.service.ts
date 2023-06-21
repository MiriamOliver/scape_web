import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForoserviceService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {}

    archivoForo(archivo: any) {

      const formReg = new FormData();
      formReg.append('id_user', archivo.id_user);
      formReg.append('archivo', archivo.archivo);
      formReg.append('tipo', archivo.tipo);

      return this.http.post(`${ this.baseUrl }/usuarios/foro/archivo`, formReg);
    }

}
