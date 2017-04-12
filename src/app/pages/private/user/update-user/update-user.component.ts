import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";


 enum State {
    PENDING,
    REQUESTING,
    SUCCESS,
    ERROR
}

@Component({
    selector: 'gef-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  State:typeof State = State;
  state:State = State.PENDING;
  roles:Array<string> = ['USER', 'ADMIN'];
  role:string = 'USER';
  id:string = null;

  constructor(private userService:UserService) { }

  createUser(form:any) {
    this.state = State.REQUESTING;
    this.userService.update(this.id, form.password, form.role)
    .then(() => {
        this.state = State.SUCCESS;
    })
    .catch(() => {
        this.state = State.ERROR;
    });
  }

}