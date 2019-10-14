import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Trending } from '../models/trending-models';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';


@Component({
  selector: 'app-trending-dialog-modal',
  templateUrl: './trending-dialog-modal.component.html',
  styleUrls: ['./trending-dialog-modal.component.css'],
  providers:[Trending]
})

export class TrendingDialogModalComponent implements OnInit {
  dialogRef; 
  category; 
  public trending;
  public result2;
  public keywords;
  public projectTrendingData: Trending = new Trending();
  collection = [{"trening_collection_name":"Trending0"},{"trening_collection_name":"Trending1"},{"trening_collection_name":"Trending2"},{"trening_collection_name":"Trending3"},{"trening_collection_name":"Trending4"},{"trening_collection_name":"Trending5"},{"trening_collection_name":"Trending6"},{"trening_collection_name":"Trending7"},{"trening_collection_name":"Trending8"},{"trening_collection_name":"Trending9"}]
  form = new FormGroup({
    Keywords: new FormControl('', Validators.required),
    collection: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),    
   });

  constructor(private _userServe: UserService) { 
    // this.trending = {
    //   collection:this.collection,   
    //   Keywords : [
    //     this.keywords
    //   ],
    //   category: this.category
    //   }
  }
  
  ngOnInit() {
  
  }
  onSubmit(category){
    this.createTrending();
    alert(JSON.stringify(this.form.value));
    console.log(category);    
    // this.dialogRef.afterClosed().subscribe(result => { });    
  }
  createTrending(){   
   let obj ={
    "trending_collection_name":this.projectTrendingData.trendingdto.trending_collection_name,   
      "keywords" : [
       this.projectTrendingData.trendingdto.keywords
     ],
     "category": this.projectTrendingData.trendingdto.category
   } 
  console.log(obj);
   this._userServe.trendingCreate(obj).subscribe((res)=>{     
    this.result2 = res;  
  console.log(this.result2); 
   });
  }
}
