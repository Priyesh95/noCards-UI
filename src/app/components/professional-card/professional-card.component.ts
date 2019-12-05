import { Component, OnInit } from '@angular/core';
import { ProfessionalCardService } from '../../services/professional-card.service';

import { ActivatedRoute, Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
// import {NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: 'app-professional-card',
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.css']
})
export class ProfessionalCardComponent implements OnInit {
  id: String;
  name: String = "";
  company: String = "";
  position: String = "";
  email: String = "";
  location: String = "";
  ph_number: any = "";
  facebook:String = ""
  linkedin:String = ""
  github:String = ""
  isNew: boolean = true

  constructor(private professionalCardService:ProfessionalCardService
    , private router : Router
    ) { }

  ngOnInit() {
    var card = history.state.data
      if(card != undefined && card.professional_cards_id!=null){
        this.isNew = false;
        this.id = card.professional_cards_id;
        this.name = card.name;
        this.company = card.company;
        this.email = card.email;
        this.position = card.position;
        this.location = card.location;
        this.ph_number = card.ph_number;
        this.facebook = card.facebook;
        this.linkedin = card.linkedin;
        this.github = card.github;
      }
    // })
  }

  onSubmit() {
    if(this.isNew){
    const professional_card = {
      id: this.generateId(),
      name: this.name,
      company: this.company,
      position: this.position,
      email: this.email,
      location: this.location,
      ph_number: this.ph_number,
      facebook: this.facebook,
      linkedin: this.linkedin,
      github: this.github
    };
    console.log(professional_card)
    this.professionalCardService.addCard(professional_card).subscribe(cards=>{
        console.log(cards)
        this.router.navigate(["/mycards"]); 
    })
  }
  else{
    const professional_card = {
      id: this.id,
      name: this.name,
      company: this.company,
      position: this.position,
      email: this.email,
      location: this.location,
      ph_number: this.ph_number,
      type:'Professional',
      facebook: this.facebook,
      linkedin: this.linkedin,
      github: this.github

    };

    this.professionalCardService.updateCard(professional_card).subscribe(cards=>{
        console.log(cards)
        this.router.navigate(["/mycards"]); 
      
    })
  }

  }



  generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  
}


}
