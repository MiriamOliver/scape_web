import { Component, OnInit } from '@angular/core';
import { JugadorService } from '../../services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosPartida } from '../../interfaces/jugador.interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit{

  public partidas:any = [];
  public ganadas:any = [];
  public perdidas:any = [];
  public todas:any = [];
  public jugadores:any = [];
  public partida!:DatosPartida
  public infoPartida = -1;

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    {
    this.partida = {
      id : 0,
      resultado:'',
      creador : '',
      llaves : 0,
      tiempo : 0,
      jugadores : [],
    }
  }

  ngOnInit(){
    /* this.jugadorService.listaPartidasUsuario(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe(res => {
      res.forEach((elem: { resultado: any; }) => {
        if(elem.resultado == 'ganada'){
          this.ganadas.push(elem)
        }else if(elem.resultado == 'perdida'){
          this.perdidas.push(elem);
        }
        this.todas.push(elem);
      });
  }); */
    this.partidasTodas();
  }

  partidasGanadas(){
    this.partidas = [];
    this.partidas = this.ganadas;
  }

  partidasPerdidas(){
    this.partidas = [];
    this.partidas = this.perdidas;
  }

  partidasTodas(){
    this.partidas = [];
    this.partidas = this.todas;
  }

  obtenerPartida(id:any){
    this.jugadorService.obtenerPartida(id)
    .subscribe((partida:DatosPartida) => {
      this.partida = partida;
      this.jugadores = this.partida.jugadores;
      this.infoPartida = 1;
    })
  }
}
