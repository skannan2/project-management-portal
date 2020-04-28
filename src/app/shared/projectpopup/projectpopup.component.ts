import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../model/project.model';
import {ProjectService} from '../../service/project.service';


@Component({
    selector: 'app-projectpopup',
    templateUrl: './projectpopup.component.html',
    styleUrls: ['./projectpopup.component.css']
})
export class ProjectpopupComponent implements OnInit {
    data: Project[] = [];
    closeResult = '';

    constructor(public activeModal: NgbActiveModal,
                private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.getProject();
    }

    getProject() {
        return this.projectService.getProject()
            .subscribe((res: any) => {
                this.data = res;
                console.log(this.data);
            });
    }

    passBack(project: Project) {
        this.activeModal.close(project);
    }


}
