import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RespRecPasswd } from '../../interfaces/auth.interface';


@Component({
  selector: 'app-recuperacion-passwd',
  templateUrl: './recuperacion-passwd.component.html',
  styleUrls: ['./recuperacion-passwd.component.scss']
})
export class RecuperacionPasswdComponent implements OnInit{

  timer: number | undefined;
  submitted: boolean = false;
  passwdForm!: FormGroup;
  cambioPasswd = -1;
  result!: RespRecPasswd;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.result = {
      msg: "",
      success: false
    }
  }

  ngOnInit(): void {
    this.cambioPasswd = -1;
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
      console.log(resp);
      if (resp.success) {
        this.router.navigate(['auth/genpasswd'])
      }else{
        this.cambioPasswd = 2;
        console.log(resp.msg);
        this.result.msg = resp.msg
      }
      clearTimeout(this.timer);
      this.timer = window.setTimeout(() => {this.cambioPasswd = -1;}, 3000);
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
