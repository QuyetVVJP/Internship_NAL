import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/device/device';
import { DeviceService } from 'src/app/device/device.service';
import { User, UserDto } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { DeviceLoanService } from '../device-loan.service';
import { Deviceloan, DeviceLoanDto } from '../devicve-loan'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
listLoans: DeviceLoanDto[];
user_id:number;
  user:User;
  device_id: number;
 
  count=0;
  page = 1;
  term = '';
  userLogin= new UserDto();
  
  listDevices: Device[] | undefined;
  constructor(
    private deviceService : DeviceService,
    private useService:UserService,
    private route: ActivatedRoute,
    private loanService : DeviceLoanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllLoan();
    // console.log(this.user_id)
    // this.useService.getUserById(this.user_id).subscribe(data =>{
    //   this.user=data;
    // });
    this.retrieveDevice(this.term);
  }
  private getAllLoan() {
    this.loanService.getAllLoan().subscribe(data => {
      this.listLoans = data;
    });
  }
  createLoan(id: number) {
    this.router.navigate(['create-loan', id]);
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveDevice(this.term);
  }
  retrieveDevice(term?: string){
    this.deviceService.getAllDeviceWithPagination(term).subscribe(res =>{
      this.listDevices = res.content;
      this.count = res.totalElements;
    });
    this.useService.getUserLogin().subscribe(res =>{
      console.log(res);
      this.userLogin = res;
  });
  }
}
