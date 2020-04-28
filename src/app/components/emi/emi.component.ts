import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Authentication } from 'src/app/models/Authentication.model';

@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.css']
})
export class EmiComponent implements OnInit {

  payForm:FormGroup;
  submit:boolean=false;
  authentication:Authentication;
  

  constructor(private formBuilder:FormBuilder,private loanService:LoanService) { }

  ngOnInit(): void {
    this.payForm=this.formBuilder.group({
      accountId:['',Validators.required],
      password:['',Validators.required],
      noEmi:['',Validators.required]
    })
  }

  payEmi(){
    this.submit=true;
    if(this.payForm.controls.error)
      return;
    
    let obj={
        "accountId":this.payForm.controls.accountId.value,
        "password":this.payForm.controls.password.value,
        "noOfEmi":this.payForm.controls.noEmi.value
    }
    
    console.log(obj);
    this.loanService.payEmi(obj).subscribe(
      data=>{
        console.log(data);
      },
      err=>{console.log("Network Erro")}
    );
  }

}
