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

  listDevices: Device[] | undefined;
  constructor(
    private deviceService: DeviceService,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.getAllDevice();
  }

  private getAllDevice() {
    this.deviceService.getAllDevice().subscribe(data => {
      this.listDevices = data;
    });
  }
  viewDevice(id: number) {
    this.router.navigate(['view-device', id]);
  }

  updateDevice(id: number) {
    this.router.navigate(['update-device', id]);
  }
  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe(data => {
      this.router.navigate(['list-device']);
    })
  }
}
