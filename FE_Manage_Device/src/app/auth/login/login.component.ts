import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  request = new LoginRequest();
  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.login(this.request).subscribe(res =>{
      this.router.navigate(['/list-device']);
    })

   }

}
