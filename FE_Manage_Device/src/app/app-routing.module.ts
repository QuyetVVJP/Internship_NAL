import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { ViewDeviceComponent } from './device/view-device/view-device.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ViewUserComponent } from './user/view-user/view-user.component';

const routes: Routes = [
  {path: 'list-device', component:DeviceListComponent},
  {path:'add-device',component: AddDeviceComponent},
  {path: '', redirectTo:'list-device', pathMatch:'full'},
  {path:'update-device/:id',component:UpdateDeviceComponent},
  {path:'view-device/:id',component:ViewDeviceComponent},

  {path:'user-list', component:UserListComponent},
  {path:'add-user',component: AddUserComponent},
  {path: '', redirectTo:'list-user', pathMatch:'full'},
  {path:'update-user/:id',component:UpdateUserComponent},
  {path:'view-user/:id',component:ViewUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
