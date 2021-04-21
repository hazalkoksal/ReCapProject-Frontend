import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private userService:UserService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(
        response => {
          localStorage.setItem("token",response.data.token);
          this.getUserByMail(loginModel.email);
          this.toastrService.info(response.message);
          location.href = "/home";
        },
        responseError => {
          this.toastrService.error(responseError.error);
        });
    }
    else{
      this.toastrService.error("Bilgilerinizi eksiksiz giriniz");
    }
  }

  getUserByMail(email:string){
    this.userService.getByMail(email).subscribe(response => {
      localStorage.setItem("userName",response.data.firstName + " " + response.data.lastName);
    })
  }

}
