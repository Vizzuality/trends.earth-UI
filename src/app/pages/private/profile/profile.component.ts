import { NotificationsService } from 'angular2-notifications';
import { Component } from '@angular/core';
import { UserService } from "app/services/user.service";

@Component({
  selector: 'gef-ui-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {

  constructor(private userService: UserService, private notificationsService: NotificationsService) {

  }

  changePassword(data) {
    this.userService.changePassword(data).then(() => {
      this.notificationsService.success('Password updated correctly');
    }, (error) => {
      this.notificationsService.error('Error updating password', error.message);
    })
  }

}
