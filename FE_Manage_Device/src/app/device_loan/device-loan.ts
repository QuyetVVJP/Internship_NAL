import { Timestamp } from "rxjs";

export class DeviceLoan{
    id:number;
    borrow_date:Date;
    return_date:Date;
    status:string;
    device_id:number;
    user_id:number;
    reason:string;
}
export class UserDto{
    first_name:string| undefined;
    last_name:string| undefined;
    email:string| undefined;
    name_role:string| undefined;
    id: number|undefined;
  }
export class DeviceLoanDto{
    id:number;
    borrow_date:number;
    return_date:number;
    status:string;
    reason:string;
    username:string;
    email:string;
    device_id: number;
    device_name:string;
}

