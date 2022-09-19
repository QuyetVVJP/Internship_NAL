import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserDto } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css']
})
export class ViewDeviceComponent implements OnInit {

  id!: number;
  device!: Device;
  userLogin= new UserDto();
  user = new User();
  constructor(
    private route : ActivatedRoute,
    private devicService : DeviceService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  this.id=this.route.snapshot.params['id'];

  this.device=new Device();
  this.devicService.getDeviceById(this.id).subscribe(data =>{

    this.device=data;
    if(data.status === 'Đã cho mượn'){
      this.userService.getUserLogin().subscribe(res =>{
        console.log(res)
        this.userLogin = res;
      });

      this.userService.getUserByDeviceId(data.id).subscribe(data =>{
        this.user = data;
      });
    }

  })
  }

  returnDevice(id:number){
    this.devicService.returnDevice(id).subscribe(data =>{
      if(data != null){
        this.router.navigate(['home']);
      }
    })
  }

}
