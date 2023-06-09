import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from 'src/app/administrador/services/administrador.service';
import { DatosPartida } from 'src/app/jugador/interfaces/jugador.interface';

@Component({
  selector: 'app-partidasjugador',
  templateUrl: './partidasjugador.component.html',
  styleUrls: ['./partidasjugador.component.scss']
})
export class PartidasjugadorComponent implements OnInit{

  public partidas:any = [];
  public ganadas:any = [];
  public perdidas:any = [];
  public todas:any = [];
  public jugadores:any = [];
  public partida!:DatosPartida
  public infoPartida = -1;
  private id_user:any;

  constructor(
    private administradorService: AdministradorService,
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
    this.administradorService.listaPartidasUsuario(this.id_user)
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
    this.administradorService.obtenerPartida(id)
    .subscribe((partida:DatosPartida) => {
      this.partida = partida;
      this.jugadores = this.partida.jugadores;
      this.infoPartida = 1;
    })
  }
}
