import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform : FormGroup;
  constructor() { 
    this.loginform = new FormGroup({
      emailId: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required
      ])) 
    })
  }

  ngOnInit(): void {
  }

  onClickSubmit(data : FormGroup){
    window.alert(JSON.stringify(data));
    console.log(data);
    this.loginform.reset();
  }

}
