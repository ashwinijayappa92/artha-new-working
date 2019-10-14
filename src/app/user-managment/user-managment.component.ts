import { UserService } from './../user.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user-model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TokenServiceService } from '../token-service.service';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from '@angular/core/src/render3';


@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header" style="background-color:#2a3344a1;display: block;">
  <h4 style="color:#fff; "> Create user</h4>
  </div>
  <div class="modal-body">
 <form [formGroup]="UserForm">
  <div class="form-group" [class.has-success]="UserForm.valid" class="form-content-labels">
   <label for="name" class="control-label">Name: &nbsp;</label>
  <input type="text" formControlName="username"  style="border: 1px solid #ccc;" autocomplete="off" class="form-control"
    placeholder="User Name" 
    [class.has-error]="!UserForm.controls.username.valid && UserForm.controls.username.dirty" />
  <div style="color:red"
    *ngIf="(UserForm.get('username').hasError('required') || UserForm.get('username').hasError('pattern') || UserForm.get('username').hasError('minlength') || UserForm.get('username').hasError('maxlength') ) && UserForm.get('username').touched ">
    <div class="has-error"
      *ngIf="(UserForm.get('username').hasError('required') )&& UserForm.get('username').touched">
       name is empty
    </div>
    <div class="has-error"
      *ngIf="UserForm.get('username').hasError('minlength') && UserForm.get('username').touched">
      Minimum 4 characters
    </div>
    <div class="has-error"
      *ngIf="UserForm.get('username').hasError('maxlength') && UserForm.get('username').touched">
      Maximum 30 characters
    </div>
    <div class="has-error"
      *ngIf="UserForm.get('username').hasError('pattern') && UserForm.get('username').touched">
      Only use alphabet characters
    </div>
  </div>
</div>


<div class="form-group" class="form-content-labels">
<label for="password" class="control-label">Password</label>
  <input type="password" formControlName="password"  class="form-control"
    placeholder="Password" autocomplete="off" style="border: 1px solid #ccc;"
    [class.has-error]="!UserForm.controls.password.valid && UserForm.controls.password.dirty" />
  <div style="color:red"
    *ngIf="(UserForm.get('password').hasError('required') || UserForm.get('password').hasError('minlength') ) && UserForm.get('password').touched ">
    <div class="error"
      *ngIf="(UserForm.get('password').hasError('required') )&& UserForm.get('password').touched">
      Password is empty
    </div>
    <div class="error"
      *ngIf="UserForm.get('password').hasError('minlength') && UserForm.get('password').touched">
      Minimum 6 characters
    </div>
  </div>
  </div>
  

<div class="form-group" class="form-content-labels">
  <label for="name" class="control-label">Mobile number: &nbsp;</label>
    <input type="text" formControlName="mobile_no" style="border: 1px solid #ccc;"  class="form-control"
      placeholder="mobile No." autocomplete="off"
      [class.error1]="!UserForm.controls.mobile_no.valid && UserForm.controls.mobile_no.dirty" />
    <div style="color:red"
      *ngIf="(UserForm.get('mobile_no').hasError('required') || UserForm.get('mobile_no').hasError('pattern') || UserForm.get('mobile_no').hasError('minlength') || UserForm.get('mobile_no').hasError('maxlength')) && UserForm.get('mobile_no').touched ">
      <div style="color:red"
        *ngIf="(UserForm.get('mobile_no').hasError('required') )&& UserForm.get('mobile_no').touched">
        Mobile number is empty
      </div>
      <div class="error"
        *ngIf="UserForm.get('mobile_no').hasError('minlength') && UserForm.get('mobile_no').touched">
        Minimum 10 characters
      </div>
      <div class="error"
        *ngIf="UserForm.get('mobile_no').hasError('maxlength') && UserForm.get('mobile_no').touched">
        Maximum 10 characters
      </div>
      <div class="error"
        *ngIf="UserForm.get('mobile_no').hasError('pattern') && UserForm.get('mobile_no').touched">
        Only use numbers
      </div>
    </div>
    </div>
  <div class="modal-footer">
  <button  class="btn btn-info"  style="background:#2e4a7b !important;font-size: 10px;"  (click)="userCreate(UserForm.value);activeModal.close('Close click')"  [disabled]="UserForm.invalid" type="submit">SUBMIT</button>
  <button  class="btn btn-info"  (click)="activeModal.close('Close click')"  style="font-size: 10px;background-color: #909398 !important;" >CANCEL</button>
