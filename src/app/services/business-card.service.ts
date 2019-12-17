import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Business_Card } from '../models/business_card';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }


  addCard(card:Business_Card) : Observable<Business_Card>{
    card['type'] = 'Business'
    const user = this.authService.getUserDetails();
    card['user_id'] = user.identity.user_id
    return this.http.post<Business_Card>('https://nocards.herokuapp.com/add_card',card)

  }

  sendCard(id,email):Observable<any>{
    var card ={}
    const user = this.authService.getUserDetails();
    card['from'] = user.identity.user_id
    card['to'] = email
    card['card_id'] = id
    card['type'] = 'Business'
    console.log(card);
    return this.http.post<any>('https://nocards.herokuapp.com/share_card',card)
  }

  updateCard(card:any) : Observable<Business_Card>{
    return this.http.post<any>('https://nocards.herokuapp.com/update_card',card)
  }

}
