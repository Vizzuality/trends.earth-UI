import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ScriptModel } from "app/models/script.model";
import { ScriptLogModel } from "app/models/script-log.model";
import { TokenService } from 'app/services/auth.service';


@Injectable()
export class ScriptService {

    constructor(private http:Http, private tokenService: TokenService) {
    }

    getAll():Observable<ScriptModel[]>{
        return this.http.get(`${environment.apiUrl}/api/v1/script?include=user`)
        .map(response => response.json()).map(body => body.data);
    }

    getLogs(scriptId, lastLogId?): Observable<ScriptLogModel[]>{
        return this.http.get(`${environment.apiUrl}/api/v1/script/${scriptId}/log${lastLogId ? `?last-id=${lastLogId}`:''}`)
        .map(response => response.json()).map(body => body.data);
    }

    createScript(file):Observable<ScriptModel> {
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);

      return this.http.post(`${environment.apiUrl}/api/v1/script`, formData).map(response => response.json());
    }

    updateScript(scriptId, file):Observable<ScriptModel> {
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);

      return this.http.patch(`${environment.apiUrl}/api/v1/script/${scriptId}`, formData).map(response => response.json());
    }

    downloadScript(slug) {
      window.open(`${environment.apiUrl}/api/v1/script/${slug}/download?token=${this.tokenService.token}`);
    }

}
