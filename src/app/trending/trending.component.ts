
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit,AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenServiceService } from '../token-service.service';
import { AlertsService } from 'angular-alert-module';
import { UserService } from './../user.service';
import { FormsModule, Form ,FormGroup,FormControl,Validators,FormArray}   from '@angular/forms';
import { TrendingDialogModalComponent } from '../trending-dialog-modal/trending-dialog-modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';



@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header" style="background-color:#2a3344a1;display: block;">
  <h4  style="color:#fff" >Create trending</h4>
   </div>
  <div class="modal-body">
 
  <form #userCreate = "ngForm" >
  <div class="form-group" [class.has-error]="username.invalid && username.touched" [class.has-success]="username.valid">
    <label for="name" class="control-label">Keyword: &nbsp;</label>
    <input type="text"  id="category"  class="form-control" required  #username="ngModel" name="keywords" [(ngModel)]="Keywords" />
    <span style="color:red" class="help-block"  *ngIf="username.invalid && username.touched">Keywords is required</span>
  </div>

  <div class="form-group" [class.has-error]="username.invalid && username.touched" [class.has-success]="username.valid">
  <label for="name" class="control-label">Collection: &nbsp;</label>
  <input type="text"  id="collection"  class="form-control" required  #username="ngModel" name="collection" [(ngModel)]="Collection" />
  <span style="color:red" class="help-block"  *ngIf="username.invalid && username.touched">accounts is required</span>
</div>

<div class="form-group" [class.has-error]="username.invalid && username.touched" [class.has-success]="username.valid">
<label for="name" class="control-label">Category: &nbsp;</label>
<input type="text"  id="category"  class="form-control" required  #username="ngModel" name="category" [(ngModel)]="Category" />
<span style="color:red" class="help-block"  *ngIf="username.invalid && username.touched">Category is required</span>
</div>

  <div class="modal-footer">
  <button type="submit" [disabled]="userCreate.invalid" class="btn btn-info" style="font-size: 10px;"  (click)="trendingCreate(userCreate.value);activeModal.close('Close click')">Ok</button>
  </div>
  </form>
  </div>
  `
})



export class NgbdModalContentTw {
  @Input() name;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() message;
  result2: any;
  category: any = [];
  accountsArr: any = [];
  token;
  constructor(public activeModal: NgbActiveModal,private _userServe: UserService,) {}

  ngOnInit() {
    this._userServe.categoryList().subscribe((res) => {
      var temp: any = res;
      this.category = temp.message;
      console.log('category', this.category)
    });
  }

  trendingCreate(data) {
   
    //console.log('keywods', data.keywords);
    //console.log('key', data.keywords);
    //console.log('category', data.category);
    this.accountsArr = data.keywords.split(',');
   // console.log('keywords arry', this.accountsArr);


    let sendObjData = {
      "trending_collection_name": data.collection,
      "category": data.category,
      "keywords": this.accountsArr

    }
    this.passEntry.emit(sendObjData);
    //console.log('keywords', this.accountsArr);
   this._userServe.trendingCreate(sendObjData).subscribe((res)=>{
    this.result2 = res;
   // console.log("post result:", this.result2);
   });
  }


  checkIngridentList: any = [];
  update(ingredient) {
    if (ingredient.checked) {
      this.checkIngridentList.push(ingredient);
     // console.log("val", ingredient)
    }
    else {
      for (let i = 0; i < this.checkIngridentList.length; i++) {
        if (this.checkIngridentList[i].ingredient == ingredient.ingredient) {
          // console.log('am checking', ingredient.ingredient)
          // console.log('am 8', this.checkIngridentList[i].ingredient)
          this.checkIngridentList.splice(i, 1);
          break;
        }
      }
    }
   // console.log(this.checkIngridentList);
  }



}





@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  token;
  p: number = 1;
   @ViewChild('myvar') edit: ElementRef;
  @ViewChild('show') showPassword: ElementRef;
  photoPreview = false;
  result: any = [];
  result2: any = [];
  display_buttons: boolean = false;
  showLoadingIndicator: boolean = true;
  keyArr :any = [];
  accounts: any = [];
  public query:any = '';
  hideCancelBtn:boolean = false;
  hideEditBtn:boolean = true;
  hideUpdateBtn:boolean =false;
  public dialogRef;
  trendingForm = new FormGroup({
    usercategory: new FormControl('', Validators.required),
    userlinks:new FormControl('',Validators.required)   
   });
  constructor(private _userServe: UserService, private alerts: AlertsService,public dialog: MatDialog,
    private _routes: Router, private _token: TokenServiceService, private modalService: NgbModal) {
    this._token._initializeToken.subscribe((ele: any) => {
      this.token = ele;
     // console.log('token i get', ele)
    })


  }

   ngOnInit() {
        this.trendingList();
        // if (this.token == '') {
        //   this._routes.navigate(['login']);
        // }
    }

  
  openSm() {

    this.dialogRef = this.dialog.open(TrendingDialogModalComponent, {
      // disableClose: true,
      width: '800px',
      data: {}
    });

    this.dialogRef.afterClosed().subscribe(result => { });
    // const modalRef = this.modalService.open(NgbdModalContentTw);
    // modalRef.componentInstance.name = 'name';
    // modalRef.componentInstance.message = 'message';
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    // //  console.log('recieved data', receivedEntry);
    //   this.alerts.setMessage('Created successfully','success');
    //   this.alerts.setDefaults('timeout',1);
    //   this.result.push(receivedEntry);
    // })
  }




  trendingList() {

      this._userServe.trendingList().subscribe((res)=>{
        this.showLoadingIndicator = true;
      //  console.log("post result:", res);
        var temp: any = res;
        this.showLoadingIndicator = false;
        this.result = temp.message;
        let newResult = this.result.map(ele => {
          ele.display = false;
          ele.hide = false;
          return ele;
        })
        this.result = newResult;
        this.result2 = this.result.category;
      });
  }


  keyIterate(ele) {
    var mycars = [];

    var key = ele.toString().split(',');
    //  alert(key)
    var len = key.length;
    // alert(key)
    for (let i = 0; i <= len; i++) {
      key[i] = key[i];
      mycars.push(key[i]);

    }
    return mycars;
  }



  update(data, e) {
      if (e.target.innerHTML === 'Edit') {
          e.target.innerHTML = "Update";
          this.display_buttons = true;
          this.hideCancelBtn = true;
          this.hideUpdateBtn = true;
          this.hideEditBtn = false;
        }
        else {
        //  console.log('data',data)
         // console.log('acct', data.keywords);
          // console.log('new cat', data.new_category)
          //this.keyArr = data.keywords.split(',');
          //console.log('keywords arry', this.keyArr);
         // this.keyArr = data.keywords.split(',');
          let sendObjData = {
            "old_category": data.category,
            "trending_collection_name": data.trending_collection_name,
             "category": data.new_category,
            "keywords": data.keywords
          }
          // console.log('category', data.category[0].category);
          // console.log('acccounts', this.accounts);
          this._userServe.trendingUpdate(sendObjData).subscribe((res)=>{
            var temp2: any = res;
           
            this.alerts.setMessage('Updated successfully','success');
            this.alerts.setDefaults('timeout',0.6);
            e.target.innerHTML = "Edit";
            this.hideEditBtn = true;
            this.hideCancelBtn = false;
            this.hideUpdateBtn = false;
            this.trendingList();
            this.display_buttons = false;
            console.log("update result:", temp2);
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
