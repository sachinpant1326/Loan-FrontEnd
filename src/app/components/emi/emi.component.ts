import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Transaction } from 'src/app/models/Transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.css']
})
export class EmiComponent implements OnInit {

  payForm:FormGroup;
  submitted:boolean=false;
  transactions:Transaction[];

  constructor(private formBuilder:FormBuilder,private loanService:LoanService,private router:Router) { }

  ngOnInit(): void {
    this.transactions=[];
    this.payForm=this.formBuilder.group({
      emi:['',[Validators.required,Validators.pattern("[1-5]{1}")]],
    });
    
    this.getTransactions();
  }

  getTransactions(){
    this.loanService.allTransaction(localStorage.getItem('accountId')).subscribe(
      data=>{this.transactions=data},
      err=>{this.transactions=[]}
    );
  }

  payLoan(){
    this.submitted=true;
    
    if(this.payForm.invalid)
      return;

    let obj={
      "accountId":localStorage.getItem('accountId'),
      "emi":this.payForm.controls.emi.value
    }
    
    this.loanService.payEmi(obj).subscribe(
      data=>{
        this.getTransactions();
        this.loanService.balance=Number(this.loanService.balance)-obj.emi+"";
        alert("You payed for "+obj.emi+" months");
      },
      err=>{
        alert(err.error);
      }
    );
    this.submitted=false;
    this.payForm.reset();
  }

}