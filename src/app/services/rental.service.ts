import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDTO } from '../models/rentalDTO';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44334/api/Rentals/getrentaldetails';

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDTO>>{
    return this.httpClient.get<ListResponseModel<RentalDTO>>(this.apiUrl);
  }
}
