import { Component, OnInit } from '@angular/core';
import { CustomerDTO } from 'src/app/models/customerDTO';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:CustomerDTO[] = [];
  dataLoaded=false;
  
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data;
      this.dataLoaded=true;
    })
  }

}
