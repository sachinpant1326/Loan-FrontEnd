import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-foreclose',
  templateUrl: './foreclose.component.html',
  styleUrls: ['./foreclose.component.css']
})
export class ForecloseComponent implements OnInit {

  closeForm:FormGroup;
  submit:boolean=false;

  constructor(private formBuilder:FormBuilder,private loanService:LoanService) { }

  ngOnInit(): void {
    this.closeForm=this.formBuilder.group({
      accountId:['',Validators.required],
      password:['',Validators.required],
    })
  }

  closeLoan(){
    this.submit=true;
    if(this.closeForm.controls.error)
      return;
    
    this.loanService.getAmount(this.closeForm.value).subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );

    //this.loanService.foreClose(this.closeForm.value);
  }

}
