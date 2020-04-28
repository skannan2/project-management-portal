import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../service/task.service';
import {Task} from '../../model/task.model';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {ParenttaskpopupComponent} from '../../shared/parenttaskpopup/parenttaskpopup.component';
import {ProjectpopupComponent} from '../../shared/projectpopup/projectpopup.component';
import {UserpopupComponent} from '../../shared/userpopup/userpopup.component';

@Component({
    selector: 'app-updatetask',
    templateUrl: './updatetask.component.html',
    styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
    data: any;
    submitted = false;
    task: Task = new Task();
    mainForm: FormGroup;

    constructor(private taskService: TaskService,
                private router: Router, private datePipe: DatePipe,
                public activeModal: NgbModal) {
    }

    ngOnInit(): void {
        const taskId = window.localStorage.getItem('editTaskId');
        this.mainForm = this.getForm();
        this.taskService.getTaskById(+taskId)
            .subscribe((res: any) => {
                this.task = res;
                console.log(this.task);
            });
        this.setFieldValues(this.task);
        this.mainForm.get('parentTaskSelected').disable();
    }

    setFieldValues(task: Task) {
        console.log('**projectID***' + task.projectId);
        console.log('**projectID***' + task.project);
       // this.mainForm.get('manager').setValue(task.userTbl.lastName + ',' + task.userTbl.firstName);
       // this.mainForm.get('managerId').setValue(task.userTbl.userId);
       // this.mainForm.get('project').setValue(task.project);
        //this.mainForm.get('projectId').setValue(task.projectTbl.projectId);
    }

    setTaskAsParent(task: Task) {
        console.log('***checkbox**' + task.parentTaskSelected);

        if (task.parentTaskSelected) {
            this.mainForm.get('project').disable();
        } else {
            this.mainForm.get('project').enable();
        }

    }

    getForm(): FormGroup {
        return new FormGroup({
            project: new FormControl(),
            projectId: new FormControl(),
            task: new FormControl(),
            startDate: new FormControl(),
            endDate: new FormControl(),
            priority: new FormControl(),
            managerId: new FormControl(),
            manager: new FormControl(),
            parenttask: new FormControl(),
            parenttaskId: new FormControl(),
            parentTaskSelected: new FormControl()
        });
    }

    clearFields() {
        this.task.task = '';
        this.task.parentTask = '';
        this.task.priority = 0;
        this.task.startDate = '';
        this.task.endDate = '';
    }

    onSubmit() {
        console.log(this.task.startDate);
        console.log(this.task.projectId);
        console.log(this.task.project);
        console.log(this.task.parentTaskSelected);

        this.task.startDate = this.datePipe.transform(this.task.startDate, 'MM/dd/yyyy');
        this.task.endDate = this.datePipe.transform(this.task.endDate, 'MM/dd/yyyy');

        console.log(this.datePipe.transform(this.task.startDate, 'MM/dd/yyyy'));

        this.taskService.updateTask(this.task)
            .subscribe(data => console.log(data), error => console.log(error));

        this.clearFields();
        this.submitted = true;

        this.router.navigate(['viewtask']);
    }

    goBack() {
        this.router.navigate(['viewtask']);
    }

    openParentTaskPopup() {
        const modalRef = this.activeModal.open(ParenttaskpopupComponent);

        modalRef.result.then((result) => {
            console.log(result.parentTask);
            console.log(result.parentTaskId);

            this.mainForm.get('parenttask').setValue(result.parentTask);
            this.mainForm.get('parenttaskId').setValue(result.parentTaskId);
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

    openUserPopup() {
        const modalRef = this.activeModal.open(UserpopupComponent);

        modalRef.result.then((result) => {
            console.log(result.firstName);
            console.log(result.userId);
            // this.project.managerId = result.userId;

            this.mainForm.get('manager').setValue(result.lastName + ',' + result.firstName);
            this.mainForm.get('managerId').setValue(result.userId);
        });
    }


}
