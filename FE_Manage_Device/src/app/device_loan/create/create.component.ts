import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/device/device';
import { DeviceService } from 'src/app/device/device.service';
import { User, UserDto } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { DeviceLoanService } from '../device-loan.service';
import { DeviceLoan } from '../device-loan';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userLogin= new UserDto();

  listDevices: Device[] | undefined;
  loan = new DeviceLoan();

  id:number;
  user:User;
  device_id: number;
  device: Device;
  count=0;
  page = 1;
  term = '';
  formGroup: FormGroup;
  value: any;


  constructor(
    private translate: TranslateService,
    private userService:UserService,
    private deviceService : DeviceService,
    private route: ActivatedRoute,
    private router:Router,
    private loanService:DeviceLoanService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      reason: ['', Validators.required],
      borrow_date: ['', Validators.required],
      return_date: ['', Validators.required],


    });
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
      this.userService.getUserLogin().subscribe(res =>{
        this.userLogin = res;
      })
      // this.loanService.getLoanById(this.id).subscribe(data=>{
      //   this.loan=data;
      // },error => console.log(error));
      // this.retrieveDevice(this.term);

}


onSubmit(value){
  this.loan.borrow_date = value.borrow_date;
  this.loan.return_date = value.return_date;
  this.loan.reason = value.reason;

  this.loan.user_id = this.userLogin.id;
  this.loan.device_id = this.id;

  console.log(this.loan);

  this.loanService.createLoan(this.loan).subscribe(data =>{
    this.toastrService.success(this.translate.instant('SUCCESSFULLYREGISTERED'));
    this.router.navigate(['/home']);
  },
  error => console.log(error));

 }


}
