import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-userpopup',
  templateUrl: './userpopup.component.html',
  styleUrls: ['./userpopup.component.css']
})
export class UserpopupComponent implements OnInit {
  data: User[] = [];

  closeResult = '';

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    return this.userService.getUser()
        .subscribe((res: any) => {
          this.data = res;
          console.log(this.data);
        });
  }

  passBack(user: User) {
    this.activeModal.close(user);
  }
}
