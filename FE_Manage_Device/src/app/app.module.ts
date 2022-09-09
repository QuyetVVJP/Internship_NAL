import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import {HttpClientModule} from '@angular/common/http';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { ViewDeviceComponent } from './device/view-device/view-device.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from "ng-apexcharts";
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ListComponent } from './device_loan/list/list.component';
import { CreateComponent } from './device_loan/create/create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';


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
          LoginComponent,
          LogoutComponent,
    ListComponent,
    CreateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgApexchartsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
