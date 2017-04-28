import { NotificationsService } from 'angular2-notifications';
import { MdDialogRef } from '@angular/material';
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

  constructor(public dialogRef:MdDialogRef<UpdateUserComponent>, private userService:UserService,  private notificationsService: NotificationsService) { }

  createUser(form:any) {
    this.state = State.REQUESTING;
    this.userService.update(this.id, form.role)
    .then(() => {
        this.state = State.SUCCESS;
        this.notificationsService.success('User updated correctly');
        this.dialogRef.close();
    })
    .catch((error) => {
        this.state = State.ERROR;
        this.notificationsService.error('Error updating user', error.message);
    });
  }

}
