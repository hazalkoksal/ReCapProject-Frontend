import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDTO } from 'src/app/models/carDTO';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:CarDTO[] = [];
  car:Car;
  dataLoaded=false;
  filterText="";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandandColor(params["brandId"],params["colorId"]);
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars();
      }
    })  
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars=response.data;
      this.dataLoaded=true;
    })    
  }

  getCarsByBrandandColor(brandId:number,colorId:number){
    this.carService.getCarsByBrandandColor(brandId,colorId).subscribe(response => {
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  delete(carId:number){
    if(this.authService.isAuthenticated()){
      this.carService.getById(carId).subscribe(response => {
        this.car = response.data;
  
        this.carService.delete(this.car).subscribe(response => {
          if(response.success == true){
            this.toastrService.error("Araç silindi");
            this.getCars();
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
