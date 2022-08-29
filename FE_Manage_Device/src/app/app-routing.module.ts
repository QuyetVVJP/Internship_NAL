import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { ViewDeviceComponent } from './device/view-device/view-device.component';

const routes: Routes = [
  {path: 'list-device', component:DeviceListComponent},
  {path:'add-device',component: AddDeviceComponent},
  {path: '', redirectTo:'list-device', pathMatch:'full'},
  {path:'update-device/:id',component:UpdateDeviceComponent},
  {path:'view-device/:id',component:ViewDeviceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
