import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formGroup: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],



    });
  }

  saveUser(){
    this.userService.register(this.user).subscribe(data =>{
        console.log(data);
        this.goToListUsers();
    },
    error => console.log(error));
  }
  goToListUsers(){
    this.router.navigate(['/home']);
    
  }
   onSubmit(value){
    this.saveUser();
    window.location.reload();
   }

}
