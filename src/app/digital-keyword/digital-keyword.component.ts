import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenServiceService } from '../token-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import { UserService } from './../user.service';
import { FormsModule, Form ,FormGroup,FormControl,Validators,FormArray}   from '@angular/forms';
import {DigitalKeywordDialogModalComponent} from '../digital-keyword-dialog-modal/digital-keyword-dialog-modal.component'

import {  MatDialog,  MatDialogRef,
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';

@Component({
  selector: 'ngbd-modal-content',
  template: `
<div class="modal-header" style="background-color:#2a3344a1;display: block;">
<h4  style="color:#fff" > Create digital keywords</h4>
</div>
  <div class="modal-body">
  <form #userCreate = "ngForm" >
  <div class="form-group" [class.has-error]="username.invalid && username.touched" [class.has-success]="username.valid">
    <label for="name" class="control-label">Keywords: &nbsp;</label>
    <input type="text"  id="keywords"  class="form-control" required  #username="ngModel" name="keywords" [(ngModel)]="Keywords" />
    <span style="color:red" class="help-block"  *ngIf="username.invalid && username.touched">Keywords is required</span>
  </div>
  <div class="form-group" style="max-height: 108px;
  overflow-y: scroll;width:99%">
<div  class="row"  style="margin:0px; "[class.has-error]="category.invalid && category.touched" [class.has-success]="category.valid">
<div class="col-md-2">
<label for="name" class="control-label">Category: &nbsp;</label>
</div>
<div class="col-md-10">
<div class="row">
<div>
<div  class="col-md-4 form-group"  *ngFor="let cat of category ">
<input type="checkbox"  id="category" name="category"  [checked]="cat.checked" (click)="cat.checked = !cat.checked; update(cat)" required> {{cat.category}}
</div>
  </div>
  </div>
</div>
<span style="color:red" class="help-block"  *ngIf="category.invalid && category.touched">category is required</span>
</div>
</div>  
  <div class="modal-footer">
  <button class="btn btn-info"  style="font-size: 10px;"  (click)="digitalCreate(userCreate.value);activeModal.close('Close click')"  [disabled]="userCreate.invalid" type="submit">submit</button>
</div>
  </form>
  </div>
  `
})



export class NgbdModalContentD {
  
  @Input() name;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() message;
  @ViewChild('userCreate') userCreate: NgForm;
  result2: any;
  category: any = [];
  accountsArr: any = [];
  token;
  constructor(public activeModal: NgbActiveModal, private _userServe: UserService) { }


  ngOnInit(){
    this._userServe.categoryList().subscribe((res) => {
      var temp: any = res;
      this.category = temp.message;
      console.log('category', this.category)
    })
  }


  digitalCreate(data) {    
    //  console.log('acct', data.keywords);
      this.accountsArr = data.keywords.split(',');
    //  console.log('array', this.accountsArr);
      let sendObjData = {
        "category": this.checkIngridentList,
        "keywords": this.accountsArr,
      }
      this.passEntry.emit(sendObjData);
      this._userServe.digitalCreate(sendObjData).subscribe((res)=>{
        this.result2 = res;
      //console.log("post result:", this.result2);
      })
  
  }


  checkIngridentList: any = [];
  update(ingredient) {
    if (ingredient.checked) {
      this.checkIngridentList.push(ingredient);
      console.log("val", ingredient)
    }
    else {
      for (let i = 0; i < this.checkIngridentList.length; i++) {
        if (this.checkIngridentList[i].ingredient == ingredient.ingredient) {
          //console.log('am checking', ingredient.ingredient)
          //console.log('am 8', this.checkIngridentList[i].ingredient)
          this.checkIngridentList.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.checkIngridentList);
  }
}





@Component({
  selector: 'app-digital-keyword',
  templateUrl: './digital-keyword.component.html',
  styleUrls: ['./digital-keyword.component.css']
})
export class DigitalKeywordComponent implements OnInit {
  token;
  @ViewChild('editTable') edit: ElementRef;
  photoPreview = false;
  result: any = [];
  result2: any = [];
  message: any = null;
  display_buttons: boolean = true; accounts: any = [];
  showLoadingIndicator: boolean = true;
  p: number = 1;
  display:boolean = false;
  public query:any = '';
  hideCancelBtn:boolean = false;
  hideEditBtn:boolean = true;
  hideUpdateBtn:boolean =false;
  public dialogRef;
  digitalForm = new FormGroup({
    category: new FormControl('', Validators.required),
    keywords:new FormControl('',Validators.required)   
   });

  constructor(
     private _token: TokenServiceService,public dialog: MatDialog,  private alerts: AlertsService, private _userServe: UserService,
      private _routes: Router, private modalService: NgbModal) {
      this._token._initializeToken.subscribe((ele: any) => {
      this.token = ele;
     // console.log('token i get', ele)
    })
  }

  ngOnInit() {
    this.digitalList();
      // if (this.token == '') {
      //   this._routes.navigate(['login']);
      // }
  }



  openSm() {
    // const modalRef = this.modalService.open(DigitalKeywordDialogModalComponent);
    // modalRef.componentInstance.name = 'name';
    // modalRef.componentInstance.message = 'message';
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //  // console.log('recieved data', receivedEntry);
    //   this.alerts.setMessage('Data Created successfully','success');
    //   this.alerts.setDefaults('timeout',1);
    //   this.result.push(receivedEntry);
    // })
    
      this.dialogRef = this.dialog.open(DigitalKeywordDialogModalComponent, {
        // disableClose: true,
        width: '800px',
        data: {}
      });
  
      this.dialogRef.afterClosed().subscribe(result => { });
     
    
  }






  digitalList() {
    this._userServe.digitalList().subscribe((res)=>{
      this.showLoadingIndicator = true;
      //console.log("post result:", res);
      this.showLoadingIndicator = false;
      var temp: any = res;
      this.result = temp.message;
      let newresult = temp.message.map(element => {
        element.display = false;
        element.hide = false;
        return element;
      });
      //console.log('cat=====>', newresult);
      this.result = newresult;
console.log(this.result)
    })

  }



  update(data, e) {
    if (e.target.innerHTML === 'Edit') {
      e.target.innerHTML = "Update";
      this.hideCancelBtn = true;
      this.hideUpdateBtn = true;
      this.hideEditBtn = false;
    }
    else {      
      //console.log('acct', data.keywords);
      this.accounts = {};
       this.accounts = data.keywords.split(',');   
      //let keyword = {};
       //keyword = this.accounts;
      //  console.log(keyword);    
    //  console.log('array', this.accounts);
      let sendObjData = {
        "category": data.category,
        "keywords": this.accounts,       
      }
     console.log(sendObjData);

          //  console.log('category', data.category[0]);
    //  console.log('keywords', this.accounts);
      this._userServe.digitalUpdate(sendObjData).subscribe((res)=>{
        var temp2: any = res;
        // console.log(res);        
        e.target.innerHTML = "Edit";
        this.hideEditBtn = true;
        this.hideCancelBtn = false;
        this.hideUpdateBtn = false;
        this.alerts.setMessage('Data updated successfully','success');
        this.alerts.setDefaults('timeout',1);
        this.digitalList();
        this.display_buttons = true;
       // console.log("update result:", temp2);
        e.target.innerHTML = "Edit";
      });
    }
  }

  cancel(event){
    if (event.target.innerHTML === 'Cancel') {
      this.hideEditBtn = true;
      this.hideCancelBtn = false;
      this.hideUpdateBtn = false;

    }
  }

}
