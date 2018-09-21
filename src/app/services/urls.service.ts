import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor(private http: HttpClient) { }

  getQuery(query: string, action: string, objet?:any, headers?: HttpHeaders) {
    const URL = `http://localhost:58586/api/${query}`;

    switch (action) {
      case "get":
        return this.http.get(URL, { headers });
      case "post":
        return this.http.post(URL, objet, { headers });
      case "put":
        return this.http.put(URL, objet, { headers });
      case "delete":
        return this.http.delete(URL, { headers });
      default:
        return this.http.get(URL, { headers });
    }
  }

}
