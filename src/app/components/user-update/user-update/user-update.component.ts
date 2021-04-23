import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userUpdateForm:FormGroup;
  user:User;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private toastrService:ToastrService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getById(params["userId"]);
  }) 
 }

 createUserUpdateForm(user:User){
  this.userUpdateForm = this.formBuilder.group({
    userId:[user.userId,Validators.required],
    firstName:[user.firstName,Validators.required],
    lastName:[user.lastName,Validators.required]
  })
}

getById(userId:number){
  this.userService.getById(userId).subscribe(response => {
    this.user = response.data;
    this.createUserUpdateForm(this.user);
  })
}

update(){
  if(this.userUpdateForm.valid){
    let userModel:User = Object.assign({},this.userUpdateForm.value);
    userModel.email = this.user.email;
    userModel.passwordHash = this.user.passwordHash;
    userModel.passwordSalt = this.user.passwordSalt;
    userModel.status = this.user.status;
    this.userService.update(userModel).subscribe(
      response => {
        localStorage.removeItem("userName");
        localStorage.setItem("userName", userModel.firstName + " " + userModel.lastName);
        this.toastrService.success("Kullanıcı adı güncellendi");
        location.href = "/home";
      },
      responseError => {
        if(responseError.error.ValidationErrors.length > 0){
          for(let i = 0; i < responseError.error.ValidationErrors.length; i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      });
  }
  else{
    this.toastrService.error("Formu eksiksiz doldurunuz");
  }
}

}
