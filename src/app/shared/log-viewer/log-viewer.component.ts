import { ExecutionService } from 'app/services/execution.service';

import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { ScriptService } from "app/services/script.service";
import { ExecutionLogModel } from "app/models/execution-log.model";
import { ScriptLogModel } from "app/models/script-log.model";


@Component({
    selector: 'gef-log-viewer',
    templateUrl: './log-viewer.component.html',
    styleUrls: [
        './log-viewer.component.scss'
    ]
})
export class LogViewerComponent implements OnDestroy {

    @ViewChild('content')
    content;
    logs:Array<ScriptLogModel | ExecutionLogModel> = [];
    id:string;
    type: string;
    interval;

    constructor(public dialogRef:MdDialogRef<LogViewerComponent>, private scriptService:ScriptService, private executionService: ExecutionService){
      this.updateLog();
      this.interval = setInterval(this.updateLog.bind(this), 1000);
    }

    updateLog(){
        if (this.id) {
          let lastId = null;
          if (this.logs && this.logs.length > 0) {
              lastId = (<any>this.logs[this.logs.length - 1]).id;
          }
          if (this.type === 'script') {
            this.scriptService.getLogs(this.id, lastId).toPromise().then((body) => {
                this.logs = this.logs.concat(body);
                this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
            });
          } else {
            this.executionService.getLogs(this.id, lastId).toPromise().then((body) => {
                this.logs = this.logs.concat(body);
                this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
            });
          }
        }
    }


    ngOnDestroy() {
        clearInterval(this.interval);
    }

}
