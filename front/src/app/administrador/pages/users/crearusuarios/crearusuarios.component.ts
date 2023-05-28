import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdministradorService } from 'src/app/administrador/services/administrador.service';
import { AdministradorsocketService } from 'src/app/administrador/services/administradorsocket.service';
import { confirmarPasswd } from 'src/app/auth/validators/validator';
import { Usuario } from 'src/app/administrador/interfaces/administrador.interface';

@Component({
  selector: 'app-crearusuarios',
  templateUrl: './crearusuarios.component.html',
  styleUrls: ['./crearusuarios.component.scss']
})
export class CrearusuariosComponent  implements OnInit {

  timer: number | undefined;
  selectedFile: string = "";
  passwdCorrecta: boolean = true;
  crearCorrecto: number = -1;
  submitted: boolean = false;
  usuarioForm!: FormGroup;
  generarForm!: FormGroup;
  usuario:Usuario

  constructor(
              private administradorService: AdministradorService,
              private activatedRoute: ActivatedRoute,
              protected socketService: AdministradorsocketService,
              private router: Router,
              private fb: FormBuilder,
  ) {
    this.usuario = {
      avatar: "",
      nombre: "",
      email: "",
      password:"",
      rol:"",
      verificado:""
    }
  }

  ngOnInit(): void {
    this.passwdCorrecta = false;
    this.crearCorrecto = -1;
    this.submitted = false;
    this.selectedFile = "";

    this.usuarioForm = this.fb.group({
      avatar: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ])],
      rol: ['', Validators.required],
      verificado: ['', Validators.required],
      passwords: this.fb.group({
        passwd: ['', Validators.required],
        passwdConf: ['', Validators.required]
      },
      {
        validators: [confirmarPasswd()]
      })
    })


    this.generarForm = this.fb.group({
      rol: ['', Validators.required],
      cantidad: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]+")
      ])],
      verificar: ['', Validators.required],
    })
  }

  get form() {
    return this.usuarioForm.controls;
  }

  get formgen() {
    return this.generarForm.controls;
  }

  get passwords(){
    return this.usuarioForm.controls["passwords"] as FormGroup;
  }


  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
  }

  crearUsuario() {

    this.usuario.avatar = this.selectedFile;
    this.usuario.nombre = this.usuarioForm.get('nombre')?.value;
    this.usuario.email = this.usuarioForm.get('email')?.value;
    this.usuario.password = this.usuarioForm.get('passwords')?.get('passwd')?.value;
    this.usuario.rol = this.usuarioForm.get('rol')?.value;
    this.usuario.verificado = this.usuarioForm.get('verificado')?.value;

    if (this.usuarioForm.get('passwd')?.value == this.usuarioForm.get('passwdConf')?.value) {
      console.log(this.usuario);
      this.administradorService.crearUsuario(this.usuario).subscribe(resp => {
        if (resp) {
          this.crearCorrecto = 1;
          this.socketService.listadoUsuariosEvent('listadousuarios',{})
        }else{
          this.crearCorrecto = 2;
        }
        //this.socketService.listadoUsuariosEvent('listadousuarios',{})
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {this.crearCorrecto = -1;}, 8000);
      });
    }
    else {
      this.passwdCorrecta = true;
    }
  }

  generarUsuario(){

    let datos = {
      cantidad : this.generarForm.get('cantidad')?.value,
      verificado : this.generarForm.get('verificar')?.value,
      rol : this.generarForm.get('rol')?.value,
    }

    this.administradorService.generarUsuarios(datos).subscribe(resp => {
      if (resp) {
        this.crearCorrecto = 3;
        this.socketService.listadoUsuariosEvent('listadousuarios',{})
      }else{
        this.crearCorrecto = 4;
      }
      //this.socketService.listadoUsuariosEvent('listadousuarios',{})
      clearTimeout(this.timer);
      this.timer = window.setTimeout(() => {this.crearCorrecto = -1;}, 8000);
    });

  }

  onSubmit() {
    this.submitted = true;
  }

  abrirListaUsuarios() {
    this.router.navigate(['administrador/usuarios']);
  }

  cerrar() {
    this.router.navigate(['administrador/usuarios/crear']);
    this.crearCorrecto = -1;
  }

}
