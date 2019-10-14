
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { NgbdModalContent } from './user-managment/user-managment.component';
import { NgbdModalContentA } from './login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CreateListComponent } from './create-list/create-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TokenServiceService} from './token-service.service';
import { DigitalKeywordComponent } from './digital-keyword/digital-keyword.component';
import { NgbdModalContentC } from './create-list/create-list.component';
import {NgbdModalContentD} from './digital-keyword/digital-keyword.component';
import {TwitterComponent} from './twitter/twitter.component';
import {NgbdModalContentT} from './twitter/twitter.component';
import{LanguageComponent} from './language/language.component';
import{NgbdModalContentL} from './language/language.component';
import { RssComponent } from './rss/rss.component';
import { TrendingComponent } from './trending/trending.component';
import { SheduleConfigComponent } from './shedule-config/shedule-config.component';
import {NgbdModalContentTw} from './trending/trending.component';
import {NgbdModalContentS} from './shedule-config/shedule-config.component';
import { NgbdModalContentR } from './rss/rss.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AlertsModule } from 'angular-alert-module';
import { FilterPipe } from './pipes/filter.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { from } from 'rxjs';
import { DigitalKeywordDialogModalComponent } from './digital-keyword-dialog-modal/digital-keyword-dialog-modal.component';
import { TrendingDialogModalComponent } from './trending-dialog-modal/trending-dialog-modal.component';
import { RssDialogModalComponent } from './rss-dialog-modal/rss-dialog-modal.component';


@NgModule({
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
   MatButtonModule,
   NgSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    HttpClientModule, 
    NgxPaginationModule,
    AlertsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
      
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    UserManagmentComponent,
    NgbdModalContent,
    NgbdModalContentA,
    CreateListComponent,
    DigitalKeywordComponent,
    NgbdModalContentC,
    NgbdModalContentD,
    TwitterComponent,
    LanguageComponent,
    RssComponent,
    TrendingComponent,
    SheduleConfigComponent,
    NgbdModalContentL,
    NgbdModalContentT,
    NgbdModalContentTw,
    NgbdModalContentS,
    NgbdModalContentR,
    FilterPipe,
    DigitalKeywordDialogModalComponent,
    TrendingDialogModalComponent,
    RssDialogModalComponent,
   
    
 
  ],
  entryComponents:[NgbdModalContent,UserManagmentComponent, 
     LoginComponent,NgbdModalContentA,NgbdModalContentC,NgbdModalContentD,NgbdModalContentL,NgbdModalContentT,NgbdModalContentTw,
     NgbdModalContentS,NgbdModalContentR,DigitalKeywordDialogModalComponent,TrendingDialogModalComponent,RssDialogModalComponent
    ],
  providers: [TokenServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
