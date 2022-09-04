export class Device {
  id: number = 0;
  device_name: string | undefined;
  os:string|undefined;
  manufacturer:string|undefined;
  information:string|undefined;
  path_QR: string|undefined;
  status: string|undefined;
}
export class Deviceloan{
  id:number;
  borrow_date:number;
  return_date:number;
  status:string;
  device_id:number;
  user_id:number;
  reason:string;
}

