import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { OutboundMessage } from '../models/outbound-message';

@Injectable()
export class ApiService {
    private serviceUrl = '/resource';

    private apiBaseUrl: string;

    constructor(private http: Http) {
        if (process.env.ENV === 'production') {
            this.apiBaseUrl = '';
        } else {
            this.apiBaseUrl = 'http://localhost:3000';
        }
    }

    get(id: string): Observable<Message> {
        let url = `${ this.apiBaseUrl }${ this.serviceUrl }/${ id }`;
        return this.http.get(url)
            .map(response => response.json());
    }

    post(message: OutboundMessage): Observable<string> {
        let headers = new Headers({'Content-Type': 'text/plain'});
        let requestOpts = new RequestOptions({ headers: headers });

        let url = `${ this.apiBaseUrl }${ this.serviceUrl }`;
        return this.http.post(url, { content: message.content }, requestOpts)
            .map(response => response.json().uuid);
    }

    delete(id: string) {
        let url = `${ this.apiBaseUrl }${ this.serviceUrl }/${ id }`;
        return this.http.delete(url)
            .map(response => response.json());
    }
}
