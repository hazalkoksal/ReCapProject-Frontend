import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { DataResponseModel } from '../models/dataResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  add(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "CreditCards/add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  getByUserId(userId:number):Observable<DataResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "CreditCards/getbyuserid?id=" + userId;
    return this.httpClient.get<DataResponseModel<CreditCard>>(newPath);
  }
  
}
