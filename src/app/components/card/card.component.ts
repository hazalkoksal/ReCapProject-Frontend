import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { Rental } from 'src/app/models/rental';
import { CardService } from 'src/app/services/card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  rental:Rental;

  cardholderName:string;
  cardNumber:string = "";
  expirationDate:string = "";
  cvv:string = "";
  filterText:string;

  cardValidSuccess:boolean;
  cardValidMessage:string;
  rentalAddSuccess:boolean;
  rentalAddMessage:string;

  constructor(private cardService:CardService,private rentalService:RentalService,private activatedRoute:ActivatedRoute, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        let myRental:Rental = JSON.parse(params["rental"]);
        this.rental = {carId:Number(myRental.carId),
                       customerId:Number(myRental.customerId),
                       rentDate:myRental.rentDate,
                       returnDate:myRental.returnDate};
      }
    })
  }

  createCard(){
    let card:Card = {customerName:this.cardholderName,
                     cardNumber:this.cardNumber,
                     expirationDate:this.expirationDate,
                     cvv:this.cvv};

    if(card.customerName == undefined || card.cardNumber == undefined || card.expirationDate == undefined || card.cvv == undefined){
      this.toastrService.error("Kart bilgilerini eksiksiz giriniz");
    }
    else{
      this.checkCardValid(card);
    }
  }

  checkCardValid(card:Card){
    this.cardService.checkCardValid(card).subscribe(response=>{
      this.cardValidSuccess=response.success;
      this.cardValidMessage=response.message;

      if(this.cardValidSuccess == false){
        this.toastrService.error(this.cardValidMessage);
      }
      else{
        this.toastrService.success(this.cardValidMessage);
        this.addRental(this.rental);
      }
    })
  }

  addRental(rental:Rental){
    this.rentalService.add(rental).subscribe(response=>{
      this.rentalAddSuccess = response.success;
      this.rentalAddMessage = response.message;

      if(this.rentalAddSuccess == true){
        this.toastrService.success(this.rentalAddMessage);
      }
    })
  }

}
