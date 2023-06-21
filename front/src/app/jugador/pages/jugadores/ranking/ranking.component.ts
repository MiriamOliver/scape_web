import { Component, OnInit } from '@angular/core';
import { Estadistica } from '../../../../administrador/interfaces/administrador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketpartidaService } from 'src/app/jugador/services/socketpartida.service';

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
    protected socketService: SocketpartidaService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    {
      this.socketService.listaJugadoresEven.subscribe(res => {
        this.jugadores = res;
        console.log(this.jugadores);
      })

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
    this.listarJugadores();
    this.infoRanking = -1;
  }

  listarJugadores(){
    this.jugadores = [];
    this.socketService.listadoJugadoresEvent('listadojugadores',{})
  }

  obtenerJugador(id:any){
    this.jugadores.forEach((jugador: Estadistica) => {
      if(jugador.id == id){
        this.perfil = jugador;
      }
    });
      this.infoRanking = 1;
  }

  obtenerMisEstadisticas(){
    this.jugadores.forEach((jugador: Estadistica) => {
      if(jugador.id == JSON.parse(localStorage.getItem('user')!).id){
        this.perfil = jugador;
      }
    });
      this.infoRanking = 1;
  }

  obtenerHistorialPartida(id:any){
    this.router.navigate(['jugador/historial/partida/' + id]);
  }

}
