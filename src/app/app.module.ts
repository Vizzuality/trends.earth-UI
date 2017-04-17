import { environment } from 'environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialRootModule } from '@angular/material';
import {
  LocationStrategy,
  PathLocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'rxjs';
import { LoginComponent } from "app/pages/login/login.component";
import { OauthRequestOptions } from "app/services/oauth-request.service";
import { AuthService, TokenService } from "app/services/auth.service";
import { RecoverPasswordComponent } from "app/pages/recover-password/recover-password.component";

let locationStrategy:any = PathLocationStrategy;
if (environment.production) {
  locationStrategy = HashLocationStrategy;
}

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
    MaterialRootModule,
    AppRoutingModule
  ],
  providers: [
    TokenService,
    AuthService,
    { provide: RequestOptions, useClass: OauthRequestOptions },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: locationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
