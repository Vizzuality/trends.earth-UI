
import { Component } from "@angular/core";
import { AuthService } from "app/services/auth.service";

@Component({
    selector: 'gef-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private authService:AuthService){
        
    }

    logout(){
        this.authService.logout();
    }

}