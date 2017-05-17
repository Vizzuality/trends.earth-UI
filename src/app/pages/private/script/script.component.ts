import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'app/services/auth.service';
import { Observer } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from "app/services/script.service";
import { Observable } from "rxjs/Observable";
import { LogViewerComponent } from "app/shared/log-viewer/log-viewer.component";
import { MdDialog } from "@angular/material";
import { CreateScriptComponent } from "app/pages/private/script/create-script/create-script.component";
import { ScriptModel } from "app/models/script.model";
import { ExecScriptComponent } from "app/pages/private/script/exec-script/exec-script.component";

@Component({
  selector: 'gef-ui-script',
  templateUrl: './script.component.html',
  styleUrls: [
    './script.component.scss'
  ]
})
export class ScriptComponent implements OnInit{

    scripts$:Observable<ScriptModel[]> = Observable.create(observer => {
      this.observer = observer;
    });
    observer: Observer<ScriptModel[]>;
    @ViewChild('datatable')
    table = null;

    user = null;

    constructor(private scriptService:ScriptService, private mdDialog:MdDialog, private authService: AuthService, private notificationsService: NotificationsService){
      this.user = this.authService.user;
    }

    ngOnInit() {
      this.update()
    }

    update() {
      this.scriptService.getAll().toPromise().then((body: ScriptModel[]) => {
        this.observer.next(body);
      });
    }

    toggleExpandRow(e, row) {
      e.preventDefault();
      this.table.rowDetail.toggleExpandRow(row);
    }

    viewLogs(row) {
      let dialogRef = this.mdDialog.open(LogViewerComponent);
      dialogRef.componentInstance.id = row.id;
      dialogRef.componentInstance.type = 'script';
    }

    createScript() {
      this.mdDialog.open(CreateScriptComponent).afterClosed().toPromise().then(() => {
        this.update();
      });
    }

    editScript(script) {
      const dialogRef = this.mdDialog.open(CreateScriptComponent);
      dialogRef.afterClosed().toPromise().then(() => {
        this.update();
      });
      dialogRef.componentInstance.script = script;
    }

    execScript(script) {
      const dialogRef = this.mdDialog.open(ExecScriptComponent);
      dialogRef.afterClosed().toPromise().then(() => {
        this.update();
      });
      dialogRef.componentInstance.script = script;
    }

    downloadScript(row) {
      this.scriptService.downloadScript(row.slug);
    }

    changeVisibility(row) {
      if (row.user_id !== this.user.id && this.user.role !== 'ADMIN') {
        return;
      }
      let confirm = null;
      if (row.public) {
        confirm = window.confirm('Are you sure that you want to do the script private?');
      } else {
        confirm = window.confirm('Are you sure that you want to do the script public?');
      }
      if (confirm) {
        this.scriptService.toggleVisibility(row).toPromise().then(() => {
          this.update();
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
