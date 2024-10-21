import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {}

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000';
  url = 'https://steffen1205.github.io/json-hosting/db.json';

  getQuestions() {
    // console.log('github', this.url);
    // fetch(this.url).then((response) => {
    //   response.json().then((data) => {
    //     console.log(data);
    //     return data;
    //   });
    // });
    return this.httpClient.get(`${this.baseUrl}/fragen`);
  }
}
