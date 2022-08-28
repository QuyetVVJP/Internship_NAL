import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { error } from 'console';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  device= new Device();
  constructor(private deviceService: DeviceService,
    private router: Router
   ) { }

  ngOnInit(): void {

  }
  savedevice(){
    this.deviceService.addDevice(this.device).subscribe(data =>{
        console.log(data);
        this.gotolistDevices();
    },
    error => console.log(error));
  }
  gotolistDevices(){
    this.router.navigate(['/list-device']);  // sai o cho nay?
  }
   onSubmit(){
    console.log(this.device);
    this.savedevice();
   }
}
