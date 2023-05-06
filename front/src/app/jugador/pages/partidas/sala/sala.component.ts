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
  private id_partida:any;
  public messages: any[]=[];

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    {
      localStorage.setItem('chat', JSON.stringify({
        nombre: JSON.parse(localStorage.getItem('user')!).nombre,
        id: this.activatedRoute.snapshot.params['id'],
        avatar : JSON.parse(localStorage.getItem('user')!).avatar,
      }));
    }

    ngOnInit(): void {
      this.activatedRoute.params
        .pipe(switchMap(({id}) => this.jugadorService.getJugadoresPartida(id)))
        .subscribe((jugador:Jugador) => {
            this.jugadores = jugador;
            if(this.jugadores.length >= 3 && this.jugadores.length <= 5){
              this.comenzar = false;
            }
        }
      );
    }

    empezarPartida(){
      this.id_partida = this.activatedRoute.snapshot.params['id'];
      this.router.navigate(['jugador/partida/juego/'+ this.id_partida]);
    }

    cancelarPartida(){
      //this.jugadorService.
    }
}
