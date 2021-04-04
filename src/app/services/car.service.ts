import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDTO } from '../models/carDTO';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDTO[]>>{
    let newPath = this.apiUrl + "Cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDTO[]>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDTO[]>>{
    let newPath = this.apiUrl + "Cars/getcardetailsbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDTO[]>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDTO[]>>{
    let newPath = this.apiUrl + "Cars/getcardetailsbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDTO[]>>(newPath);
  }

  getCarsByBrandandColor(brandId:number,colorId:number):Observable<ListResponseModel<CarDTO[]>>{
    let newPath = this.apiUrl + "Cars/getcardetailsbybrandidcolorid?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDTO[]>>(newPath);
  }

  getCarById(carId:number):Observable<ListResponseModel<CarDTO[]>>{
    let newPath = this.apiUrl + "Cars/getcardetailsbyid?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarDTO[]>>(newPath);
  }

  getById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getbyid?id=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Cars/delete";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

}
