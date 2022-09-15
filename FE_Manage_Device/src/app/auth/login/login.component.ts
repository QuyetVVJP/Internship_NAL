import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest, User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  request = new LoginRequest();
  formGroup: FormGroup;
  value: any;
  user=User;
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      email: ['', Validators.required],
      password: ['', Validators.required],
      

    });
    
  }

  onSubmit(value){
    
    this.userService.login(this.request).subscribe(res =>{
      window.location.reload();
    
      })
      
       this.router.navigate(['/home']);
      
   }

}
