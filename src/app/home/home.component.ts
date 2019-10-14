import { Component, OnInit ,HostListener,Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ViewChild, ElementRef, Input } from '@angular/core';

 import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



openarstatus = false;
public loggedIn = true;
checksidenavclick = 0;
@ViewChild('navbar') navbar: ElementRef;
@ViewChild('mainBar') mainbar: ElementRef;
@ViewChild('toggler') toggler: ElementRef;
@ViewChild('navbaricons') mainnavbar: ElementRef;
public fixed: boolean = false; 
constructor(@Inject(DOCUMENT) private doc: Document) { }

result: any = [];
conflicts: any = [];


ngOnInit() {
 
  this.mainbar.nativeElement.style.marginLeft = '200px';
}



opennav = () => {
  this.navbar.nativeElement.style.width = '200px';
  this.mainbar.nativeElement.style.marginLeft = '200px';
}



iconsnavbar() {
  this.mainnavbar.nativeElement.style.display = 'block';
  this.mainnavbar.nativeElement.style.width = '100px';
  this.mainbar.nativeElement.style.marginLeft = '100px'

}

closeNav = () => {
  this.navbar.nativeElement.style.width = '0';
  this.mainbar.nativeElement.style.marginLeft = '0';
  // this.openarstatus = true;
 this.iconsnavbar();
}


@HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 50) {
       let element =  this.navbar.nativeElement;
       element.classList.add('sticky');
     } else {
      let element =  this.navbar.nativeElement;
        element.classList.remove('sticky'); 
     }
  }
}
