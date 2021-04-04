import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../models/customerDTO';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44334/api/Customers/getcustomerdetails';

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<CustomerDTO[]>>{
    return this.httpClient.get<ListResponseModel<CustomerDTO[]>>(this.apiUrl);
  }
}
