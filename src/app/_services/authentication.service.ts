import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { JwtHelperService } from "@auth0/angular-jwt";
import { AppConfig } from '../app.config';
import { BehaviorSubject } from "rxjs/Rx";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

    private _isLoggedIn: boolean;
    private signedIn = new BehaviorSubject<boolean>(false);

    constructor(private config: AppConfig, private httpClient: HttpClient) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(currentUser.token);
            this._isLoggedIn = !isExpired;
            this.signedIn.next(!isExpired);
        }
        else {
            this._isLoggedIn = false;
            this.signedIn.next(false);
        }
    }

    get isSignedIn() {
        return this.signedIn.asObservable();
    }


    login(username: string, password: string) {
        return this.httpClient.post(this.config.apiUrl + '/login', { email: username, password: password })
            .map((response: Response) => {
                //login successful if there's a jwt token in the response
                const jwt_token = response;
                var user = { user: null, token: jwt_token };
                if (jwt_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.signedIn.next(true);
                }
            })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.signedIn.next(false);
    }
}