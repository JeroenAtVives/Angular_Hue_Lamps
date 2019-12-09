import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LampenService {

  constructor(private http: HttpClient) { } 

  LampsUrl = 'http://10.194.112.8/api/NLYXwecVkox4v1xDMht52OJqcHRkKM72FqoExEOj/lights';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** GET: Get all lights */
  getLamps() {
    return this.http.get(this.LampsUrl);
  }
  
  /** PUT: update the state of a lamp on the server */ 
  updateLamp (lightNumber: Number,property: string,propertyValue:string): Observable<any> {
    console.log(`${this.LampsUrl}/${lightNumber}/state`, `{"${property}":${propertyValue}}`);
    return this.http.put(`${this.LampsUrl}/${lightNumber}/state`, `{"${property}":${propertyValue}}`, this.httpOptions)
  }
  
}
