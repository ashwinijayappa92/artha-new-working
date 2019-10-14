
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenServiceService } from '../token-service.service';
import { AlertsService } from 'angular-alert-module';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header" style="background-color:#2a3344a1;display: block;">
 <h4  style="color:#fff" > Create language</h4>
  </div>
  <div class="modal-body">
  <form #userLang = "ngForm">
 <div class="form-group" [class.has-error]="username.invalid && username.touched" [class.has-success]="username.valid">
  <label for="name" class="control-label">Language name: &nbsp;</label>
  <input type="text"  id="category"  class="form-control" required  #username="ngModel" name="language" [(ngModel)]="categoryA" />
  <span style="color:red" class="help-block"  *ngIf="username.invalid && username.touched">category is required</span>
</div>

<div class="form-group" [class.has-error]="username.invalid && username.touched" [class.has-success]="username.valid">
  <label for="name" class="control-label">Language code: &nbsp;</label>
  <input type="text"  id="category_code"  class="form-control" required  #username="ngModel" name="language_code" [(ngModel)]="categoryB" />
  <span style="color:red" class="help-block"  *ngIf="username.invalid && username.touched">category code is required</span>
</div>

  <div class="modal-footer">
 <button class="btn btn-info" style="font-size: 10px;" [disabled]="userLang.invalid" type="submit"  (click)="langCreate(userLang.value);activeModal.close('Close click')">Ok</button>
  </div>
  </form>
  </div>
  `
})

export class NgbdModalContentL {
  @Input() name;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() message;
  result2: any;
  token;
  constructor(public activeModal: NgbActiveModal, private _userServe: UserService) {}

  langCreate(data) {
    let sendObjData = {
      "language_name": data.language,
      "language_code": data.language_code
    }
    this.passEntry.emit(sendObjData);
    this._userServe.langCreate(sendObjData).subscribe((res)=>{
      this.result2 = res;
      console.log("post result:", this.result2);
      
    })

  }


}





@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  token;
  result: any = [];
  p: number = 1;
  showLoadingIndicator: boolean = true;
  public query:any = '';
  hideCancelBtn:boolean = false;
  hideEditBtn:boolean = true;
  hideUpdateBtn:boolean =false;


  constructor(private alerts: AlertsService,private _userServe: UserService, private _routes: Router,
    private _token: TokenServiceService, private modalService: NgbModal) {
      this._token._initializeToken.subscribe((ele: any) => {
        this.token = ele;
       // console.log('token i get', ele)
      })
 }

  ngOnInit() {
   this.langList();
      // if (this.token == '') {
      //   this._routes.navigate(['login']);
      // }
  }



  openSm() {
    const modalRef = this.modalService.open(NgbdModalContentL);
    modalRef.componentInstance.name = 'name';
    modalRef.componentInstance.message = 'message';
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
     // console.log('recieved data', receivedEntry);
      this.alerts.setMessage('Created successfully','success');
      this.alerts.setDefaults('timeout', 1);
      this.result.push(receivedEntry);
    })
  }




    langList() {
        this._userServe.langList().subscribe((res)=>{
          this.showLoadingIndicator = true;
          console.log("post result:", res);
          this.showLoadingIndicator = false;
          var temp: any = res;
          this.result = temp.message;
          console.log("post result message:", this.result);
        })
    }


}


