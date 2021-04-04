import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private cardService:CardService,private rentalService:RentalService,private activatedRoute:ActivatedRoute, private router:Router,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params["rental"]);
      }
    })
  }

  createCard(){
    let card:Card = {customerName:this.cardholderName,
                     cardNumber:this.cardNumber,
                     expirationDate:this.expirationDate,
                     cvv:this.cvv};

    if(card.customerName == '' || card.cardNumber == '' || card.expirationDate == '' || card.cvv == ''){
      this.toastrService.error("Kart bilgilerinizi eksiksiz giriniz");
    }
    else{
      this.checkCardValid(card);
    }
  }

  checkCardValid(card:Card){
    this.cardService.checkCardValid(card).subscribe(response=>{
      if(response.success == false){
        this.toastrService.error(response.message);
      }
      else{
        this.toastrService.success(response.message);
        this.addRental(this.rental);
      }
    })
  }

  addRental(rental:Rental){
    this.rentalService.add(rental).subscribe(response=>{
      if(response.success==true){
        this.toastrService.success(response.message);
        this.router.navigate(['']);
      }
    })
  }

}
