import { MdDialogRef } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from "app/services/script.service";
import { ScriptModel } from "app/models/script.model";

@Component({
  moduleId: module.id,
  selector: 'create-script',
  templateUrl: 'create-script.component.html',
  styleUrls: ['./create-script.component.scss']
})

export class CreateScriptComponent implements OnInit {

  @ViewChild('file')
  file;
  @ViewChild('form')
  form;

  selectedFile: null;
  script: ScriptModel;

  constructor(public dialogRef:MdDialogRef<CreateScriptComponent>, private scriptService:ScriptService){
  }

  ngOnInit() { }

  changeFile(file) {
    if (file.files && file.files.length > 0){
      this.selectedFile = file.files[0];
      return file.files[0].name;
    }
    this.selectedFile = null;
    return null;
  }

  save(script) {
    let stream$ = null;
    if (this.script) {
      stream$ = this.scriptService.updateScript(this.script.id, this.selectedFile);
    } else {
      stream$ = this.scriptService.createScript(this.selectedFile);
    }
    stream$.toPromise().then(() => {
        this.dialogRef.close();
      }, (err) => {
        console.error(err);
        console.log(err);
      });
  }
}
