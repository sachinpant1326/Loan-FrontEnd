import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  balance:string;
  constructor(private router:Router,private loanService:LoanService) { }

  ngOnInit(): void {
    this.loanService.getBalance(localStorage.getItem('accountId')).subscribe(
      data=>{this.balance=data},
      err=>{this.balance="0"}
    )
  }

  logoutUser(){
    localStorage.removeItem('accountId');
    this.router.navigate(['/login']);
  }

}
