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
  submitted:boolean=false;
  invalidUser=false;

  constructor(private formBuilder:FormBuilder,private router:Router,
              private authService:AuthenticationService) {
   }

  ngOnInit(): void 
  {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern("[A-Za-z0-9]{6,10}")]]
    });
  }

  verifyLogin()
  {
    this.submitted=true;
    if(this.loginForm.invalid)
    {
       return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      data=>{
          console.log(data);
          alert(data);
          localStorage.setItem('accountId',data.toString());
          localStorage.setItem('email',this.loginForm.controls.email.value);
          this.router.navigate(['/home']);
      },
      err=>{
        console.log(err);
        alert(err);
      }
    );
  }

}
