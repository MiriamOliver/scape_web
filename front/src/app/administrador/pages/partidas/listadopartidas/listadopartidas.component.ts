import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/administrador/services/administrador.service';
import { AdministradorsocketService } from 'src/app/administrador/services/administradorsocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Partida } from 'src/app/administrador/interfaces/administrador.interface';
import { InfoPartida } from '../../../../jugador/interfaces/jugador.interface';


@Component({
  selector: 'app-listadopartidas',
  templateUrl: './listadopartidas.component.html',
  styleUrls: ['./listadopartidas.component.scss']
})
export class ListadopartidasComponent implements OnInit{

  public partidas:any = [];
  public ganadas:any = [];
  public perdidas:any = [];
  public todas:any = [];
  public jugadores:any = [];
  public partida!:Partida
  public infoPartida = -1;

  constructor(
    private administradorService: AdministradorService,
    private activatedRoute: ActivatedRoute,
    protected socketService: AdministradorsocketService,
    private router: Router)
    {
      this.socketService.listaPartidasEven.subscribe(res => {
        console.log(res);
        res.forEach((elem: { resultado: any; }) => {
          if(elem.resultado == 'ganada'){
            this.ganadas.push(elem)
          }else if(elem.resultado == 'perdida'){
            this.perdidas.push(elem);
          }
          this.todas.push(elem);
        });
    });
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
    this.socketService.listadoPartidasEvent('listadopartidas',{})
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
    .subscribe((partida:Partida) => {
      this.partida = partida;
      this.jugadores = this.partida.jugadores;
      this.infoPartida = 1;
    })
  }
}
