import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/jugador/interfaces/jugador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
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
    this.partidasDisponibles();

  }

  crear(){
    this.jugadorService.crearPartida(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe(resp => {
      if (resp) {
        this.router.navigate(['jugador/partida/sala/'+ resp.id]);
      }else{
        //
      }

    });
  }

  partidasDisponibles(){
    this.partidas = [];
    this.jugadorService.getPartidasDisponibles(JSON.parse(localStorage.getItem('user')!).id)
      .subscribe((partida: Partida) => {
        this.partidas = partida
    })
  }

  partidasCreadas(){
    this.partidas = [];
    this.jugadorService.getPartidasCreadas(JSON.parse(localStorage.getItem('user')!).id)
      .subscribe((partida: Partida) => {
        this.partidas = partida
    })
  }

  partidasEnCurso(){
    this.partidas = [];
    this.jugadorService.getPartidasEnCurso(JSON.parse(localStorage.getItem('user')!).id)
      .subscribe((partida: Partida) => {
        this.partidas = partida
    })
  }
}
