import { Component, OnInit } from '@angular/core';
import { Partida } from '../../interfaces/jugador.interface';
import { JugadorService } from '../../services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent implements OnInit{

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
