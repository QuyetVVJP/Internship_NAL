import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import {HttpClientModule} from '@angular/common/http';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { FormsModule } from '@angular/forms';

import { ViewDeviceComponent } from './device/view-device/view-device.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from "ng-apexcharts";
import { RegisterComponent } from './auth/register/register.component';
@NgModule({
  // Khai bao cac component o day
  declarations: [
    AppComponent,
    DeviceListComponent,
    AddDeviceComponent,
    UpdateDeviceComponent,

    ViewDeviceComponent,

    UserListComponent,
          AddUserComponent,
          UpdateUserComponent,
          ViewUserComponent,
          RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
