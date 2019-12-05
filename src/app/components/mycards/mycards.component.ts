import { Component, OnInit } from '@angular/core';
import { ProfessionalCardService } from '../../services/professional-card.service';
import { Professional_Card } from '../../models/professional_card';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BusinessCardService } from '../../services/business-card.service';






@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.css']
})
export class MycardsComponent implements OnInit {

  
  cards : [];
  professional_cards_loaded = false;
  email: String;
  id: String;
  qrdata : string = 'www.facebook.com';
  href : string;
  type: string;
  card_link:any = "";
  constructor(
    private professionalCardService:ProfessionalCardService
    ,private router : Router
    ,private authService : AuthenticationService
    ,private modalService: NgbModal
    ,private flashMessage: FlashMessagesService
    ,private businessCardService: BusinessCardService
    
    ) {
   }

  ngOnInit() {
    
    this.professionalCardService.getCards().subscribe(cards=>{
        this.cards = cards
        this.cards =cards.sort((a,b)=> {
          var b_Date = new Date(b.date)
          var a_Date = new Date(a.date)
          return b_Date- a_Date;}
        )
        this.professional_cards_loaded = true;
        console.log(this.cards)
    },
    err => {
      console.log(err)
    })
    
  }

  cardClicked(id,type){
    console.log(id,type)
    this.professionalCardService.getCard(id,type).subscribe(card=>{ 
      console.log(card)
      if (type == 'Professional'){ 
        this.router.navigate(["/professional-card"],{state:{data:card}});
      }
      else{
        this.router.navigate(["/business-card"],{state:{data:card}});
      }
      
    });
  }

  shareClicked(id,type,content){
    this.id = id;
    this.type = type;
    this.modalService.open(content, { windowClass: 'dark-modal',centered: true });  
  }

  sendCard(content){
    if (this.type == 'Professional'){
    this.professionalCardService.sendCard(this.id,this.email).subscribe(message=>{
        if(message.message == "User Does Not Exist"){
          this.email = ''
          this.modalService.dismissAll();
          this.modalService.open(content, { windowClass: 'dark-modal',centered: true });  
        }
        else{
          this.email = ''
          this.modalService.dismissAll();
          this.flashMessage.show('Card Sent Successfully', { cssClass: 'alert-success', timeout: 2000 });
        }
    })
  }
  else if (this.type == 'Business'){
    this.businessCardService.sendCard(this.id,this.email).subscribe(message=>{
      if(message.message == "User Does Not Exist"){
        this.email = ''
        this.modalService.dismissAll();
        this.modalService.open(content, { windowClass: 'dark-modal',centered: true });  
      }
      else{
        this.email = ''
        this.modalService.dismissAll();
        this.flashMessage.show('Card Sent Successfully', { cssClass: 'alert-success', timeout: 2000 });
      }
  })
  }
  }


  qrClicked(id,content){
    this.id = id;
    this.qrdata = id;
    this.modalService.open(content, { windowClass: 'dark-modal',centered: true });  
  }

  downloadImage(){
    var someimage = document.getElementById('image_div');
    console.log(someimage.getElementsByTagName('img')[0].src)
    this.href = someimage.getElementsByTagName('img')[0].src;
  }

  copyCardClicked(id,type,content){
    this.card_link = "http://localhost:4200/card_link/" + id +"/" + type
    console.log(this.card_link)
    this.modalService.open(content, { windowClass: 'dark-modal',centered: true });  
  }
  


}
