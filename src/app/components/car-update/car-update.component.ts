import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  brands:Brand[];
  colors:Color[];

  car:Car;

  constructor(private formBuilder:FormBuilder, private carService:CarService, private brandService:BrandService, private colorService:ColorService, private toastrService:ToastrService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getById(params["carId"]);
  }) 

    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  createCarUpdateForm(car:Car){
    this.carUpdateForm = this.formBuilder.group({
      carId:[car.carId,Validators.required],
      brandId:[car.brandId,Validators.required],
      colorId:[car.colorId,Validators.required],
      carName:[car.carName,Validators.required],
      modelYear:[car.modelYear,Validators.required],
      dailyPrice:[car.dailyPrice,Validators.required],
      description:[car.description,Validators.required],
      findexPoint:[car.findexPoint,Validators.required]
    })
  }

  getById(carId:number){
    this.carService.getById(carId).subscribe(response => {
      this.car = response.data;
      this.createCarUpdateForm(this.car);
    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let car:Car = Object.assign({},this.carUpdateForm.value)
      this.carService.update(car).subscribe(
        response => {
          this.toastrService.success("Araç güncellendi");
          this.router.navigate(['']);
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
