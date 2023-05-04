import { Component, OnInit } from '@angular/core';
//import { JugadorService} from 'src/app/jugador/services/jugador.service';
import { JugadorsocketService } from 'src/app/jugador/services/jugadorsocket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  user:any;
  id_partida:any;
  avatar:any;
  msg:any;
  show_message:any;
  messages: any[]=[];
  public input_message:any;

  constructor(
    protected socketService: JugadorsocketService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user = JSON.parse(localStorage.getItem('user')!).nombre;
    this.id_partida = this.activatedRoute.snapshot.params['id'];
    this.avatar = JSON.parse(localStorage.getItem('user')!).avatar;
   }

  ngOnInit() {
    localStorage.setItem('chat', JSON.stringify({
      avatar: this.avatar,
      nombre: this.user,
      id: this.id_partida
    }));
    this.socketService.outEven.subscribe(res => {
      this.messages.push(res);
    })
  }

   sendData = (event:any) =>{
    this.socketService.emitEvent(event,
      {
        message: this.input_message
      })
      console.log(this.input_message);
   this.input_message = null;
   }

}
