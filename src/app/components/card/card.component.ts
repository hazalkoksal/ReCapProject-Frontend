import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CardService } from 'src/app/services/card.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  rental:Rental;
  userId:number = Number(localStorage.getItem("userId"));

  cardholderName:string;
  cardNumber:string;
  expirationDate:string;
  cvv:string;

  checkStatus:boolean = false;
  savedCard:CreditCard;
  card:Card;
  

  constructor(private formBuilder:FormBuilder,private cardService:CardService,private rentalService:RentalService, private creditCardService:CreditCardService, private activatedRoute:ActivatedRoute, private router:Router,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params["rental"]);
        this.getCreditCardByUserId(this.userId);
      }
    })
  }

  getCreditCardByUserId(userId:number){
    this.creditCardService.getByUserId(userId).subscribe(response => {
        this.savedCard = response.data;
        if(this.savedCard != null){
          this.getSavedCard(this.savedCard);
        }
    })
  }

  getSavedCard(creditCard:CreditCard){
    this.cardholderName = creditCard.cardholderName;
    this.cardNumber = creditCard.cardNumber;
    this.expirationDate = creditCard.expirationDate;
    this.cvv = creditCard.cvv;
  }

  pay(){
    if(this.cardholderName == undefined || this.cardNumber == undefined || this.expirationDate == undefined || this.cvv == undefined){
      this.toastrService.error("Kart bilgilerinizi eksiksiz giriniz");
    }
    else{
      this.createCard();
      this.checkCardValid(this.card);
    }
  }

  createCard(){
    this.card = {cardholderName: this.cardholderName,
                 cardNumber: this.cardNumber,
                 expirationDate: this.expirationDate,
                 cvv:this.cvv};
  }

  checkCardValid(card:Card){
    this.cardService.checkCardValid(card).subscribe(
      response => {
        this.toastrService.success(response.message);
        if(this.checkStatus == true){
          this.createCreditCard(card);
        }
        else{
          this.addRental(this.rental);
        }
    },
    reponseError => {
      this.toastrService.error(reponseError.error.message);
    })
  }

  addRental(rental:Rental){
    this.rentalService.add(rental).subscribe(response => {
      this.toastrService.success(response.message);
      this.router.navigate(['']);
    })
  }

  createCreditCard(card:Card){
    let creditCard:CreditCard = {userId:this.userId,
                                 cardNumber:card.cardNumber,
                                 cardholderName:card.cardholderName,
                                 expirationDate:card.expirationDate,
                                 cvv:card.cvv};
                              
    this.addCreditCard(creditCard);
  }

  addCreditCard(creditCard:CreditCard){
    this.creditCardService.add(creditCard).subscribe(response => {
      this.addRental(this.rental);
    })
  }

}
