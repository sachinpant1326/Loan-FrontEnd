import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoanComponent } from './components/loan/loan.component';
import { EmiComponent } from './components/emi/emi.component';
import { ForecloseComponent } from './components/foreclose/foreclose.component';
import { CalcemiComponent } from './components/calcemi/calcemi.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

  {path: 'home',component: NavbarComponent,
    children:[
     {path:'loan',component: LoanComponent},
     {path:'close',component:ForecloseComponent},
     {path:'emi',component: EmiComponent},
     {path:'calcemi',component:CalcemiComponent},
     {path:'**',component:HomeComponent}   // eg= localhost:4200/home
  ]},

  {path:'**',component:LoginComponent},     // eg= localhost:4200/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
