import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44334/api/Brands/getall';

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand[]>>{
    return this.httpClient.get<ListResponseModel<Brand[]>>(this.apiUrl);
  }

  getById(brandId:number):Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "Brands/getbyid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Brands/delete";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

}
