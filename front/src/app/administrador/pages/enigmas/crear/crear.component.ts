import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AdministradorService } from 'src/app/administrador/services/administrador.service';
import { AdministradorsocketService } from 'src/app/administrador/services/administradorsocket.service';
import { Enigma } from 'src/app/administrador/interfaces/administrador.interface';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit{


  submitted: boolean = false;
  enigmaForm!: FormGroup;
  pregunta:string = '';
  correcta:string = '';
  respuno:string = '';
  respdos:string = '';
  resptres:string = '';
  respcuatro:string = '';
  //public mensajeEnigma = -1;

  public enigma:Enigma = {
    id : 0,
    creador:'',
    pregunta : '',
    opciones : [],
    correcta : '',
  }

  constructor(private administradorService: AdministradorService,
              private activatedRoute: ActivatedRoute,
              protected socketService: AdministradorsocketService,
              private router: Router,
              private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.submitted = false;

    this.enigmaForm = this.fb.group({
        pregunta: ['', Validators.required],
        respuno: ['', Validators.required],
        respdos: ['', Validators.required],
        resptres: ['', Validators.required],
        respcuatro: ['', Validators.required],
        correcta: ['', Validators.required],
      })

    if(!this.router.url.includes('editar'))
    {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.administradorService.obtenerEnigma(id))
      )
      .subscribe(( resp) => {
        this.enigma = {
          id : resp.id,
          creador: resp.creador,
          pregunta : resp.pregunta,
          opciones : [resp.opciones[0], resp.opciones[1], resp.opciones[2], resp.opciones[3]],
          correcta : resp.correcta
        }
        this.respuno = this.enigma.opciones[0];
        this.respdos =  this.enigma.opciones[1];
        this.resptres = this.enigma.opciones[2];
        this.respcuatro =  this.enigma.opciones[3];
        this.pregunta = this.enigma.pregunta;
        this.correcta = this.enigma.correcta;
      });

  }

  crearEnigma(){

    this.enigma.pregunta = this.enigmaForm.get('pregunta')?.value;
    this.enigma.creador = JSON.parse(localStorage.getItem('user')!).nombre;
    this.enigma.opciones = [
                            this.enigmaForm.get('respuno')?.value,
                            this.enigmaForm.get('respdos')?.value,
                            this.enigmaForm.get('resptres')?.value,
                            this.enigmaForm.get('respcuatro')?.value,
                            ];
    this.enigma.correcta = this.enigmaForm.get('correcta')?.value;
    if(this.enigma.id == 0){
      this.socketService.crearEnigma('listadoenigmas', this.enigma)
      this.router.navigate(['administrador/enigmas']);
    }
    else {
      this.socketService.actualizarEnigma('listadoenigmas', this.enigma)
      this.router.navigate(['administrador/enigmas']);
    }
  }

  get form() {
    return this.enigmaForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

}
