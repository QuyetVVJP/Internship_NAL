import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Device } from './device';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseURL = "http://localhost:8080/devices"
  constructor(private httpClient: HttpClient) { }

  getAllDevice(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(`${this.baseURL + '/list'}`);
  }

  addDevice(device: Device): Observable<Object> {
    return this.httpClient.post<Device>(`${this.baseURL + '/create'}`, device);
  }
  getDeviceById(id: number): Observable<Device> {
    return this.httpClient.get<Device>(`${this.baseURL}/${id}`);
  }
  updateDevice(id: number, device: Device): Observable<object> {
    return this.httpClient.put(`${this.baseURL + '/update'}/${id}`, device);
  }
  deleteDevice(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL+'/delete'}/${id}`);
  }
}
