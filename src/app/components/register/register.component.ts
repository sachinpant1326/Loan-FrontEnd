import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../sharedcss/common.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  submitted=false;

  constructor(private formBuilder:FormBuilder,private router:Router,private authService:AuthenticationService) {

  }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    });
  }

  registerUser(){

    this.submitted=true;
    console.log("clicked");
    
    if(this.registerForm.invalid)
    {
      console.log("wrong");
      this.submitted=false;
      return;
    } 

    this.authService.register(this.registerForm.value).subscribe(
      data=>{console.log(data)},
      err=>{console.log(err)}
    );
    this.router.navigate(['/login']);
  }

}
