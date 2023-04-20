import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    rol:string = JSON.parse(localStorage.getItem('user')!).rol;
}
