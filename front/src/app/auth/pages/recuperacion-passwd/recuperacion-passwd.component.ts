import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-recuperacion-passwd',
  templateUrl: './recuperacion-passwd.component.html',
  styleUrls: ['./recuperacion-passwd.component.scss']
})
export class RecuperacionPasswdComponent implements OnInit{

  submitted: boolean = false;
  passwdForm!: FormGroup;
  cambioPasswd = 1;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.cambioPasswd = 1;
    this.submitted = false;
    this.passwdForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ])],
    })
  }

  recPasswd() {
    this.authService.recPassword(this.passwdForm.get('email')?.value).subscribe(resp => {
      if (resp.success) {
        this.router.navigate(['auth/genpasswd'])
      }
    });
  }

  get form() {
    return this.passwdForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

  abrirLogin() {
    this.router.navigate(['auth/login']);
  }

}
