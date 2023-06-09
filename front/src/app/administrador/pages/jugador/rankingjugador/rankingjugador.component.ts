import { Component, OnInit } from '@angular/core';
import { Estadistica } from 'src/app/administrador/interfaces/administrador.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorsocketService } from 'src/app/administrador/services/administradorsocket.service';

@Component({
  selector: 'app-rankingjugador',
  templateUrl: './rankingjugador.component.html',
  styleUrls: ['./rankingjugador.component.scss']
})
export class RankingjugadorComponent implements OnInit{

  public jugadores:any = [];
  public perfil!:Estadistica
  public infoRanking = -1;

  constructor(
    protected socketService: AdministradorsocketService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    {
      this.socketService.listaJugadoresEven.subscribe(res => {
        this.jugadores = res;
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

  obtenerHistorialPartida(id:any){
    this.router.navigate(['administrador/historial/partida/' + id]);
  }
}
