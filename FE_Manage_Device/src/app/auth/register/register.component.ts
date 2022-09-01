import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRequest } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new UserRequest();
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveUser(){
    this.userService.register(this.user).subscribe(data =>{
        console.log(data);
        this.goToListUsers();
    },
    error => console.log(error));
  }
  goToListUsers(){
    this.router.navigate(['/list-device']);
  }
   onSubmit(){
    this.saveUser();
   }

}
