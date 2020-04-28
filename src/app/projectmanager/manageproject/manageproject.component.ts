import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Project} from '../../model/project.model';
import {ProjectService} from '../../service/project.service';
import {UserpopupComponent} from '../../shared/userpopup/userpopup.component';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-manage-project',
  templateUrl: './manageproject.component.html',
  styleUrls: ['./manageproject.component.css']
})
export class ManageProjectComponent implements OnInit {
  data: Project[] = [];
  public selectedName: any;
  project: Project = new Project();
  mainForm: FormGroup;
  submitted = false;
  isEditBtn = false;
  defaultEndDate: Date;
  term;

  constructor(private projectService: ProjectService,
              private router: Router, private datePipe: DatePipe,
              public activeModal: NgbModal) {
    this.project.projectId = 0;
    this.mainForm = this.getForm();
  }

  ngOnInit(): void {
    this.project.priority = 0;
    this.getProject();
  }

  onSubmit(project: Project) {
    console.log(this.project.startDate);
    this.project.startDate = this.datePipe.transform(this.project.startDate, 'MM/dd/yyyy');
    this.project.endDate = this.datePipe.transform(this.project.endDate, 'MM/dd/yyyy');
    console.log(this.datePipe.transform(this.project.startDate, 'MM/dd/yyyy'));

    if (project != null) {
      this.projectService.updateProject(this.project)
          .subscribe(data => console.log(data), error => console.log(error));
    } else {
      this.projectService.addProject(this.project)
          .subscribe(data => console.log(data), error => console.log(error));
    }

    this.clearFields();
    this.submitted = true;
    this.isEditBtn = false;
    this.getProject();
  }

  editProject(project: Project): void {
    window.localStorage.removeItem('editProjectId');
    window.localStorage.setItem('editProjectId', project.projectId.toString());
    console.log('***UserID***' + project.projectId);
    this.isEditBtn = true;
    this.project = project;
    // set the values in the form
    this.mainForm.get('project').setValue(project.projectName);
    this.mainForm.get('startDate').setValue(project.startDate);
    this.mainForm.get('endDate').setValue(project.endDate);
    this.mainForm.get('priority').setValue(project.priority);
    this.mainForm.get('manager').setValue(project.userTbl.lastName + ',' + project.userTbl.firstName);
    this.mainForm.get('managerId').setValue(project.userTbl.userId);

    // this.router.navigate(['edituser']);
  }

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId)
        .subscribe(data => console.log(data), error => console.log(error));
    for(let i = 0; i < this.data.length; ++i) {
      if (this.data[i].projectId === projectId) {
        this.data.splice(i,1);
      }
    }
  }

  setDefaultDates(isChecked: boolean) {
    console.log('***isChecked***' + isChecked);
    if (isChecked) {
      this.defaultEndDate = new Date();

      this.mainForm.get('startDate').setValue(new Date());
      this.mainForm.get('endDate').setValue(new Date(this.defaultEndDate.getTime() + 86400000));

    } else {
      this.project.startDate = '';
      this.project.endDate = '';
    }
  }

  getForm(): FormGroup {
    return new FormGroup({
      project: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      priority: new FormControl(),
      managerId: new FormControl(),
      manager: new FormControl(),
      search: new FormControl()
    });
  }

  getProject() {
    return this.projectService.getProject()
        .subscribe((res: any) => {
          this.data = res;
          console.log(this.data);
        });
  }

  sort(sortString: string) {
    return this.projectService.sortProject(sortString)
        .subscribe((res: any) => {
          this.data = res;
          console.log(this.data);
        });
  }

  clearFields() {
    this.project.projectId = 0;
    this.project.projectName = '';
    this.project.priority = 0;
    this.project.startDate = '';
    this.project.endDate = '';
    this.project.managerId = '';
    this.project.manager = '';
  }

  public highlightRow(project) {
    this.selectedName = project.projectId;
    /*    this.mainForm.get('firstName').setValue(user.firstName);
        this.mainForm.get('lastName').setValue(user.lastName);
        this.mainForm.get('userName').setValue(user.userName);*/
  }

  open() {
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
