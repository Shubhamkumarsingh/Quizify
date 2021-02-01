import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from '../users';

declare var $ : any;
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  firstName : String = "";
  lastName : String  = "";
  username : String = "";
  emailId : String = "";
  password : String = "";

  dataUpdate : any;
  users : any;
  /* users = [
    {
     "firstName": "Shubham",
    "lastName" : "Singh",
    "userName" : "shubham@singh",
    "emailId" : "sshubham@gmail.com"
    },
    {
    "firstName": "Yash",
    "lastName" : "Shrivastav",
    "userName" : "shriYash",
    "emailId" : "yashshri@gmail.com"
    },
    {
    "firstName": "random",
    "lastName" : "guy",
    "userName" : "randomguy",
    "emailId" : "random@fiy.com"
    }
  ]; */
  formdata: any;
  constructor(private modal : NgbModal, private http : HttpClient) { 
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
      role: new FormControl("ROLE_MODERATOR")
    });

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() : void {
    this.http.get("http://localhost:8080/api/admin/alluser").subscribe((allUsers : any) => {
      this.users = allUsers;
    },
    err => {

    })
  }
  openModal(content : any){
    this.modal.open(content);
    console.log(content);
  }

  closeModal(){
    this.modal.dismissAll();
  }
  passwordAuthenticator( pass : String) : boolean {
    if(pass!=null){
      return true;
    }
    return false;
  }
  onClickSubmit(data: any){
    console.log(data);
    this.http.post("http://localhost:8080/api/admin/add",data).subscribe((addUserData : any) => {
      alert('User added successfully');
      this.getAllUsers();
      this.closeModal();
    },err => {

    })
    this.formdata.reset();
  }
  delete(data : Users, i : number){
    console.log(data);
    console.log("index ",i)
    this.users.splice(i,1);    
  }
  updateModal(updateModal: any,data : Users){
    console.log(data);
    this.dataUpdate = data;
  //  console.log("dataUpdate",this.dataUpdate)
    this.modal.open(updateModal);
  }
  onSubmit( updateFormData : Users){
    console.log("onSubmit");
    console.log(JSON.stringify(updateFormData));
    this.http.post("http://localhost:8080/api/admin/update",updateFormData).subscribe((updateUserData : any) => {
      alert('User updated successfully');
      this.getAllUsers();
      this.closeModal();
    },err => {

    })
  }
  addUser(data: any){
    console.log(data);
    this.formdata.reset();
    
  }
}
