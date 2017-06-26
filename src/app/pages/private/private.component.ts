import { Component } from '@angular/core';
import { LoadingInterceptor } from "app/services/loading-interceptor.service";
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'gef-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  loading: any
  user: any
  options: any = {
    position: ['top', 'right'],
    timeOut: 1000,
    lastOnBottom: true
  }

  constructor(private loadingInterceptor: LoadingInterceptor, private authService: AuthService){
    this.loading = this.loadingInterceptor.loading;
    this.user = this.authService.user;
  }
}
