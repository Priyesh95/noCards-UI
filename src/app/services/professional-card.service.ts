import { Injectable } from '@angular/core';
import { Professional_Card } from '../models/professional_card';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject} from 'rxjs'
import { Observable} from 'rxjs'
import { of } from 'rxjs'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthenticationService } from './authentication.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfessionalCardService {

  professional_cards : Professional_Card[];
  
  constructor(private http: HttpClient, private authService: AuthenticationService) { 
  }

  
  getCards(): Observable<[]>{
    const user = this.authService.getUserDetails();
    var id = {}
    id['user_id'] = user.identity.user_id
    return this.http.post<[]>('https://nocards.herokuapp.com/get_cards',id)
  }


  addCard(card:any) : Observable<any>{
    card['type'] = 'Professional'
    const user = this.authService.getUserDetails();
    card['user_id'] = user.identity.user_id
    console.log(card)
    return this.http.post<any>('https://nocards.herokuapp.com/add_card',card)

  }

  getCard(id,type): Observable<any>{
    var card = {}
    card['id'] = id;
    card['type'] = type;
    
    return this.http.post<any>('https://nocards.herokuapp.com/get_card',card)
  }

  updateCard(card:any) : Observable<any>{
    return this.http.post<any>('https://nocards.herokuapp.com/update_card',card)
  }


  sendCard(id,email):Observable<any>{
    var card ={}
    const user = this.authService.getUserDetails();
    card['from'] = user.identity.user_id
    card['to'] = email
    card['card_id'] = id
    card['type'] = 'Professional'
    return this.http.post<any>('https://nocards.herokuapp.com/share_card',card)
  }

  getReceivedCards():Observable<any[]>{
    const user = this.authService.getUserDetails();
    var id = {}
    id['user_id'] = user.identity.user_id
    return this.http.post<any[]>('https://nocards.herokuapp.com/received_cards',id)
  }

  getSentCards():Observable<any[]>{
    const user = this.authService.getUserDetails();
    var id = {}
    id['user_id'] = user.identity.user_id
    return this.http.post<any[]>('https://nocards.herokuapp.com/sent_cards',id)
  }

  getNote(card_id):Observable<any>{
    var card ={}
    const user = this.authService.getUserDetails();
    card['user_id'] = user.identity.user_id
    card['card_id'] = card_id
    return this.http.post<any>('https://nocards.herokuapp.com/get_note',card)
  }

  addNote(card_id,note,type):Observable<any>{
    var card ={}
    const user = this.authService.getUserDetails();
    card['user_id'] = user.identity.user_id
    card['card_id'] = card_id
    card['note'] = note
    card['type'] = type
    return this.http.post<any>('https://nocards.herokuapp.com/add_note',card)
  }


}
