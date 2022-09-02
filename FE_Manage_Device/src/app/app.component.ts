import { Component, OnInit } from '@angular/core';
import { UserDto } from './user/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FE_Manage_Device';

  userLogin = new UserDto();
  constructor(
    private useService : UserService,
  ){}

  ngOnInit(): void {

  }
}
