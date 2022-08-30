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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  private getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      this.listUsers = data;
    });
  }
  viewUser(id: number) {
    this.router.navigate(['view-user', id]);

  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.router.navigate(['user-list']);
      window.location.reload();
    })
  }

}
