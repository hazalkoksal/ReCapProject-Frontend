import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getCarImagesByCar(carId:number):Observable<DataResponseModel<CarImage[]>>{
    let newPath = this.apiUrl + "CarImages/getbycarid?id=" + carId;
    return this.httpClient.get<DataResponseModel<CarImage[]>>(newPath);
  }
}
