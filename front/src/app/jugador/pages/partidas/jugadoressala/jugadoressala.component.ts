import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/jugador/interfaces/jugador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { JugadorsocketService } from 'src/app/jugador/services/jugadorsocket.service';
import { SocketpartidaService } from '../../../services/socketpartida.service';

@Component({
  selector: 'app-jugadoressala',
  templateUrl: './jugadoressala.component.html',
  styleUrls: ['./jugadoressala.component.scss']
})
export class JugadoressalaComponent implements OnInit{

  public jugadores:any = [];
  public comenzar:boolean = true;
  private anfitrion:number;
  private id_user:number;
  private idPartida:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected socketService: JugadorsocketService,
    protected partidaService: SocketpartidaService,
    private router: Router)
    {
      this.anfitrion = JSON.parse(localStorage.getItem('partida')!).anfitrion;
      this.id_user = JSON.parse(localStorage.getItem('user')!).id;
      this.idPartida = JSON.parse(localStorage.getItem('chat')!).id;

      this.socketService.connectUserEven.subscribe(res => {
        this.jugadores = res;
        if(this.jugadores.length >= 3 && this.jugadores.length <= 5 && this.anfitrion == this.id_user){
            this.comenzar = false;
        }
        if(this.jugadores.length < 1){
          this.router.navigate(['jugador/partida']);
          localStorage.removeItem('partida');
          localStorage.removeItem('chat');
        }
      });
      this.socketService.estadoPartidaEven.subscribe(res => {
        if(res.estado == 'curso'){
          this.router.navigate(['jugador/partida/juego/'+ this.idPartida]);
        }
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

    empezarPartida(){
      this.socketService.empezarPartidaEvent('juego',
        {
          id_anfitrion: this.anfitrion,
          id_partida:JSON.parse(localStorage.getItem('chat')!).id,
          id_user:JSON.parse(localStorage.getItem('user')!).id,
          user:JSON.parse(localStorage.getItem('user')!).nombre,
          avatar:JSON.parse(localStorage.getItem('user')!).avatar,
        })
      this.router.navigate(['jugador/partida/juego/'+ this.idPartida]);
    }

    cancelarPartida(){
      this.socketService.userDesconectadoEvent('desconectado',
        {
          id_anfitrion: this.anfitrion,
          id_partida:JSON.parse(localStorage.getItem('chat')!).id,
          id_user:JSON.parse(localStorage.getItem('user')!).id,
          user:JSON.parse(localStorage.getItem('user')!).nombre,
          avatar:JSON.parse(localStorage.getItem('user')!).avatar,
        })
        this.partidaService.listarPartidas('listadodisponibles',{
          id: JSON.parse(localStorage.getItem('user')!).id
        });
        localStorage.removeItem('partida');
        localStorage.removeItem('chat');
        this.router.navigate(['jugador/partida']);
    }
}
