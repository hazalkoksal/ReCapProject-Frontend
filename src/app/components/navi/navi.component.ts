import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  token:string;
  userId:number;
  userName:string;

  constructor(private authService:AuthService, private router:Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.checkAuthenticated();
  }

  checkAuthenticated(){
    if(this.authService.isAuthenticated()){
      this.token = localStorage.getItem("token");
      this.userId = Number(localStorage.getItem("userId"));
      this.userName = localStorage.getItem("userName");
    }
  }

  logout(){
    this.authService.logout();
    this.toastrService.info("Çıkış yapıldı");
    location.href = "/home";
  }

}
