import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginData } from '../login-data';
import { StoreTokenService } from '../store-token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform : FormGroup;
  constructor(private http : HttpClient, private tokenService : StoreTokenService, private route : Router) { 
    this.loginform = new FormGroup({
      username: new FormControl("", Validators.compose([
        Validators.required
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
    this.http.post("http://localhost:8080/api/auth/signin",data).subscribe((loginData : any) =>{
      alert(loginData)  
    console.log(loginData);
    this.tokenService.storeToken(loginData.accessToken);
    console.log(typeof(loginData.roles[0]))
    if(loginData.roles[0] == "ROLE_ADMIN"){
      this.route.navigateByUrl("/manageUser");
    }else if(loginData.roles[0] == "ROLE_MODERATOR"){

    }else{

    }
    },err => {
      console.log(err);
    })
  }

}
