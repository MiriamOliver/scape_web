import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { JugadorsocketService } from 'src/app/jugador/services/jugadorsocket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jugadoresconectados',
  templateUrl: './jugadoresconectados.component.html',
  styleUrls: ['./jugadoresconectados.component.scss']
})
export class JugadoresconectadosComponent implements OnInit{

  public users: any[]=[];
  public isAlmirante: boolean = false;

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    protected socketService: JugadorsocketService,
    private router: Router)
    {
      this.users = [];
      this.socketService.connectUserEven.subscribe(res => {
        this.users = res;
        this.users.forEach(u => {
          if(u.rol == 'almirante' && u.id == JSON.parse(localStorage.getItem('user')!).id){
            this.isAlmirante = true;
          }
        })
        console.log(this.users);
      })
    }

    ngOnInit() {
      this.socketService.userConectadosEvent('conectados',
        {
          id_partida:JSON.parse(localStorage.getItem('chat')!).id,
          id_user:JSON.parse(localStorage.getItem('user')!).id,
          user:JSON.parse(localStorage.getItem('user')!).nombre,
          avatar:JSON.parse(localStorage.getItem('user')!).avatar,
        })
    }

    activarUsuario(id:any, activo:any){
      if(activo == false){
        activo = 1;
      }else{
        activo = 0;
      }
      this.socketService.activarJugadorEvent('conectados',
      {
        id_partida:JSON.parse(localStorage.getItem('chat')!).id,
        id_user:id,
        activo: activo,
      })
      /* this.socketService.contestarEnigmaEvent('contestarenigma',
      {
        id_partida:JSON.parse(localStorage.getItem('chat')!).id,
        id_user:JSON.parse(localStorage.getItem('user')!).id,
        activo:activo
      }) */
    }

    ngOnDestroy(){
      console.log('destrozo cosas')
      /* this.socketService.desconnectUserEven.subscribe(res => {
        console.log(res);
        //this.users.indexOf(res)
      }) */
    }
}
