import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {response} from "express";
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = `http://192.168.0.34:7575/member`;  // Base URL for your API

  constructor(private http: HttpClient) {}

  // Create an arrival
  createArrival(arrival: { userId: number, date: string, courseBundleId: number }): Observable<HttpResponse<string>> {
    return this.http.post<string>(`${this.apiUrl}/arrival`, arrival, { observe: 'response', responseType: 'text' as 'json' });
  }

  // Get arrivals for a user
  getArrival(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/arrival`, { params: { userId: userId.toString() } });
  }

  // Delete an arrival
  deleteArrival(userId: number, arrivalId: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${this.apiUrl}/arrival`, { observe: 'response', responseType: 'text' as 'json',params: { userId: userId.toString(), arrivalId: arrivalId.toString() } });
  }

  // Get course bundles for a user
  getCourseBundles(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/coursebundles`, { params: { userId: userId.toString() } });
  }

  // Get calendar arrivals for a user
  getCalendar(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/calendar`, { params: { userId: userId.toString() } });
  }
}
