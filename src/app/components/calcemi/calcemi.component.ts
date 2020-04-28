import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calcemi',
  templateUrl: './calcemi.component.html',
  styleUrls: ['./calcemi.component.css']
})
export class CalcemiComponent implements OnInit {

  calcForm:FormGroup;
  submit:boolean;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.calcForm=this.formBuilder.group({
      amount:['',Validators.required],
      type:['',Validators.required],
      noEmi:['',Validators.required]
    })
  }

  calcEmi(){
    
  }

}
