import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private loggedIn = false;
  private token: string | undefined = '';
  private header: HttpHeaders | undefined ; 
  baseUrl = '';
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.api ; 
  }
  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  request<T>(method: string, route: string, data?: any) : Observable<T> {
    //missing general headers
    if (method === 'GET') {
      return this.get(route, data);
    }
    if (method === 'POST') {
      return this.post(route, data);
    }
    if (method === 'PUT') {
      return this.put(route, data);
    }
    if (method === 'DELETE') {
      return this.delete(route, data);
    }
    if (method === 'PATCH') {
      return this.patch(route, data);
    }

    return this.http.request<T>(method, this.baseUrl + route, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: this.header
    });
  }

  get<T>(route: string, data?: any):Observable<T> {

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }
    return this.http.get<T>(this.baseUrl + route ); // agregar headers
  }
  post<T>(route: string, data?: any):Observable<T> {

    return this.http.post<T>(this.baseUrl + route, data,  {
      responseType: 'json',
      headers: this.header
    });
  }
  put<T>(route: string, data?: any):Observable<T> {

    return this.http.put<T>(this.baseUrl + route, data,  {
      responseType: 'json',
      headers: this.header
    });
  }
  delete<T>(route: string, data?: any):Observable<T> {

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.delete<T>(this.baseUrl + route, {
      responseType: 'json',
      headers: this.header,
      params
    });
  }
  patch<T>(route: string, data?: any):Observable<T> {

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.patch<T>(this.baseUrl + route, data ,{
      responseType: 'json',
      headers: this.header,
      params
    });
  }

}
