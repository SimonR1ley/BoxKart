import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Builds } from '../models/build';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/builds"

  getAllBuilds(){
    return this.http.get<Builds[]>(this.url);
  }


craftKart(buildId: string ){
  return this.http.post<any>(`${this.url}/craft`, {buildId})
}
}
