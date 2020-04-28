import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Authentication } from 'src/app/models/Authentication.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {


  balanceForm:FormGroup;
  submit:boolean=false;
  authDetail:Authentication;

  constructor(private formBuilder:FormBuilder,private loanService:LoanService) { }

  ngOnInit(): void {
    this.balanceForm=this.formBuilder.group({
      accountId:['',Validators.required],
      password:['',Validators.required]
    })
  }

  getBalance(){
    this.authDetail=this.balanceForm.value;
    this.loanService.getBalance(this.authDetail).subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );
  }

}
