import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/device/device';
import { DeviceService } from 'src/app/device/device.service';
import { DeviceLoan, DeviceLoanDto } from 'src/app/device_loan/device-loan';
import { DeviceLoanService } from 'src/app/device_loan/device-loan.service';
import { User, UserDto } from '../user';
import { UserService } from '../user.service';
import { environment } from './../../../environments/environment';

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
  uploadedImage!: File;
  formGroup: FormGroup;

  listDevices: Device[] | undefined;
  id!: number;
  user!: User;
  constructor(
    private deviceService : DeviceService,
    private userService:UserService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private deviceLoanService : DeviceLoanService,
    private httpClient: HttpClient,
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
    public onImageUpload(event) {
      this.uploadedImage = event.target.files[0];
    }
      goToListUsers(){
        this.toastrService.info('Thành công', 'Cập nhật Avatar');
  
        this.router.navigate(['view-user/',this.id]);
      }
    onSubmit(value){

      this.userService.updateUser(this.id, this.user).subscribe(data =>{
        this.goToListUsers();
        this.imageUploadAction(this.id);


      },error => console.log(error));
    }
    imageUploadAction(id: number) {
      const imageFormData = new FormData();
      imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

      this.httpClient.post(environment.apiUrl + '/users/upload/image/'+id, imageFormData, {  responseType: 'text'  })
        .subscribe((response) => {
          //this.goToListUsers();
      },error => console.log(error)

        );
      }

}
