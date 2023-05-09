import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { JugadorsocketService } from 'src/app/jugador/services/jugadorsocket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit{

  public users: any[]=[];

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    protected socketService: JugadorsocketService,
    private router: Router)
    {
      this.socketService.connectUserEven.subscribe(res => {
        this.users.push(res);
        console.log(this.users);
      })
    }

    ngOnInit() {
      console.log('hola')
      /* this.socketService.emitEventUser(event,
        {
          id_partida:JSON.parse(localStorage.getItem('chat')!).id,
          id_user:JSON.parse(localStorage.getItem('user')!).id,
          user:JSON.parse(localStorage.getItem('user')!).nombre,
          avatar:JSON.parse(localStorage.getItem('user')!).avatar,
        }) */
    }

    ngOnDestroy(){
      this.socketService.desconnectUserEven.subscribe(res => {
        console.log(res);
        //this.users.indexOf(res)
      })
    }
}
