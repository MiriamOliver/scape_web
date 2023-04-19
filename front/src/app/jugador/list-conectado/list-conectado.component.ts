import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/jugador.interface';
import { JugadorService } from '../services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-conectado',
  templateUrl: './list-conectado.component.html',
  styleUrls: ['./list-conectado.component.scss']
})
export class ListConectadoComponent implements OnInit{

  public jugadores:any = [];

  perfil: Jugador = {
    nombre: JSON.parse(localStorage.getItem('user')!).nombre,
    avatar: JSON.parse(localStorage.getItem('user')!).avatar
  }
  jugador: Jugador = {
    nombre: 'jugador',
    avatar: JSON.parse(localStorage.getItem('user')!).avatar
  }

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.jugadorService.getJugadoresConectados()
      .subscribe((jugador: Jugador) => {
        this.jugador = jugador
    })
  }
}
