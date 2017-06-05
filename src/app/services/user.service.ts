import { UserModel } from 'app/models/user.model';
import { Observable } from 'rxjs/Observable';

import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Http } from "@angular/http";


@Injectable()
export class UserService {

    constructor(private http:Http) {

    }

    getAll(){
        return this.http.get(`${environment.apiUrl}/api/v1/user`)
        .map(response => response.json()).map(body => body.data);
    }

    create(user){
        return this.http.post(`${environment.apiUrl}/api/v1/user`, user)
        .map(response => response.json()).map(body => body.data).toPromise();
    }

    update(userId:string, user){
        return this.http.patch(`${environment.apiUrl}/api/v1/user/${userId}`, user)
        .map(response => response.json()).map(body => body.data).toPromise();
    }

    changePassword(data) {
      return this.http.patch(`${environment.apiUrl}/api/v1/user/me`, data)
        .map(response => response.json()).map(body => body.data).toPromise();
    }

    deleteUser(id: number): Observable<UserModel> {
      return this.http.delete(`${environment.apiUrl}/api/v1/user/${id}`).map(response => response.json()).map(el => el.data);
    }


}
