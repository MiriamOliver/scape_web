import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { confirmarPasswd } from '../../validators/validator';
import { Registro, RespRegistro } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  selectedFile: string = "";
  passwdCorrecta: boolean = true;
  registroCorrecto: number = -1;
  submitted: boolean = false;
  registerForm!: FormGroup;
  usuario:Registro
  result:RespRegistro

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.usuario = {
      avatar: "",
      nombre: "",
      email: "",
      password:""
    }
    this.result = {
      msg: "",
      success: false
    }
  }

  ngOnInit(): void {
    this.passwdCorrecta = false;
    this.registroCorrecto = -1;
    this.submitted = false;
    this.selectedFile = "";

    this.registerForm = this.fb.group({
      avatar: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ])],
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
    return this.registerForm.controls;
  }

  get passwords(){
    return this.registerForm.controls["passwords"] as FormGroup;
  }


  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
  }

  registro() {

    this.usuario.avatar = this.selectedFile;
    this.usuario.nombre = this.registerForm.get('nombre')?.value;
    this.usuario.email = this.registerForm.get('email')?.value;
    this.usuario.password = this.registerForm.get('passwords')?.get('passwd')?.value;

    if (this.registerForm.get('passwd')?.value == this.registerForm.get('passwdConf')?.value) {

      this.authService.registro(this.usuario).subscribe(resp => {
        if (!resp.success) {
          this.registroCorrecto = 1;
          this.result.msg = resp.msg;

        }else{
          this.registroCorrecto = 2;
          this.result.msg = resp.msg;
        }
        console.log(this.result.msg)
      });
    }
    else {
      this.passwdCorrecta = true;
    }
  }

  onSubmit() {
    this.submitted = true;
  }

  abrirLogin() {
    this.router.navigate(['auth/login']);
  }
}
