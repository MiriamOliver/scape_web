import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: MainAuthComponent},
      { path: 'registro', component: MainAuthComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
