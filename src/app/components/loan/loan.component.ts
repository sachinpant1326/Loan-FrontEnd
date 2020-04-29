import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, SelectControlValueAccessor } from '@angular/forms';
import { Customer } from 'src/app/models/Customer.model';
import { Loan } from 'src/app/models/Loan.model';
import { Authentication } from 'src/app/models/Authentication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  applyForm:FormGroup;
  submitted:boolean=false;
  customer:Customer;
  authentication:Authentication;

  constructor(private formBuilder:FormBuilder,private loanService:LoanService) { }

  ngOnInit(): void {
    this.applyForm=this.formBuilder.group({
      adhar:['',[Validators.required,Validators.pattern("[1-9][0-9]{15}")]],
      name:['',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}")]],
      gender:['',Validators.required],
      fname:['',[Validators.required,Validators.pattern("[A-Za-z ]{1,15}")]],
      salary:['',[Validators.required,Validators.min(5000)]],
      contact:['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
      email:['',[Validators.required,Validators.email]],
      loantype:['',Validators.required],
      amount:['',[Validators.required,Validators.min(10000),Validators.max(100000000)]],
      month:['',[Validators.required,Validators.min(1),Validators.max(240)]],
      password:['',[Validators.required,Validators.pattern("[A-Za-z0-9]{6,10}")]]
    })
  }

  applyLoan(){
    
    this.submitted=true;
    if(this.applyForm.controls.error)
      return;

    this.setCustomer();
    this.setAuthentication();

    this.loanService.issueLoan(this.customer).subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );
  }

  setCustomer(){
    this.customer=new Customer();
    this.customer.account_no=localStorage.getItem('accountId');
    this.customer.customer_name=this.applyForm.controls.name.value;
    this.customer.gender=this.applyForm.controls.gender.value;
    this.customer.adhaar__no=this.applyForm.controls.adhar.value;
    this.customer.father_name=this.applyForm.controls.fname.value;
    this.customer.salary=this.applyForm.controls.salary.value;
    this.customer.phone=this.applyForm.controls.contact.value;
    this.customer.email=this.applyForm.controls.email.value;

    this.customer.loan=new Loan();
    this.customer.loan.account_no=localStorage.getItem('accountId');
    this.customer.loan.type=this.applyForm.controls.loantype.value;
    this.customer.loan.loan_amount=this.applyForm.controls.amount.value;
    this.customer.loan.emi_balance=this.applyForm.controls.month.value;
    
  }

  setAuthentication(){
    this.authentication=new Authentication();
    this.authentication.password=this.applyForm.controls.password.value;
  }
}