import {Component, OnInit} from '@angular/core';
import {Project} from '../../model/project.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjectService} from '../../service/project.service';
import {Parenttask} from '../../model/parenttask.model';
import {TaskService} from '../../service/task.service';

@Component({
    selector: 'app-parenttaskpopup',
    templateUrl: './parenttaskpopup.component.html',
    styleUrls: ['./parenttaskpopup.component.css']
})
export class ParenttaskpopupComponent implements OnInit {
    data: Parenttask[] = [];
    closeResult = '';

    constructor(public activeModal: NgbActiveModal,
                private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.getParentTask();
    }

    getParentTask() {
        return this.taskService.getParentTask()
            .subscribe((res: any) => {
                this.data = res;
                console.log(this.data);
            });
    }

    passBack(parenttask: Parenttask) {
        this.activeModal.close(parenttask);
    }
}
