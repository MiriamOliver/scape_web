import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login, RespRegistro } from '../../interfaces/auth.interface';
//import {SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  timer: number | undefined;
  loginCorrecto: number = -1;
  submitted: boolean = false;
  loginForm!: FormGroup;
  usuario:Login;
  result:RespRegistro;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    //private socialAuthService: SocialAuthService,
  ) {
    this.usuario = {
      email: "",
      password:""
    }
    this.result = {
      msg: "",
      success: false
    }
  }

  ngOnInit(): void {
    this.loginCorrecto = -1;
    this.submitted = false;

    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ])],
      passwd: ['', Validators.required],
    })
  }

  get form() {
    return this.loginForm.controls;
  }

  login(){

    this.usuario.email = this.loginForm.get('email')?.value;
    this.usuario.password = this.loginForm.get('passwd')?.value;

    this.authService.login(this.usuario).subscribe(resp => {
      if (!resp.success) {
        this.loginCorrecto = 1;
        this.result.msg = resp.msg;
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {this.loginCorrecto = -1;}, 5000);
      }else{
        localStorage.setItem('user', JSON.stringify(resp.data));
        this.result.msg = resp.msg;
        if(JSON.parse(localStorage.getItem('user')!).rol == 'jugador'){
          this.router.navigate(['jugador/inicio']);
        }else if(JSON.parse(localStorage.getItem('user')!).rol == 'administrador'){
          this.router.navigate(['administrador/inicio']);
        }
      }
    });
  }


  loginWithGoogle(){
    console.log('hola');
    //this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


  onSubmit() {
    this.submitted = true;
  }


  abrirRegistro() {
    this.router.navigate(['auth/registro']);
  }

  abrirRecPasswd() {
    this.router.navigate(['auth/recpasswd']);
  }
}
