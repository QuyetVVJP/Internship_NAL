import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User = new User();
  id!: number;

  constructor(
    private userService : UserService,
   private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data;
    },error => console.log(error));
  }
    goToListUsers(){
      this.router.navigate(['/user-list']);
    }
    onSubmit(){
      this.userService.updateUser(this.id, this.user).subscribe(data =>{
        this.goToListUsers();
      },error => console.log(error));
    }
  }


