import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoanComponent } from './components/loan/loan.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { EmiComponent } from './components/emi/emi.component';
import { ForecloseComponent } from './components/foreclose/foreclose.component';
import { CalcemiComponent } from './components/calcemi/calcemi.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BalanceComponent } from './components/balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LoanComponent,
    TransactionComponent,
    EmiComponent,
    ForecloseComponent,
    CalcemiComponent,
    NavbarComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
