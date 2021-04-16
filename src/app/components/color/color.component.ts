import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  color:Color;

  constructor(private colorService:ColorService, private toastrService:ToastrService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  delete(colorId:number){
    if(this.authService.isAuthenticated()){
      this.colorService.getById(colorId).subscribe(response => {
        this.color = response.data;
  
        this.colorService.delete(this.color).subscribe(response => {
          if(response.success == true){
            this.toastrService.error("Renk silindi");
            this.getColors();
          }
        })
      })
    }
    else{
      this.toastrService.info("Sisteme giriş yapmalısınız");
      this.router.navigate(["login"]);
    }
  }

}
