import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './device/device-list/device-list.component';

const routes: Routes = [
  {path: 'list-device', component:DeviceListComponent},
  {path: '', redirectTo:'list-device', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
