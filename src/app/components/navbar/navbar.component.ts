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

  constructor(private router:Router,public loanService:LoanService) { }

  ngOnInit(): void {
    this.loanService.loanDetails(localStorage.getItem('accountId')).subscribe(
      data=>{
        this.loanService.balance=data.emi;
      },
      err=>{this.loanService.balance="0"}
    )
  }

  logoutUser(){
    localStorage.removeItem('accountId');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
