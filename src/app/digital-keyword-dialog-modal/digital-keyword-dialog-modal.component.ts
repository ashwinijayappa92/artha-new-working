import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Digital } from './../models/digital-models';
import { AlertsService } from 'angular-alert-module';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';

@Component({
  selector: 'app-digital-keyword-dialog-modal',
  templateUrl: './digital-keyword-dialog-modal.component.html',
  styleUrls: ['./digital-keyword-dialog-modal.component.css'],
  providers:[Digital]
})
export class DigitalKeywordDialogModalComponent implements OnInit {
  model = {option:'college'}
  dialogRef;
  digitalArray;
  category;
  public projectViewData: Digital = new Digital();
  form = new FormGroup({
    Keyword: new FormControl('', Validators.required),    
   });
  constructor(private _userServe: UserService,private digital:Digital,private alerts: AlertsService) { 
   
  }

  ngOnInit() {
    this._userServe.categoryList().subscribe((res) => {
      var temp: any = res;
      this.category = temp.message;
      console.log('category', this.category)
    })
  }
  onSubmit(){
    this.createDigital();         
    this.dialogRef.afterClosed().subscribe(result => { }); 
       
  }

  createDigital(){ 
    var obj ={"category": this.projectViewData.digitaldto.category,
    "keywords": [this.model.option]
  }
     this._userServe.digitalCreate(obj).subscribe((res)=>{
         this.digitalArray = res;         
      })
  }
 }


