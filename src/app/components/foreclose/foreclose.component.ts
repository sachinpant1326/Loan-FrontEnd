import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Status } from 'src/app/models/Status.model';

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

  constructor(private formBuilder: FormBuilder, private loanService: LoanService) { }

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
    this.loanDetails.name = "GOD";
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
    this.loanService.foreClose(localStorage.getItem('accountId')).subscribe(
      data => { 
        alert(data);
        this.getLoanStatus();
      },
      err => { alert("You don't have any loan") }
    );
  }

}
