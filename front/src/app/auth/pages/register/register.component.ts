import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { confirmarPasswd } from '../../validators/validator'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwdCorrecta: boolean = true;
  registroCorrecto: boolean = true;
  submitted: boolean = false;
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.passwdCorrecta = false;
    this.registroCorrecto = true;
    this.submitted = false;

    /* this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      passwd: new FormControl('', [Validators.required]),
      passwdConf: new FormControl('', [Validators.required])
    },
    {
     validators: [confirmarPasswd()]
    }
    ); */
    this.registerForm = this.fb.group({
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


  /* MustMatch (passwd:string, passwdConf:string){

    return ( formGroup: FormGroup) => {
      const password = formGroup.controls[passwd];
      const passwordConf = formGroup.controls[passwdConf];

      if(passwordConf.errors && !passwordConf.errors.mustMatch){
        return;
      }

      if(password.value !== passwordConf.value){
        passwordConf.setErrors({ mustMatch: true });
      }else{
        passwordConf.setErrors(null);
      }
    };
  } */

  registro() {

    if (this.registerForm.get('passwd')?.value == this.registerForm.get('passwdConf')?.value) {

      this.authService.registro({
        avatar: this.registerForm.get('avatar')?.value,
        nombre: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        passwd: this.registerForm.get('passwd')?.value,
      }).subscribe(resp => {
        if (!resp.success) {
          this.registroCorrecto = false;
        }
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
