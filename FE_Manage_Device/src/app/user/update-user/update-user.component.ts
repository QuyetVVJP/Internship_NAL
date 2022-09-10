import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastrService: ToastrService,
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
    goToListUsers(){
      this.toastrService.info('Thành công', 'Cập nhật tài khoản');

      this.router.navigate(['/home']);
    }
    onSubmit(){
      this.userService.updateUser(this.id, this.user).subscribe(data =>{
        this.imageUploadAction(this.id);


      },error => console.log(error));
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


