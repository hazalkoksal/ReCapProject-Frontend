import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDTO } from '../models/customerDTO';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<DataResponseModel<CustomerDTO[]>>{
    let newPath = this.apiUrl + "Customers/getcustomerdetails";
    return this.httpClient.get<DataResponseModel<CustomerDTO[]>>(newPath);
  }

  getByUserId(userId:number):Observable<DataResponseModel<Customer>>{
    let newPath = this.apiUrl + "Customers/getbyuserid?id=" + userId;
    return this.httpClient.get<DataResponseModel<Customer>>(newPath);
  }
}
