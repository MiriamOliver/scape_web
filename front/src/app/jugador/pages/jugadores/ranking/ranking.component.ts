import { Component, OnInit } from '@angular/core';
import { Estadistica } from '../../../../administrador/interfaces/administrador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JugadorsocketService } from 'src/app/jugador/services/jugadorsocket.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  public jugadores:any = [];
  public perfil!:Estadistica
  public infoRanking = -1;

  constructor(
    private jugadorService: JugadorService,
    protected socketService: JugadorsocketService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    {
    this.perfil = {
      id : 0,
      nombre:'',
      avatar : '',
      ranking: 0,
      llaves : 0,
      partidas : 0,
      ganadas : 0,
      perdidas: 0
    }
  }

  ngOnInit(){
    this.infoRanking = -1;
  }

  obtenerJugador(id:any){
    this.jugadorService.obtenerJugador(id)
    .subscribe((perfil:Estadistica) => {
      this.perfil = perfil;
      this.infoRanking = 1;
    })
  }

  obtenerMisEstadisticas(){
    this.jugadorService.obtenerJugador(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe((perfil:Estadistica) => {
      this.perfil = perfil;
      this.infoRanking = 1;
    })
  }

}
