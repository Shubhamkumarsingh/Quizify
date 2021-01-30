import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName : String = "";
  lastName : String  = "";
  username : String = "";
  emailId : String = "";
  password : String = "";
  confirmpassword : String = "";
  formdata: any;
  constructor() { 
    this.formdata = new FormGroup({
      firstName : new FormControl("", Validators.compose([
        Validators.required
      ])),
      lastName : new FormControl("", Validators.compose([
        Validators.required
      ])),
      username : new FormControl("", Validators.compose([
        Validators.required
      ])),
      emailId: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
      //confirmpassword : new FormControl("", )
    });

  }

  ngOnInit(): void {
  }

  passwordAuthenticator( pass : String) : boolean {
    if(pass!=null){
      return true;
    }
    return false;
  }
  onClickSubmit(data: any){
    console.log(data);
    this.formdata.reset();
  }

}
