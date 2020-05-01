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
      emi:['',[Validators.required,Validators.pattern("[1-5]{1}")]],
    });
    
    this.getTransactions();
  }

  getTransactions(){
    this.loanService.allTransaction(localStorage.getItem('accountId')).subscribe(
      data=>{this.transactions=data},
      err=>{console.log(err)}
    );
  }

  payLoan(){
    this.submitted=true;
    
    console.log("going to call backend");
    let obj={
      "accountId":localStorage.getItem('accountId'),
      "emi":this.payForm.controls.emi.value
    }
    
    this.loanService.payEmi(obj).subscribe(
      data=>{alert(data)},
      err=>{alert(err)}
    );
  }
}