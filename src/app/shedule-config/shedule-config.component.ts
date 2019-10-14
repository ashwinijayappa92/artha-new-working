

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenServiceService } from '../token-service.service';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { UserService } from './../user.service';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';


@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header" style="background-color:#2a3344a1;display: block;">
  <h4  style="color:#fff" >  Create shedule config</h4>
   </div>
  <div class="modal-body">
  <form #userCreate = "ngForm" >
  <div class="row">
  <div class="form-group col-md-4" [class.has-error]="module.invalid && module.touched" [class.has-success]="module.valid">n
    <label for="name" class="control-label"><b>Module:</b> &nbsp;</label>
    <input type="text"  id="keywords"  class="form-control" required  #module="ngModel" name="module" [(ngModel)]="Module" />
    <span style="color:red" class="help-block"  *ngIf="module.invalid && module.touched">module is required</span>
  </div>

    <div class="form-group col-md-8" [class.has-error]="keywords.invalid && keywords.touched" [class.has-success]="keywords.valid">
    <label for="name" class="control-label"><b>Interval:</b> &nbsp;</label><span>Enter Interval in Milli Seconds 1000ms = 1 sec and 60,000ms = 1Min</span>
    <input type="number"  id="Interval"  class="form-control" required  #keywords="ngModel" name="interval" [(ngModel)]="Interval" />
    <span style="color:red" class="help-block"  *ngIf="keywords.invalid && keywords.touched">Keywords is required</span>
    </div>
  </div>
  <div class="row">
  <div class="form-group col-md-8" [class.has-error]="status.invalid && status.touched" [class.has-success]="status.valid">
    <label  class="control-label"  for="departments">Status :</label>     
       <select name="lang" [(ngModel)]="nrSelect"  required #status ="ngModel" class="form-control" > 
         
          <option [value]="depart.value" *ngFor="let depart of statusCheck">{{depart.name}}</option>
          </select>
          <span  class="help-block" *ngIf="status.invalid && status.touched">  Language is required</span>
     </div>  
     </div>  
  

      <div class="form-group" style="max-height: 108px;
      overflow-y: scroll;width:99%">
   <div  class="row"  style="margin:0px; "[class.has-error]="category.invalid && category.touched" [class.has-success]="category.valid">
  <div class="col-md-3">
  <label for="name" class="control-label">Category: &nbsp;</label>
 </div>
  <div class="col-md-9">
  <div class="row">
  <div>
   <div  class="col-md-4 form-group"  *ngFor="let cat of category ">
    <input type="checkbox" id="category" name="category"  [checked]="cat.checked"   (click)="cat.checked = !cat.checked; update(cat)"> {{cat.category}}
    </div>
      </div>
      </div>
   </div>
    <span style="color:red" class="help-block"  *ngIf="category.invalid && category.touched">category is required</span>
  </div>
  </div>
 <div class="modal-footer">
  <button type="submit" style="font-size:10px" class="btn btn-info" [disabled]="userCreate.invalid" (click)="shedulerCreate(userCreate.value);activeModal.close('Close click')">Ok</button>
  </div>
  </form>
 </div>
  `
})



export class NgbdModalContentS {
  @Input() name;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() message;
  result2: any;
  category: any = [];
  accountsArr: any = [];
  token;
  enable;
  checked: boolean = false;
  nrSelect = 'enable';
  user;

  statusCheck = [
    { value: 'enable', name: 'Enable' },
    { value: 'disable', name: 'Disable' },
  ]

  constructor(public activeModal: NgbActiveModal, private _userServe: UserService) {
    this._userServe.categoryList().subscribe((res) => {
      var temp: any = res;
      this.category = temp.message;
      console.log('category', this.category)
    });
  }


  ngOnInit() { }



  shedulerCreate(data) {

    console.log('data', this.nrSelect);
    //var enable = data.isActive ? 'enable' : 'disable';
    let sendObjData = {
      "module_name": data.module,
      "time_interval": data.interval,
      "status": this.nrSelect,
      "category": this.checkIngridentList
    }
    this.passEntry.emit(sendObjData);
    this._userServe.shedulerCreate(sendObjData).subscribe((res) => {
      this.result2 = res;
      // console.log("post result:", this.result2);
    });
  }


  enabling(data) {
    if (data == true) {
      this.enable = 'enable';
    }
    else {
      this.enable = 'disable';
    }
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
          // console.log('am checking', ingredient.ingredient)
          // console.log('am 8', this.checkIngridentList[i].ingredient)
          this.checkIngridentList.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.checkIngridentList);
  }

}





@Component({
  selector: 'app-shedule-config',
  templateUrl: './shedule-config.component.html',
  styleUrls: ['./shedule-config.component.css']
})
export class SheduleConfigComponent implements OnInit {
  token;
  p: number = 1;
  result: any = [];
  result2: any = [];
  showLoadingIndicator: boolean = true;
  accounts: any = [];
  mobile;
  public query: any = '';
  accountsArr: any = [];
  nrSelect;
  hideCancelBtn: boolean = false;
  hideEditBtn: boolean = true;
  hideUpdateBtn: boolean = false;
  category;
  categoryValue;
  public user: any;
  categoryForm: FormGroup;
  @ViewChild('userlogin') form: any
  categorySettings = {};
  cateArry: any = [];


  constructor(private alerts: AlertsService,
    private _token: TokenServiceService, private _routes: Router, private _userServe: UserService, private modalService: NgbModal) {
    this._token._initializeToken.subscribe((ele: any) => {
      this.token = ele;
      //  console.log('token i get', ele)
    })

    this._userServe.categoryList().subscribe((res) => {
      var temp: any = res;
      this.category = temp.message;
      console.log('category', this.category)
    });

    this.categoryForm = new FormGroup({
      'userData': new FormGroup({
        'userdata.module_name': new FormControl(null, []),
        'userdata.time_interval': new FormControl(null, []),
        // 'gender':new FormControl('female'),
        // 'hobbies':new FormArray([])
      }),

    });
  }

  ngOnInit() {
    this.shedulerList();
    // if (this.token == '') {
    //   this._routes.navigate(['login']);
    //   // console.log("mmmmmmmmm=>", this.token);
    // }

    this.categorySettings = {
      singleSelection: false,
      idField: 'category',
      textField: 'category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }





  //this.cateArry= [];
  onItemSelect(item) {
    console.log(item);
    this.cateArry.push(item);
    console.log("category array", this.cateArry);
    this.removeAllElements(this.cateArry);
  }

  newCat = [];
  uniqueArray = [];
  removeAllElements(array) {
    for (let i = 0; i <= array.length; i++) {
      if (this.uniqueArray.indexOf(array[i]) === -1) {
        this.uniqueArray.push(array[i]);
      }
    }
    console.log("array", this.uniqueArray);
    this.newCat = [];
    this.uniqueArray.forEach(fan => {
      if (fan) { this.newCat.push(fan); }
    });
    console.log("array temp", this.newCat);

  }


  onItemDeSelect(item) {
    console.log('deselect item', item);
    this.newCat.forEach((ele, index) => {
      if (ele === item) {
        this.newCat.splice(index, 1);
      }
    });
    console.log('after deselect item', this.newCat);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  openSm() {
    const modalRef = this.modalService.open(NgbdModalContentS, { size: 'lg' });
    modalRef.componentInstance.name = 'name';
    modalRef.componentInstance.message = 'message';
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      // console.log('recieved data', receivedEntry);
      this.alerts.setMessage('Created successfully', 'success');
      this.alerts.setDefaults('timeout', 2);
      this.result.push(receivedEntry);
    })
  }




  shedulerList() {
    this._userServe.shedulerList().subscribe((res) => {
      this.showLoadingIndicator = true;
      var temp: any = res;
      this.showLoadingIndicator = false;
      this.result = temp.message;
      this.mobile = temp.message[0].created_by;
      //this below code to to make indivisual row editable or enable instead of all
      let newResult = this.result.map(element => {
        element.display = false;
        return element;
      })
      this.result = newResult;
      this.nrSelect = this.result[0].category;
      console.log('dddd', this.nrSelect)
      // console.log("post result message:", this.result);
    });
  }


  catArr: any = [];
  update(data, e) {
    console.log(data);

    console.log('categoryMMM--', data);
    if (e.target.innerHTML === 'Edit') {
      e.target.innerHTML = "Update";
      this.hideCancelBtn = true;
      this.hideUpdateBtn = true;
      this.hideEditBtn = false;
    }

    else {
      console.log('categoryMMM--', data);
      let sendObjData = {
        "module_name": data.module_name,
        "time_interval": data.time_interval,
        "status": data.status,
        "category": this.newCat,
        "created_by": this.mobile
      }
      console.log(sendObjData);
      //  if(data.category.length>0){
      this._userServe.shedulerUpdate(sendObjData).subscribe((res) => {
        console.log("res", res);
        var temp2: any = res;
        e.target.innerHTML = "Edit";
        this.hideEditBtn = true;
        this.hideCancelBtn = false;
        this.hideUpdateBtn = false;
        this.alerts.setMessage('Updated successfully', 'success');
        this.alerts.setDefaults('timeout', 1);
        this.shedulerList();
      });
    }
  }


  // catArr:any= [];
  // update(data, e) {

  //         if (e.target.innerHTML === 'Edit') {
  //           e.target.innerHTML = "Update";
  //         }
  //         else {
  //           console.log('categoryMMM--',  data.category);
  //           let sendObjData = {
  //             "module_name": data.module_name,
  //             "time_interval": data.time_interval,
  //             "status": data.status,
  //             "category": data.category,
  //             "created_by": this.mobile
  //           }

  //         // console.log('category', this.accountsArr);
  //           // console.log('keywords', this.accounts);
  //            this._userServe.shedulerUpdate(sendObjData).subscribe((res) => {
  //             var temp2: any = res;
  //             e.target.innerHTML = "Edit";
  //             this.alerts.setMessage('Updated successfully', 'success');
  //             this.alerts.setDefaults('timeout', 1);
  //             this.shedulerList();
  //           });
  //         }
  //     }

  something(data) {

    console.log("some", data);

  }
  save(data) {
    console.log('category', data.category);
  }

  cancel(event) {
    if (event.target.innerHTML === 'Cancel') {
      this.hideEditBtn = true;
      this.hideCancelBtn = false;
      this.hideUpdateBtn = false;

    }
  }

}



