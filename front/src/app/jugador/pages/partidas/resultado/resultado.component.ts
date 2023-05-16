import { Component, OnDestroy, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultadoJugador, Juego } from 'src/app/jugador/interfaces/jugador.interface';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit, OnDestroy{

  public jugadores:any = [];
  public partida!:Juego;

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    {
      this.partida = {
        id : 0,
        anfitrion : 0,
        estado : '',
        llaves : 0,
        tiempo : 0,
        resultado : '',
      }
     }

  ngOnInit(){
    this.jugadorService.getResultadoJugadorPartida(JSON.parse(localStorage.getItem('partida')!).id)
      .subscribe((jugadores: ResultadoJugador) => {
        this.jugadores = jugadores;
    })

    this.jugadorService.getResultadoPartida(JSON.parse(localStorage.getItem('partida')!).id)
      .subscribe((partida: Juego) => {
        this.partida = partida;
    })
  }

  ngOnDestroy(){
    localStorage.removeItem('partida');
    localStorage.removeItem('chat');
  }

  abrirInicio(){
    localStorage.removeItem('partida');
    localStorage.removeItem('chat');
    this.router.navigate(['jugador/inicio']);
  }

  abrirPartidas(){
    localStorage.removeItem('partida');
    localStorage.removeItem('chat');
    this.router.navigate(['jugador/partida']);
  }
}
