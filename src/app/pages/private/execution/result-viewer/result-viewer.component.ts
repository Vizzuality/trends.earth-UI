import { ExecutionService } from 'app/services/execution.service';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ScriptService } from "app/services/script.service";
import { ExecutionModel } from "app/models/execution.model";

@Component({
  moduleId: module.id,
  selector: 'result-viewer',
  templateUrl: 'result-viewer.component.html',
  styleUrls: ['./result-viewer.component.scss']
})

export class ResultViewerComponent implements OnInit {

  execution: ExecutionModel

  constructor(public dialogRef:MdDialogRef<ResultViewerComponent>, private executionService:ExecutionService){
  }

  ngOnInit() { }

  downloadResults() {
    this.executionService.downloadResults(this.execution.id);
  }
}
