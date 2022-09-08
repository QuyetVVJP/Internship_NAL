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
  user: User;
  pageSize = 5;
  currentUser: User;
  currentIndex = -1;
  page = 1;
  term = '';
  count: 0;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUser();
    this.retrieveUser(this.term);
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

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveUser(this.term);
  }

  retrieveUser(term?: string){
    this.userService.getAllUserWithPagination(term).subscribe(res =>{
      this.listUsers = res.content;
      this.count = res.totalElements;
    });
  };

  searchByTerm(){
    this.retrieveUser(this.term);
  }

}
