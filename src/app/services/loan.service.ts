import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { Customer } from '../models/Customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../models/Transaction.model';
import { Status } from '../models/Status.model';

@Injectable({
  providedIn: 'root'
})

export class LoanService {

  baseUrl: string = "http://localhost:8080/LoanBackEnd/loan/";
  balance: string;  

  constructor(private httpClient:HttpClient) { }

  issueLoan(customer:Customer){
    return this.httpClient.post(this.baseUrl+"issue",customer,{responseType:'text'});
  }

  allTransaction(accountId:string){
    return this.httpClient.get<Transaction[]>(this.baseUrl+"transaction/"+accountId);
  }

  payEmi(payValues:any){
    return this.httpClient.post(this.baseUrl+"pay",payValues,{responseType:'text'});
  }

  loanDetails(accountId:string){
    return this.httpClient.get<Status>(this.baseUrl+"loanstatus/"+accountId);
  }


  foreClose(accountId){
    return this.httpClient.delete(this.baseUrl+"foreclose/"+accountId);
  }

  calculateEmi(obj){
    const headers=new HttpHeaders().set('Content-Type','text/plain;charset=utf-8');
    return this.httpClient.get(this.baseUrl+"/calculateemi/"+obj.amount+"/"+obj.type+"/"+obj.month
      ,{headers,responseType:'text'});
  }

}