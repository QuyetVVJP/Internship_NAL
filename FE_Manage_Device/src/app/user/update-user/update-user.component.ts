import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formGroup: FormGroup;
  constructor(
    private userService : UserService,
   private route: ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data;
    },error => console.log(error));
   
    this.formGroup = this.formBuilder.group({

      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      employee_id: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
     


    });
  }
  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }
    goToListUsers(){
      this.toastrService.info('Thành công', 'Cập nhật tài khoản');

      this.router.navigate(['/home']);
    }
    onSubmit(value){
 
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


