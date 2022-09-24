import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../device/device';
import { UserDto } from '../user/user';
import { DeviceLoan, DeviceLoanDto } from './device-loan';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceLoanService {
  private baseURL = environment.apiUrl + "/loan"
  constructor(private httpClient: HttpClient) { }
  getAllLoan(): Observable<DeviceLoanDto[]> {
    return this.httpClient.get<DeviceLoanDto[]>(`${this.baseURL + '/list'}`);
  }
  createLoan(loan:  DeviceLoan): Observable<Object> {
    return this.httpClient.post<DeviceLoan[]>(`${this.baseURL + '/create'}`, loan);
  }
  getLoanById(id: number): Observable<DeviceLoan> {
    return this.httpClient.get<DeviceLoan>(`${this.baseURL}/${id}`);
  }

  getAllLoanWithPagination(term): Observable<any> {
    let terms = new HttpParams().set('term', term);
    return this.httpClient.get<DeviceLoan[]>(`${this.baseURL + '/search'}`,{ params: terms } );
  }
  getUserLogin():Observable<UserDto>{
    return this.httpClient.get<UserDto>(`${this.baseURL + '/userIsLogin'}`);
  }
  approval(id:number): Observable<Object> {
    return this.httpClient.get<any>(`${this.baseURL + '/approval'}/${id}`);
  }
  reject(id:number): Observable<Object> {
    return this.httpClient.get<any>(`${this.baseURL + '/reject'}/${id}`);
  }
  getLoanByUserWithPagination(user_id: number): Observable<any> {
    let term = new HttpParams().set('user_id', user_id);
    return this.httpClient.get<any[]>(`${this.baseURL + '/list-by-user'}`, {params: term});
  }
}
