import { Component, OnInit } from '@angular/core';
import { ProfessionalCardService } from '../../services/professional-card.service';
import { Subscription } from 'rxjs';
import { VCard } from 'ngx-vcard';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-sent-cards',
  templateUrl: './sent-cards.component.html',
  styleUrls: ['./sent-cards.component.css']
})
export class SentCardsComponent implements OnInit {
  cards = {};
  cardsLoaded: boolean = false;
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
  public vCard: VCard;
  noteLoad = false;
  vcardLoad = false;
  reminderLoad = false;
  editbuttonClicked: boolean = true;
  note :string = '';
  organization: string = '';
  address: string = '';
  type: string;

  constructor(
    private professionalCardService:ProfessionalCardService
    ,private router : Router
    ,private modalService: NgbModal
    ,private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.professionalCardService.getSentCards().subscribe(cards=>{
      this.cards= cards;
      console.log(this.cards);
      this.cardsLoaded= true;
    });
  }

  downloadCard(id,type,content){
    this.reminderLoad = false;
    this.noteLoad = false;
    this.vcardLoad = true;
    var card = {};
    card['id'] = id;
    card['type'] = type
    this.professionalCardService.getCard(id,type).subscribe(card=>{
      if (type == 'Professional'){
      this.id = card.professional_cards_id;
      this.name = card.name;
      this.company = card.company;
      this.email = card.email;
      this.position = card.position;
      this.location = card.location;
      this.ph_number = card.ph_number;
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
      if (type == 'Business'){
        this.name = card.name;
        
        this.email = card.email;
      
        this.location = card.location;
        this.ph_number = card.ph_number;
        this.organization = card.organization; 
        this.address  = card.address;
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
    this.modalService.open(content, { windowClass: 'dark-modal',centered: true });  
  }



  showNoteClicked(id,type,content){
    this.reminderLoad = false;
    this.noteLoad = true;
    this.vcardLoad = false;
    this.id = id;
    this.type = type;
    
    this.professionalCardService.getNote(this.id).subscribe(note=>{
      if (note.message){
        this.note = ''  
      }
      else{
        this.note = note[0]['note']
      }
    });
    this.modalService.open(content, { windowClass: 'dark-modal',centered: true });


  }
  
  editClicked(note){
    if (this.editbuttonClicked){
      this.editbuttonClicked = false;  
    } 
    else{
      this.note= note;

      this.professionalCardService.addNote(this.id,this.note,this.type).subscribe(response=>{
        this.flashMessage.show(response.message, { cssClass: 'alert-success', timeout: 2000 });
      });
      this.modalService.dismissAll();

    }
    

    
  }

  reminderClicked(id,content){
    this.reminderLoad = true;
    this.noteLoad = false;
    this.vcardLoad = false;
    this.modalService.open(content, { windowClass: 'dark-modal',centered: true });  
  }

}
