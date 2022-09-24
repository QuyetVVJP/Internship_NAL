import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, User, UserDto, UserRequest } from './user';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseURL = environment.apiUrl + "/users"
  constructor(private httpClient: HttpClient) { }
  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL + '/list'}`);
  }
  addUser(user: User): Observable<Object> {
    return this.httpClient.post<User>(`${this.baseURL + '/create'}`, user);
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }
  updateUser(id: number, user: User): Observable<object> {
    return this.httpClient.put(`${this.baseURL + '/update'}/${id}`, user);
  }
  deleteUser(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL+'/delete'}/${id}`);
  }

  register(userRequest: UserRequest): Observable<Object> {
    return this.httpClient.post<User>(`${this.baseURL + '/register'}`, userRequest);
  }

  login(request: LoginRequest): Observable<UserDto>{
    return this.httpClient.post<UserDto>(`${this.baseURL + '/login'}`, request);
  }

  getUserLogin():Observable<UserDto>{
    return this.httpClient.get<UserDto>(`${this.baseURL + '/userIsLogin'}`);
  }
  logout():Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL + '/logout'}`);
  }
  getAllUserWithPagination(term): Observable<any> {
    let terms = new HttpParams().set('term', term);
    return this.httpClient.get<User[]>(`${this.baseURL + '/search'}`,{ params: terms } );
  }

  getUserByDeviceId(id: number) {
    return this.httpClient.get<User>(`${this.baseURL}/get-user-by-device-id/${id}`);
  }
}
