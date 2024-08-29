import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {UserBasic} from "../models/user-basic";
import {Arrival} from "../models/arrival";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = "http://192.168.0.34:7575/admin";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/all`);
  }

  sellCourseBundle(userId: number): Observable<HttpResponse<string>> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.post<string>(`${this.apiUrl}/sellCourseBundle`, {}, {params, observe: 'response', responseType: 'text' as 'json'});
  }

  getUsersByRemainingCourse(remainingCourse: number): Observable<any[]> {
    const params = new HttpParams().set('remainingCourses', remainingCourse.toString());
    return this.http.get<any[]>(`${this.apiUrl}/users`, {params});
  }

  getUsersWithoutCourse(): Observable<UserBasic[]> {
    return this.http.get<UserBasic[]>(`${this.apiUrl}/users/courseless`);
  }

  getCalendar(): Observable<Arrival[]> {
    return this.http.get<Arrival[]>(`${this.apiUrl}/calendar`);
  }
}
