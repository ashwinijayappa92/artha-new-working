import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import {TokenServiceService} from '../token-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
token;
  constructor(private _routes:Router,private _token:TokenServiceService) {

  // this._token._initializeToken.subscribe(token =>{

  //   this.token = token;
  // })
 }

  ngOnInit() {
    // if(this.token == ''){
    //   this._routes.navigate(['login']);
    //   console.log("mmmmmmmmm=>",this.token);
    // }
  
  }

}
