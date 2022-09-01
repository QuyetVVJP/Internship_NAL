import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, User, UserDto, UserRequest } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL ="http://localhost:8080/users"
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
}
