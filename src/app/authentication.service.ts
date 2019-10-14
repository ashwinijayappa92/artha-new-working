import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';

const endpointAddress = 'http://api.artha.today:3005/user/login';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public _loggedInUser$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _loggedInUser = this._loggedInUser$.asObservable();
  constructor( private http: HttpClient, public router: Router) {
  }


  login(sendObjData): Observable<any> {

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    return this.http.post<any>(endpointAddress, sendObjData, httpOptions).pipe(
      tap((result) => {
        if (result.http_code == '200') {
          console.log("authen",result)
          if (result.jwt) {
            localStorage.setItem('token', result.jwt);
            this._loggedInUser$.next(result.jwt);
          }
        }
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }


  logout() {
    localStorage.removeItem('token');
   // this.router.navigate(['/']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
     // this.toastr.error(error.error.message);
      console.log(`${operation} failed: ${error.error.message}`);
      return of(result as T);
    };
  }

}