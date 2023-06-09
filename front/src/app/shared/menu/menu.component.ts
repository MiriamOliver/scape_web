import { Component } from '@angular/core';
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
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }

  modificarUsuario(){
    if(JSON.parse(localStorage.getItem('user')!).rol == 'jugador'){

      this.router.navigate(['/jugador/modificar/perfil']);

    }else if(JSON.parse(localStorage.getItem('user')!).rol == 'administrador'){

      this.router.navigate(['/administrador/modificar/perfil']);
    }
  }

}


