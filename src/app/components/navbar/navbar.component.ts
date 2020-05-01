import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { Router } from '@angular/router';
import { Status } from 'src/app/models/Status.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loanDetails:Status;

  constructor(private router:Router,private loanService:LoanService) { }

  ngOnInit(): void {
    this.loanService.loanDetails(localStorage.getItem('accountId')).subscribe(
      data=>{
        this.loanDetails=data;
        console.log(data);
      },
      err=>{this.loanDetails.emi="0"}
    )
  }

  logoutUser(){
    localStorage.removeItem('accountId');
    this.router.navigate(['/login']);
  }

}
