import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/device/device';
import { DeviceService } from 'src/app/device/device.service';
import { DeviceLoan, DeviceLoanDto } from 'src/app/device_loan/device-loan';
import { DeviceLoanService } from 'src/app/device_loan/device-loan.service';
import { User, UserDto } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  listLoans: any[];
  user_id:number;
  device_id: number;
  pageSize = 5;
  count=0;
  currentIndex = -1;
  page = 1;
  term = '';
  userLogin= new UserDto();

  listDevices: Device[] | undefined;
  id!: number;
  user!: User;
  constructor(
    private deviceService : DeviceService,
    private userService:UserService,
    private route: ActivatedRoute,
    private deviceLoanService : DeviceLoanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

  this.user=new User();
  this.userService.getUserById(this.id).subscribe(data =>{
    console.log(data);
    this.user=data;
  })


  }
  updateUser(id: number) {
    this.router.navigate(['update-user/', id]);
  }

  approval(id:number){
    this.deviceLoanService.approval(id).subscribe(data => {
      this.router.navigate(['id']);
      window.location.reload();
    })
  }
  reject(id:number){
    this.deviceLoanService.reject(id).subscribe(data => {
      this.router.navigate(['id']);
      window.location.reload();
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveDeviceLoan(this.id);}

  retrieveDeviceLoan(user_id: number){
    this.deviceLoanService.getLoanByUserWithPagination(user_id).subscribe(res =>{
      console.log(res);
    this.listLoans = res;
    this.count = res.totalElements;
    });
    };

}
