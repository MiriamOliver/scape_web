import { Component, OnInit } from '@angular/core';
import { SocketforoService } from '../services/socketforo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForoserviceService } from '../services/foroservice.service';

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
  public input_archivo:any;
  selectedFile: string = "";
  archivo:any

  constructor(
    protected socketService: SocketforoService,
    protected foroService: ForoserviceService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this.socketService.outEven.subscribe(res => {
      console.log(res);
      this.messages = res;
    })
    this.archivo = {
      id_user: 0,
      archivo: '',
      tipo:''
    }
  }

  ngOnInit() {
    this.selectedFile = "";
    this.socketService.recargarMensajes('mensaje-foro', {})
  }

  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

   sendData = (event:any) =>{
    this.socketService.emitEvent(event,
      {
        id_user:JSON.parse(localStorage.getItem('user')!).id,
        nombre: JSON.parse(localStorage.getItem('user')!).nombre,
        avatar: JSON.parse(localStorage.getItem('user')!).avatar,
        rol: JSON.parse(localStorage.getItem('user')!).rol,
        message: this.input_message,
        tipo: 'mensaje'
      })
   this.input_message = null;
   }

   sendFile = (event:any) =>{

    this.archivo.archivo = this.selectedFile,
    this.archivo.id_user = JSON.parse(localStorage.getItem('user')!).id
    this.archivo.tipo = 'archivo';
    this.foroService.archivoForo(this.archivo).subscribe(resp => {
      this.socketService.recargarMensajes('mensaje-foro', {})
    })
    /* this.socketService.emitFileEvent(event,
      {
        formReg
      })
    this.input_archivo = null; */
   }

}
