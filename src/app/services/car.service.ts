import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDTO } from '../models/carDTO';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDTO>>{
    let newPath = this.apiUrl + "Cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDTO>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDTO>>{
    let newPath = this.apiUrl + "Cars/getcardetailsbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDTO>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDTO>>{
    let newPath = this.apiUrl + "Cars/getcardetailsbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDTO>>(newPath);
  }

  getCarsById(carId:number):Observable<ListResponseModel<CarDTO>>{
    let newPath = this.apiUrl + "Cars/getcardetailsbyid?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarDTO>>(newPath);
  }

}
