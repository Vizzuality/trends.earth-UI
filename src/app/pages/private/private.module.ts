import { NgModule } from '@angular/core';
import { ScriptComponent } from "app/pages/private/script/script.component";
import { RouterModule, Routes } from "@angular/router";
import { PrivateComponent } from "app/pages/private/private.component";
import { MaterialModule } from "@angular/material";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { HeaderComponent } from "app/shared/header/header.component";
import { CheckLoginGuard } from "app/service/check-login.guard";

const routes: Routes = [
    {
        path: 'private',
        component: PrivateComponent,
        canActivateChild: [CheckLoginGuard],
        children:[{
            path: '',
            pathMatch: 'full',
            redirectTo: 'script'
        },
        {
            path: 'script',
            component: ScriptComponent
        }]
    }     
];

@NgModule({
    declarations: [
        ScriptComponent,
        HeaderComponent,
        PrivateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        NgxDatatableModule
    ],
    providers: [CheckLoginGuard],
    exports: [RouterModule]
})
export class PrivateModule{

}