import { ExecutionService } from 'app/services/execution.service';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from "app/services/script.service";
import { ScriptModel } from "app/models/script.model";
import { NotificationsService } from "angular2-notifications";

@Component({
  moduleId: module.id,
  selector: 'exec-script',
  templateUrl: 'exec-script.component.html',
  styleUrls: ['./exec-script.component.scss']
})

export class ExecScriptComponent implements OnInit {

  script: ScriptModel;
  fields: any[] = []

  constructor(public dialogRef:MdDialogRef<ExecScriptComponent>, private scriptService: ScriptService, private notificationsService: NotificationsService){
  }

  ngOnInit() { }

  addField() {
    this.fields.push({
      key: '',
      name: ''
    });
  }
  removeField(i) {
    this.fields.splice(i, 1);
  }

  exec() {
    // let query = '';
    // this.fields.map((field) => {
    //   if (query !== ''){
    //     query += '&';
    //   }
    //   query +=  `${field.key}=${field.value}`;
    // });

    this.scriptService.runScript(this.script.slug, this.fields).toPromise().then((el) => {
      this.notificationsService.success(`Script running with id: ${el.id}`);
      this.dialogRef.close();
    });
  }
}
