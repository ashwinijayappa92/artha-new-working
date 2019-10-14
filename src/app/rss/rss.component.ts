
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenServiceService } from '../token-service.service';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { UserService } from './../user.service';
import { ObjectUnsubscribedError } from 'rxjs';
import { FormsModule, Form ,FormGroup,FormControl,Validators,FormArray}   from '@angular/forms';
import { RssDialogModalComponent } from '../rss-dialog-modal/rss-dialog-modal.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header" style="background-color:#2a3344a1;display: block;">
  <h4  style="color:#fff" > Enter Rss details</h4>
   </div>
<div class="modal-body">
<form #userCreate = "ngForm">
<div class="row">
      <div class="col-md-10">
             <div class="row" [class.has-error]="departmentss.invalid && departmentss.touched" [class.has-success]="departmentss.valid">          
             <div class="col-md-12" [class.has-error]="departmentss.invalid && departmentss.touched">
             <label class="control-label" for="departments">Categories</label>
               <select   name="lang" [(ngModel)]="category_new" selected="selected"   class="form-control"required  #departmentss ="ngModel"  (change)="selectchange($event)" > 
                 <option [ngValue] ="null">select Category</option>
               <option [value]=" cat.category"*ngFor="let cat of category"> {{cat.category}}</option>
              </select><br>
              <span  class="help-block" *ngIf="departmentss.invalid && departmentss.touched">  Category is required</span>
               </div>
              </div>
           </div>
     </div>
 <div class="row">
     <div class="col-md-5">
        <div class="row">
          <div  class="col-md-12" [class.has-error]="departmentss.invalid && departmentss.touched" [class.has-success]="departmentss.valid">
        <label  class="control-label"  for="departments">languages :</label>  
        <select   name="lang" [(ngModel)]="languages"  required #departmentss ="ngModel" class="form-control" (change)="selectchange($event)" > 
          <option [ngValue] ="null">select Languages</option>
          <option [value]="lng.language_name" *ngFor="let lng of lang">{{lng.language_name}}</option>
          </select>
          <span  class="help-block" *ngIf="departmentss.invalid && departmentss.touched">  Language is required</span>
       </div>
     </div>   
   </div>
       
   <div class="col-md-5">
     <div class="row" [class.has-error]="username.invalid && username.touched" [class.has-success]="username.valid">
        <div  class="col-md-12">
         <label for="checking"   class="control-label"  >Links :</label>&nbsp;<br>
         <input type="text"  #username="ngModel" (blur)="saveLinks()" class="form-control" [(ngModel)]="keywords" [ngModelOptions]="{standalone: true}" name="link" required  value="link"/>        
        <span  class="help-block" *ngIf="username.invalid && username.touched">  links is required</span>   
        </div>             
     </div>
     </div>
    <!--  <div class="col-md-1">
      <button class="btn btn-info btn-sm" style=" margin-top: 28px;
      font-size: 10px;" (click)="saveLinks()">save</button>
      </div>-->
  </div>  
  
<div class="modal-footer">
<br><br>
<button class="btn btn-info"  style="font-size: 10px;"   (click)=" rssCreate(userCreate.value);activeModal.close('Close click')"  [disabled]="userCreate.invalid" type="submit">submit</button>

