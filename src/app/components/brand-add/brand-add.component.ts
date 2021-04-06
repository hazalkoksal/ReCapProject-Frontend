import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required],
    })
  }

  add(){
    if(this.brandAddForm.valid){
      let brand:Brand = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brand).subscribe(
        response => {
          this.toastrService.success("Marka eklendi");
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
