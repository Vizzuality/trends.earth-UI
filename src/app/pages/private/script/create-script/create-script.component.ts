import { MdDialogRef } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from "app/services/script.service";

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
    this.scriptService.createScript(script.name, this.selectedFile).toPromise().then(() => {
      this.dialogRef.close();
    }, (err) => {
      console.error(err);
      console.log(err);
    })
  }
}
