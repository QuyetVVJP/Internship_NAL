import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user = new User();
  uploadedImage!: File;
  constructor(private userService: UserService,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  saveUser(){
    this.userService.addUser(this.user).subscribe(data =>{
        console.log(data);
        
        this.goToListUsers();
    },
    error => console.log(error));
  }
  goToListUsers(){
    this.router.navigate(['list-device/user-list']);  
  }
   onSubmit(){
    console.log(this.user);
    this.saveUser();
   }
   public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }
 
}
