import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {TokenServiceService} from '../token-service.service';
import {Router } from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
token;
  constructor( private _http:HttpClient,private _token:TokenServiceService,private _routes:Router, private _log:AuthenticationService) {
    this._token._initializeToken.subscribe((ele:any)=>{
      console.log("dosagegraph",ele)
      this.token = ele;
      console.log('token i get',ele)
    })
   }

  ngOnInit() {
  }

  logout(){
    this._log.logout();
  // let headerPotion = new HttpHeaders({
      //    'Content-Type': 'application/json',
      //     "jwt":this.token,
        
      //   })
        
      //     let headerOption = {
      //       headers: headerPotion
      //     }
         
      //     this._http.post("http://api.artha.today:9000/user/logout", headerOption).subscribe(res => {
      //      // this.result = res;
      //      // console.log("post result:",res);
      //       localStorage.setItem('jwt', '');
      //     //  const data = localStorage.getItem('jwt');
      //      this._token._initializeToken$.next('jwt');
      //       this._routes.navigate(['/']);
      //     },
      //     err => {
      //     console.log('error',err)
         
      //     });
        
     
    
  }

}
