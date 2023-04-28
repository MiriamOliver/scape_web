import { Component } from '@angular/core';
import { JugadorService } from 'src/app/jugador/services/jugador.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  user:any;
  user_id:any;
  msg:any;
  show_message:any;
  messages: any[]=[];
  public input_message:any;

  constructor(
    protected socketService: JugadorService,
    private activatedRoute: ActivatedRoute,
  ) {
    socketService.outEven.subscribe(res => {
      this.messages.push(res);
      console.log(this.messages);
    })

   }

  ngOnInit() {

    localStorage.setItem('chat', JSON.stringify({
      avatar: JSON.parse(localStorage.getItem('user')!).avatar,
      nombre: JSON.parse(localStorage.getItem('user')!).nombre,
      id:this.activatedRoute.snapshot.params['id']
    }));
    /* try{
      this.show_message = JSON.parse(localStorage.getItem('chat')!);
      console.log(JSON.parse(localStorage.getItem('chat')!))
    }catch(e){
      this.show_message = null
    } */

  }

   /* mockedUser = () => {

    localStorage.setItem('chat', JSON.stringify({
      user:this.user ,
      id:this.user_id
    }));
    window.location.reload();
   } */

   sendData = (event:any) =>{
    this.socketService.emitEvent(event,
      {
        message: this.input_message
      })
      console.log(this.input_message);
   this.input_message = null;
   }



}
