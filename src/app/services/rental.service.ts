import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDTO } from '../models/rentalDTO';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDTO>>{
    let newPath = this.apiUrl + "Rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDTO>>(newPath);
  }

  checkCarAvaliable(carId:number,rentDate:Date,returnDate:Date):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Rentals/checkifcaravaliable?carId=" + carId + "&rentDate=" + rentDate + "&returnDate=" + returnDate;
    return this.httpClient.get<ResponseModel>(newPath);
  }
  
}