</div>
</form>
</div>
 `
})



export class NgbdModalContentR {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() message;
  result2: any;
  category: any = [];
  lang: any = [];
  accountsArr: any = [];
  token; enable;
  accounts;
  countryValue; countryName;
  languages: string;
  keywords: string;
  category_new: string;

  checked: boolean = false;
  constructor(public activeModal: NgbActiveModal, private _userServe: UserService) {
    this._userServe.langList().subscribe((res) => {
      var temp: any = res;
      this.lang   = temp.message;
       console.log('languges My===>>',this.lang)
    });

      this._userServe.categoryList().subscribe((res) => {
        var temp: any = res;
        this.category = temp.message;
        console.log('category', this.category)
      });
  }

  ngOnInit(){
     
  }


  saveData: any = [];
   saveLinks(links) {
    let tmp = {
      "language": this.languages,
      "links": this.keywords.split(',')
    }
    this.saveData.push(tmp);
    console.log(this.saveData);
  }


  rssCreate(data) {
    let sendObjData = {
      "category": this.category_new,
      "details": this.saveData
    }

    this.passEntry.emit(sendObjData);
    this._userServe.rssCreate(sendObjData).subscribe((res)=>{
    this.result2 = res;
   // console.log("post result:", this.result2);
   });
  }

   selectchange(args) {
      this.countryValue = args.target.value;
      this.countryName = args.target.options[args.target.selectedIndex].text;
     // console.log('value cnt', this.countryValue);
    //  console.log('name cnt', this.countryName)
    }
}


@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit {
  token;
  showLoadingIndicator: boolean = true;
  result: any = [];
  result2: any = [];
  display_buttons: boolean = true;
  accounts: any = [];
  mobile;
  p: number = 1;
  countryValue; countryName;
  lang: any = [];
  public query:any = '';
  hideCancelBtn:boolean = false;
  hideEditBtn:boolean = true;
  hideUpdateBtn:boolean =false;
  public dialogRef;

  @ViewChild("form") public rssFormdata: NgForm;
  rssForm = new FormGroup({
    usercategory: new FormControl('', Validators.required),
    userlinks:new FormControl('',Validators.required)   
   });
  @ViewChild("userdata.category+user.language+i ") public id: ElementRef;
  constructor( private alerts: AlertsService,
    private _token: TokenServiceService, 
    private _routes: Router, 
    private _userServe: UserService,
    private modalService: NgbModal,
    private dialog:MatDialog,
  
    
    ) {
    this._token._initializeToken.subscribe((ele: any) => {
      this.token = ele;

      this._userServe.langList().subscribe((res) => {
        var temp: any = res;
        this.lang   = temp.message;
         console.log('languges My===**>>',this.lang)
      });
     // console.log('token i get', ele)
    })
    this.rssList();


  }
  
  ngOnInit() {
    // this.rssList();
    // if (this.token == '') {
    //   this._routes.navigate(['login']);

    // }
  }



  openLg() {
    this.dialogRef = this.dialog.open(RssDialogModalComponent, {
      // disableClose: true,
      width: '800px',
      data: {}
    });

    this.dialogRef.afterClosed().subscribe(result => { });
  //   const modalRef = this.modalService.open(NgbdModalContentR);
  //   modalRef.componentInstance.name = 'name';
  //   modalRef.componentInstance.message = 'message';
  //   modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
  //     console.log('recieved data', receivedEntry);
  //     this.alerts.setMessage('Created successfully','success');
  //     this.alerts.setDefaults('timeout',1);
  //     this.result2 = receivedEntry;
  //     let newList = receivedEntry.details.map(ele => {
  //       ele.selected = false;
  //       return ele;
  //     })
  //   this.result.push(receivedEntry);
  //  })
  }



  rssList() {
        this._userServe.rssList().subscribe((res) =>{
          this.showLoadingIndicator = true;
          this.showLoadingIndicator = false;
          let temp: any = res.message;

          let newResultMain = [];

          temp.forEach( element =>{
                let t = newResultMain.findIndex( e =>{
                     return e.category == element.category;
                });

                if(t == -1){
                  element.display = false;
                  newResultMain.push(element);
                }
          });

          let newlang = this.lang.map(jk => {
              return jk.language_name;
          });
          let newlang1 = newlang.filter( (value, index, self) => {
              return self.indexOf(value) === index;
          });

          let newresult = newResultMain.map((e, i) => {
                let tmpdetails: any = [];
                newlang1.forEach(ln => {
                    let tobj = {};
                    let tmplinks: any = [];
                    console.log("Details",e.details);
                    if(e.details != null){
                      e.details.forEach(o => {
                        if (ln === o.language){
                         tmplinks = o.links;
                        }
                   });
                  }
                   
                    tobj = {
                      language: ln,
                      links: tmplinks,
                      selected: false
                    };

                    tmpdetails.push(tobj);
                });
                e.details = tmpdetails;
                //console.log(e.details );                
                return e;
          });
          this.result = newresult;
        })
  }



  sub_category: any = [];
  selectedLang;
  curlang;
  selectchange(user, args) {
    let valtmp = args.target.value.trim();
    let tmplang = [];
    this.result.forEach(el => {
      if (user == el.category) {
        el.details.forEach(t => {
          tmplang.push(t.language);
        });
      }
    });
    if (valtmp != "") {
      tmplang.forEach(ar => {
        ar = ar.trim();
        let ioo = user.concat(ar).trim();
        if (ar == valtmp) {
          document.getElementById(ioo).classList.add('showthisdiv');
          document.getElementById(ioo).classList.remove('hidethisdiv');
         // console.log(ioo);
        }
        else {
          document.getElementById(ioo).classList.add('hidethisdiv');
          document.getElementById(ioo).classList.remove('showthisdiv');
        }

      });

    }

    else {
      tmplang.forEach(ar => { 
        ar = ar.trim();
        let ioo = user.concat(ar).trim();
        document.getElementById(ioo).classList.add('hidethisdiv');
        document.getElementById(ioo).classList.remove('showthisdiv');
      });
    }
  

  }


  deviceObjects = [{ name: 1 }, { name: 2 }, { name: 3 }];
  selectedDeviceObj = this.deviceObjects[1];
  onChangeObj(newObj) {
   // console.log(newObj);
    this.selectedDeviceObj = newObj;
    // ... do other stuff here ...
  }


  update(data, e) {
      if (e.target.innerHTML === 'Edit') {
            e.target.innerHTML = "Update";
            // this.display_buttons = false;
            this.hideCancelBtn = true;
             this.hideUpdateBtn = true;
            this.hideEditBtn = false;
            
          }
          else {
            console.log('details', data.details)
            let sendObjData = {
              "category": data.category,
              "details": data.details
            }

            this._userServe.rssUpdate(sendObjData).subscribe((res)=>{
              console.log("===><=====||", res);
              var temp2: any = res;
              e.target.innerHTML = "Edit";
             
              this.hideEditBtn = true;
              this.hideCancelBtn = false;
              this.hideUpdateBtn = false;
              this.alerts.setMessage('Updated successfully','success');
              this.alerts.setDefaults('timeout',1);
               this.rssList();
              this.display_buttons = true;
            //  console.log("update result:", temp2);
            this.display_buttons = true;
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



