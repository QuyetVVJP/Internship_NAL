import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import {HttpClientModule} from '@angular/common/http';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  // Khai bao cac component o day
  declarations: [
    AppComponent,
    DeviceListComponent,
    AddDeviceComponent,
    UpdateDeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
