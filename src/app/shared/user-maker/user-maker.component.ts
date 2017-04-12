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
    selector: 'gef-user-maker',
    templateUrl: './user-maker.component.html',
    styleUrls: ['./user-maker.component.scss']
})
export class UserMakerComponent {

  State:typeof State = State;
  state:State = State.PENDING;
  roles:Array<string> = ['USER', 'ADMIN'];
  role:string = 'USER';

  constructor(private userService:UserService) { }

  createUser(form:any) {
    this.state = State.REQUESTING;
    this.userService.create(form.email, form.password, form.role)
    .then(() => {
        this.state = State.SUCCESS;
    })
    .catch(() => {
        this.state = State.ERROR;
    });
  }

}