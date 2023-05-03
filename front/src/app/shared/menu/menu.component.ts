import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  rol:string = JSON.parse(localStorage.getItem('user')!).rol;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  logout(){
    console.log(JSON.parse(localStorage.getItem('user')!).id);
    this.usuarioService.logout(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success){
        localStorage.removeItem('user');
        this.router.navigate(['']);
      }
    });
  }

}


