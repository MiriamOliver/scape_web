import { Component, OnInit } from '@angular/core';
import { SocketforoService } from '../services/socketforo.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selectedFile: string = "";

  constructor(
    protected socketService: SocketforoService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this.socketService.outEven.subscribe(res => {
      console.log(res);
      this.messages.push(res);
    })
  }

  ngOnInit() {
    this.selectedFile = "";
  }

  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
  }

   sendData = (event:any) =>{
    this.socketService.emitEvent(event,
      {
        id_user:JSON.parse(localStorage.getItem('user')!).id,
        nombre: JSON.parse(localStorage.getItem('user')!).nombre,
        avatar: JSON.parse(localStorage.getItem('user')!).avatar,
        rol: JSON.parse(localStorage.getItem('user')!).rol,
        message: this.input_message
      })
      console.log(this.input_message);
   this.input_message = null;
   }

}
