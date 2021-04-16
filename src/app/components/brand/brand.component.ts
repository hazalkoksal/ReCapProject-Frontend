import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  brand:Brand;

  constructor(private brandService:BrandService, private toastrService:ToastrService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  delete(brandId:number){
    if(this.authService.isAuthenticated()){
      this.brandService.getById(brandId).subscribe(response => {
        this.brand = response.data;
  
        this.brandService.delete(this.brand).subscribe(response => {
          if(response.success == true){
            this.toastrService.error("Marka silindi");
            this.getBrands();
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
