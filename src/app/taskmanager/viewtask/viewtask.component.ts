import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task.model';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import {ProjectpopupComponent} from '../../shared/projectpopup/projectpopup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit, OnDestroy {
  data: Task[] = [];
  task: Task = new Task();
  public selectedName:any;
  navigationSubscription;
  mainForm: FormGroup;


  constructor(private taskService: TaskService,
              private router: Router, public activeModal: NgbModal) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });

      this.mainForm = this.getForm();
    }

  ngOnInit(): void {
    this.getTask();
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.getTask();
  }

  getTask() {
    return this.taskService.getTask()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
    });

  }

  editTask(task: Task): void {
    window.localStorage.removeItem("editTaskId");
    window.localStorage.setItem("editTaskId", task.taskId.toString());
    this.router.navigate(['edittask']);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId)
    .subscribe(data => console.log(data), error => console.log(error)); 
    for(let i = 0; i < this.data.length; ++i){
      if (this.data[i].taskId === taskId) {
          this.data.splice(i,1);
      }
    }
  }

  getForm(): FormGroup {
    return new FormGroup({
      taskName: new FormControl(),
      parentTaskName: new FormControl(),
      priority: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      project: new FormControl(),
      projectId: new FormControl()
    });
  }

  openProjectPopup() {
    const modalRef = this.activeModal.open(ProjectpopupComponent);

    modalRef.result.then((result) => {
      console.log(result.projectName);
      console.log(result.projectId);

      this.mainForm.get('project').setValue(result.projectName);
      this.mainForm.get('projectId').setValue(result.projectId);
    });
  }

  loadTaskByProject(projectId: number) {
    if (projectId != null) {
      console.log('**projectID***' + projectId);
      return this.taskService.getTaskByProjectId(projectId)
          .subscribe((res: any) => {
            this.data = res;
            console.log(this.data);
          });
    }
  }

  public highlightRow(task) {
    this.selectedName = task.task;
    this.mainForm.get('taskName').setValue(task.task);
    this.mainForm.get('parentTaskName').setValue(task.parentTaskTbl.parentTask);
    this.mainForm.get('priority').setValue(task.priority);
    this.mainForm.get('startDate').setValue(task.startDate);
    this.mainForm.get('endDate').setValue(task.endDate);
  }

  sort(sortString: string) {
    return this.taskService.sortProject(sortString)
        .subscribe((res: any) => {
          this.data = res;
          console.log(this.data);
        });
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
