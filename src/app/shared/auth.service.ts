import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  public isLoggedIn(){
    return !!localStorage.getItem('ACCESS_TOKEN');
  }
}