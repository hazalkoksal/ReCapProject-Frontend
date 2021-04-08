import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Rental } from '../models/rental';
import { RentalDTO } from '../models/rentalDTO';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<DataResponseModel<RentalDTO[]>>{
    let newPath = this.apiUrl + "Rentals/getrentaldetails";
    return this.httpClient.get<DataResponseModel<RentalDTO[]>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  checkCarAvaliable(carId:number,rentDate:Date,returnDate:Date):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Rentals/checkifcaravaliable?carId=" + carId + "&rentDate=" + rentDate + "&returnDate=" + returnDate;
    return this.httpClient.get<ResponseModel>(newPath);
  }
  
}
