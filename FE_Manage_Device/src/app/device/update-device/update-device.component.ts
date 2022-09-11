import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  formGroup: FormGroup;
  value: any;

  constructor(private deviceService : DeviceService,
   private route: ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.deviceService.getDeviceById(this.id).subscribe(data=>{
      this.device=data;
    },error => console.log(error));
    this.formGroup = this.formBuilder.group({

      device_name: [this.device.device_name, Validators.required],
      os: [this.device.os, Validators.required],
      manufacturer: [this.device.manufacturer, Validators.required],
      information: [this.device.information, Validators.required],
    


    });
  }
    gotolistDevices(){
      this.toastrService.info('Thành công!', 'Cập nhật thiết bị!');
      this.router.navigate(['/home']);
    }
    onSubmit(value){
      this.deviceService.updateDevice(this.id, this.device).subscribe(data =>{
        this.gotolistDevices();
      },error => console.log(error));
    }



}
