
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user-model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenServiceService } from '../token-service.service';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { UserService } from './../user.service';


@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header" style="background-color:#2a3344a1;display: block;">
  <h4  style="color:#fff" > Create category</h4>
  </div>
  <div class="modal-body">
  <form #userCreate = "ngForm" >
  <div class="form-group" [class.has-error]="username.invalid && username.touched" [class.has-success]="username.valid">
    <label for="name" class="control-label">Category: &nbsp;</label>
    <input type="text"  id="category"  class="form-control" required  #username="ngModel" name="category" [(ngModel)]="categoryA" />
    <span style="color:red" class="help-block"  *ngIf="username.invalid && username.touched">category is required</span>
  </div>

  <div class="modal-footer">
  <button class="btn btn-info"  style="background:#2e4a7b !important;font-size: 10px;"   (click)="CategoryCreate(userCreate.value);activeModal.close('Close click')"  [disabled]="userCreate.invalid" type="submit">SUBMIT</button>
  <button class="btn btn-info"  style="font-size: 10px;"   style="font-size: 10px;background-color: #909398 !important;"  (click)="activeModal.close('Close click')">CANCEL</button>
  </div>
  </form>
  </div>
  `
})

export class NgbdModalContentC {
  @Input() name;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() message;
  result2: any;
  token;
  constructor(public activeModal: NgbActiveModal, private _userServe: UserService) {
   
  }


     CategoryCreate(data) {
      let sendObjData = {
          "category": data.category,
        }
        this.passEntry.emit(sendObjData);
        this._userServe.categoryCreate(sendObjData).subscribe((res)=>{
          this.result2 = res;
          console.log("post result:", this.result2);
        })
  
     }



}


@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  token;
  p: number = 1;

  public users: User[];
  @ViewChild('editTable') edit: ElementRef;
  @ViewChild('show') showPassword: ElementRef;
  photoPreview = false;
  result: any = [];
  showLoadingIndicator: boolean = true;
  public query:any = '';
 




  constructor( private _routes: Router, 
     private _token: TokenServiceService,private _userServe: UserService,
     private alerts: AlertsService,
      private modalService: NgbModal) {
      this._token._initializeToken.subscribe((ele: any) => {
     // console.log("token", ele)
      this.token = ele;
     })


  }

  ngOnInit() {
    this.userList();
    // if (this.token == '') {
    //   this._routes.navigate(['login']);
    // }
  }


  openSm() {
    const modalRef = this.modalService.open(NgbdModalContentC);
    modalRef.componentInstance.name = 'name';
    modalRef.componentInstance.message = 'message';
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
     // console.log('recieved data', receivedEntry);
      this.alerts.setMessage(' Created successfully','success');
      this.alerts.setDefaults('timeout',1);
      this.result.push(receivedEntry);
    })
  }


  userList() {
   this._userServe.categoryList().subscribe((res)=>{
    this.showLoadingIndicator = true;
    console.log("post result:", res);
    this.showLoadingIndicator = false;
    var temp: any = res;
    this.result = temp.message;
    console.log("pllll:", this.result);
    let tmpArr = [];
    this.result.forEach(obj => {
      if (obj.category) {
        let i = tmpArr.findIndex(e => {
          return obj.category == e.category
        });
        if (i >= 0) { }
        else {
          tmpArr.push(obj);
        }
      }

    });
        this.result = tmpArr;
       // console.log("post result message:", this.result);
   });
  
  }

  
  
}

