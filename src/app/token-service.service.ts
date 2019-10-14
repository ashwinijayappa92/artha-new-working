import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class TokenServiceService {
public _initializeToken$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeToken = this._initializeToken$.asObservable(); 
  public _initializeCategory$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeCategory = this._initializeCategory$.asObservable();   

  public _initializeLang$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeLang = this._initializeLang$.asObservable();   

  public _initializeUser$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeUser = this._initializeUser$.asObservable();   



  constructor() { }

}