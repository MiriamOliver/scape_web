import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketforoService } from '../services/socketforo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from '../../administrador/interfaces/administrador.interface';

@Component({
  selector: 'app-usuariosconectados',
  templateUrl: './usuariosconectados.component.html',
  styleUrls: ['./usuariosconectados.component.scss']
})
export class UsuariosconectadosComponent implements OnInit{

  public jugadores:any = [];
  public administradores:any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    protected socketService: SocketforoService,
    private router: Router)
    {
      this.socketService.connectUserEven.subscribe(res => {
        this.jugadores = [];
        this.administradores = []
        res.forEach((usuario: { rol: string; }) => {
          if(usuario.rol == 'jugador'){
            this.jugadores.push(usuario)
          }else if(usuario.rol == 'administrador'){
            this.administradores.push(usuario);
          }
        });
      });
    }

    ngOnInit() {
      this.socketService.userConectadosEvent('conectados-foro',
      {
        id_foro:JSON.parse(localStorage.getItem('foro')!).id,
        id_user:JSON.parse(localStorage.getItem('user')!).id,
      })
    }

    ngOnDestroy() {
      console.log('destruyo cosas');
      this.socketService.userDesconectadoEvent('desconectado-foro',
      {
        id_foro:JSON.parse(localStorage.getItem('chat')!).id,
        id_user:JSON.parse(localStorage.getItem('user')!).id,
      })
      console.log('las destrui');
      //localStorage.removeItem('foro');
    }
}
