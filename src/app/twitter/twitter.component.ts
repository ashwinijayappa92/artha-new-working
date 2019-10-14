
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenServiceService } from '../token-service.service';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { UserService } from './../user.service';
import { FormGroup ,FormControl,FormBuilder,FormArray,Validators} from '@angular/forms';


@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header" style="background-color:#2a3344a1;display: block;">
    <h4 style="color:#fff; "> Create twitter</h4>
  </div>
  <div class="modal-body">
    <form [formGroup]="twitterForm">

  
      <div  formArrayName="twitter" *ngFor="let prod of twitterForm.get('twitter').controls; let i=index"
        class="row form-content-labels" >

        <div [formGroupName]="i" class="col-md-12" >
          <table style="width: 100%"><tr><td>
          <label for="name" class="control-label">Twitter: &nbsp;</label>
        
          <input type="text" formControlName="twitter1" style="border: 1px solid #ccc;" autocomplete="off" class="form-control"
            placeholder="User Name"
            [class.has-error]="!prod.get('twitter1').valid && prod.get('twitter1').dirty" />
  
          <div style="color:red"
            *ngIf="(prod.get('twitter1').hasError('required') || prod.get('twitter1').hasError('pattern') || prod.get('twitter1').hasError('minlength') || prod.get('twitter1').hasError('maxlength') ) && prod.get('twitter1').touched ">
            <div class="has-error"
              *ngIf="(prod.get('twitter1').hasError('required') )&& prod.get('twitter1').touched">
              name is empty
            </div>
            <div class="has-error"
              *ngIf="prod.get('twitter1').hasError('minlength') && prod.get('twitter1').touched">
              Minimum 4 characters
            </div>
            <div class="has-error"
              *ngIf="prod.get('twitter1').hasError('maxlength') && prod.get('twitter1').touched">
              Maximum 30 characters
            </div>
           </div>
            </td>
            <td>
                <div *ngIf="twitterForm.get('twitter').length>1" class="float-right mt-3">
                    <i class="fa fa-trash" style="cursor: pointer;color: red !important;"
                    name="close" (click)="removePro(i)" style="font-size:20px;"></i>
                  </div>
            </td>
            </tr>
            </table>
          </div>

          <div class="row float-right">
         
            <span style="color:red; font-size:14px"></span>&emsp;
            <a class="my-label" style="cursor:pointer;text-decoration:underline" (click)="addMoreTwitter()">Add more product</a>
          
      </div>
  
        </div>
    
   
      
  
      <div class="form-group" class="form-content-labels" style="max-height: 108px;overflow-y: scroll;width:99%">
        <div class="col-md-4" *ngFor="let cat of category ">
          <label class="radio-inline">
            <input type="radio" [value]="cat.category" formControlName="category" [checked]="cat.checked"
              (click)="cat.checked = !cat.checked; update(cat)" autocomplete="off" style="border: 1px solid #ccc;"
              required 
              [class.has-error]="!twitterForm.controls.category.valid && twitterForm.controls.category.dirty" />
            &nbsp;{{cat.category}}
          </label>
        </div>
  
        <div style="color:red"
          *ngIf="(twitterForm.get('category').hasError('required')) && twitterForm.get('category').touched ">
          <div class="error"
            *ngIf="(twitterForm.get('category').hasError('required') )&& twitterForm.get('category').touched">
            Password is empty
          </div>
  
        </div>
      </div>
  
  
  
      <div class="modal-footer">
        <button class="btn btn-info" style="background:#2e4a7b !important;font-size: 10px;"
          (click)="userCreate();activeModal.close('Close click')" [disabled]="twitterForm.invalid"
          type="submit">SUBMIT</button>
        <button class="btn btn-info" (click)="activeModal.close('Close click')"
          style="font-size: 10px;background-color: #909398 !important;">CANCEL</button>
      </div>
    </form>
    
  </div> 
  `,
  styles:[]
})



export class NgbdModalContentT {
  @Input() name;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() message;
  result2: any;
  category: any = [];
  accountsArr: any = [];
  token;
  twitterForm:FormGroup;
  addmoreprod:string;

  constructor(public activeModal: NgbActiveModal, private _userServe: UserService,private fb:FormBuilder) {
    this._userServe.categoryList().subscribe((res) => {
      var temp: any = res;
      this.category = temp.message;
      console.log('category', this.category)
    })

  }

      ngOnInit() { 
        this.twitterForm =  this.fb.group({
          twitter: this.fb.array([
            this.addTwitterFormGroup()
           ]),
           category:  ["", [Validators.required]],
        })
      }

      addTwitterFormGroup():FormGroup{
      return this.fb.group({
              twitter1: ["", [ Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30),Validators.minLength(4)]],
          });
      }
      


      addMoreTwitter(){
        if(this.twitterForm.get('twitter').valid){
          (<FormArray>this.twitterForm.get('twitter')).push(this.addTwitterFormGroup());
        } else {
          this.addmoreprod = 'Missing mandatory field.';
        }
      }

      removePro(i:number): void {
        this.addmoreprod = '';
          (<FormArray>this.twitterForm.get('twitter')).removeAt(i);
          // this.orderModal.total_order = 0;
          //     this.orderForm.get('products').value.forEach( ele => {
          //        if(ele.mrp && ele.quantity){
          //         this.orderModal.total_order += parseInt(ele.mrp, 10) * parseInt(ele.quantity, 10);
          //        }
          //     });
      }

        twitterCreate(data) {
          console.log('acct', data.accounts);
          this.accountsArr = data.accounts.split(',');
          console.log('array', this.accountsArr);

          let sendObjData = {
            "category": data.category,
            "accounts": this.accountsArr,
          }

          this.passEntry.emit(sendObjData);
          this._userServe.twitterCreate(sendObjData).subscribe((res) => {
            this.result2 = res;
            console.log("post result:", this.result2);
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
                console.log('am checking', ingredient.ingredient)
                console.log('am 8', this.checkIngridentList[i].ingredient)
                this.checkIngridentList.splice(i, 1);
                break;
              }
            }
          }
          console.log(this.checkIngridentList);
        }



}





@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
  token;
  p: number = 1;
  result: any = [];
  accounts: any = [];
  showLoadingIndicator: boolean = true;
  public query:any = '';
  hideCancelBtn:boolean = false;
  hideEditBtn:boolean = true;
  hideUpdateBtn:boolean =false;


  constructor(private alerts: AlertsService, private _userServe: UserService,
    private _token: TokenServiceService, private _routes: Router, private modalService: NgbModal) {
    this._token._initializeToken.subscribe((ele: any) => {
      this.token = ele;
    //  console.log('token i get', ele)
    })
  }

  ngOnInit() {
    this.userList();
    // if (this.token == '') {
    //   this._routes.navigate(['login']);
    //   //console.log("mmmmmmmmm=>", this.token);
    // }
  }




  openSm() {
    const modalRef = this.modalService.open(NgbdModalContentT);
    modalRef.componentInstance.name = 'name';
    modalRef.componentInstance.message = 'message';
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
     // console.log('recieved data', receivedEntry);
      this.alerts.setMessage('Created successfully', 'success');
      this.alerts.setDefaults('timeout', 1);
      this.result.push(receivedEntry);
    })
  }




  userList() {
    this._userServe.twitterList().subscribe((res) => {
      this.showLoadingIndicator = true;
      console.log("post result:", res);
      var temp: any = res;
      this.showLoadingIndicator = false;
      this.result = temp.message;
     // console.log('twitterlist',this.result)
     // this.result = this.result.splice(22);
      let newResult = this.result.map(element => {
        element.display = false;
        element.cancel = false;
        return element;
      })
      this.result = newResult;
    })

  }


  // accountsArr:any = [];
  // update(data, e) {
  //   if (e.target.innerHTML === 'EDIT') {
  //     e.target.innerHTML = "UPDATE";
  //     if(e.target.innerHTML == "UPDATE"){
  //       data.cancel = true;
  //       //this.hideCancelBtn = true;
  //     }
      
  //   }
  //   else {
  //     console.log('acctfdhfhd', data.accounts);
  //     console.log('array', this.accounts);
  //     this.accountsArr = data.accounts.split(',');
  //     let sendObjData = {
  //       "category": data.category,
  //       "accounts": this.accountsArr 
  //     }
  //     this._userServe.twitterUpdate(sendObjData).subscribe((res) => {
  //       var temp2: any = res;
  //       e.target.innerHTML = "EDIT";
  //      // this.hideEditBtn = true;
  //       //this.hideCancelBtn = false;
  //      // this.hideUpdateBtn = false;
  //       this.alerts.setMessage('Updated successfully', 'success');
  //       this.alerts.setDefaults('timeout', 1);
  //       this.userList();
  //       console.log("update result:", temp2);

  //     })

  //   }
  // }


  accountsArr:any = [];
  update(data, e) {
    if (e.target.innerHTML === 'EDIT') {
      e.target.innerHTML = "UPDATE";
      if(e.target.innerHTML == "UPDATE"){
        data.cancel = true;
        //this.hideCancelBtn = true;
      }
      
    }
    else {
     console.log('acctfdhfhd', data.accounts);
      console.log('array', this.accounts);
      this.accountsArr = data.accounts.split(',');
      let sendObjData = {
        "category": data.category,
        "accounts": this.accountsArr 
      }
      this._userServe.twitterUpdate(sendObjData).subscribe((res) => {
        var temp2: any = res;
        e.target.innerHTML = "EDIT";
        this.alerts.setMessage('Updated successfully', 'success');
        this.alerts.setDefaults('timeout', 1);
        this.userList();
        console.log("update result:", temp2);

      })

    }
  }

  //this function is for cancel button
  cancel(event,val:HTMLInputElement,data){
    console.log(event,val)
    console.log("INNER HTML",val.innerHTML)
    if(val.innerHTML == 'UPDATE'){
      val.innerHTML = 'EDIT';
      data.cancel = false;
   
    }
  }

}
