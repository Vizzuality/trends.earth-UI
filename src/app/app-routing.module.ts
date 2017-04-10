import { ScriptComponent } from 'app/pages/script/script.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
    NgxDatatableModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
