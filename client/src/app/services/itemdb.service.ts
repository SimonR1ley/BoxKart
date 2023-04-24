import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from '../models/Items';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ItemdbService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000/api/getinventory';
  userurl: string = 'http://localhost:3000/api/adduser';

  getuserurl: string = 'http://localhost:3000/api/getuser';

addurl: string = 'http://localhost:3000/api/addinventory';

  updateSAurl: string = 'http://localhost:3000/api/updatesa';
  updateUSAurl: string = 'http://localhost:3000/api/updateusa';
  updateAusurl: string = 'http://localhost:3000/api/updateaus';
  updateGarageurl: string = 'http://localhost:3000/api/updategarage';

  // items: Items[] = [];

  addItems(order: Items): Observable<Items> {
    return this.http.post<Items>(this.addurl, order);
   }

  getAllItems(): Observable<Items[]> {
    return this.http.get<Items[]>(this.url);
  }

  createNewUser(order: User): Observable<User> {
    return this.http.post<User>(this.userurl, order);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getuserurl);
  }

  // Move Stock

  updateSA(id: string, newAmount: number): Observable<Items> {
    return this.http.put<Items>(`${this.updateSAurl}/${id}`, {
      qtySA: newAmount,
    });
  }

  updateUSA(id: string, newAmount: number): Observable<Items> {
    return this.http.put<Items>(`${this.updateUSAurl}/${id}`, {
      qtyUSA: newAmount,
    });
  }
  updateAus(id: string, newAmount: number): Observable<Items> {
    return this.http.put<Items>(`${this.updateAusurl}/${id}`, {
      qtyAus: newAmount,
    });
  }
  updateGarage(id: string, newAmount: number): Observable<Items> {
    return this.http.put<Items>(`${this.updateGarageurl}/${id}`, {
      qtyGarage: newAmount,
    });
  }
}
