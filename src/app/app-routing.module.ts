import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoanComponent } from './components/loan/loan.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { EmiComponent } from './components/emi/emi.component';
import { ForecloseComponent } from './components/foreclose/foreclose.component';
import { CalcemiComponent } from './components/calcemi/calcemi.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BalanceComponent } from './components/balance/balance.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

  {path: 'home',component: NavbarComponent,
    children:[
     {path:'loan',component: LoanComponent},
     {path:'close',component:ForecloseComponent},
     {path:'emi',component: EmiComponent},
     {path:'trans',component:TransactionComponent},
     {path:'calcemi',component:CalcemiComponent},
     {path:'balance',component:BalanceComponent},
     {path:'**',component:HomeComponent}   // eg= localhost:4200/home
  ]},

  {path:'**',component:LoginComponent},     // eg= localhost:4200/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
