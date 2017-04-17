import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoginComponent } from "app/pages/login/login.component";

import { CheckLoginGuard } from "app/services/check-login.guard";
import { RecoverPasswordComponent } from "app/pages/recover-password/recover-password.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'private'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: 'private',
    loadChildren: 'app/pages/private/private.module#PrivateModule'
  }
];

@NgModule({
  declarations: [

  ],
  imports: [
    MaterialModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    CheckLoginGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
