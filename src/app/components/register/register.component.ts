import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  submitted:boolean=false;
  wrongpassword:boolean=false;


  constructor(private formBuilder:FormBuilder,private router:Router,
              private authService:AuthenticationService) {
   }

  ngOnInit(): void 
  {
    this.registerForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern("[A-Za-z0-9]{6,10}")]],
      confPassword:['',[Validators.required,Validators.pattern("[A-Za-z0-9]{6,10}")]]
    });
  }

  registerUsers(){
    this.submitted=true;
    if(this.registerForm.invalid)
    {
      return;
    }
    if(this.registerForm.controls.password.value!=this.registerForm.controls.confPassword.value)
    {
      this.wrongpassword=true;
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(
      data=>{
        console.log(data);
        alert(data)},
      err=>{
        console.log(err);
        alert(err);}
    );
    this.router.navigate(['/login']);
  }

}
