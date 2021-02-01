import { HttpClient } from '@angular/common/http';
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
  email : String = "";
  password : String = "";
  role : String = "";
  formdata: any;
  constructor(private http : HttpClient) { 
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
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      role : new FormControl("ROLE_USER")
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
    this.http.post("http://localhost:8080/api/auth/signup",data).subscribe( 
      signupData => {
        console.log(signupData);
      }, err => {
        console.log(err);
      }
    )    
  }

}
