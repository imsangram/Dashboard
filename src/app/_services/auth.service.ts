import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  getToken(): string {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.token) {
      return user.token;
    }
  }
  isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }
}
