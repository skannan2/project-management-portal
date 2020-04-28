import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {NavigationEnd, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {User} from '../../model/user.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})

export class ManageUserComponent implements OnInit, OnDestroy {
  data: User[] = [];
  user: User = new User();
  public selectedName:any;
  navigationSubscription;
  mainForm: FormGroup;
  submitted = false;
  isEditBtn = false;
  term;

  constructor(private userService: UserService,
              private router: Router, private datePipe: DatePipe) {
    this.user.userId = 0;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }

    });

    this.mainForm = this.getForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.getUser();
  }

  getUser() {
    return this.userService.getUser()
        .subscribe((res: any) => {
          this.data = res;
          console.log(this.data);
        });
  }

  editUser(user: User): void {
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem('editUserId', user.userId.toString());
    console.log('***UserID***' + user.userId);
    this.isEditBtn = true;
    this.user = user;
    // set the values in the form
    this.mainForm.get('firstName').setValue(user.firstName);
    this.mainForm.get('lastName').setValue(user.lastName);
    this.mainForm.get('userName').setValue(user.userName);
    // this.router.navigate(['edituser']);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
        .subscribe(data => console.log(data), error => console.log(error));
    for(let i = 0; i < this.data.length; ++i){
      if (this.data[i].userId === userId) {
        this.data.splice(i,1);
      }
    }
  }

  getForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      userName: new FormControl(),
      search: new FormControl()
    });
  }

  sort(sortString: string) {
    return this.userService.sortUser(sortString)
        .subscribe((res: any) => {
          this.data = res;
          console.log(this.data);
        });
  }

  onSubmit(user: User) {
    if(user != null) {
      console.log('***user is not null calling edit**');
      this.userService.updateUser(this.user)
          .subscribe(data => console.log(data), error => console.log(error));
    } else {
      console.log('***user is null calling add**');
      this.userService.addUser(this.user)
          .subscribe(data => console.log(data), error => console.log(error));
    }


    this.clearFields();
    this.submitted = true;
    this.isEditBtn = false;
    this.getUser();
  }

  clearFields() {
    this.user.userId = 0;
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.userName = '';
  }

  public highlightRow(user) {
    this.selectedName = user.userId;
/*    this.mainForm.get('firstName').setValue(user.firstName);
    this.mainForm.get('lastName').setValue(user.lastName);
    this.mainForm.get('userName').setValue(user.userName);*/
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

