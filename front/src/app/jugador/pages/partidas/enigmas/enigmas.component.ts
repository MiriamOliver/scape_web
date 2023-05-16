import { Component, OnInit } from '@angular/core';
import { Enigma, Juego } from 'src/app/jugador/interfaces/jugador.interface';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { JugadorsocketService } from 'src/app/jugador/services/jugadorsocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { delay } from 'rxjs';

@Component({
  selector: 'app-enigmas',
  templateUrl: './enigmas.component.html',
  styleUrls: ['./enigmas.component.scss']
})
export class EnigmasComponent implements OnInit{

  public respuesta!: string;
  public enigma!:Enigma;
  public juego!:Juego;
  descanso: number | undefined;
  tiempo_pregunta: number | undefined;
  mensajeDescanso:number = 1;
  enigmas:number = -1;
  tiempo_general:number = 1800;
  espera:number = 6;
  public boton:boolean = false;
  public temporizador:number = 31;
  public opciones:any[] = [];
  public pregunta:string = '';
  public correcta:string = '';
  respFinal:string = '';
  llavesPartida:number = 0;
  llaves:number = 0;
  fallos:number = 0;
  private segundos:number = 0;
  private cont:number = 0;

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    protected socketService: JugadorsocketService,
    private router: Router)
    {
      this.socketService.enigmaEven.subscribe(res => {
        this.enigma = {
          id : res.id,
          pregunta : res.pregunta,
          opciones : res.opciones,
          correcta : res.correcta,
        }
        this.opciones = this.enigma.opciones
        this.pregunta = this.enigma.pregunta
        this.correcta = this.enigma.correcta
      })

      this.socketService.estadoJuegoEven.subscribe(res => {
        this.juego = {
          id: res.id,
          anfitrion: res.anfitrion,
          estado: res.estado,
          llaves: res.llaves,
          tiempo: res.tiempo,
          resultado: res.resultado
        }
        this.llavesPartida = this.juego.llaves;
      })
    }

  ngOnInit() {
    this.empezandoPartida();
  }

  calcularTiempo(){
    this.segundos = 1800 - this.tiempo_general;
    while(this.segundos > 59){
      this.cont ++;
      this.segundos = this.segundos - 60;
    }
    return (this.cont+':'+this.segundos).toString();
  }

  empezandoPartida(){
    if(this.tiempo_general > 0){
      console.log('holita');
      console.log(this.llavesPartida);
      if(this.llavesPartida >= 5 ){
        this.jugadorService.finalizarPartida(JSON.parse(localStorage.getItem('chat')!).id, 'ganada', this.calcularTiempo())
        .subscribe(resp => {
          if(resp){
            this.router.navigate(['jugador/partida/resultado/'+ resp.id]);
          }
        });
      }else{
        this.tiempoEspera();
      }
    }else if (this.tiempo_general <= 0){
      this.jugadorService.finalizarPartida(JSON.parse(localStorage.getItem('chat')!).id, 'perdida', '30')
      .subscribe(resp => {
          if(resp){
            this.router.navigate(['jugador/partida/resultado/'+ resp.id]);
          }
        });
    }
  }



  tiempoEspera(){
    this.respFinal = '';
    this.temporizador = 31;
    this.descanso = window.setTimeout(() => {
      if(this.espera > 0 ) this.tiempoEspera()
      else{
        this.mensajeDescanso = -1;
        this.enigmas = 1;
        this.enviarEnigmas();
        this.juegoSimulacion();
      }
    }, 1000);
    this.espera--;
    this.tiempo_general--;
  }

  juegoSimulacion(){
    this.espera = 6;
    this.tiempo_pregunta = window.setTimeout(() => {
      if(this.temporizador > 0 ) this.juegoSimulacion()
      else{
        if(this.respFinal == ''){
          this.checkRespuesta();
        }
        this.mensajeDescanso = 1;
        this.enigmas = -1;
        this.empezandoPartida();
      }
    }, 1000);
    this.temporizador--;
    this.tiempo_general--;
  }

  checkRespuesta(){
    console.log('entro en le check')
    this.respFinal = this.respuesta
    this.boton = true;
    if(this.respFinal == this.correcta){
      this.llaves = this.llaves +1;
    }else{
      this.fallos = this.fallos +1;
    }
    this.socketService.actualizarJugadorEvent('conectados',
        {
          id_partida:JSON.parse(localStorage.getItem('chat')!).id,
          id_user:JSON.parse(localStorage.getItem('user')!).id,
          user:JSON.parse(localStorage.getItem('user')!).nombre,
          avatar:JSON.parse(localStorage.getItem('user')!).avatar,
          fallos: this.fallos,
          llaves: this.llaves,
        })

    if(this.respFinal == this.correcta){
      this.socketService.actualizarJuegoEvent('actualizarpartida',
        {
          id_partida:JSON.parse(localStorage.getItem('chat')!).id,
          id_user:JSON.parse(localStorage.getItem('user')!).id,
          user:JSON.parse(localStorage.getItem('user')!).nombre,
          avatar:JSON.parse(localStorage.getItem('user')!).avatar,
          llaves: this.llavesPartida + 1,
        })
    }
  }

  /* comprobarPartida(){
    console.log(this.llavesPartida);
    if(this.llavesPartida >= 1 && this.tiempo_general > 0){
      console.log('probando');

      this.jugadorService.finalizarPartida(JSON.parse(localStorage.getItem('chat')!).id, 'ganada', this.calcularTiempo())
      .subscribe(resp => {
          if(resp){
            console.log(resp);
            this.router.navigate(['jugador/partida/resultado/'+ resp.id]);
          }
        });
    }else if(this.tiempo_general <= 0){
      this.jugadorService.finalizarPartida(JSON.parse(localStorage.getItem('chat')!).id, 'perdida', '30')
      .subscribe(resp => {
          if(resp){
            console.log(resp);
            this.router.navigate(['jugador/partida/resultado/'+ resp.id]);
          }
        });
    }
  } */

  enviarEnigmas(){
    this.boton = false;
    this.socketService.enigmasEvent('enigmas',
        {
          id_partida:JSON.parse(localStorage.getItem('chat')!).id,
          id_user:JSON.parse(localStorage.getItem('user')!).id,
          user:JSON.parse(localStorage.getItem('user')!).nombre,
          avatar:JSON.parse(localStorage.getItem('user')!).avatar,
        })
  }
}
