import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  brand:Brand;

  constructor(private brandService:BrandService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  delete(brandId:number){
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

}
