import { Component, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from "app/services/script.service";
import { Observable } from "rxjs/Observable";
import { LogViewerComponent } from "app/shared/log-viewer/log-viewer.component";
import { MdDialog } from "@angular/material";

@Component({
  selector: 'gef-ui-script',
  templateUrl: './script.component.html',
  styleUrls: [
    './script.component.scss'
  ]
})
export class ScriptComponent implements OnInit{

    scripts$:Observable<any> = null;
    @ViewChild('datatable')
    table = null;

    constructor(private scriptService:ScriptService, private mdDialog:MdDialog){

    }

    ngOnInit() {
      this.scripts$ = this.scriptService.getAll();
    }

    toggleExpandRow(e, row) {
      e.preventDefault();
      this.table.rowDetail.toggleExpandRow(row);
    }

    viewLogs(row) {
      let dialogRef = this.mdDialog.open(LogViewerComponent);
      dialogRef.componentInstance.slug = row.id;
    }
    
}
