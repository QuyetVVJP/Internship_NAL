import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/device/device';
import { DeviceService } from 'src/app/device/device.service';
import { User, UserDto } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { DeviceLoanService } from '../device-loan.service';
import { DeviceLoan, DeviceLoanDto } from '../device-loan';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  listLoans: DeviceLoanDto[];

  user_id:number;

  device_id: number;
  pageSize = 5;
  currentLoan:DeviceLoanDto;
  currentIndex = -1;
  count=0;
  page = 1;
  term = '';
  userLogin= new UserDto();
  currentDeviceDto: any;

  listDevices: Device[] | undefined;

  constructor(
    private deviceService : DeviceService,
    private userService:UserService,
    private route: ActivatedRoute,
    private loanService : DeviceLoanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.getAllLoan();
    this.retrieveLoan(this.term);


    // this.useService.getUserById(this.user_id).subscribe(data =>{
    //   this.user=data;
    // });
    // this.retrieveDevice(this.term);
  }

  private getAllLoan() {
    this.loanService.getAllLoan().subscribe(data => {
      console.log(data);
      this.listLoans = data;
    });
  }
  createLoan(id: number) {
    this.router.navigate(['create-loan', id]);
  }
  setActiveLoan(loan : DeviceLoanDto, index: number): void {
    this.currentLoan = loan;
    this.currentIndex = index;
  }
   handlePageChange(event: number): void {
    this.page = event;
    this.retrieveLoan(this.term);
  }
  retrieveLoan(term?: string){
    this.loanService.getAllLoanWithPagination(term).subscribe(res =>{
      console.log(res.content[0][3]);
      this.listLoans = res.content;
      this.count = res.totalElements;
    });
    this.userService.getUserLogin().subscribe(res =>{
      console.log(res);
      this.userLogin = res;
 });
 }
 searchByTerm(){
  this.retrieveLoan(this.term);
  console.log(this.term);
}


setActiveDevice(device: any, index: number): void {
  this.currentDeviceDto = device;
  this.currentIndex = index;
}

  approval(id:number){
    this.loanService.approval(id).subscribe(data => {
      this.router.navigate(['list']);

    })
    window.location.reload();
  }
  reject(id:number){
    this.loanService.reject(id).subscribe(data => {
      this.router.navigate(['list']);

    })
    window.location.reload();
  }
}
