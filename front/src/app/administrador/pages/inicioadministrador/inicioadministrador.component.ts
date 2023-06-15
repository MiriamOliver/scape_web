import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicioadministrador',
  templateUrl: './inicioadministrador.component.html',
  styleUrls: ['./inicioadministrador.component.scss']
})
export class InicioadministradorComponent implements OnInit {

  ngOnInit(): void {
    localStorage.setItem('datosAdmin', JSON.stringify({
      id: 'administrador',
      id_user: JSON.parse(localStorage.getItem('user')!).rol,
      nombre: JSON.parse(localStorage.getItem('user')!).nombre,
      avatar : JSON.parse(localStorage.getItem('user')!).avatar,
    }));
    localStorage.setItem('foro', JSON.stringify({
      id: 'foro'
    }))
  }

}
