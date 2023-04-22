import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  implements OnInit{

  public usuarios:any = [];

  perfil: Usuario = {
    nombre: JSON.parse(localStorage.getItem('user')!).nombre,
    avatar: JSON.parse(localStorage.getItem('user')!).avatar
  }
  usuario: Usuario = {
    nombre: 'jugador',
    avatar: JSON.parse(localStorage.getItem('user')!).avatar
  }

  constructor(
    private jugadorService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(({rol}) =>
    this.jugadorService.getUsuariosConectados(JSON.parse(localStorage.getItem('user')!).rol)))
      .subscribe((usuario: Usuario) => {
        this.usuarios = usuario
        console.log(this.usuarios);
    })
  }
}