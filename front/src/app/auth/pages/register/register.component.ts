import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { confirmarPasswd } from '../../validators/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  selectedFile: string = "";
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

  registro() {

    if (this.registerForm.get('passwd')?.value == this.registerForm.get('passwdConf')?.value) {
      this.authService.registro({
        avatar: this.selectedFile,
        nombre: this.registerForm.get('nombre')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('passwords')?.get('passwd')?.value,
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

  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;
  }

  abrirLogin() {
    this.router.navigate(['auth/login']);
  }
}
