import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + "auth/login",loginModel);
  }

  register(registerModel:RegisterModel):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + "auth/register",registerModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

}
