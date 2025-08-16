import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl = 'https://portfolio-backend-3dop.onrender.com/api/';

  constructor(private http: HttpClient) {}

  downloadResume(email: string, otp: string): Observable<Blob> {
    const params = new HttpParams()
      .set('email', email)
      .set('otp', otp);

    return this.http.get(`${this.baseUrl}resume/download`, {
      params,
      responseType: 'blob' // to receive binary PDF
    });
  }
}
