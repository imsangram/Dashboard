import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SearchuserService {
  private jsonFileURL: string = "https://api.myjson.com/bins/7obqn1";
  constructor(private http: Http,
    private httpClient: HttpClient) {
  }
  search(query: string, perPage: number, pageNumber: number) {
    if (pageNumber > 0 && perPage > 0) {
      return this.http.get('https://api.github.com/search/users?q=' + query + '&per_page=' + perPage + '&page=' + pageNumber);
    }
  }

  search_(query: string, perPage: number, pageNumber: number) {
    if (pageNumber > 0 && perPage > 0) {
      return this.http.get(this.jsonFileURL);
    }
  }

  getUserInfo(userName: string) {
    return this.http.get('https://api.github.com/users/' + userName);
  }

  private headerRequest() {
    // create authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'token ' });
    return new RequestOptions({ headers: headers });
  }

}

