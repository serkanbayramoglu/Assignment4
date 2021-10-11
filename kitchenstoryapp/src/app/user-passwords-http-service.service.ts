import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseItems } from './responseitems';
import { UserPasswords } from './userpasswords';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordsHttpServiceService {

  aUrl : string = "http://localhost:8370/KSAdmin/"
 
  constructor(private httpClient : HttpClient) { }

  
  getUserPasswords(): Observable<UserPasswords[]>{
    return this.httpClient.get<UserPasswords[]>(this.aUrl)
  }
  
  verifyUser(userdetails: any[string]): Observable<ResponseItems> {
    return this.httpClient.get<ResponseItems>(this.aUrl + userdetails);
  }

  changePassword(userdetails: any[string]): Observable<ResponseItems> {
    return this.httpClient.get<ResponseItems>(this.aUrl + userdetails);
  }
}
