import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { User, UserDto } from './user/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Team C-internship';
  currentLanguage: string = 'en';

  userLogin = new UserDto();
  user:User;
  user_id:number;
  constructor(
    private translate: TranslateService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService

  ){
    this.user_id=this.route.snapshot.params['user_id'];

  }

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
    this.userService.getUserLogin().subscribe(res =>{

      this.userLogin = res;
     });
  }

  async setLanguage(): Promise<void> {
    const ipInfo$ = this.apiService.getIPInfo();
    const ipInfo = await lastValueFrom(ipInfo$);

    this.translate.setDefaultLang('en');
    if (ipInfo?.country_code?.toUpperCase() == 'JP') {
      this.translate.setDefaultLang('jp');
      this.currentLanguage = 'jp';
    };
  }

  setEnglish(): void {
      this.translate.use('en');
      this.currentLanguage = 'en';
  }

  setJapanese():void{
    this.translate.use('jp');
    this.currentLanguage = 'jp';
  }

  setVietnamese():void{
    this.translate.use('vn');
    this.currentLanguage = 'vn';
  }
  viewUser(user_id: number) {
    this.router.navigate(['view-user/', user_id]);
  }
   load(){
 window.location.reload();

  }
  hideshow() {
    var x = document.getElementById("menu");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
}
