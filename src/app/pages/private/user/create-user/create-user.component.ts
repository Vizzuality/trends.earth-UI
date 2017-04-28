import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";
import { NotificationsService } from "angular2-notifications";


 enum State {
    PENDING,
    REQUESTING,
    SUCCESS,
    ERROR
}

@Component({
    selector: 'gef-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  State:typeof State = State;
  state:State = State.PENDING;
  roles:Array<string> = ['USER', 'ADMIN'];
  role:string = 'USER';

  constructor(public dialogRef:MdDialogRef<CreateUserComponent>, private userService:UserService, private notificationsService: NotificationsService) { }

  createUser(form:any) {
    this.state = State.REQUESTING;
    this.userService.create(form.email, form.role)
    .then(() => {
        this.state = State.SUCCESS;
        this.notificationsService.success('User created correctly');
        this.dialogRef.close();
    })
    .catch((error) => {
        this.state = State.ERROR;
        this.notificationsService.error('Error creating user', error.message);
    });
  }

}
