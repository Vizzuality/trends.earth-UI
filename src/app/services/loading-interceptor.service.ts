import { Injectable } from '@angular/core';
import { HttpInterceptorService } from "ng2-http-interceptor/dist";

@Injectable()
export class LoadingInterceptor {
  loading: any = {
    show: true,
    mode: 'indeterminate'
  }

  constructor(private httpInterceptor: HttpInterceptorService){
    this.httpInterceptor.request().addInterceptor((data, method) => {
      this.loading.show = true;
      return data;
    });

    this.httpInterceptor.response().addInterceptor(
      res => res.do(() => {
        this.loading.show = false;
      }, e => this.loading.show = false));
  }
}
