import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  update(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Users/update";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  getById(userId:number):Observable<DataResponseModel<User>>{
    let newPath = this.apiUrl + "Users/getbyid?id=" + userId;
    return this.httpClient.get<DataResponseModel<User>>(newPath);
  }

  getByMail(email:string):Observable<DataResponseModel<User>>{
    let newPath = this.apiUrl + "Users/getbymail?email=" + email;
    return this.httpClient.get<DataResponseModel<User>>(newPath);
  }

}
