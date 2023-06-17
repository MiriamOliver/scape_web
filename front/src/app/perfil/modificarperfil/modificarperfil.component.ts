import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorsocketService } from 'src/app/administrador/services/administradorsocket.service';
import { confirmarPasswd } from 'src/app/auth/validators/validator';
import { Perfil } from '../interfaces/perfil.interface';
import { PerfilService } from '../services/perfil.service';


@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.component.html',
  styleUrls: ['./modificarperfil.component.scss']
})
export class ModificarperfilComponent implements OnInit{

  timer: number | undefined;
  selectedFile: string = "";
  cambiarPasswd: number = -1;
  cambioPasswdCorrecto = -1;
  cambioPerfilCorrecto = -1;
  cambioHabilitar = -1;
  perfilDeshabilitar = -1;
  submitted: boolean = false;
  usuarioForm!: FormGroup;
  passwdForm!: FormGroup;
  perfil:Perfil;
  nombre:string ='';
  input_codigo!:number;
  codigo:number = 0;

  constructor(
              private perfilService: PerfilService,
              private activatedRoute: ActivatedRoute,
              protected socketService: AdministradorsocketService,
              private router: Router,
              private fb: FormBuilder,
  ) {
    this.perfil = {
      id : 0,
      avatar: "",
      nombre: "",
      password:"",
    }
  }

  ngOnInit(): void {
    this.nombre = JSON.parse(localStorage.getItem('user')!).nombre;
    this.cambiarPasswd = -1;
    this.submitted = false;
    this.selectedFile = "";

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
    })


    this.passwdForm = this.fb.group({
      passwords: this.fb.group({
        passwd: ['', Validators.required],
        passwdConf: ['', Validators.required]
      },
      {
        validators: [confirmarPasswd()]
      })
    })
  }

  get form() {
    return this.usuarioForm.controls;
  }

  get formpasswd() {
    return this.passwdForm.controls;
  }

  get passwords(){
    return this.passwdForm.controls["passwords"] as FormGroup;
  }

  abrirPasswd(){
    this.cambiarPasswd = 1;
  }

  abrirDeshabilitar(){
    this.codigo = Math.floor(Math.random() * 90000) + 10000
    this.perfilDeshabilitar = 1;
  }

  confirmarDeshabilitar(){
    if(this.codigo == this.input_codigo){
      this.perfilService.cambiarHabilitar(JSON.parse(localStorage.getItem('user')!).id).subscribe(resp => {
        if(resp){
          this.cambioHabilitar = 1;
        }else{
          this.cambioHabilitar = 2;
        }
      });
    }else{
      this.cambioHabilitar = 2;
    }
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      if(this.cambioHabilitar == 1){
        localStorage.clear();
        this.abrirLogin();
      }else{
        this.cambioHabilitar = -1;
      }
      }, 5000);
  }

  cancelarPasswd(){
    this.cambiarPasswd = -1;
  }

  cancelarDeshabilitar(){
    this.perfilDeshabilitar = -1;
  }

  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;
  }

  modificarUsuario(){

    this.perfil.nombre = this.usuarioForm.get('nombre')?.value;
    this.perfil.id = JSON.parse(localStorage.getItem('user')!).id;
    if(this.selectedFile){

      this.perfil.avatar = this.selectedFile;
      this.perfilService.actualizarPerfil(this.perfil).subscribe(resp => {
        if(resp){
          this.cambioPerfilCorrecto = 1;
          let token = JSON.parse(localStorage.getItem('user')!).token;
          let rol = JSON.parse(localStorage.getItem('user')!).rol;
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify({
            id: resp.id,
            nombre: resp.nombre,
            avatar: resp.avatar,
            rol: rol,
            token: token
          }))
        }else{
          this.cambioPerfilCorrecto = 2;
        }
      });
    }else{
      this.perfil.avatar = '';
      this.perfilService.actualizarPerfil(this.perfil).subscribe(resp => {
        if(resp){
          this.cambioPerfilCorrecto = 1;
          let token = JSON.parse(localStorage.getItem('user')!).token;
          let rol = JSON.parse(localStorage.getItem('user')!).rol;
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify({
            id: resp.id,
            nombre: resp.nombre,
            avatar: resp.avatar,
            rol: rol,
            token: token
          }));
        }else{
          this.cambioPerfilCorrecto = 2;
        }
      });
    }
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {this.cambioPerfilCorrecto = -1;}, 5000);
  }

  modificarPassword(){

    if (this.passwdForm.get('passwords')?.get('passwd')?.value == this.passwdForm.get('passwords')?.get('passwdConf')?.value) {

      let datos = {
        id: JSON.parse(localStorage.getItem('user')!).id,
        passwd: this.passwdForm.get('passwords')?.get('passwd')?.value,
      }

      this.perfilService.actualizarPasswd(datos).subscribe(resp => {
        if (resp) {
          this.cambioPasswdCorrecto = 1;
        }else{
          this.cambioPasswdCorrecto = 2;
        }
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {this.cambioPasswdCorrecto = -1;}, 5000);
      });
    }
  }

  abrirInicio(){
    if(JSON.parse(localStorage.getItem('user')!).rol == 'jugador'){

      this.router.navigate(['/jugador/inicio']);

    }else if(JSON.parse(localStorage.getItem('user')!).rol == 'administrador'){

      this.router.navigate(['/administrador/inicio']);

    }
  }

  abrirLogin(){
    this.router.navigate(['/auth/login']);
  }

  cerrar(){
    this.cambioPasswdCorrecto = -1;
    this.cambioPerfilCorrecto = -1;
  }

}
