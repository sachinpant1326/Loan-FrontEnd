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
      adhar:['',Validators.required],
      name:['',Validators.required],
      gender:['',Validators.required],
      fname:['',Validators.required],
      salary:['',Validators.required],
      contact:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      loantype:['',Validators.required],
      amount:['',Validators.required],
      month:['',Validators.required],
      password:['',Validators.required]

    })
  }

  applyLoan(){
    
    this.submitted=true;
    if(this.applyForm.controls.error)
      return;

    this.setCustomer();
    this.setAuthentication();

    this.loanService.issueLoan(this.authentication,this.customer).subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );
  }

  setCustomer(){
    this.customer=new Customer();
    this.customer.customer_name=this.applyForm.controls.name.value;
    this.customer.gender=this.applyForm.controls.gender.value;
    this.customer.adhaar__no=this.applyForm.controls.adhar.value;
    this.customer.father_name=this.applyForm.controls.fname.value;
    this.customer.salary=this.applyForm.controls.salary.value;
    this.customer.phone=this.applyForm.controls.contact.value;
    this.customer.email=this.applyForm.controls.email.value;

    this.customer.loan=new Loan();
    this.customer.loan.type=this.applyForm.controls.loantype.value;
    this.customer.loan.loan_amount=this.applyForm.controls.amount.value;
    this.customer.loan.emi_balance=this.applyForm.controls.month.value;
    
  }

  setAuthentication(){
    this.authentication=new Authentication();
    this.authentication.password=this.applyForm.controls.password.value;
  }
}