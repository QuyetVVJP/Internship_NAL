import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  id!: number;
  user!: User;
  user_id:number;
  constructor(
    private route : ActivatedRoute,
    private useService : UserService,
    private router: Router,
  ) { 
    this.user_id=this.route.snapshot.params['user_id'];
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

  this.user=new User();
  this.useService.getUserById(this.id).subscribe(data =>{
    console.log(data);
    this.user=data;
  })
  
    
  }
  updateUser(id: number) {
    this.router.navigate(['update-user/', id]);
  }

}
