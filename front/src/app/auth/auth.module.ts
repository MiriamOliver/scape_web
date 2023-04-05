import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    MainAuthComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
