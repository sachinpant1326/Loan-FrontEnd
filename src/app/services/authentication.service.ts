import { Injectable } from '@angular/core';
import { Authentication } from '../models/Authentication.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = "http://localhost:8080/LoanBackEnd/loan/";
  constructor(private httpClient:HttpClient) { }

  register(authentication){
    console.log(authentication);
    console.log("register called");
    return this.httpClient.post(this.baseUrl+"register",authentication)
  }

  login(authentication){
    return this.httpClient.get(this.baseUrl+"login/"+authentication.email+"/"+authentication.password)
  }
}
