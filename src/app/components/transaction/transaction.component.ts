import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transForm:FormGroup;
  submit:boolean=false;

  constructor(private formBuilder:FormBuilder,private loanService:LoanService) { }

  ngOnInit(): void {
    this.transForm=this.formBuilder.group({
      accountId:['',Validators.required],
      password:['',Validators.required],
    })
  }

  transLoan(){
    this.submit=true;
    if(this.transForm.controls.error)
      return;
    this.loanService.allTransaction(this.transForm.value).subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );
  }

}

