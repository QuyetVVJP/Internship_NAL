import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css']
})
export class UpdateDeviceComponent implements OnInit {


  device: Device = new Device();
  id!: number;


  constructor(private deviceService : DeviceService,
   private route: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.deviceService.getDeviceById(this.id).subscribe(data=>{
      this.device=data;
    },error => console.log(error));
  }
    gotolistDevices(){
      this.router.navigate(['/home']);
    }
    onSubmit(){
      this.deviceService.updateDevice(this.id, this.device).subscribe(data =>{
        this.gotolistDevices();
      },error => console.log(error));
    }



}
