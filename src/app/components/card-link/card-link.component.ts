import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalCardService } from '../../services/professional-card.service';
import { Router } from '@angular/router';
import { VCard } from 'ngx-vcard';
// import { VCard } from 'ngx-vcard';

@Component({
  selector: 'app-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.css']
})
export class CardLinkComponent implements OnInit {

  
  id: String;
  name: String = "";
  company: String = "";
  position: String = "";
  email: String = "";
  location: String = "";
  ph_number: any = "";
  facebook:String = ""
  linkedin:String = ""
  github:String = "";
  type :String =""
  organization: String = "";
  address: String = "";
  website: String = "";

  public vCard: VCard
  constructor(private route: ActivatedRoute
    ,private professionalCardService:ProfessionalCardService
    , private router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];
    var card = {};
    card['id'] = this.id;

    this.professionalCardService.getCard(this.id,this.type).subscribe(card=>{
      if (this.type == 'Professional'){
      this.id = card.professional_cards_id;
      this.name = card.name;
      this.company = card.company;
      this.email = card.email;
      this.position = card.position;
      this.location = card.location;
      this.ph_number = card.ph_number;
      this.github = card.github;
      this.linkedin = card.linkedin;
      this.facebook = card.facebook;
      this.vCard = {
        name: {
          firstNames: this.name.split(' ')[0],
          lastNames: this.name.split(' ')[1]
        },
        email: [(this.email).toString()],
        telephone: [this.ph_number],
        organization: this.company.toString(),
        role: this.position.toString()
      };
    }
      if (this.type == 'Business'){
        this.name = card.name;
        
        this.email = card.email;
      
        this.location = card.location;
        this.ph_number = card.ph_number;
        this.organization = card.organization; 
        this.address  = card.address;
        this.website = card.website;
        this.facebook = card.facebook;
        this.vCard = {
          name: {
            firstNames: this.name.split(' ')[0],
            lastNames: this.name.split(' ')[1]
          },
          email: [(this.email).toString()],
          telephone: [this.ph_number],
          organization: this.organization.toString(),
          role: this.address.toString()
        };
        
      }
      
      
      
    });
    

  }

  

}
