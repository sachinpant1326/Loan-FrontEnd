import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted=false;
  invalidUser=false;

  constructor(private formBuilder:FormBuilder,private router:Router,
              private authService:AuthenticationService) {
   }

  ngOnInit(): void 
  {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  verifyLogin()
  {
    this.submitted=true;
    if(this.loginForm.invalid)
      return;
    
    this.authService.login(this.loginForm.value).subscribe(
      data=>{
          // if(data=="Authentication failed")
          // {
          //   console.log(data);
          //   this.invalidUser=true;
          //   return;
          // }
          // localStorage.username=data;
          console.log(data);
          this.router.navigate(['/home']);
      },
      err=>{console.log("error")}
    );
    
  }

}
