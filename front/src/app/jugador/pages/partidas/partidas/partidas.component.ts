import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/jugador/interfaces/jugador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketpartidaService } from 'src/app/jugador/services/socketpartida.service';
//import { switchMap } from 'rxjs';

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
    protected socketService: SocketpartidaService,
    private router: Router) {
      this.socketService.listaPartidas.subscribe(res => {
        let disponibles:any = [];
        res.forEach((partida: { anfitrion: any; }) => {
          if(partida.anfitrion != JSON.parse(localStorage.getItem('user')!).id){
            disponibles.push(partida)
          }
        });
        this.partidas = disponibles;
      });
    }

  ngOnInit() {
    this.partidasDisponibles();
  }

  crear(){
    this.jugadorService.crearPartida(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe(resp => {
        localStorage.setItem('partida', JSON.stringify({
          id: resp.id,
          anfitrion: resp.anfitrion,
          estado:resp.estado,
        }));
        localStorage.setItem('chat', JSON.stringify({
          nombre: JSON.parse(localStorage.getItem('user')!).nombre,
          id: resp.id,
          avatar : JSON.parse(localStorage.getItem('user')!).avatar,
        }));
        this.partidasDisponibles();
        this.router.navigate(['jugador/partida/sala/'+ resp.id]);
    });
  }

  unirseSala(id:any, estado:any){
    if(estado == 'disponible'){
      this.jugadorService.unirsePartida(JSON.parse(localStorage.getItem('user')!).id, id)
      .subscribe(resp => {
        localStorage.setItem('partida', JSON.stringify({
          id: resp.id,
          anfitrion: resp.anfitrion,
          estado:resp.estado,
        }));
        localStorage.setItem('chat', JSON.stringify({
          nombre: JSON.parse(localStorage.getItem('user')!).nombre,
          id: resp.id,
          avatar : JSON.parse(localStorage.getItem('user')!).avatar,
        }));
        this.router.navigate(['jugador/partida/sala/'+ resp.id]);
      });
    }
  }

  partidasDisponibles(){
    console.log('pasa por disponibles');
    this.socketService.listarPartidas('listadodisponibles',{
      id: JSON.parse(localStorage.getItem('user')!).id
    });
  }

/*   partidasCreadas(){
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
  } */
}
