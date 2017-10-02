import { SimpleNotificationsModule } from 'angular2-notifications';
import { environment } from 'environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialRootModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'rxjs';
import { LoginComponent } from "app/pages/login/login.component";
import { OauthRequestOptions } from "app/services/oauth-request.service";
import { AuthService, TokenService } from "app/services/auth.service";
import { RecoverPasswordComponent } from "app/pages/recover-password/recover-password.component";
import { DatepickerModule } from 'angular2-material-datepicker'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    MaterialRootModule,
    AppRoutingModule,
    DatepickerModule
  ],
  providers: [
    TokenService,
    AuthService,
    { provide: RequestOptions, useClass: OauthRequestOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
