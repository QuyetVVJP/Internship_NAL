import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Device } from './device';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseURL = "http://localhost:8080/devices"
  constructor(private httpClient: HttpClient ) { }

  getAllDevice(): Observable<Device[]>{
    return this.httpClient.get<Device[]>(`${this.baseURL+'/list'}`);
  }
}
