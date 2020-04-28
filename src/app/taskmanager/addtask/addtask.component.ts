import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../service/task.service';
import {Task} from '../../model/task.model';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserpopupComponent} from '../../shared/userpopup/userpopup.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectpopupComponent} from '../../shared/projectpopup/projectpopup.component';
import {ParenttaskpopupComponent} from '../../shared/parenttaskpopup/parenttaskpopup.component';

@Component({
    selector: 'app-addtask',
    templateUrl: './addtask.component.html',
    styleUrls: ['./addtask.component.css'],
    providers: []
})
export class AddtaskComponent implements OnInit {
    task: Task = new Task();
    submitted = false;
    mainForm: FormGroup;

    constructor(private taskService: TaskService,
                private router: Router, private datePipe: DatePipe,
                public activeModal: NgbModal) {
        this.task.taskId = 0;
        this.task.parentTaskId = 0;
        this.mainForm = this.getForm();
    }

    ngOnInit(): void {
        this.task.priority = 0;
    }

    setTaskAsParent(task: Task) {
        console.log('***checkbox**' + task.parentTaskSelected);

        if (task.parentTaskSelected) {
            this.mainForm.valid;
            this.mainForm.get('project').disable();
            this.mainForm.get('priority').disable();
            this.mainForm.get('parenttask').disable();
            this.mainForm.get('startDate').disable();
            this.mainForm.get('endDate').disable();
            this.mainForm.get('manager').disable();

        } else {
            this.mainForm.get('project').enable();
            this.mainForm.get('priority').enable();
            this.mainForm.get('parenttask').enable();
            this.mainForm.get('startDate').enable();
            this.mainForm.get('endDate').enable();
            this.mainForm.get('manager').enable();
        }

    }

    onSubmit() {
        if (!this.task.parentTaskSelected && this.mainForm.invalid) {
            return;
        }
        console.log(this.task.startDate);
        console.log(this.task.parentTaskSelected);
        if (!this.task.parentTaskSelected) {
            this.task.startDate = this.datePipe.transform(this.task.startDate, 'MM/dd/yyyy');
            this.task.endDate = this.datePipe.transform(this.task.endDate, 'MM/dd/yyyy');

            console.log(this.datePipe.transform(this.task.startDate, 'MM/dd/yyyy'));
        }

        this.taskService.addTask(this.task)
            .subscribe(data => console.log(data), error => console.log(error));

        this.clearFields();
        this.submitted = true;

        if (!this.task.parentTaskSelected) {
            this.router.navigate(['viewtask']);
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
