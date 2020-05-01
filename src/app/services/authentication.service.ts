import { Injectable } from '@angular/core';
import { Authentication } from '../models/Authentication.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = "http://localhost:8080/LoanBackEnd/loan/";
  constructor(private httpClient:HttpClient) { }

  register(authentication){
    const headers=new HttpHeaders().set('Content-Type','text/plain;charset=utf-8');
    return this.httpClient.post(this.baseUrl+"register",authentication,{headers,responseType:'text'});
  }

  login(authentication){
    const headers=new HttpHeaders().set('Content-Type','text/plain;charset=utf-8');
    return this.httpClient.get(
      this.baseUrl+"login/"+authentication.email+"/"+authentication.password,
      {headers,responseType:'text'}
    );
  }
}
