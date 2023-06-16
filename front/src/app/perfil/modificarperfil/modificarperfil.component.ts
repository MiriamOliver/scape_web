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
  submitted: boolean = false;
  usuarioForm!: FormGroup;
  passwdForm!: FormGroup;
  perfil:Perfil;
  nombre:string ='';

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

  cancelarPasswd(){
    this.cambiarPasswd = -1;
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
        }else{
          this.cambioPerfilCorrecto = 2;
        }
      });
    }else{
      this.perfil.avatar = '';
      this.perfilService.actualizarPerfil(this.perfil).subscribe(resp => {
        if(resp){
          this.cambioPerfilCorrecto = 1;
        }else{
          this.cambioPerfilCorrecto = 2;
        }
      });
    }
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {this.cambioPerfilCorrecto = -1;}, 5000);
  }

  modificarPassword(){
    if (this.passwdForm.get('passwd')?.value == this.passwdForm.get('passwdConf')?.value) {

      let datos = {
        id: JSON.parse(localStorage.getItem('user')!).id,
        passwd: this.passwdForm.get('passwd')?.value,
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

}
