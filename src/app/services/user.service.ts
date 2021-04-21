import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getByMail(email:string):Observable<DataResponseModel<User>>{
    let newPath = this.apiUrl + "Users/getbymail?email=" + email;
    return this.httpClient.get<DataResponseModel<User>>(newPath);
  }

}
