import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "app/services/user.service";
import { Observable } from "rxjs/Observable";
import { UserMakerComponent } from "app/shared/user-maker/user-maker.component";
import { MdDialog } from "@angular/material";

@Component({
  selector: 'gef-ui-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.scss'
  ]
})
export class UserComponent implements OnInit{

    users$:Observable<any> = null;
    @ViewChild('datatable')
    table = null;

    constructor(private userService:UserService, private mdDialog:MdDialog){

    }

    ngOnInit(){
      this.users$ = this.userService.getAll();
    }

    toggleExpandRow(e, row) {
      e.preventDefault();
      this.table.rowDetail.toggleExpandRow(row);
    }

    createUser() {
      let dialogRef = this.mdDialog.open(UserMakerComponent);
    }
    
}
