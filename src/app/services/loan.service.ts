import { Injectable } from '@angular/core';
import { Authentication } from '../models/Authentication.model';
import { Customer } from '../models/Customer.model';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  baseUrl: string = "http://localhost:8080/LoanBackEnd/loan/";

  constructor(private httpClient:HttpClient) { }

  issueLoan(customer:Customer){
    return this.httpClient.post(this.baseUrl+"issue",customer);
  }

  getBalance(accountId:string){
    return this.httpClient.get<string>(this.baseUrl+"balance/"+accountId);
  }

  // before forelcose, we have to see remaining amount using this method
  getAmount(accountId:string){
    return this.httpClient.get<string>(this.baseUrl+"amount/"+accountId);
}

  allTransaction(accountId:string){
    return this.httpClient.get<Transaction[]>(this.baseUrl+"transaction/"+accountId);
}

  payEmi(payValues:any){
    return this.httpClient.post(this.baseUrl+"pay",payValues);
  }

  foreClose(accountId){
    return this.httpClient.delete(this.baseUrl+"foreclose/"+accountId);
  }

}