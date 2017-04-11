
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';


@Injectable()
export class TokenService {
    private _token:string = null;

    set token(token:string){
        if (!token) {
            localStorage.removeItem('gef-token');
        } else {
            localStorage.setItem('gef-token', token);
        }
        this._token = token;
    }

    get token(){
        if (!this._token) {
            this._token = localStorage.getItem('gef-token');
        }
        return this._token;
    }
}


@Injectable()
export class AuthService {

    user = null;
    token:string = null;

    constructor(private http:Http, private tokenService: TokenService){

    }

    login(email:string, password:string){
        return this.http.post(`${environment.apiUrl}/auth`, {
            email,
            password
        }).map(response => response.json()).toPromise()
        .then((body:any) => this.tokenService.token = body.access_token);
    }

    checkLogged(): Promise<boolean>{
        return this.http.get(`${environment.apiUrl}/api/v1/user/me`)
        .map(response => response.json())
        .map(body => {
            this.user = body;
            return true;
        }).toPromise();
    }

    logout(){}
}