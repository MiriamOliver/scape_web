import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../services/administrador.service';
import { AdministradorsocketService } from 'src/app/administrador/services/administradorsocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Enigma } from 'src/app/administrador/interfaces/administrador.interface';

@Component({
  selector: 'app-listadoenigmas',
  templateUrl: './listadoenigmas.component.html',
  styleUrls: ['./listadoenigmas.component.scss']
})
export class ListadoEnigmasComponent implements OnInit{

  public enigmas:any = [];
  public opciones:any = [];
  public enigma!:Enigma;
  public infoEnigma:number = -1;
  public btnCreador:number = -1;

  constructor(
    private administradorService: AdministradorService,
    private activatedRoute: ActivatedRoute,
    protected socketService: AdministradorsocketService,
    private router: Router)
    {
      this.socketService.listadoEnigmaEven.subscribe(res => {
        let ajenos:any = [];
        res.forEach((elem: { creador: any; }) => {
          if(elem.creador != JSON.parse(localStorage.getItem('user')!).nombre)
          ajenos.push(elem)
        });
        this.enigmas = ajenos;
    });
    this.enigma = {
      id : 0,
      creador:'',
      pregunta : '',
      opciones : [],
      correcta : '',
    }
    this.infoEnigma = -1;
  }

  ngOnInit(){
    this.enigmasAjenos();
  }

  enigmasCreados(){
    this.enigmas = [];
    this.administradorService.obtenerEnigmasCreados(JSON.parse(localStorage.getItem('user')!).id)
    .subscribe((enigma:Enigma) => {
      this.btnCreador = 1;
      this.enigmas = enigma;
    })
  }

  enigmasAjenos(){
    this.enigmas = [];
    this.socketService.listadoEnigmasEvent('listadoenigmas',
      {
        user:JSON.parse(localStorage.getItem('user')!).id,
      })
      this.btnCreador = -1;
  }

  borrarEnigma(id:any){
    this.socketService.borrarEnigmaEvent('listadoenigmas',
        {
          id_enigma: id
        })
    this.enigmasCreados();
  }

  modificarEnigma(id:any){
    this.router.navigate(['administrador/enigma/editar/'+ id]);
  }

  obtenerEnigma(id:any){
    this.administradorService.obtenerEnigma(id)
    .subscribe((enigma:Enigma) => {
      this.enigma = enigma;
      this.infoEnigma = 1;
    })
  }

  crear(){
    this.router.navigate(['administrador/enigma/crear']);
  }
}
