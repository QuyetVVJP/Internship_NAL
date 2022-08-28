import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  listDevices: Device[] |undefined;
  constructor(
    private deviceService: DeviceService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.listDevices = [{
      "id": 1,
      "device_name": "Test",
      "path_qr": "assets/image/" + "2022-08-17.png"
    }]
    // this.getAllDevice();
  }

  private getAllDevice(){
    this.deviceService.getAllDevice().subscribe(data =>{
      this.listDevices = data;
    });
  }
 updateDevice(id:number){
    this.router.navigate(['update-device',id]);
 }
}
