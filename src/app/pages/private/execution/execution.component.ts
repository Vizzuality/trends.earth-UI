import { Observer } from 'rxjs/Rx';
import { ResultViewerComponent } from 'app/pages/private/execution/result-viewer/result-viewer.component';
import { MdDialog } from '@angular/material';
import { ExecutionModel } from 'app/models/execution.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ExecutionService } from "app/services/execution.service";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import { LogViewerComponent } from "app/shared/log-viewer/log-viewer.component";

@Component({
  selector: 'gef-ui-execution',
  templateUrl: './execution.component.html',
  styleUrls: [
    './execution.component.scss'
  ]
})
export class ExecutionComponent implements OnInit{

    @ViewChild('datatable')
    table = null;

    dateFilter: Date = new Date();
    executions$:Observable<ExecutionModel> = Observable.create(observer => {
      this.observer = observer;
    });
    observer: Observer<any>;

    constructor(private executionService:ExecutionService, private route:ActivatedRoute, private mdDialog:MdDialog){

    }

    ngOnInit() {
      this.update()
    }

    update() {
      const slug = this.route.snapshot.params['slug'] || null;
      let stream$ = null;
      if (slug) {
        stream$ = this.executionService.getByScript(slug);
      } else {
        stream$ = this.executionService.getAll(this.dateFilter.toISOString().slice(0, 10));
      }

      stream$.toPromise().then((body) => {
        this.observer.next(body);
      });
    }


    toggleExpandRow(e, row) {
      e.preventDefault();
      this.table.rowDetail.toggleExpandRow(row);
    }

    viewResults(row: ExecutionModel) {
      const dialogRef = this.mdDialog.open(ResultViewerComponent);
      dialogRef.componentInstance.execution = row;
    }

    viewLogs(row) {
      let dialogRef = this.mdDialog.open(LogViewerComponent);
      dialogRef.componentInstance.id = row.id;
      dialogRef.componentInstance.type = 'execution';
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
