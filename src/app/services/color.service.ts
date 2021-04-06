import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color[]>>{
    let newPath = this.apiUrl + "Colors/getall";
    return this.httpClient.get<ListResponseModel<Color[]>>(newPath);
  }

  getById(colorId:number):Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "Colors/getbyid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Colors/add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  update(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Colors/update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  delete(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Colors/delete";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

}
