import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioadministradorComponent } from './pages/inicioadministrador/inicioadministrador.component';
import { EnigmasComponent } from './pages/enigmas/enigmas/enigmas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'inicio', component: InicioadministradorComponent },
      { path: 'enigmas', component: EnigmasComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdministradorRoutingModule { }
