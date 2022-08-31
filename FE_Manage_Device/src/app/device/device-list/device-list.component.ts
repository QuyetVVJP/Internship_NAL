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
  count = 0;
  pageSize = 5;
  currentDevice: Device;
  currentIndex = -1;
  page = 1;;
  term = '';
  constructor(
    private deviceService: DeviceService,
    private router: Router
  ) { }

  ngOnInit(): void {


    // this.getAllDevice();
    this.retrieveDevice(this.term);
  }

  private getAllDevice() {
    this.deviceService.getAllDevice().subscribe(data => {
      this.listDevices = data;
    });
  }
  viewDevice(id: number) {
    this.router.navigate(['view-device', id]);

  }

  setActiveDevice(device: Device, index: number): void {
    this.currentDevice = device;
    this.currentIndex = index;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveDevice(this.term);
  }

  retrieveDevice(term?: string){
    console.log(this.term);
    this.deviceService.getAllDeviceWithPagination(term).subscribe(res =>{
      console.log(res);
      this.listDevices = res.content;
      this.count = res.totalElements;
    })
  }

  searchByTerm(){
    this.retrieveDevice(this.term);
  }

  updateDevice(id: number) {
    this.router.navigate(['update-device', id]);
  }
  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe(data => {
      this.router.navigate(['list-device']);
      window.location.reload();
    })
  }
}
