import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from '../models/Items';

@Injectable({
  providedIn: 'root',
})
export class ItemdbService {

  constructor(private http: HttpClient) {
    
  }

  url: string = 'http://localhost:3000/api/getinventory'

  items: Items[] = [];

  getAllItems(): Observable<Items[]> {

     return this.http.get<Items[]>(this.url);
    // return this.items;
  }
}
