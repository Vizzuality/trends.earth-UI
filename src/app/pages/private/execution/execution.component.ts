import { Component, OnInit, ViewChild } from '@angular/core';
import { ExecutionService } from "app/services/execution.service";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'gef-ui-execution',
  templateUrl: './execution.component.html',
  styleUrls: [
    './execution.component.scss'
  ]
})
export class ExecutionComponent implements OnInit{

    executions$:Observable<any> = null;
    @ViewChild('datatable')
    table = null;

    constructor(private executionService:ExecutionService, private route:ActivatedRoute){

    }

    ngOnInit(){
      const slug = this.route.snapshot.params['slug'] || null;
      if (slug) {
        this.executions$ = this.executionService.getByScript(slug);
      } else {
        this.executions$ = this.executionService.getAll();
      }
      
    }

    toggleExpandRow(e, row) {
      e.preventDefault();
      this.table.rowDetail.toggleExpandRow(row);
    }
    
}
