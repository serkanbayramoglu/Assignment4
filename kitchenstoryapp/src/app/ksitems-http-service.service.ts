import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kscategoryitems } from './kscatergoryitems';
import { Ksitems } from './ksitems';

@Injectable({
  providedIn: 'root'
})
export class KSitemsHttpServiceService {


  aUrl : string = "http://localhost:8370/KS"

  constructor(private httpClient : HttpClient) { }

  getItems(): Observable<Ksitems[]>{
    return this.httpClient.get<Ksitems[]>(this.aUrl)
  }

  getCategoryItems(): Observable<Kscategoryitems[]>{
    return this.httpClient.get<Kscategoryitems[]>(this.aUrl+"CatItems")
  }

  getbyItem(item: any[string]): Observable<Ksitems[]>{
    return this.httpClient.get<Ksitems[]>(this.aUrl + "/item/" + item)
  }

  getbyCode(code: string): Observable<Ksitems>{
    return this.httpClient.get<Ksitems>(this.aUrl + "/code/" + code)
  }

  saveItems(ksitems: Array<Ksitems>) {
    return this.httpClient.post(this.aUrl, ksitems);
  }

  deleteItems(ksitem: Ksitems) {
    return this.httpClient.post(this.aUrl + "Delete", ksitem);
  }

}


  