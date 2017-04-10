import { ScriptComponent } from 'app/pages/script/script.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Angular2DataTableModule } from 'angular2-data-table';
import { MaterialModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'script'
  },
  {
    path: 'script',
    component: ScriptComponent
  }
];

@NgModule({
  declarations: [ScriptComponent],
  imports: [
    MaterialModule,
    Angular2DataTableModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
