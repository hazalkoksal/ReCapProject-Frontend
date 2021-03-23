import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDTO } from 'src/app/models/carDTO';
import { CarImage } from 'src/app/models/carImage';
import { CustomerDTO } from 'src/app/models/customerDTO';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  cars:CarDTO[] = [];
  carImages:CarImage[] = [];
  customers:CustomerDTO[]=[];

  constructor(private carService:CarService, private carImageService:CarImageService, private customerService:CustomerService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.getCarsById(params["carId"]);
        this.getCarImagesByCar(params["carId"]);
    }) 
    
    this.getCustomers();
  }

  getCarsById(carId:number){
    this.carService.getCarsById(carId).subscribe(response => {
      this.cars=response.data;
  })
}

  getCarImagesByCar(carId:number){
    this.carImageService.getCarImagesByCar(carId).subscribe(response => {
      this.carImages=response.data;
  })
}

  getCurrentImageClass(image:CarImage){
    if(image == this.carImages[0]){
      return "carousel-item active"
    } 
    else {
      return "carousel-item"
    }
}

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data;
    })
}

}
