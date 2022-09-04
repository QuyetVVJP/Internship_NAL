import { HttpClient } from '@angular/common/http';
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
  postResponse: any;
  successResponse?: string;
  uploadedImage!: File;
  constructor(private deviceService: DeviceService,
    private router: Router,
    private httpClient: HttpClient
   ) { }

  ngOnInit(): void {

  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }

  savedevice(){
    this.deviceService.addDevice(this.device).subscribe(data =>{
        this.imageUploadAction();
        this.gotolistDevices();
    },
    error => console.log(error));
  }
  gotolistDevices(){
    this.router.navigate(['/list-device']);
  }
   onSubmit(){
    // console.log(this.device);
    this.savedevice();
   }

   imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

    this.httpClient.post('http://localhost:8080/users/upload/image/', imageFormData, {  responseType: 'text'  })
      .subscribe((response) => {
        this.gotolistDevices();
      },error => console.log(error)
      
      );
    }
}
