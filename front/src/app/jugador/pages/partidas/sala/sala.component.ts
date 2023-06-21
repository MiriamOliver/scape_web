import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';



@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent {

  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
    {
      localStorage.setItem('chat', JSON.stringify({
        nombre: JSON.parse(localStorage.getItem('user')!).nombre,
        id: this.activatedRoute.snapshot.params['id'],
        avatar : JSON.parse(localStorage.getItem('user')!).avatar,
      }));
    }
}
