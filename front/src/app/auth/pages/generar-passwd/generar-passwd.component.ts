import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { confirmarPasswd } from '../../validators/validator';


@Component({
  selector: 'app-generar-passwd',
  templateUrl: './generar-passwd.component.html',
  styleUrls: ['./generar-passwd.component.scss']
})
export class GenerarPasswdComponent implements OnInit{

  submitted: boolean = false;
  genPasswdForm!: FormGroup;
  cambioPasswd = 1;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.cambioPasswd = 1;
    this.submitted = false;
    this.genPasswdForm = this.fb.group({
      passwords: this.fb.group({
        passwd: ['', Validators.required],
        passwdConf: ['', Validators.required]
      },
      {
        validators: [confirmarPasswd()]
      })
    })
  }

  get passwords(){
    return this.genPasswdForm.controls["passwords"] as FormGroup;
  }

  genPasswd() {
    /* this.authService.generarPassword(this.genPasswdForm.get('passwords')?.get('passwd')?.value).subscribe(resp => {
      if (!resp.success) {
        this.cambioPasswd = 2;
      }
    }); */
  }

  get form() {
    return this.genPasswdForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

  abrirRestPasswd() {
    this.router.navigate(['auth/recpasswd']);
  }
}
