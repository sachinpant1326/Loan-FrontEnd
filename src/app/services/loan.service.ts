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
  

  constructor(private httpClient:HttpClient) { }

  issueLoan(customer:Customer){
    console.log("issueLoan is called");
    return this.httpClient.post(this.baseUrl+"issue",customer);
  }

  allTransaction(accountId:string){
    return this.httpClient.get<Transaction[]>(this.baseUrl+"transaction/"+accountId);
  }

  payEmi(payValues:any){
    return this.httpClient.post(this.baseUrl+"pay",payValues);
  }

  loanDetails(accountId:string){
    return this.httpClient.get<Status>(this.baseUrl+"loanstatus/"+accountId);
  }


  foreClose(accountId){
    return this.httpClient.delete(this.baseUrl+"foreclose/"+accountId);
  }

}