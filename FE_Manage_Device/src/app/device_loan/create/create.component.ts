import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/device/device';
import { DeviceService } from 'src/app/device/device.service';
import { User, UserDto } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { DeviceLoanService } from '../device-loan.service';
import { Deviceloan } from '../devicve-loan';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userLogin= new UserDto();

  listDevices: Device[] | undefined;
  loan = new Deviceloan();

  id:number;
  user:User;
  device_id: number;
  device: Device;
  count=0;
  page = 1;
  term = '';

  
  constructor(private useService:UserService,
    private deviceService : DeviceService,
    private route: ActivatedRoute,
    private router:Router,
    private loanService:DeviceLoanService,
    private httpClient: HttpClient) { 
    // this.device_id=this.route.snapshot.params['device_id'];
    // this.user_id=this.route.snapshot.params['user_id'];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
      this.deviceService.getDeviceById(this.id).subscribe(res =>{
        this.device =res;
      });
      this.device=new Device();
      this.deviceService.getDeviceById(this.id).subscribe(data =>{
        console.log(data);
        this.device=data;
      });
      // this.useService.getUserById(this.user_id).subscribe(data =>{
      //   this.user=data;
      // });
      this.useService.getUserLogin().subscribe(res =>{
        this.userLogin = res;
      })
      // this.loanService.getLoanById(this.id).subscribe(data=>{
      //   this.loan=data;
      // },error => console.log(error));
      this.retrieveDevice(this.term);
    
}
saveList(){
  this.loan.user_id = this.userLogin.id;
  this.loan.device_id = this.id;
  console.log(this.loan);
  this.loanService.createLoan(this.loan).subscribe(data =>{
    
      this.goToList();
  },
  error => console.log(error));
}
goToList(){
  this.router.navigate(['/list-device/list']);  
}
onSubmit(){

  this.saveList();
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
