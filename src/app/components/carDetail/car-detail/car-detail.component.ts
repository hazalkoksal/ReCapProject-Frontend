import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDTO } from 'src/app/models/carDTO';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  userId:number = Number(localStorage.getItem("userId"));

  car:CarDTO;
  carImages:CarImage[] = [];
  rental:Rental;

  customerId:number;
  carId:number;
  rentDate:Date;
  returnDate:Date;
  totalPrice:number;

  carAvaliableSuccess:boolean;
  carAvaliableMessage:string;

  constructor(private carService:CarService, private carImageService:CarImageService, private customerService:CustomerService, private rentalService:RentalService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.carId = Number(params["carId"]);
        this.getCarById(this.carId);
        this.getCarImagesByCar(this.carId);
        this.getCustomerId(this.userId);
    }) 
  }

  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response => {
      this.car=response.data[0];
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

  getCustomerId(userId:number){
    this.customerService.getByUserId(userId).subscribe(response=>{
      if(response.data != null){
        this.customerId=response.data.customerId;
      }
      else{
        this.customerId = undefined;
      }
    })
  }

  checkCarAvaliable(){
    if(this.rentDate && this.returnDate){
      if(this.returnDate <= this.rentDate){
        this.carAvaliableSuccess=false;
        this.carAvaliableMessage="Dönüş tarihi kiralama tarihinden büyük olmalıdır"
        this.calculateTotalPrice();
      }
      else{
        this.rentalService.checkCarAvaliable(this.carId,this.rentDate,this.returnDate).subscribe(
          response => {
          this.carAvaliableSuccess=response.success;
          this.carAvaliableMessage=response.message;
          this.calculateTotalPrice();
        },
        responseError => {
          this.carAvaliableSuccess=responseError.error.success;
          this.carAvaliableMessage=responseError.error.message;
          this.calculateTotalPrice();
        })
      }
    }
  }

  checkFindexPoint(){
    this.rentalService.checkFindexPoint(this.carId,this.customerId).subscribe(
      response => {
        this.createRental();
        this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...");
        this.router.navigate(['/card/',JSON.stringify(this.rental)]);
      },
      responseError => {
        this.toastrService.error(responseError.error.message);
    });
  }

  calculateTotalPrice(){
    if(this.carAvaliableSuccess==true){
      var date1=new Date(this.returnDate.toString());
      var date2=new Date(this.rentDate.toString());

      var diff = date1.getTime() - date2.getTime();
      var days = Math.ceil(diff/(1000*60*60*24));
      this.totalPrice = days * this.car.dailyPrice;
    }
    else{
      this.totalPrice = 0;
    }
  }

  rent(){
    if(this.carId == undefined || this.customerId == undefined || this.rentDate==undefined || this.returnDate==undefined || this.carAvaliableSuccess != true){
      this.toastrService.error("Bilgilerinizi eksiksiz ve doğru giriniz")
    }
    else{
      this.checkFindexPoint();
    }
  }

  createRental(){
    this.rental = {carId:this.carId,
                   customerId:this.customerId,
                   rentDate:this.rentDate,
                   returnDate:this.returnDate};
  }

}
