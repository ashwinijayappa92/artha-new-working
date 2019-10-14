import { Component, OnInit,ViewChild,Input,Output } from '@angular/core';
import {NgForm}  from '@angular/forms';
import {Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TokenServiceService} from '../token-service.service';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
  <button type="button" class="close" aria-label="Close" (click)="activeModal.close('Close click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
  <div class="modal-body">
  <p>{{name}}</p>
 <!-- <button type="button"  class="btn  btn-default pull-right" (click)="activeModal.close('Close click')">Ok</button>-->
  </div>
  `
  })


export class NgbdModalContentA {
  @Input() name;

  constructor(public activeModal: NgbActiveModal,) { }
  @Input() message;
  ngOnInit(){
   this.closing();
  }

  closing(){
    setTimeout(()=>{    
      this.activeModal.dismiss();
  }, 2000);
}

}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  noDetails: boolean = false;
  message: boolean = false;
  constructor(private _http: HttpClient,private _routes:Router,
    private modalService: NgbModal,private _token:TokenServiceService,private _auth:AuthenticationService) { }
  @ViewChild("userlogin") public createUserForm: NgForm;
  result:any=[];
  error;
  ngOnInit() {
    document.body.classList.add('bg-img');
  }

 

  openSm(name) {
    const modalRef = this.modalService.open(NgbdModalContentA);
    modalRef.componentInstance.name = name;
  }

  
  
  onClickSubmit(data){
    //console.log(data)
    let sendObjData = {
      "mobile_number":data.phone,
      "password":  data.pass,
    }

      this._auth.login(sendObjData).subscribe((res)=>{
         this.result = res;
         console.log("res",this.result);
        this._routes.navigate(['/home/dashboard']);
        },error => {
        console.log('err', error);
        this.error = 'Number and Password Entered is not available';
        }
      )

      // //  this._http.post("http://api.artha.today:9000/user/login", sendObjData, headerOption).subscribe(res => {
      //   this._http.post("http://api.artha.today:3005/user/login", sendObjData, headerOption).subscribe(res => {
      //     this.result = res;
      //    // console.log("post result:",this.result);
      //     localStorage.setItem('jwt', this.result.jwt);
      //     const data = localStorage.getItem('jwt');
      //    this._token._initializeToken$.next(data);
      //   //  console.log('jwt',data);
      //   // console.log(localStorage.getItem('jwt'));
      //     this.openSm('logged in successfully');
      //     this._routes.navigate(['home/dashboard']);
      //   },
      //   err => {
      //   this.openSm('Invalid Number and Password Entered is not available');
      //     this.createUserForm.reset();
      //   } );
  }
    
}



 
  



