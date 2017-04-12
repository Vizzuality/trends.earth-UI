import { NgModule } from '@angular/core';
import { ScriptComponent } from "app/pages/private/script/script.component";
import { RouterModule, Routes } from "@angular/router";
import { PrivateComponent } from "app/pages/private/private.component";
import { MaterialModule } from "@angular/material";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { HeaderComponent } from "app/shared/header/header.component";
import { CheckLoginGuard } from "app/services/check-login.guard";
import { ScriptService } from "app/services/script.service";
import { CommonModule } from "@angular/common";
import { ExecutionComponent } from "app/pages/private/execution/execution.component";
import { UserComponent } from "app/pages/private/user/user.component";
import { ExecutionService } from "app/services/execution.service";
import { UserService } from "app/services/user.service";
import { RequestOptions } from "@angular/http";
import { OauthRequestOptions } from "app/services/oauth-request.service";
import { LogViewerComponent } from "app/shared/log-viewer/log-viewer.component";
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { CreateUserComponent } from "app/pages/private/user/create-user/create-user.component";
import { UpdateUserComponent } from "app/pages/private/user/update-user/update-user.component";
import { ScriptMakerComponent } from "app/pages/private/script/script-maker/script-maker.component";


const routes: Routes = [
    {
        path: '',
        component: PrivateComponent,
        canActivateChild: [CheckLoginGuard],
        children:[
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'script'
            },
            {
                path: 'script',
                component: ScriptComponent
            },
             {
                path: 'script/:slug/execution',
                component: ExecutionComponent
            },
            {
                path: 'execution',
                component: ExecutionComponent
            },
            {
                path: 'user',
                component: UserComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        ScriptComponent,
        HeaderComponent,
        PrivateComponent,
        ExecutionComponent,
        UserComponent,
        LogViewerComponent,
        ScriptMakerComponent,
        CreateUserComponent,
        UpdateUserComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        NgxDatatableModule,
        CommonModule,
        FormsModule,
        CustomFormsModule
    ],
    entryComponents: [
        LogViewerComponent,
        ScriptMakerComponent,
        CreateUserComponent,
        UpdateUserComponent
    ],
    providers: [
        { provide: RequestOptions, useClass: OauthRequestOptions },
        CheckLoginGuard,
        ScriptService,
        ExecutionService,
        UserService
    ],
    exports: [RouterModule]
})
export class PrivateModule{

}
