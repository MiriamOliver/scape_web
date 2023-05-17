import { Component, OnInit } from '@angular/core';
import { Jugador, Partida, InfoPartida } from 'src/app/jugador/interfaces/jugador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { JugadorsocketService } from 'src/app/jugador/services/jugadorsocket.service';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit{

  public jugadores:any = [];
  public comenzar:boolean = true;
  public messages: any[]=[];
  private partida:InfoPartida;

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
      this.partida = {
        id : 0,
        anfitrion : 0,
        estado : '',
      }
    }

    ngOnInit() {
      this.activatedRoute.params
        .pipe(switchMap(({id}) => this.jugadorService.getPartida(id)))
        .subscribe((partida:InfoPartida) => {
            this.partida = partida;
        }
      );
    }
}
