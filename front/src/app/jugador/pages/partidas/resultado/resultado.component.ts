import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultadoJugador, Juego } from 'src/app/jugador/interfaces/jugador.interface';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit{

  public jugadores:any = [];
  public partida!:Juego;

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    { }

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
}
