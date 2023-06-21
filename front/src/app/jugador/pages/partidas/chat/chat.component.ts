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
  public messages: any[]=[];
  public input_message:any;

  constructor(
    protected socketService: JugadorsocketService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.socketService.outEven.subscribe(res => {
      console.log(res);
      this.messages.push(res);
    })
  }

  ngOnInit() {

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
