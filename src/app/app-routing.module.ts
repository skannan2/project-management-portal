import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './taskmanager/addtask/addtask.component';
import { ViewtaskComponent } from './taskmanager/viewtask/viewtask.component';
import { UpdatetaskComponent } from './taskmanager/updatetask/updatetask.component';
import {ManageUserComponent} from './usermanager/manageuser/manageuser.component';
import {ManageProjectComponent} from './projectmanager/manageproject/manageproject.component';


const routes: Routes = [
    {path: 'adduser', component: ManageUserComponent},
    {path: 'addproject', component: ManageProjectComponent},
    {path: 'addtask', component: AddtaskComponent},
    {path: 'viewtask', component: ViewtaskComponent},
    {path: 'edittask', component: UpdatetaskComponent},
    {path: '',   redirectTo: '/adduser', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
