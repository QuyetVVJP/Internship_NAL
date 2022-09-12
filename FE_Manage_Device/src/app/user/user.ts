import { Timestamp } from "rxjs";

export class User{
  id:number = 0;
  first_name:string| undefined;
  last_name:string| undefined;
  gender:string| undefined;
  employee_id:number| undefined;
  email:string| undefined;
  phone:number| undefined;
  department:string| undefined;
  avatar_url:string| undefined;
  password: string;
  rePassword: string;
}

export class UserRequest{
  first_name:string| undefined;
  last_name:string| undefined;
  email:string| undefined;
  password: string| undefined;
  rePassword: string| undefined;
}

export class LoginRequest{
  email:string| undefined;
  password: string| undefined;
}

export class UserDto{
  first_name:string| undefined;
  last_name:string| undefined;
  avatar_url:string| undefined;
  email:string| undefined;
  name_role:string| undefined;
  id: number|undefined;
 
}