</div>
 </form>
  </div> 
  `
})


export class NgbdModalContent {
  @Input() name;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() message;
  result2: any;
  token;
  UserForm:FormGroup;
  showLoadingIndicator: boolean = false;
  user_method;

  // UserForm: User = {
  //   first_name:"",
  //   mobile_no:null,
  //   password:''
  // };
  constructor(public activeModal: NgbActiveModal, private userServe: UserService, private _http: HttpClient) { }

  ngOnInit(){
    this.UserForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(5), Validators.maxLength(32)]),
    //  username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      mobile_no: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
       password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  userCreate(data) {
   // console.log('dta', data)
    let sendObjData = {
      "name": data.username,
      "mobile_number": data.mobile_no,
      "password": data.password,
    }
    this.passEntry.emit(sendObjData);
    
    this.userServe.createUsers(sendObjData).subscribe(res => {
      console.log('getting res', res);
      this.result2 = res;
      
    })
  }
 
}


@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {
  token;
  mob;
  p: number = 1;
  public users: User[];
  filteredUsers :any =[];
  result: any[] = [];
  showLoadingIndicator: boolean = true;
  public query:any = '';
  uniquarr;
  phoneNumber
  hideCancelBtn:boolean = false;
  hideEditBtn:boolean = true;
  hideUpdateBtn:boolean =false;
  

  constructor(private _http: HttpClient, private alerts: AlertsService,
    private userServe: UserService,
    private _token: TokenServiceService, private _routes: Router, private modalService: NgbModal) {
      this._token._initializeToken.subscribe((ele: any) => {
        this.token = ele;
       // console.log('token i get', ele)
      })
     }

  ngOnInit() {
    this.userList();
    // if (this.token == '') {
    //   this._routes.navigate(['login']);
    //  // console.log("mmmmmmmmm=>", this.token);
    // }

   
    
  }


  openSm() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'name';
    modalRef.componentInstance.message = 'message';
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
     // console.log('recieved data', receivedEntry);
      this.alerts.setMessage('Data Created successfully', 'success');
      this.alerts.setDefaults('timeout', 1);
      // this.result.forEach(element =>{
        //  this.mob = element.mobile_number 
        //  let mobNum = receivedEntry.mobile_number.toString()
        //  if(this.mob != mobNum){
          this.result.push(receivedEntry);
        // } 
      // })       
      //if(mob == th)
      console.log('getting popup',this.result);     
    })
  }

// cancel(){
//   this.ngForm.reset();
// }

  userList() {
   this.userServe.UserList().subscribe(ele => {
      console.log('list', ele);

      this.result = ele;
     // console.log("post result:", ele);
      this.showLoadingIndicator = true;
      var temp: any = ele;
      this.showLoadingIndicator = false;
      this.result = temp.message;
      let newResult = []; 
      this.result.forEach(element => {
        element.display = false;
        element.cancel = false;
        let tmp = true;
        newResult.forEach( el =>{  
          if(el.mobile_number == element.mobile_number){
            tmp = false;
          }
        });

        if(tmp){
          newResult.push(element);
        }
        
        return element;
      })
      this.result = newResult;
     
     // console.log("new result message:", newResult);
     this.uniquarr = this.removeDuplicate(this.result,"mobile_number")
     console.log('dfdsfyt',JSON.stringify(this.uniquarr))

 })

}

  removeDuplicate(arr,ele){
    var newarr = []
    var newObj = {}
    for(var i in arr){
      newObj[arr[i][ele]] = newarr;
    }
    for(var i in newObj){
        newarr.push(newObj[i])
    }
   return newarr;
  // console.log('new',newarr);
  }

 

  // update(data, e,index,i) {
  // // if(i == ){

  // // }
  //   if (e.target.innerHTML === 'Edit') {
  //     //e.target.innerHTML = "Update";
  //     this.hideCancelBtn = true;
  //     this.hideUpdateBtn = true;
  //     this.hideEditBtn = false;
  //   }
  //   else {
  //     let sendObjData = {
  //       "name": data.name,
  //       "password": data.password,
  //       "mobile_number": data.mobile_number
  //     }
  //     this.userServe.userUpdate(sendObjData).subscribe(res => {
  //     //  console.log('list', res);
  //       var temp2: any = res;
  //       e.target.innerHTML = "Edit";
  //       this.showLoadingIndicator = true;
  //       this.alerts.setMessage('Data Updated successfully', 'success');
  //       this.alerts.setDefaults('timeout', 1);
  //       this.showLoadingIndicator = false;
  //       this.hideEditBtn = true;
  //       this.hideCancelBtn = false;
  //       this.hideUpdateBtn = false;
  //       this.userList();
  //       console.log("update result:", temp2);
  //     })
  //   }

  // }

  update(data, e) {
    if (e.target.innerHTML === 'EDIT') {
      e.target.innerHTML = "UPDATE";
      if(e.target.innerHTML == "UPDATE"){
        data.cancel = true;
        //this.hideCancelBtn = true;
      }
      
    }
    else {
      let sendObjData = {
        "name": data.name,
        "password": data.password,
        "mobile_number": data.mobile_number
      }
      this.userServe.userUpdate(sendObjData).subscribe(res => {
      //  console.log('list', res);
        var temp2: any = res;
        e.target.innerHTML = "EDIT";
        this.showLoadingIndicator = true;
        this.alerts.setMessage('Data Updated successfully', 'success');
        this.alerts.setDefaults('timeout', 1);
        this.showLoadingIndicator = false;
        this.userList();
        console.log("update result:", temp2);
      })
    }

  }

  // function for cancel button
  cancel(event,val:HTMLInputElement,data){
     console.log(event,val)
     console.log("INNER HTML",val.innerHTML)
     if(val.innerHTML == 'UPDATE'){
       val.innerHTML = 'EDIT';
       data.cancel = false;
    
     }
    // if (event.target.innerHTML === 'CANCEL') {
    //  // this.hideEditBtn = true;
    //   //this.hideCancelBtn = false;
    //   //this.hideUpdateBtn = false;

    // }
  }

}
