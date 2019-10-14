import { UserManagmentComponent } from './user-managment/user-managment.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CreateListComponent } from './create-list/create-list.component';
import { DigitalKeywordComponent } from './digital-keyword/digital-keyword.component';
import { TwitterComponent } from './twitter/twitter.component';
import{LanguageComponent} from './language/language.component'
import { RssComponent } from './rss/rss.component';
import { TrendingComponent } from './trending/trending.component';
import { SheduleConfigComponent } from './shedule-config/shedule-config.component';
import {AuthenticationService} from './authentication.service';


const routes: Routes = [
{path:"", redirectTo:"/login",pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,
  children: [
        {
          path:'dashboard',
          component:DashboardComponent,
        },
        {
          path:'user-management',
          component:UserManagmentComponent
        },
        {
          path:'create-list',
          component:CreateListComponent
        },
        {
          path:'digital-key',
          component:DigitalKeywordComponent
        },
        {
          path:'twitter',
          component:TwitterComponent
        },

        {
          path:'rss',
          component:RssComponent
        },

        {
          path:'shedule',
          component:SheduleConfigComponent
        },

        {
          path:'trending',
          component:TrendingComponent
        },

        {
          path:'lang',
          component:LanguageComponent
        },
    
    ],
   },
   {path:'header',component:HeaderComponent}
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
