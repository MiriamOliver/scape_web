import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { JugadorsocketService } from 'src/app/jugador/services/jugadorsocket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit{


  constructor(
    private jugadorService: JugadorService,
    private activatedRoute: ActivatedRoute,
    protected socketService: JugadorsocketService,
    private router: Router)
    {
    }

    ngOnInit() {

    }

}
