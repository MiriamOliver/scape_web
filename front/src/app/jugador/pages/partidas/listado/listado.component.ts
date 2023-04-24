import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/jugador/interfaces/jugador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit{

  public partidas:any = [];

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.jugadorService.getPartidasDisponibles()
      .subscribe((partida: Partida) => {
        this.partidas = partida
    })
  }
}
