import { Component, OnInit } from '@angular/core';
import { JugadorService } from '../../../services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosPartida } from '../../../interfaces/jugador.interface';

@Component({
  selector: 'app-historialjugador',
  templateUrl: './historialjugador.component.html',
  styleUrls: ['./historialjugador.component.scss']
})
export class HistorialjugadorComponent implements OnInit{

  public partidas:any = [];
  public ganadas:any = [];
  public perdidas:any = [];
  public todas:any = [];
  public jugadores:any = [];
  public partida!:DatosPartida
  public infoPartida = -1;
  private id_user:any;

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    {
    this.id_user = this.activatedRoute.snapshot.params['id']
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
    this.jugadorService.listaPartidasUsuario(this.id_user)
    .subscribe(res => {
      res.forEach( (elem: { resultado: string; })  => {
        if(elem.resultado == 'ganada'){
          this.ganadas.push(elem)
        }else if(elem.resultado == 'perdida'){
          this.perdidas.push(elem);
        }
        this.todas.push(elem);
      });
  });
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
