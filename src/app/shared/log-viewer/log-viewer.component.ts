
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { ScriptService } from "app/services/script.service";


@Component({
    selector: 'gef-log-viewer',
    templateUrl: './log-viewer.component.html',
    styleUrls: [
        './log-viewer.component.scss'
    ]
})
export class LogViewerComponent implements OnInit, OnDestroy {

    logs:Array<string> = [];
    slug:string;
    interval;
    constructor(public dialogRef:MdDialogRef<LogViewerComponent>, private scriptService:ScriptService){
    }

    updateLog(){
        let lastId = null;
        if (this.logs && this.logs.length > 0) {
            lastId = (<any>this.logs[this.logs.length - 1]).id;
        }
        this.scriptService.getLogs(this.slug, lastId).toPromise().then((body) => {
            this.logs = this.logs.concat(body)
        });
    }

    ngOnInit(){
        this.updateLog();
        setInterval(this.updateLog.bind(this), 1000);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

}