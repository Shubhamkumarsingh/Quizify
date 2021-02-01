import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreTokenService {

  private key : string ="token";
  private loggedIn : boolean = false;
  constructor() { }

  public logoutService(){
    this.loggedIn = false;
    sessionStorage.clear;
  }
  public isLoggedIn() : boolean{
    return this.loggedIn;
  }
  public getToken(){
    return sessionStorage.getItem(this.key);
  }
  public storeToken(accessToken : string) : void{
    this.loggedIn = true;
    sessionStorage.setItem(this.key,accessToken);
  }
}
