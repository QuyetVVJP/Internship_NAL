import { HttpClient } from '@angular/common/http';
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
  uploadedImage!: File;

  constructor(
    private userService : UserService,
   private route: ActivatedRoute,
    private router:Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data;
    },error => console.log(error));
  }
  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }
  saveUser(){
    this.userService.updateUser(this.id, this.user).subscribe(data =>{
        console.log(data);
        this.goToListUsers();
    },
    error => console.log(error));
  }

  goToListUsers(){
    this.router.navigate(['/list-device/user-list']);
  }
  onSubmit(){
    console.log(this.user);
    this.saveUser();
    }
  imageUploadAction(id: number) {
      const imageFormData = new FormData();
      imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

      this.httpClient.post('http://localhost:8080/users/upload/image/'+id, imageFormData, {  responseType: 'text'  })
        .subscribe((response) => {
          this.goToListUsers();
      },error => console.log(error)

        );
      }
  }


