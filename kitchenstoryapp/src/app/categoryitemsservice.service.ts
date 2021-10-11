import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kscategoryitems } from './kscatergoryitems';

@Injectable({
  providedIn: 'root'
})
export class CategoryitemsserviceService {

  aUrl : string = "/assets/data/categoryitems.json"

  constructor(private httpClient : HttpClient) { } 

  getAllCategoryItems(): Observable<Kscategoryitems[]>{
    return this.httpClient.get<Kscategoryitems[]>(this.aUrl) 
  }


}
