import { Observable } from 'rxjs/Observable';
import { ExecutionModel } from 'app/models/execution.model';
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Http } from "@angular/http";


@Injectable()
export class ExecutionService {

    constructor(private http:Http) {

    }

    getAll():Observable<ExecutionModel[]>{
        return this.http.get(`${environment.apiUrl}/api/v1/execution`)
        .map(response => response.json()).map(body => body.data);
    }

    getByScript(slug):Observable<ExecutionModel[]>{
        return this.http.get(`${environment.apiUrl}/api/v1/script/${slug}/execution`)
        .map(response => response.json()).map(body => body.data);
    }

}
