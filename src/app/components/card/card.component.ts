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

  cardForm:FormGroup;
  rental:Rental;
  checkStatus:boolean = false;
  savedCard:CreditCard;
  userId:number = Number(localStorage.getItem("userId"));

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
        if(this.savedCard == null){
          this.createCardForm();
        }
        else{
          this.createSavedCardForm(this.savedCard);
        }
    })
  }

  createCardForm(){
    this.cardForm = this.formBuilder.group({
      cardholderName:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cvv:["",Validators.required]
    })
  }

  createSavedCardForm(creditCard:CreditCard){
    this.cardForm = this.formBuilder.group({
      expirationDate:[creditCard.expirationDate,Validators.required],
      cvv:[creditCard.cvv,Validators.required],
      cardNumber:[creditCard.cardNumber,Validators.required],
      cardholderName:[creditCard.cardholderName,Validators.required]
    })
  }

  pay(){
    if(this.cardForm.valid){
      let card:Card = Object.assign({},this.cardForm.value);
      this.checkCardValid(card);
    }
    else{
      let card:Card = Object.assign({},this.cardForm.value);
      this.toastrService.error("Kart bilgilerinizi eksiksiz giriniz");
    }
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

  addCreditCard(creditCard:CreditCard){
    this.creditCardService.add(creditCard).subscribe(response => {
      this.addRental(this.rental);
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

}
