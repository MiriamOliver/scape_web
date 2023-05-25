import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AdministradorService } from 'src/app/administrador/services/administrador.service';
import { AdministradorsocketService } from 'src/app/administrador/services/administradorsocket.service';
import { Perfil } from 'src/app/administrador/interfaces/administrador.interface';


@Component({
  selector: 'app-modificarusuarios',
  templateUrl: './modificarusuarios.component.html',
  styleUrls: ['./modificarusuarios.component.scss']
})
export class ModificarusuariosComponent implements OnInit {

  submitted: boolean = false;
  selectedFile: string = "";
  usuarioForm!: FormGroup;
  nombre:string = '';
  avatar:string = '';
  respuesta:string = '';

  public perfil:Perfil = {
    id : 0,
      nombre:'',
      avatar:'',
      email : '',
      rol : '',
      activo : '',
  }

  constructor(private administradorService: AdministradorService,
              private activatedRoute: ActivatedRoute,
              protected socketService: AdministradorsocketService,
              private router: Router,
              private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.selectedFile = "";

    this.usuarioForm = this.fb.group({
        nombre: ['', Validators.required],
        respuesta: ['', Validators.required],
      })

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.administradorService.obtenerUsuario(id))
      )
      .subscribe((resp) => {
        this.perfil = {
          id : resp.id,
          nombre: resp.nombre,
          avatar : resp.avatar,
          rol : resp.rol,
          email:resp.email,
          activo:resp.activo
        }
        this.nombre = this.perfil.nombre;
        this.avatar =  this.perfil.avatar;
        this.respuesta = this.perfil.rol;
      });
  }

  onFileSelected(event:any): any{
    this.selectedFile = event.target.files[0];
  }

  modificarUsuario(id:any){
    this.perfil.nombre = this.usuarioForm.get('nombre')?.value;
    this.perfil.rol = this.usuarioForm.get('respuesta')?.value;

    if(this.selectedFile){

      this.perfil.avatar = this.selectedFile;
      this.perfil.id = id;

      this.administradorService.actualizarPerfil(this.perfil).subscribe(resp => {
        if(resp){
          this.socketService.listadoUsuariosEvent('listadousuarios',{})
        }
      });

    }else{
      this.perfil.avatar = '';
      this.socketService.actualizarPerfil('listadousuarios', this.perfil)
    }



    //this.router.navigate(['administrador/usuarios']);

  }

  get form() {
    return this.usuarioForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

}
