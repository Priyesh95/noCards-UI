import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
  }

  openPage(elem){
    console.log(document.getElementById(elem).innerHTML)
    document.getElementById(elem).style.display = 'block'

  }

}
