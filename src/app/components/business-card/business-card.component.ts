import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessCardService } from '../../services/business-card.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  id: String;
  name: String = "";
  organization: String = "";
  address: String = "";
  email: String = "";
  location: String = "";
  ph_number: any = "";
  website: any = "";
  facebook: any = ""
  isNew: boolean = true


  constructor(private router: Router
    , private businessCardService: BusinessCardService) { }

  ngOnInit() {
    var card = history.state.data
      if(card != undefined && card.business_cards_id!=null){
        this.isNew = false;
        this.id = card.business_cards_id;
        this.name = card.name;
        this.organization = card.organization;
        this.email = card.email;
        this.address = card.address;
        this.location = card.location;
        this.ph_number = card.ph_number;
        this.website = card.website;
        this.facebook = card.facebook;
      }
  }

  onSubmit(){
    if(this.isNew){
      const Business_Card = {
        id: this.generateId(),
        name: this.name,
        organization: this.organization,
        address: this.address,
        email: this.email,
        location: this.location,
        ph_number: this.ph_number,
        website: this.website,
        facebook:this.facebook
      };
      this.businessCardService.addCard(Business_Card).subscribe(cards=>{
          console.log(cards)
          this.router.navigate(["/mycards"]); 
      })
    }
    else{
      const Business_Card = {
        id: this.id,
        name: this.name,
        organization: this.organization,
        address: this.address,
        email: this.email,
        location: this.location,
        ph_number: this.ph_number,
        website: this.website,
        type:'Business',
        facebook:this.facebook
        
      };
      console.log(Business_Card)
      this.businessCardService.updateCard(Business_Card).subscribe(cards=>{
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
