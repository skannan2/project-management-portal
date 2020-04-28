import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddtaskComponent } from './taskmanager/addtask/addtask.component';
import { UpdatetaskComponent } from './taskmanager/updatetask/updatetask.component';
import { ViewtaskComponent } from './taskmanager/viewtask/viewtask.component';
import { TaskService } from './service/task.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';
import { ManageUserComponent } from './usermanager/manageuser/manageuser.component';
import { ManageProjectComponent } from './projectmanager/manageproject/manageproject.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserpopupComponent} from './shared/userpopup/userpopup.component';
import { ParenttaskpopupComponent } from './shared/parenttaskpopup/parenttaskpopup.component';
import { ProjectpopupComponent } from './shared/projectpopup/projectpopup.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddtaskComponent,
    UpdatetaskComponent,
    ViewtaskComponent,
    ManageUserComponent,
    ManageProjectComponent,
    UserpopupComponent,
    ParenttaskpopupComponent,
    ProjectpopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    NgbModule,
    Ng2SearchPipeModule
  ],
  providers: [ TaskService, DatePipe ],
  bootstrap: [AppComponent],
  exports: [UserpopupComponent]

})
export class AppModule { }
