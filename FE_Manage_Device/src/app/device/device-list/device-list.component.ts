import { Component, OnInit } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  listDevices: Device[] |undefined;
  constructor() { }

  ngOnInit(): void {
    this.listDevices = [{
      "id": 1,
      "device_name": "MSI moder 15"
    }]
  }

}
