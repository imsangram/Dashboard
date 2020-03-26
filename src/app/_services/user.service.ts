import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private config: AppConfig,
        private httpClient: HttpClient
    ) { }

    getAll() {
        return this.httpClient.get(this.config.apiUrl + '/users');
    }

    getById(id: string) {
        return this.httpClient.get(this.config.apiUrl + '/users/' + id);
    }

    create(user: User) {
        return this.httpClient.post(this.config.apiUrl + '/register', user);
    }

    update(user: User) {
        const updateUser = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
        return this.httpClient.patch(this.config.apiUrl + '/users/' + user._id, updateUser);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/users/' + id, this.headerRequest());
    }

    // private helper methods

    private headerRequest() {
        // create authorization header with jwt token
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + user.token });
            return new RequestOptions({ headers: headers });
        }
    }
}