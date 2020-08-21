import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { LoginDialogComponent } from './home/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './home/registration-dialog/registration-dialog.component';



@NgModule({
   declarations: [
      AppComponent,
      HomepageComponent,
      NavbarComponent,
      LoginDialogComponent,
      RegistrationDialogComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      ButtonsModule.forRoot(),
      FormsModule,
      MatDialogModule,
      BsDropdownModule.forRoot(),
      ReactiveFormsModule,
      MatFormFieldModule,
      MatSelectModule,
      AngularFontAwesomeModule,
      BrowserAnimationsModule,
      JwtModule.forRoot({
         config: {
            tokenGetter:() => {
               return localStorage.getItem('token');
             },
             allowedDomains: ['localhost:5000'],
             disallowedRoutes:[]
         }
      })
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [LoginDialogComponent, RegistrationDialogComponent]
})
export class AppModule { }
