import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciojugador',
  templateUrl: './iniciojugador.component.html',
  styleUrls: ['./iniciojugador.component.scss']
})
export class IniciojugadorComponent implements OnInit {

  ngOnInit() {
    localStorage.setItem('datosJugador', JSON.stringify({
      id: 'jugador',
      id_user: JSON.parse(localStorage.getItem('user')!).rol,
      nombre: JSON.parse(localStorage.getItem('user')!).nombre,
      avatar : JSON.parse(localStorage.getItem('user')!).avatar,
    }));
  }
}
