import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { DeviceListComponent } from './device/device-list/device-list.component';

import { UpdateDeviceComponent } from './device/update-device/update-device.component';
import { ViewDeviceComponent } from './device/view-device/view-device.component';
import { CreateComponent } from './device_loan/create/create.component';
import { ListComponent } from './device_loan/list/list.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ViewUserComponent } from './user/view-user/view-user.component';

const routes: Routes = [
  {path: 'home', component:DeviceListComponent},
  {path:'add-device',component: AddDeviceComponent},
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path:'update-device/:id',component:UpdateDeviceComponent},
  {path:'view-device/:id',component:ViewDeviceComponent},
  {path:'home/register',component:RegisterComponent},
  {path:'home/login',component:LoginComponent},
  {path:'home/logout',component:LogoutComponent},

  {path:'home/user-list', component:UserListComponent},
  {path:'add-user',component: AddUserComponent},
  {path: '', redirectTo:'list-user', pathMatch:'full'},
  {path:'update-user/:id',component:UpdateUserComponent},
  {path:'view-user/:id',component:ViewUserComponent},
  {path:'home/list',component:ListComponent},
  {path:'view-device/:id/create',component:CreateComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
