import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "app/services/user.service";
import { Observable } from "rxjs/Observable";
import { MdDialog } from "@angular/material";
import { CreateUserComponent } from "app/pages/private/user/create-user/create-user.component";
import { UpdateUserComponent } from "app/pages/private/user/update-user/update-user.component";
import { Observer } from "rxjs/Rx";
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'gef-ui-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.scss'
  ]
})
export class UserComponent implements OnInit{
    user: any
    users$:Observable<any> = Observable.create(observer => {
      this.observer = observer;
    });
    observer: Observer<any>;
    @ViewChild('datatable')
    table = null;

    constructor(private userService:UserService, private mdDialog:MdDialog,  private notificationsService: NotificationsService, private authService: AuthService){
        this.user = this.authService.user;
    }

    ngOnInit(){
      this.updateUsersInfo();
    }

    createUser() {
      this.mdDialog.open(CreateUserComponent).afterClosed().toPromise().then(() => {
        this.updateUsersInfo();
      });
    }

    updateUser(row) {
      const userId = row.id;
      let dialogRef = this.mdDialog.open(UpdateUserComponent)
      dialogRef.componentInstance.id = row.id;
      dialogRef.componentInstance.role = row.role;
      dialogRef.componentInstance.user = row;
      dialogRef.afterClosed().toPromise().then(() => {
        this.updateUsersInfo();
      });
    }

    updateUsersInfo(){
      this.userService.getAll().toPromise().then((body) => {
        this.observer.next(body);
      });
    }

    deleteUser(user) {
      const deleteUser = window.confirm('Are you sure that you want delete the user?');
      if (deleteUser) {
        this.userService.deleteUser(user.id).toPromise().then(() => {
          this.notificationsService.success(`Script deleted correctly`);
          this.updateUsersInfo();
        });
      }
    }

    dateComparator(a, b) {
      if (!a) {
        return b;
      } else if (!b) {
        return a;
      }
      return new Date(b).getTime() - new Date(a).getTime();
    }

}
