import { Loan } from './Loan.model';

export class Customer{
    account_no:string
    customer_name:string;
    gender:string;
    aadhaar:string;
    father_name:string;
    salary:number;
    phone:string;
    email:string;

    loan:Loan
} 