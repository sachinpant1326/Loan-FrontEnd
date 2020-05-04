import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-calcemi',
  templateUrl: './calcemi.component.html',
  styleUrls: ['./calcemi.component.css']
})
export class CalcemiComponent implements OnInit {

  calcForm:FormGroup;
  submit:boolean;
  constructor(private formBuilder:FormBuilder,private loanService:LoanService) { }

  ngOnInit(): void {
    this.calcForm=this.formBuilder.group({
      amount:['',[Validators.required,Validators.min(10000),Validators.max(1000000)]],
      type:['',Validators.required],
      month:['',[Validators.required,Validators.min(1),Validators.max(240)]]
    })
  }

  calcEmi(){

    this.submit=true;
    if(this.calcForm.invalid)
      return;

    let month=this.calcForm.controls.month.value;

    this.loanService.calculateEmi(this.calcForm.value).subscribe(
      data=>{
        alert("You have to pay "+data+" for "+month+" months");
      },
      err=>{alert(err.error);}
    )
    this.submit=false;
    this.calcForm.reset();
  }

}
