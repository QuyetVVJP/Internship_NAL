import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { error } from 'console';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  device= new Device();
  postResponse: any;
  successResponse?: string;
  uploadedImage!: File;
  formGroup: FormGroup;
  value: any;
  constructor(private deviceService: DeviceService,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
   ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      device_name: ['', Validators.required],
      os: ['', Validators.required],
      manufacturer: ['', Validators.required],
      information: ['', Validators.required],
    


    });
    // this.toastrService.success('Thành công', 'Thêm thiết bị mới');
  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }

  savedevice(){
    this.deviceService.addDevice(this.device).subscribe(data =>{

        this.gotolistDevices();
    },
    error => console.log(error));

  }
  gotolistDevices(){
    this.toastrService.success('Thành công', 'Thêm thiết bị mới');
    this.router.navigate(['/home']);
  }
   onSubmit(value){
    // console.log(this.device);
    this.savedevice();
   }
}
