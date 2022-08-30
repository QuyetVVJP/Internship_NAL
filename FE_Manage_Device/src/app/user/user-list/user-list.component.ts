import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user'
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listUsers: User[] | undefined;
  constructor(
    private deviceService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  private getAllUser() {
    this.deviceService.getAllUser().subscribe(data => {
      this.listUsers = data;
    });
  }

}
