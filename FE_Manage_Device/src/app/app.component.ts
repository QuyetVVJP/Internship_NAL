import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { UserDto } from './user/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FE_Manage_Device';
  currentLanguage: string = 'en';

  userLogin = new UserDto();
  constructor(
    private translate: TranslateService,
    private apiService: ApiService
  ){}

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
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
}
