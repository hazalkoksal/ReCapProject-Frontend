import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  checkCardValid(card:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Cards/checkifcardvalid";
    return this.httpClient.post<ResponseModel>(newPath,card);
  }

}
