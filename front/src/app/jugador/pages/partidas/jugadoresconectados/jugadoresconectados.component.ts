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

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    protected socketService: JugadorsocketService,
    private router: Router)
    {
      this.users = [];
      this.socketService.connectUserEven.subscribe(res => {
        this.users = res;
        //this.users.push(res);
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

    ngOnDestroy(){
      console.log('destrozo cosas')
      /* this.socketService.desconnectUserEven.subscribe(res => {
        console.log(res);
        //this.users.indexOf(res)
      }) */
    }
}
