import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { UserService } from './../user.service';
import {Rss} from './../models/rss-model';
import { AlertsService } from 'angular-alert-module';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';

@Component({
  selector: 'app-rss-dialog-modal',
  templateUrl: './rss-dialog-modal.component.html',
  styleUrls: ['./rss-dialog-modal.component.css'],
  providers:[Rss]
})

export class RssDialogModalComponent implements OnInit {

  //form: FormGroup;
 public dialogRef; 
 public category;
 public lang = [];
 public rss_res;
 public rss;
 public links;
 public rssLinks;
 public language;
 public rss_statuscode;
 public language_data;
 opto
 authForm
 public projectViewData: Rss = new Rss();

  form = new FormGroup({     
    links: new FormControl(['', Validators.required]),
    category: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required)   
   });
   
  constructor(private _userServe: UserService,private formBuilder: FormBuilder,private alerts: AlertsService, private userServe: UserService,private uss:Rss) { 
   this.rss ={
    category:"",   
    details : [
        {
      language : "",
      links : []
        } 
       ]
    }
 
  }

  ngOnInit() {
    // this.rssList();
    this._userServe.categoryList().subscribe((res) => {
      var temp: any = res;
      this.category = temp.message;
      // console.log('category', this.category)
    })
    this._userServe.langList().subscribe((res) => {
      var temp: any = res;
      this.lang   = temp.message;
   
    });
  }
  onSubmit(){
    this.createRss();
       
  }
 
  createRss(){
    // console.log(this.language_data)
    let obj = {
      "category":this.category,   
      "details" : [
          {
        "language" : this.language,
        "links" : [
          this.links
        ]
          } 
         ]
    }
    console.log(obj);
    this._userServe.rssCreate(obj).subscribe((res)=>{                 
        this.rss_res = (res);
        console.log(this.rss_res.statusCode);     
        // if(this.rss_res.statusCode == 200) {
        //   console.log(this.rss_res.statusCode)
        //   this.alerts.setMessage('category created successfully', 'success');
        //   this.alerts.setDefaults('timeout', 1);
        // }
        // else if(this.rss_res == undefined){
        //   console.log(this.rss_res.statusCode)
        //   this.alerts.setMessage('category already exists successfully', 'success');
        //   this.alerts.setDefaults('timeout', 1);
        // }
               
    })   
  }
   
  rssList(){    
    this._userServe.rssList().subscribe((res) =>{
    this.rssLinks = res;
    console.log(this.rssLinks);
    })    
  }
}
