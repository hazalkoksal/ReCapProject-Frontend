import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private userService:UserService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel:RegisterModel = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(
        response => {
          localStorage.setItem("token",response.data.token);
          this.getUserByMail(registerModel.email);
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
      localStorage.setItem("userId",response.data.userId.toString());
      localStorage.setItem("userName",response.data.firstName + " " + response.data.lastName);
    })
  }

}
