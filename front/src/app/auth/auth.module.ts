import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SocialAuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
//import { AuthInterceptor } from './services/auth.config.interceptor';
import { RecuperacionPasswdComponent } from './pages/recuperacion-passwd/recuperacion-passwd.component';
import { GenerarPasswdComponent } from './pages/generar-passwd/generar-passwd.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    MainAuthComponent,
    InicioComponent,
    RecuperacionPasswdComponent,
    GenerarPasswdComponent
  ],
  providers: [

    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)
          }
        ]
      } as SocialAuthServiceConfig,
    } */
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ]
})
export class AuthModule { }
