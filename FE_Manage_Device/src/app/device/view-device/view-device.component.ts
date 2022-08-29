import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css']
})
export class ViewDeviceComponent implements OnInit {

  id!: number;
  device!: Device;
  constructor(
    private route : ActivatedRoute,
    private devicService : DeviceService
  ) { }

  ngOnInit(): void {
  this.id=this.route.snapshot.params['id'];

  this.device=new Device();
  this.devicService.getDeviceById(this.id).subscribe(data =>{
    this.device=data;
  })
    
  }

}
