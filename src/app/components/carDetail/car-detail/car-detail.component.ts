import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDTO } from 'src/app/models/carDTO';
import { CarImage } from 'src/app/models/carImage';
import { CustomerDTO } from 'src/app/models/customerDTO';
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

  car:CarDTO;
  carImages:CarImage[] = [];
  customers:CustomerDTO[]=[];

  customerId:number;
  carId:number;
  rentDate:Date;
  returnDate:Date;
  success:boolean;
  message:string;
  totalPrice:number;

  constructor(private carService:CarService, private carImageService:CarImageService, private customerService:CustomerService, private rentalService:RentalService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.getCarById(params["carId"]);
        this.getCarImagesByCar(params["carId"]);
        this.carId = params["carId"];
    }) 
    
    this.getCustomers();
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

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data;
    })
  }

  checkCarAvaliable(){
    if(this.rentDate && this.returnDate){
      if(this.returnDate <= this.rentDate){
        this.success=false;
        this.message="Dönüş tarihi kiralama tarihinden büyük olmalıdır"
      }
      else{
        this.rentalService.checkCarAvaliable(this.carId,this.rentDate,this.returnDate).subscribe(response=>{
          this.success=response.success;
          this.message=response.message;

          if(this.success==true){
            var date1=new Date(this.returnDate.toString());
            var date2=new Date(this.rentDate.toString());

            var diff = date1.getTime() - date2.getTime();
            var days = Math.ceil(diff/(1000*60*60*24));
            this.totalPrice = days * this.car.dailyPrice;
          }
          else{
            this.totalPrice = 0;
          }
        })
      }
    }
  }

  rental(){
    let rental:Rental = {carId:this.carId,
                         customerId:this.customerId,
                         rentDate:this.rentDate,
                         returnDate:this.returnDate};
    
    if(rental.carId == undefined || rental.customerId == undefined || rental.rentDate==undefined || rental.returnDate==undefined || this.success == false){
      this.toastrService.error("Bilgilerinizi eksiksiz ve doğru giriniz !")
    }
    else{
      this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...");
      this.router.navigate(['/card/',JSON.stringify(rental)]);
    }
  }

}
