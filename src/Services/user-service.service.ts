import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _url = "/assets/data/data.json";

  constructor(private http: HttpClient) {}

getAllUsers(): Observable<User[]>{
  return this.http.get<User[]>(this._url);
}

}
