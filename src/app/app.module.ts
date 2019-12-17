import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { HomeComponent } from './components/home/home.component';
import { ProfessionalCardComponent } from './components/professional-card/professional-card.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MycardsComponent } from './components/mycards/mycards.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import {  NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CardLinkComponent } from './components/card-link/card-link.component';
import { NgxVcardModule} from 'ngx-vcard';
import { ReceivedCardsComponent } from './components/received-cards/received-cards.component';
import { SentCardsComponent } from './components/sent-cards/sent-cards.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { NgHttpLoaderModule } from 'ng-http-loader';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateCardComponent,
    HomeComponent,
    ProfessionalCardComponent,
    MycardsComponent,
    LoginComponent,
    RegisterComponent,
    CardLinkComponent,
    ReceivedCardsComponent,
    SentCardsComponent,
    BusinessCardComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    QRCodeModule,
    NgxQRCodeModule,
    FlashMessagesModule.forRoot(),
    NgxVcardModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
