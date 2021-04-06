import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brand:Brand;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private toastrService:ToastrService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getById(params["brandId"]);
  }) 
 }

 createBrandUpdateForm(brand:Brand){
  this.brandUpdateForm = this.formBuilder.group({
    brandId:[brand.brandId,Validators.required],
    brandName:[brand.brandName,Validators.required]
  })
}

getById(brandId:number){
  this.brandService.getById(brandId).subscribe(response => {
    this.brand = response.data;
    this.createBrandUpdateForm(this.brand);
  })
}

update(){
  if(this.brandUpdateForm.valid){
    let brand:Brand = Object.assign({},this.brandUpdateForm.value)
    this.brandService.update(brand).subscribe(
      response => {
        this.toastrService.success("Marka güncellendi");
        this.router.navigate(['/brands']);
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
