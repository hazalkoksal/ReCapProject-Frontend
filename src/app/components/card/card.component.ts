import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  cardForm:FormGroup;
  rental:Rental;

  constructor(private formBuilder:FormBuilder,private cardService:CardService,private rentalService:RentalService,private activatedRoute:ActivatedRoute, private router:Router,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params["rental"]);
      }
    })
    this.createCardForm();
  }

  createCardForm(){
    this.cardForm = this.formBuilder.group({
      cardholderName:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cvv:["",Validators.required]
    })
  }

  pay(){
    if(this.cardForm.valid){
      let card:Card = Object.assign({},this.cardForm.value);
      this.checkCardValid(card);
    }
    else{
      this.toastrService.error("Kart bilgilerinizi eksiksiz giriniz");
    }
  }

  checkCardValid(card:Card){
    this.cardService.checkCardValid(card).subscribe(
      response => {
        this.toastrService.success(response.message);
        this.addRental(this.rental);
    },
    reponseError => {
      this.toastrService.error(reponseError.error.message);
    })
  }

  addRental(rental:Rental){
    this.rentalService.add(rental).subscribe(response=>{
      this.toastrService.success(response.message);
      this.router.navigate(['']);
    })
  }

}
