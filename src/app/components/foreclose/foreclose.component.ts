import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-foreclose',
  templateUrl: './foreclose.component.html',
  styleUrls: ['./foreclose.component.css']
})
export class ForecloseComponent implements OnInit {

  submit:boolean=false;

  constructor(private formBuilder:FormBuilder,private loanService:LoanService) { }

  ngOnInit(): void {
    
  }

  closeLoan(){
    this.submit=true;
    
    this.loanService.getAmount(localStorage.getItem('accountId')).subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );

    //this.loanService.foreClose(this.closeForm.value);
  }

}
