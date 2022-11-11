import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  ApiUrl="http://localhost:3000/";

  getAdminLogin(username: any){
    return this.http.get<any>(this.ApiUrl + "admin/api/"+username);
  }

  getuserLogin(username: any){
    return this.http.get<any>(this.ApiUrl + "userbyname/api/"+username);
  }
}
