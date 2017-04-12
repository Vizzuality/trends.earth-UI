import { Component } from '@angular/core';
import { LoadingInterceptor } from "app/services/loading-interceptor.service";

@Component({
  selector: 'gef-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  loading: boolean
  constructor(private loadingInterceptor: LoadingInterceptor){
    this.loading = this.loadingInterceptor.loading;
  }
}
