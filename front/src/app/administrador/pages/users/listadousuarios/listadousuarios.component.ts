import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/administrador/interfaces/administrador.interface';
import { AdministradorService } from 'src/app/administrador/services/administrador.service';
import { AdministradorsocketService } from 'src/app/administrador/services/administradorsocket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listadousuarios',
  templateUrl: './listadousuarios.component.html',
  styleUrls: ['./listadousuarios.component.scss']
})
export class ListadousuariosComponent implements OnInit{

  public usuarios:any = [];
  public jugadores:any = [];
  public administradores:any = [];
  public todos:any = [];
  public perfil!:Perfil;
  public infoUsuario = -1;
  public btnRol:string = 'todos';
  public users:any = [];

  constructor(
    private administradorService: AdministradorService,
    private activatedRoute: ActivatedRoute,
    protected socketService: AdministradorsocketService,
    private router: Router)
    {
      this.socketService.listaUsuariosEven.subscribe(res => {
        let users:any = [];
        console.log(this.btnRol);
        if(this.btnRol != 'todos'){
          res.forEach((elem: { rol: any; }) => {
            if(elem.rol == this.btnRol){
              users.push(elem)
            }
          });
        }else{
          users = res
        }
        this.usuarios = users;
        /* this.jugadores = [];
        this.todos = [];
        this.administradores = [];
        res.forEach((elem: { rol: any; }) => {
          if(elem.rol == 'administrador'){
            this.administradores.push(elem)
          }else if(elem.rol == 'jugador'){
            this.jugadores.push(elem);
          }
          this.todos.push(elem);
          this.usuarios = this.todos;*/

    });
    this.perfil = {
      id : 0,
      nombre:'',
      avatar:'',
      email : '',
      rol : '',
      activo : '',
    }
  }

  ngOnInit(){
    this.listarUsuarios();
  }

  usuariosJugadores(){
    this.btnRol = 'jugador';
    this.listarUsuarios();
  }

  usuariosAdministradores(){
    this.btnRol = 'administrador';
    this.listarUsuarios();
  }

  usuariosTodos(){
    this.btnRol = 'todos';
    this.listarUsuarios();
  }

  obtenerUsuario(id:any){
    this.administradorService.obtenerUsuario(id)
    .subscribe((usuario:Perfil) => {
      this.perfil = usuario;
      this.infoUsuario = 1;
    })
  }

  listarUsuarios(){
    this.usuarios = [];
    this.socketService.listadoUsuariosEvent('listadousuarios',{})
  }

  deshabilitarUsuario(id:any, habilitado:any){
    if(habilitado == true){
      habilitado = 1;
    }else{
      habilitado = 0;
    }
    this.socketService.deshabilitarUsuarioEvent('listadousuarios',
        {
          id_user: id,
          habilitado:habilitado

        })
    this.listarUsuarios();
  }

  modificarUsuario(id:any){
    this.router.navigate(['administrador/usuario/editar/'+ id]);
  }

  crearUsuarios(){
    this.router.navigate(['administrador/usuario/crear']);
  }

}
