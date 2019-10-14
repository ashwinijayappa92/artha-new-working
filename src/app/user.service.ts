import { Injectable } from '@angular/core';
 import { Observable, of } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {AuthenticationService} from './authentication.service';



//const endpointAddress = 'http://api.artha.today:9000';
const endpointAddress = 'http://api.artha.today:3005';

@Injectable({
	providedIn: 'root'
})
export class UserService {
  token;
	constructor(private http: HttpClient,private _auth:AuthenticationService) {
    // this._token._initializeToken.subscribe((ele:any)=>{
    //   console.log("token in service",ele)
    //   this.token = ele;     
    // })
   }


 


	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	createUsers(createProjectRequest): Observable<any> {
    this.token = localStorage.getItem('token');
    console.log('token',this.token)
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "jwt": this.token,
       })
    };
        var request = createProjectRequest;
        return this.http
          .post(endpointAddress + '/user/create', request, httpOptions)
          .pipe(map(this.extractData), catchError(this.handleError<any>('createProject')));
	}

    	UserList(): Observable<any> {
        this.token = localStorage.getItem('token');
        console.log("token user",this.token);
        let httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "jwt": this.token,
              })
            };
          return this.http
          .post(endpointAddress + '/user/list', {}, httpOptions)
          .pipe(map(this.extractData), catchError(this.handleError<any>('getProjects')));
	    }



  userUpdate(updateProjectRequest): Observable<any>{
    this.token = localStorage.getItem('token');
      let httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "jwt": this.token,
        })
      };
     var request = updateProjectRequest;
      return this.http
      .post(endpointAddress + '/user/update', request, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('updateProjectRequest')));    
  }




  twitterCreate(createTwitterRequest): Observable<any> {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "jwt": this.token,
       })
    };
        var request = createTwitterRequest;
        return this.http
          .post(endpointAddress + '/twitterAccount/create', request, httpOptions)
          .pipe(map(this.extractData), catchError(this.handleError<any>('twitterCreate')));
	}

  twitterList(): Observable<any> {
    this.token = localStorage.getItem('token');
        let httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "jwt": this.token,
              })
            };
          return this.http
          .post(endpointAddress + '/twitterAccount/list', {}, httpOptions)
          .pipe(map(this.extractData), catchError(this.handleError<any>('twitterList')));
	    }



      twitterUpdate(createTwitterRequest): Observable<any>{
        this.token = localStorage.getItem('token');
      let httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "jwt": this.token,
        })
      };
     var request = createTwitterRequest;
      return this.http
      .post(endpointAddress + '/twitterAccount/update', request, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('twitterUpdate')));    
  }



  categoryCreate(createCategoryRequest): Observable<any> {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "jwt": this.token,
       })
    };
        var request = createCategoryRequest;
        return this.http
          .post(endpointAddress + '/category/create', request, httpOptions)
          .pipe(map(this.extractData), catchError(this.handleError<any>('categoryCreate')));
	}

  categoryList(): Observable<any> {
    this.token = localStorage.getItem('token');
        let httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "jwt": this.token,
              })
            };
          return this.http
          .post(endpointAddress + '/category/list', {}, httpOptions)
          .pipe(map(this.extractData), catchError(this.handleError<any>('categoryList')));
	    }



     
      digitalCreate(createDigitalRequest): Observable<any> {
        this.token = localStorage.getItem('token');
        let httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "jwt": this.token,
           })
        };
            var request = createDigitalRequest;
            return this.http
              .post(endpointAddress + '/digital/create', request, httpOptions)
              .pipe(map(this.extractData), catchError(this.handleError<any>('twitterCreate')));
      }
    
      digitalList(): Observable<any> {
        this.token = localStorage.getItem('token');
            let httpOptions = {
                  headers: new HttpHeaders({
                    "Content-Type": "application/json",
                    "jwt": this.token,
                  })
                };
              return this.http
              .post(endpointAddress + '/digital/list', {}, httpOptions)
              .pipe(map(this.extractData), catchError(this.handleError<any>('digitalList')));
          }
    
    
    
          digitalUpdate(createDigitalRequest): Observable<any>{
            this.token = localStorage.getItem('token');
          let httpOptions = {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
              "jwt": this.token,
            })
          };
         var request = createDigitalRequest;
          return this.http
          .post(endpointAddress + '/digital/update', request, httpOptions)
          .pipe(map(this.extractData), catchError(this.handleError<any>('digitalUpdate')));    
      }



      langCreate(createDigitalRequest): Observable<any> {
        this.token = localStorage.getItem('token');
        let httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "jwt": this.token,
           })
        };
            var request = createDigitalRequest;
            return this.http
              .post(endpointAddress + '/language/create', request, httpOptions)
              .pipe(map(this.extractData), catchError(this.handleError<any>('langCreate')));
      }
    
      langList(): Observable<any> {
        this.token = localStorage.getItem('token');
            let httpOptions = {
                  headers: new HttpHeaders({
                    "Content-Type": "application/json",
                    "jwt": this.token,
                  })
                };
              return this.http
              .post(endpointAddress + '/language/list', {}, httpOptions)
              .pipe(map(this.extractData), catchError(this.handleError<any>('langList')));
          }
    
    
          rssCreate(createDigitalRequest): Observable<any> {
            this.token = localStorage.getItem('token');
            console.log(createDigitalRequest);
            let httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "jwt": this.token,
               })
            };
                var request = createDigitalRequest;
                return this.http
                  .post(endpointAddress + '/rssLink/create', request, httpOptions)
                  .pipe(map(this.extractData), catchError(this.handleError<any>('rssCreate')));
          }
        
          rssList(): Observable<any> {
            this.token = localStorage.getItem('token');
                let httpOptions = {
                      headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "jwt": this.token,
                      })
                    };
                  return this.http
                  .post(endpointAddress + '/rssLink/list', {}, httpOptions)
                  .pipe(map(this.extractData), catchError(this.handleError<any>('rssList')));
              }
        
        
        
              rssUpdate(createDigitalRequest): Observable<any>{
                this.token = localStorage.getItem('token');
              let httpOptions = {
                headers: new HttpHeaders({
                  "Content-Type": "application/json",
                  "jwt": this.token,
                })
              };
             var request = createDigitalRequest;
              return this.http
              .post(endpointAddress + '/rssLink/update', request, httpOptions)
              .pipe(map(this.extractData), catchError(this.handleError<any>('rssUpdate')));    
          }
    
          shedulerCreate(createShedulerRequest): Observable<any> {
            this.token = localStorage.getItem('token');
            let httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "jwt": this.token,
               })
            };
                var request = createShedulerRequest;
                return this.http
                  .post(endpointAddress + '/Scheduler/create', request, httpOptions)
                  .pipe(map(this.extractData), catchError(this.handleError<any>('shedulerCreate')));
          }
        
          shedulerList(): Observable<any> {
            this.token = localStorage.getItem('token');
                let httpOptions = {
                      headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "jwt": this.token,
                      })
                    };
                  return this.http
                  .post(endpointAddress + '/scheduler/list', {}, httpOptions)
                  .pipe(map(this.extractData), catchError(this.handleError<any>('shedulerList')));
              }
        
        
        
              shedulerUpdate(createShedulerRequest): Observable<any>{
                this.token = localStorage.getItem('token');
              let httpOptions = {
                headers: new HttpHeaders({
                  "Content-Type": "application/json",
                  "jwt": this.token,
                })
              };
             var request = createShedulerRequest;
              return this.http
              .post(endpointAddress+ '/scheduler/update', request, httpOptions)
              .pipe(map(this.extractData), catchError(this.handleError<any>('shedulerUpdate')));    
          }
    


          trendingCreate(createDigitalRequest): Observable<any> {
            this.token = localStorage.getItem('token');
            let httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "jwt": this.token,
               })
            };
                var request = createDigitalRequest;
                return this.http
                  .post(endpointAddress + '/trending/create', request, httpOptions)
                  .pipe(map(this.extractData), catchError(this.handleError<any>('trendingCreate')));
          }
        
          trendingList(): Observable<any> {
            this.token = localStorage.getItem('token');
                let httpOptions = {
                      headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "jwt": this.token,
                      })
                    };
                  return this.http
                  .post(endpointAddress + '/trending/list', {}, httpOptions)
                  .pipe(map(this.extractData), catchError(this.handleError<any>('trendingList')));
              }
        
        
        
              trendingUpdate(createDigitalRequest): Observable<any>{
                this.token = localStorage.getItem('token');
              let httpOptions = {
                headers: new HttpHeaders({
                  "Content-Type": "application/json",
                  "jwt": this.token,
                })
              };
             var request = createDigitalRequest;
              return this.http
              .post(endpointAddress + '/trending/update', request, httpOptions)
              .pipe(map(this.extractData), catchError(this.handleError<any>('trendingUpdate')));    
          }
    



	// Error handler block
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
  }
  


}
