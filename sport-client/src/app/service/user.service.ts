import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:7575/user';

  constructor(private http: HttpClient) { }

  register(user: Partial<User>): Observable<HttpResponse<string>> {
    return this.http.post(`${this.apiUrl}/register`, user, { observe: 'response', responseType: 'text' });
  }

  login(user: Partial<User>): Observable<HttpResponse<{ token: string; userId: number }>> {
    return this.http.post<{ token: string; userId: number }>(`${this.apiUrl}/login`, user, { observe: 'response' });
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;  // Convert userId to number, or return null if not found
  }
}
