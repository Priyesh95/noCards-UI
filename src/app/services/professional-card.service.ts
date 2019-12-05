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
    return this.http.post<[]>('http://127.0.0.1:5000/get_cards',id)
  }


  addCard(card:any) : Observable<any>{
    card['type'] = 'Professional'
    const user = this.authService.getUserDetails();
    card['user_id'] = user.identity.user_id
    console.log(card)
    return this.http.post<any>('http://127.0.0.1:5000/add_card',card)

  }

  getCard(id,type): Observable<Professional_Card>{
    var card = {}
    card['id'] = id;
    card['type'] = type;
    
    return this.http.post<Professional_Card>('http://127.0.0.1:5000/get_card',card)
  }

  updateCard(card:any) : Observable<Professional_Card>{
    return this.http.post<any>('http://127.0.0.1:5000/update_card',card)
  }


  sendCard(id,email):Observable<any>{
    var card ={}
    const user = this.authService.getUserDetails();
    card['from'] = user.identity.user_id
    card['to'] = email
    card['card_id'] = id
    card['type'] = 'Professional'
    return this.http.post<any>('http://127.0.0.1:5000/share_card',card)
  }

  getReceivedCards():Observable<Professional_Card[]>{
    const user = this.authService.getUserDetails();
    var id = {}
    id['user_id'] = user.identity.user_id
    return this.http.post<Professional_Card[]>('http://127.0.0.1:5000/received_cards',id)
  }

  getSentCards():Observable<Professional_Card[]>{
    const user = this.authService.getUserDetails();
    var id = {}
    id['user_id'] = user.identity.user_id
    return this.http.post<Professional_Card[]>('http://127.0.0.1:5000/sent_cards',id)
  }

  getNote(card_id):Observable<any>{
    var card ={}
    const user = this.authService.getUserDetails();
    card['user_id'] = user.identity.user_id
    card['card_id'] = card_id
    return this.http.post<any>('http://127.0.0.1:5000/get_note',card)
  }

  addNote(card_id,note,type):Observable<any>{
    var card ={}
    const user = this.authService.getUserDetails();
    card['user_id'] = user.identity.user_id
    card['card_id'] = card_id
    card['note'] = note
    card['type'] = type
    return this.http.post<any>('http://127.0.0.1:5000/add_note',card)
  }


}
