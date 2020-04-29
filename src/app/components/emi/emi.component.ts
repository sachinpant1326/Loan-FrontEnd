import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Transaction } from 'src/app/models/Transaction.model';

@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.css']
})
export class EmiComponent implements OnInit {

  payForm:FormGroup;
  submitted:boolean=false;
  transactions:Transaction[];

  constructor(private formBuilder:FormBuilder,private loanService:LoanService) { }

  ngOnInit(): void {
    this.payForm=this.formBuilder.group({
      emi:['',[Validators.required,Validators.min(1),Validators.max(12)]],
    });

    this.getTransactions();
  }

  getTransactions(){
    this.loanService.allTransaction(this.payForm.value).subscribe(
      data=>{this.transactions=data},
      err=>{console.log(err)}
    );
  }

  payLoan(){
    this.submitted=true;
    if(this.payForm.controls.error)
      return;

    let obj={
      "accountId":localStorage.getItem('accountId'),
      "emi":this.payForm.controls.emi.value
    }
    
    this.loanService.payEmi(obj).subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );
  }
}