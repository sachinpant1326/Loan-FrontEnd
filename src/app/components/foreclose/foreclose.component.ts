import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Status } from 'src/app/models/Status.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foreclose',
  templateUrl: './foreclose.component.html',
  styleUrls: ['./foreclose.component.css']
})
export class ForecloseComponent implements OnInit {

  submit: boolean = false;
  loanDetails: Status;
  totalAmount: number;
  email: string;
  date: any;

  constructor(private formBuilder: FormBuilder,private router:Router, private loanService: LoanService) { }

  ngOnInit(): void {
      this.initialize();
      this.getLoanStatus();
  }

  initialize() {

    let d=new Date();
    this.date=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
    this.email = localStorage.getItem('email');
    this.loanDetails = new Status();
    this.loanDetails.emi = "0";
    this.loanDetails.emi_amount = "0.0";
    this.loanDetails.name = "No One";
    this.loanDetails.penalty = "0.0";
    this.totalAmount = 0;
  }

  getLoanStatus(){
    this.loanService.loanDetails(localStorage.getItem('accountId')).subscribe(
      data => {
        this.loanDetails = data;
        this.totalAmount = Number(this.loanDetails.emi) * Number(this.loanDetails.emi_amount) + Number(this.loanDetails.penalty);
      },
      err => {
      }
    );
  }

  closeLoan() {
    this.submit = true;
    if(this.totalAmount==0)
    {
      alert("You dont have any loan");
      return;
    }
    this.loanService.foreClose(localStorage.getItem('accountId')).subscribe(
      data => { 
        alert("Thank you for using our loan service. Your account has been foreclosed successfully");
        this.loanService.balance="0";
        this.router.navigate(['/home']);
      },
      err => { alert("You don't have any loan") }
    );
  }

}
