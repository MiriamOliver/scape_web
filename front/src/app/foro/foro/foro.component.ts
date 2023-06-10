import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit{

  ngOnInit() {
    localStorage.setItem('foro', JSON.stringify({
      id: 'foro'
    }))
  }

}
