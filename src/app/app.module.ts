import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularDialogComponent } from './angular-dialog/angular-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './shared/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatSelectModule} from '@angular/material/select';

  
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    AngularDialogComponent,
    LoginComponent,
    SignupComponent
  ],

  entryComponents: [
    AngularDialogComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatSortModule,
    MatSelectModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader:{
        provide:TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
