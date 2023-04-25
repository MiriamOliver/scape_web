import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/jugador/interfaces/jugador.interface';
import { Jugador } from 'src/app/jugador/interfaces/jugador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit{

  public jugadores:any = [];
  public comenzar:boolean = true;

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.activatedRoute.params
        .pipe(switchMap(({id}) => this.jugadorService.getJugadoresPartida(id)))
        .subscribe((jugador:Jugador) => {
            this.jugadores = jugador;
            console.log(this.jugadores);
            if(this.jugadores.length >= 3 && this.jugadores.length <= 5){
              this.comenzar = false;
            }
        }
      );
    }

    empezarPartida(){

    }
}
