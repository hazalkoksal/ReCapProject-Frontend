import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../models/customerDTO';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44334/api/Customers/getcustomerdetails';

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<DataResponseModel<CustomerDTO[]>>{
    return this.httpClient.get<DataResponseModel<CustomerDTO[]>>(this.apiUrl);
  }
}
