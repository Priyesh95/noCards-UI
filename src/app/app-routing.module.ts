import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import {CreateCardComponent} from '../app/components/create-card/create-card.component'
import { HomeComponent } from './components/home/home.component';
import { ProfessionalCardComponent } from './components/professional-card/professional-card.component';
import { MycardsComponent } from './components/mycards/mycards.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CardLinkComponent } from './components/card-link/card-link.component';
import { ReceivedCardsComponent } from './components/received-cards/received-cards.component';
import { SentCardsComponent } from './components/sent-cards/sent-cards.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';



const routes: Routes = [
  {path : '',component:HomeComponent},
  {path : 'create-card',component:CreateCardComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path : 'professional-card',component:ProfessionalCardComponent, canActivate: [AuthGuardService]},
  {path : 'business-card',component:BusinessCardComponent, canActivate: [AuthGuardService]},
  {path : 'mycards',component:MycardsComponent, canActivate: [AuthGuardService]},
  {path : 'card_link/:id/:type',component:CardLinkComponent},
  {path : 'received_cards',component:ReceivedCardsComponent,canActivate: [AuthGuardService]},
  {path : 'sent_cards',component:SentCardsComponent, canActivate: [AuthGuardService]},
  ];


@NgModule({
  exports : [RouterModule],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
